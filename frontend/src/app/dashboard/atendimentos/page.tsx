"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getAtendimentoByAgendamentoId } from "@/services/atendimentoService";
import { StatusAgendamento } from "@/services/agendamentoService";
import { useAtendimentos } from "@/hooks/useAtendimentos";
import Alert from "@/components/ui/Alert";
import { DayNavigation } from "@/components/atendimentos/DayNavigation";
import { AgendamentosDoDia } from "@/components/atendimentos/AgendamentosDoDia";
import { AgendamentosCancelados } from "@/components/atendimentos/AgendamentosCancelados";
import { StatusConfirmModal } from "@/components/atendimentos/StatusConfirmModal";
import { AtendimentoFormModal } from "@/components/atendimentos/AtendimentoFormModal";

export default function AtendimentosPage() {
  const searchParams = useSearchParams();
  const agendamentoIdFromUrl = searchParams.get("agendamentoId");

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
  const [isAtendimentoModalOpen, setIsAtendimentoModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedAgendamento, setSelectedAgendamento] = useState<any>(null);
  const [viewingAtendimento, setViewingAtendimento] = useState<any>(null);
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
        setIsAtendimentoModalOpen(true);
      } else {
        const agendamento = agendamentos.find((ag) => ag.id === agendamentoId);
        if (agendamento) {
          setSelectedAgendamento(agendamento);
          setViewingAtendimento(null);
          setIsAtendimentoModalOpen(true);
        }
      }
    } catch (err: any) {
      console.error("Erro ao verificar atendimento:", err);
    }
  };

  const handleRegistrarAtendimento = (agendamento: any) => {
    setSelectedAgendamento(agendamento);
    setViewingAtendimento(null);
    setIsAtendimentoModalOpen(true);
  };

  const handleVerAtendimento = (atendimento: any) => {
    setViewingAtendimento(atendimento);
    const agendamento = agendamentos.find(
      (ag) => ag.id === atendimento.agendamentoId
    );
    setSelectedAgendamento(agendamento);
    setIsAtendimentoModalOpen(true);
  };

  const handleAtendimentoSubmit = async (data: any) => {
    return await handleCreateAtendimento(data);
  };

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
        onVerAtendimento={handleVerAtendimento}
        onUpdateStatus={(id, status) => handleUpdateStatus(id, status)}
        onOpenStatusModal={handleOpenStatusModal}
      />

      {/* Agendamentos Cancelados */}
      <AgendamentosCancelados agendamentos={agendamentosCancelados} />

      {/* Modal de Atendimento */}
      <AtendimentoFormModal
        isOpen={isAtendimentoModalOpen}
        onClose={() => {
          setIsAtendimentoModalOpen(false);
          setSelectedAgendamento(null);
          setViewingAtendimento(null);
        }}
        onSubmit={!viewingAtendimento ? handleAtendimentoSubmit : undefined} 
        onCancel={handleCancelAtendimento}
        agendamento={selectedAgendamento}
        procedimentos={procedimentos}
        atendimento={viewingAtendimento}
      />

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
