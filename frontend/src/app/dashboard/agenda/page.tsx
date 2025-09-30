"use client";

import React, { useState } from "react";
import { Agendamento, StatusAgendamento } from "@/services/agendamentoService";
import { useAgenda } from "@/hooks/useAgenda";
import { useDragAndDrop } from "@/hooks/useDragDrop";
import { getStartOfWeek, getEndOfWeek } from "@/utils/agendaUtils";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { AgendaFilters } from "@/components/agenda/AgendaFilters";
import { WeekView } from "@/components/agenda/WeekView";
import { DayView } from "@/components/agenda/DayView";
import { MonthView } from "@/components/agenda/MonthView";
import { AgendamentoFormModal } from "@/components/agenda/AgendamentoFormModal";
import { AgendamentoDetailModal } from "@/components/agenda/AgendamentoDetailModal";
import { DeleteConfirmModal } from "@/components/agenda/DeleteConfirmModal";

export default function AgendaPage() {
  const {
    agendamentos,
    profissionais,
    pacientes,
    procedimentos,
    isLoading,
    error,
    success,
    currentDate,
    viewMode,
    filters,
    setCurrentDate,
    setViewMode,
    setFilters,
    clearMessages,
    handleCreateAgendamento,
    handleUpdateAgendamento,
    handleDeleteAgendamento,
    handleUpdateStatus,
    loadAgendamentos,
  } = useAgenda();

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingAgendamento, setEditingAgendamento] =
    useState<Agendamento | null>(null);
  const [selectedAgendamento, setSelectedAgendamento] =
    useState<Agendamento | null>(null);
  const [deletingAgendamento, setDeletingAgendamento] =
    useState<Agendamento | null>(null);
  const [initialDateTime, setInitialDateTime] = useState<Date | undefined>();

  // Drag and drop handler
  const handleDropAgendamento = async (
    agendamento: Agendamento,
    targetDate: Date,
    hour: number,
    minute: number
  ) => {
    // Criar data local
    const newDateTime = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate(),
      hour,
      minute,
      0,
      0
    );

    console.log("DEBUG Frontend - Movendo agendamento:");
    console.log("- Nova data/hora local:", newDateTime);
    console.log("- Nova data/hora UTC:", newDateTime.toISOString());

    await handleUpdateAgendamento(agendamento.id, {
      dataHora: newDateTime.toISOString(),
    });
  };

  const dragHandlers = useDragAndDrop(agendamentos, handleDropAgendamento);

  // Modal handlers
  const handleOpenFormModal = (agendamento?: Agendamento, dateTime?: Date) => {
    if (agendamento) {
      setEditingAgendamento(agendamento);
    } else {
      setEditingAgendamento(null);
      setInitialDateTime(dateTime);
    }
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingAgendamento(null);
    setInitialDateTime(undefined);
  };

  const handleSubmitForm = async (data: any) => {
    if (editingAgendamento) {
      return await handleUpdateAgendamento(editingAgendamento.id, data);
    } else {
      return await handleCreateAgendamento(data);
    }
  };

  const handleOpenDetailModal = (agendamento: Agendamento) => {
    setSelectedAgendamento(agendamento);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedAgendamento(null);
  };

  const handleOpenDeleteModal = (agendamento: Agendamento) => {
    setDeletingAgendamento(agendamento);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deletingAgendamento) {
      const success = await handleDeleteAgendamento(deletingAgendamento.id);
      if (success) {
        setDeletingAgendamento(null);
      }
      return success;
    }
    return false;
  };

  // Navigation handlers
  const previousPeriod = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() - 1);
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const nextPeriod = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() + 1);
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const getPeriodLabel = () => {
    if (viewMode === "day") {
      return currentDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } else if (viewMode === "week") {
      const start = getStartOfWeek(currentDate);
      const end = getEndOfWeek(currentDate);
      return `${start.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
      })} - ${end.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}`;
    } else {
      return currentDate.toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
      });
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
      <style jsx>{`
        .dragging {
          opacity: 0.6 !important;
          transform: rotate(2deg) scale(0.95);
          transition: transform 0.2s ease;
          cursor: grabbing !important;
          z-index: 1000 !important;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .drop-target {
          background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.1),
            rgba(147, 197, 253, 0.1)
          ) !important;
          border: 2px dashed rgb(59, 130, 246) !important;
          border-radius: 8px;
          animation: pulse-drop 1.5s infinite;
        }

        .drop-invalid {
          background: linear-gradient(
            135deg,
            rgba(239, 68, 68, 0.1),
            rgba(252, 165, 165, 0.1)
          ) !important;
          border: 2px dashed rgb(239, 68, 68) !important;
          border-radius: 8px;
        }

        @keyframes pulse-drop {
          0%,
          100% {
            border-color: rgb(59, 130, 246);
            background-color: rgba(59, 130, 246, 0.1);
          }
          50% {
            border-color: rgb(147, 197, 253);
            background-color: rgba(59, 130, 246, 0.2);
          }
        }

        /* Garante que as linhas da grid tenham altura fixa */
        .grid > div {
          position: relative;
        }
      `}</style>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agenda</h1>
          <p className="text-gray-600 mt-1">
            Gerencie os agendamentos - Arraste para mover horários
          </p>
        </div>

        <Button onClick={() => handleOpenFormModal()}>
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Novo Agendamento
        </Button>
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

      {/* Filters */}
      <AgendaFilters
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        currentDate={currentDate}
        periodLabel={getPeriodLabel()}
        onPreviousPeriod={previousPeriod}
        onNextPeriod={nextPeriod}
        onToday={() => setCurrentDate(new Date())}
        profissionais={profissionais}
        selectedProfissional={filters.profissionalId || ""}
        onProfissionalChange={(id) =>
          setFilters({ ...filters, profissionalId: id || undefined })
        }
        selectedStatus={filters.status || ""}
        onStatusChange={(status) =>
          setFilters({
            ...filters,
            status: (status as StatusAgendamento) || undefined,
          })
        }
      />

      {/* Views */}
      {viewMode === "week" && (
        <WeekView
          currentDate={currentDate}
          agendamentos={agendamentos}
          onAddAgendamento={(date, hour, minute) => {
            const newDate = new Date(date);
            newDate.setHours(hour, minute, 0, 0);
            handleOpenFormModal(undefined, newDate);
          }}
          onAgendamentoClick={handleOpenDetailModal}
          dragHandlers={dragHandlers}
        />
      )}

      {viewMode === "day" && (
        <DayView
          currentDate={currentDate}
          agendamentos={agendamentos}
          onAddAgendamento={(date, hour, minute) => {
            const newDate = new Date(date);
            newDate.setHours(hour, minute, 0, 0);
            handleOpenFormModal(undefined, newDate);
          }}
          onAgendamentoClick={handleOpenDetailModal}
          dragHandlers={dragHandlers}
        />
      )}

      {viewMode === "month" && (
        <MonthView
          currentDate={currentDate}
          agendamentos={agendamentos}
          onAgendamentoClick={handleOpenDetailModal}
        />
      )}

      {/* Modals */}
      <AgendamentoFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        onSubmit={handleSubmitForm}
        editingAgendamento={editingAgendamento}
        initialDateTime={initialDateTime}
        profissionais={profissionais}
        pacientes={pacientes}
        procedimentos={procedimentos}
      />

      <AgendamentoDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        agendamento={selectedAgendamento}
        onEdit={(ag) => handleOpenFormModal(ag)}
        onDelete={handleOpenDeleteModal}
        onUpdateStatus={handleUpdateStatus}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingAgendamento(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
