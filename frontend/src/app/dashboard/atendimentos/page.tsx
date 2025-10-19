// frontend/src/app/dashboard/atendimentos/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  getAtendimentoByAgendamentoId,
  aprovarAvaliacao,
  reprovarAvaliacao,
  updateAtendimento,
  StatusAtendimento,
} from "@/services/atendimentoService";
import { StatusAgendamento } from "@/services/agendamentoService";
import { useAtendimentos } from "@/hooks/useAtendimentos";
import Alert from "@/components/ui/Alert";
import { DayNavigation } from "@/components/atendimentos/DayNavigation";
import { AgendamentosDoDia } from "@/components/atendimentos/AgendamentosDoDia";
import { AgendamentosCancelados } from "@/components/atendimentos/AgendamentosCancelados";
import { StatusConfirmModal } from "@/components/atendimentos/StatusConfirmModal";
import { AvaliacaoFormModal } from "@/components/atendimentos/AvaliacaoFormModal";
import { AvaliacaoApprovalModal } from "@/components/atendimentos/AvaliacaoApprovalModal";
import { toast } from "react-hot-toast";

type ModalMode = "avaliacao" | "avaliacao-edit" | "approval";

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
        router.push(`/dashboard/atendimentos/${existingAtendimento.id}`);
      } else {
        const agendamento = agendamentos.find((ag) => ag.id === agendamentoId);
        if (agendamento) {
          // ✅ REDIRECIONAR PARA CRIAR NOVO
          router.push(
            `/dashboard/atendimentos/novo?agendamentoId=${agendamentoId}`
          );
        }
      }
    } catch (err: any) {
      console.error("Erro ao verificar atendimento:", err);
    }
  };

  const reloadData = () => {
    router.refresh();
  };

  // ========== ATENDIMENTO AVULSO ==========
  // ✅ REDIRECIONAR PARA PÁGINA DE CRIAR
  const handleRegistrarAtendimento = (agendamento: any) => {
    // ✅ Ir para /dashboard/atendimentos/novo-{agendamentoId}
    router.push(`/dashboard/atendimentos/novo-${agendamento.id}`);
  };

  // ✅ REDIRECIONAR PARA PÁGINA DE VISUALIZAR
  const handleVerAtendimento = (atendimento: any) => {
    console.log("📋 Redirecionando para detalhes:", atendimento.id);
    router.push(`/dashboard/atendimentos/${atendimento.id}`);
  };
  // ========== AVALIAÇÃO ==========
  const handleRegistrarAvaliacao = (agendamento: any) => {
    setSelectedAgendamento(agendamento);
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

  const handleEditarAvaliacao = () => {
    if (!avaliacaoParaAprovar) return;
    setModalMode(null);
    setTimeout(() => {
      setModalMode("avaliacao-edit");
    }, 100);
  };

  const handleAvaliacaoEditSubmit = async (data: {
    anotacoes: string;
    procedimentosPlano: any[];
  }) => {
    if (!avaliacaoParaAprovar) return;

    try {
      await updateAtendimento(avaliacaoParaAprovar.id, {
        anotacoes: data.anotacoes,
        procedimentosPlano: data.procedimentosPlano,
      });

      toast.success("Avaliação atualizada com sucesso!");
      closeAllModals();
      reloadData();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erro ao atualizar avaliação");
      throw error;
    }
  };

  // ========== APROVAÇÃO/REPROVAÇÃO ==========
  const handleAprovarAvaliacao = async (aprovadoPor: string) => {
    if (!avaliacaoParaAprovar) return;

    try {
      setIsSubmitting(true);
      await aprovarAvaliacao(avaliacaoParaAprovar.id, { aprovadoPor });
      closeAllModals();
      toast.success("Avaliação aprovada! Plano de tratamento criado.");
      setTimeout(() => reloadData(), 500);
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
      closeAllModals();
      toast.success("Avaliação reprovada.");
      setTimeout(() => reloadData(), 500);
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

      {/* Modal de Avaliação (Criar) */}
      {modalMode === "avaliacao" && (
        <AvaliacaoFormModal
          isOpen={true}
          onClose={closeAllModals}
          onSubmit={handleAvaliacaoSubmit}
          procedimentos={procedimentos}
          agendamento={selectedAgendamento}
        />
      )}

      {/* Modal de Edição de Avaliação */}
      {modalMode === "avaliacao-edit" && avaliacaoParaAprovar && (
        <AvaliacaoFormModal
          isOpen={true}
          onClose={closeAllModals}
          onSubmit={handleAvaliacaoEditSubmit}
          procedimentos={procedimentos}
          agendamento={selectedAgendamento}
          avaliacao={avaliacaoParaAprovar}
        />
      )}

      {/* Modal de Aprovação de Avaliação */}
      {modalMode === "approval" && avaliacaoParaAprovar && (
        <AvaliacaoApprovalModal
          isOpen={true}
          onClose={closeAllModals}
          onAprovar={handleAprovarAvaliacao}
          onReprovar={handleReprovarAvaliacao}
          onEditar={handleEditarAvaliacao}
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
