// frontend/src/app/dashboard/atendimentos/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  getAtendimentoByAgendamentoId,
  aprovarAvaliacao,
  reprovarAvaliacao,
  StatusAtendimento,
} from "@/services/atendimentoService";
import { StatusAgendamento } from "@/services/agendamentoService";
import { useAtendimentos } from "@/hooks/useAtendimentos";
import Alert from "@/components/ui/Alert";
import { DayNavigation } from "@/components/atendimentos/DayNavigation";
import { AgendamentosDoDia } from "@/components/atendimentos/AgendamentosDoDia";
import { AgendamentosCancelados } from "@/components/atendimentos/AgendamentosCancelados";
import { StatusConfirmModal } from "@/components/atendimentos/StatusConfirmModal";
import { AtendimentoFormModal } from "@/components/atendimentos/AtendimentoFormModal";
import { AvaliacaoFormModal } from "@/components/atendimentos/AvaliacaoFormModal";
import { AvaliacaoApprovalModal } from "@/components/atendimentos/AvaliacaoApprovalModal";
import { toast } from "react-hot-toast";

type ModalMode = "atendimento" | "avaliacao" | "approval";

export default function AtendimentosPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const agendamentoIdFromUrl = searchParams?.get("agendamentoId") || null;

  const {
    atendimentos,
    agendamentos,
    agendamentosCancelados,
    profissionais,
    pacientes,
    procedimentos,
    isLoading,
    error,
    success,
    currentDate,
    selectedProfissional,
    selectedPaciente,
    setSelectedProfissional,
    setSelectedPaciente,
    clearMessages,
    handleCreateAtendimento,
    handleCancelAtendimento,
    handleUpdateStatus,
    previousDay,
    nextDay,
    goToToday,
  } = useAtendimentos();

  // Modal states
  const [modalMode, setModalMode] = useState<ModalMode | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedAgendamento, setSelectedAgendamento] = useState<any>(null);
  const [viewingAtendimento, setViewingAtendimento] = useState<any>(null);
  const [avaliacaoParaAprovar, setAvaliacaoParaAprovar] = useState<any>(null);
  const [changingStatusAgendamento, setChangingStatusAgendamento] =
    useState<any>(null);
  const [newStatus, setNewStatus] = useState<StatusAgendamento | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (agendamentoIdFromUrl && agendamentos.length > 0) {
      checkAndOpenAtendimento(agendamentoIdFromUrl);
    }
  }, [agendamentoIdFromUrl, agendamentos]);

  const checkAndOpenAtendimento = async (agendamentoId: string) => {
    try {
      const existingAtendimento = await getAtendimentoByAgendamentoId(
        agendamentoId
      );

      if (existingAtendimento) {
        const agendamento = agendamentos.find((ag) => ag.id === agendamentoId);
        setViewingAtendimento(existingAtendimento);
        setSelectedAgendamento(agendamento);
        setModalMode("atendimento");
      } else {
        const agendamento = agendamentos.find((ag) => ag.id === agendamentoId);
        if (agendamento) {
          setSelectedAgendamento(agendamento);
          setViewingAtendimento(null);
          setModalMode("atendimento");
        }
      }
    } catch (err: any) {
      console.error("Erro ao verificar atendimento:", err);
    }
  };

  // FUNÇÃO PARA RECARREGAR A PÁGINA
  const reloadData = () => {
    router.refresh();
  };

  // ========== ATENDIMENTO AVULSO ==========
  const handleRegistrarAtendimento = (agendamento: any) => {
    setSelectedAgendamento(agendamento);
    setViewingAtendimento(null);
    setModalMode("atendimento");
  };

  const handleVerAtendimento = (atendimento: any) => {
    setViewingAtendimento(atendimento);
    const agendamento = agendamentos.find(
      (ag) => ag.id === atendimento.agendamentoId
    );
    setSelectedAgendamento(agendamento);

    // Se for uma avaliação pendente, abrir modal de aprovação
    if (
      atendimento.tipo === StatusAtendimento.AVALIACAO &&
      atendimento.statusAprovacao === "PENDENTE"
    ) {
      setAvaliacaoParaAprovar(atendimento);
      setModalMode("approval");
    } else {
      setModalMode("atendimento");
    }
  };

  const handleAtendimentoSubmit = async (data: any) => {
    return await handleCreateAtendimento(data);
  };

  // ========== AVALIAÇÃO ==========
  const handleRegistrarAvaliacao = (agendamento: any) => {
    setSelectedAgendamento(agendamento);
    setViewingAtendimento(null);
    setModalMode("avaliacao");
  };

  const handleAvaliacaoSubmit = async (data: {
    anotacoes: string;
    procedimentosPlano: any[];
  }) => {
    if (!selectedAgendamento) return;

    try {
      await handleCreateAtendimento({
        agendamentoId: selectedAgendamento.id,
        tipo: StatusAtendimento.AVALIACAO,
        anotacoes: data.anotacoes,
        procedimentosPlano: data.procedimentosPlano,
      });

      toast.success("Avaliação criada com sucesso!");
      closeAllModals();
      reloadData();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erro ao criar avaliação");
      throw error;
    }
  };

  // ========== APROVAÇÃO/REPROVAÇÃO ==========

  const handleAprovarAvaliacao = async (aprovadoPor: string) => {
    if (!avaliacaoParaAprovar) return;

    try {
      setIsSubmitting(true);
      const result = await aprovarAvaliacao(avaliacaoParaAprovar.id, {
        aprovadoPor,
      });

      // IMPORTANTE: Fechar modal ANTES do toast e reload
      closeAllModals();

      toast.success("Avaliação aprovada! Plano de tratamento criado.");

      // Dar um delay antes de recarregar para o toast aparecer
      setTimeout(() => {
        reloadData();
      }, 500);
    } catch (error: any) {
      console.error("Erro ao aprovar:", error);
      toast.error(error.response?.data?.error || "Erro ao aprovar avaliação");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReprovarAvaliacao = async (motivo: string) => {
    if (!avaliacaoParaAprovar) return;

    try {
      setIsSubmitting(true);
      await reprovarAvaliacao(avaliacaoParaAprovar.id, { motivo });

      // IMPORTANTE: Fechar modal ANTES do toast e reload
      closeAllModals();

      toast.success("Avaliação reprovada.");

      setTimeout(() => {
        reloadData();
      }, 500);
    } catch (error: any) {
      console.error("Erro ao reprovar:", error);
      toast.error(error.response?.data?.error || "Erro ao reprovar avaliação");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ========== STATUS ==========
  const handleOpenStatusModal = (
    agendamento: any,
    status: StatusAgendamento
  ) => {
    setChangingStatusAgendamento(agendamento);
    setNewStatus(status);
    setIsStatusModalOpen(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!changingStatusAgendamento || !newStatus) return;

    setIsSubmitting(true);
    const success = await handleUpdateStatus(
      changingStatusAgendamento.id,
      newStatus
    );
    setIsSubmitting(false);

    if (success) {
      setIsStatusModalOpen(false);
      setChangingStatusAgendamento(null);
      setNewStatus(null);
    }
  };

  // ========== HELPERS ==========
  const closeAllModals = () => {
    setModalMode(null);
    setSelectedAgendamento(null);
    setViewingAtendimento(null);
    setAvaliacaoParaAprovar(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Atendimentos</h1>
          <p className="text-gray-600 mt-1">
            Registre e gerencie os atendimentos realizados
          </p>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <Alert type="error" onClose={clearMessages}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert type="success" onClose={clearMessages}>
          {success}
        </Alert>
      )}

      {/* Navegação por Dia */}
      <DayNavigation
        currentDate={currentDate}
        onPreviousDay={previousDay}
        onNextDay={nextDay}
        onToday={goToToday}
        profissionais={profissionais}
        pacientes={pacientes}
        selectedProfissional={selectedProfissional}
        selectedPaciente={selectedPaciente}
        onProfissionalChange={setSelectedProfissional}
        onPacienteChange={setSelectedPaciente}
      />

      {/* Agendamentos do Dia */}
      <AgendamentosDoDia
        agendamentos={agendamentos}
        atendimentos={atendimentos}
        onRegistrarAtendimento={handleRegistrarAtendimento}
        onRegistrarAvaliacao={handleRegistrarAvaliacao}
        onVerAtendimento={handleVerAtendimento}
        onUpdateStatus={(id, status) => handleUpdateStatus(id, status)}
        onOpenStatusModal={handleOpenStatusModal}
      />

      {/* Agendamentos Cancelados */}
      <AgendamentosCancelados agendamentos={agendamentosCancelados} />

      {/* Modal de Atendimento Avulso */}
      {modalMode === "atendimento" && (
        <AtendimentoFormModal
          isOpen={true}
          onClose={closeAllModals}
          onSubmit={!viewingAtendimento ? handleAtendimentoSubmit : undefined}
          onCancel={handleCancelAtendimento}
          agendamento={selectedAgendamento}
          procedimentos={procedimentos}
          atendimento={viewingAtendimento}
        />
      )}

      {/* Modal de Avaliação */}
      {modalMode === "avaliacao" && (
        <AvaliacaoFormModal
          isOpen={true}
          onClose={closeAllModals}
          onSubmit={handleAvaliacaoSubmit}
          procedimentos={procedimentos}
          agendamento={selectedAgendamento}
        />
      )}

      {/* Modal de Aprovação de Avaliação */}
      {modalMode === "approval" && avaliacaoParaAprovar && (
        <AvaliacaoApprovalModal
          isOpen={true}
          onClose={closeAllModals}
          onAprovar={handleAprovarAvaliacao}
          onReprovar={handleReprovarAvaliacao}
          avaliacao={avaliacaoParaAprovar}
        />
      )}

      {/* Modal de Confirmação de Status */}
      <StatusConfirmModal
        isOpen={isStatusModalOpen}
        onClose={() => {
          setIsStatusModalOpen(false);
          setChangingStatusAgendamento(null);
          setNewStatus(null);
        }}
        onConfirm={handleConfirmStatusChange}
        agendamento={changingStatusAgendamento}
        newStatus={newStatus}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
