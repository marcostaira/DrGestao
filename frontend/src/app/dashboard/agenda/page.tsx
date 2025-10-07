// frontend/src/app/dashboard/agenda/page.tsx

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
import { BatchCreateModal } from "@/components/agenda/BatchCreateModal";
import { BatchEditModal } from "@/components/agenda/BatchEditModal";
import { BatchDeleteModal } from "@/components/agenda/BatchDeleteModal";
import { WhatsAppBulkConfirm } from "@/components/whatsapp/WhatsAppBulkConfirm";
import { useWhatsApp } from "@/hooks/useWhatsApp";

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
    handleBatchCreate,
    handleBatchUpdate,
    handleBatchDelete,
    loadAgendamentos,
    handleUpdateRecorrencia,
    handleDeleteRecorrencia,
  } = useAgenda();

  // WhatsApp
  const { config: whatsappConfig } = useWhatsApp();

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

  // Batch operation states
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBatchCreateOpen, setIsBatchCreateOpen] = useState(false);
  const [isBatchEditOpen, setIsBatchEditOpen] = useState(false);
  const [isBatchDeleteOpen, setIsBatchDeleteOpen] = useState(false);
  const [isWhatsAppBulkOpen, setIsWhatsAppBulkOpen] = useState(false);

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

  // Selection handlers
  const handleSelectAll = () => {
    if (selectedIds.length === agendamentos.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(agendamentos.map((a) => a.id));
    }
  };

  const handleSelectAgendamento = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

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

  const handleSubmitForm = async (data: any) => {
    // Se for edição de recorrência
    if (data.isRecorrencia && data.recorrenciaId) {
      return await handleUpdateRecorrencia(data.recorrenciaId, data.data);
    }

    // Se for edição normal
    if (editingAgendamento) {
      return await handleUpdateAgendamento(editingAgendamento.id, data);
    }

    // Se for criação
    return await handleCreateAgendamento(data);
  };

  const handleConfirmDelete = async (recorrenciaId?: string) => {
    if (recorrenciaId) {
      // Deletar toda a recorrência
      const success = await handleDeleteRecorrencia(recorrenciaId);
      if (success) {
        setDeletingAgendamento(null);
      }
      return success;
    }

    // Deletar apenas o agendamento individual
    if (deletingAgendamento) {
      const success = await handleDeleteAgendamento(deletingAgendamento.id);
      if (success) {
        setDeletingAgendamento(null);
      }
      return success;
    }

    return false;
  };

  // Batch handlers
  const handleBatchCreateSubmit = async (data: any) => {
    const success = await handleBatchCreate(data);
    if (success) {
      setIsBatchCreateOpen(false);
    }
  };

  const handleBatchUpdateSubmit = async (data: any) => {
    const success = await handleBatchUpdate(data.ids, data.data);
    if (success) {
      setIsBatchEditOpen(false);
      setSelectedIds([]);
    }
  };

  const handleBatchDeleteSubmit = async (ids: string[]) => {
    const success = await handleBatchDelete(ids);
    if (success) {
      setIsBatchDeleteOpen(false);
      setSelectedIds([]);
    }
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

        .grid > div {
          position: relative;
        }
      `}</style>

      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agenda</h1>
          <p className="text-gray-600 mt-1">
            Gerencie os agendamentos - Arraste para mover horários
          </p>
        </div>

        <div className="flex items-center space-x-3 flex-wrap gap-2">
          {selectedIds.length > 0 && (
            <>
              <span className="text-sm text-gray-600 font-medium">
                {selectedIds.length} selecionado(s)
              </span>

              {/* Botão WhatsApp em Lote */}
              {whatsappConfig?.status === "CONNECTED" && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsWhatsAppBulkOpen(true)}
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp ({selectedIds.length})
                </Button>
              )}

              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsBatchEditOpen(true)}
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Editar
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => setIsBatchDeleteOpen(true)}
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Excluir
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedIds([])}
              >
                Limpar
              </Button>
            </>
          )}

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

          <Button
            variant="secondary"
            onClick={() => setIsBatchCreateOpen(true)}
          >
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Criar em Lote
          </Button>
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

      {/* Selection Bar */}
      {viewMode !== "month" && agendamentos.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={selectedIds.length === agendamentos.length}
              onChange={handleSelectAll}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">
              Selecionar todos ({agendamentos.length})
            </span>
          </div>
          {selectedIds.length > 0 && (
            <span className="text-sm text-primary-600 font-medium">
              {selectedIds.length} de {agendamentos.length} selecionados
            </span>
          )}
        </div>
      )}

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
          selectedIds={selectedIds}
          onSelectAgendamento={handleSelectAgendamento}
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
          selectedIds={selectedIds}
          onSelectAgendamento={handleSelectAgendamento}
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
        agendamento={deletingAgendamento}
      />

      {/* Batch Modals */}
      <BatchCreateModal
        isOpen={isBatchCreateOpen}
        onClose={() => setIsBatchCreateOpen(false)}
        onSubmit={handleBatchCreateSubmit}
        profissionais={profissionais}
        pacientes={pacientes}
        procedimentos={procedimentos}
      />

      <BatchEditModal
        isOpen={isBatchEditOpen}
        onClose={() => setIsBatchEditOpen(false)}
        onSubmit={handleBatchUpdateSubmit}
        selectedIds={selectedIds}
        profissionais={profissionais}
        procedimentos={procedimentos}
      />

      <BatchDeleteModal
        isOpen={isBatchDeleteOpen}
        onClose={() => setIsBatchDeleteOpen(false)}
        onConfirm={handleBatchDeleteSubmit}
        selectedIds={selectedIds}
        agendamentos={agendamentos}
      />

      {/* WhatsApp Bulk Confirm Modal */}
      {isWhatsAppBulkOpen && (
        <WhatsAppBulkConfirm
          agendamentoIds={selectedIds}
          onSuccess={() => {
            setSelectedIds([]);
            loadAgendamentos();
          }}
          onClose={() => setIsWhatsAppBulkOpen(false)}
        />
      )}
    </div>
  );
}
