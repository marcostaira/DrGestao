import React from "react";
import { Agendamento, StatusAgendamento } from "@/services/agendamentoService";
import Modal from "@/components/ui/Modal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { getStatusBadge, formatDateTime } from "@/utils/agendaUtils";

interface AgendamentoDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  agendamento: Agendamento | null;
  onEdit: (agendamento: Agendamento) => void;
  onDelete: (agendamento: Agendamento) => void;
  onUpdateStatus: (id: string, status: StatusAgendamento) => void;
}

export const AgendamentoDetailModal: React.FC<AgendamentoDetailModalProps> = ({
  isOpen,
  onClose,
  agendamento,
  onEdit,
  onDelete,
  onUpdateStatus,
}) => {
  if (!agendamento) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detalhes do Agendamento">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant={getStatusBadge(agendamento.status)}>
            {agendamento.status}
          </Badge>
          <div className="flex gap-2">
            <button
              onClick={() => {
                onClose();
                onEdit(agendamento);
              }}
              className="text-primary-600 hover:text-primary-800"
              title="Editar"
            >
              <svg
                className="w-5 h-5"
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
            </button>
            <button
              onClick={() => {
                onClose();
                onDelete(agendamento);
              }}
              className="text-red-600 hover:text-red-800"
              title="Excluir"
            >
              <svg
                className="w-5 h-5"
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
            </button>
          </div>
        </div>

        <div className="space-y-3 py-4 border-t border-b border-gray-200">
          <div>
            <span className="text-sm text-gray-600">Data e Hora:</span>
            <p className="font-medium">
              {formatDateTime(agendamento.dataHora)}
            </p>
          </div>

          <div>
            <span className="text-sm text-gray-600">Paciente:</span>
            <p className="font-medium">
              {agendamento.paciente?.nome || "Bloqueio de horário"}
            </p>
            {agendamento.paciente && (
              <p className="text-sm text-gray-500">
                {agendamento.paciente.telefone}
              </p>
            )}
          </div>

          <div>
            <span className="text-sm text-gray-600">Profissional:</span>
            <p className="font-medium">{agendamento.profissional.nome}</p>
          </div>

          {agendamento.procedimento && (
            <div>
              <span className="text-sm text-gray-600">Procedimento:</span>
              <p className="font-medium">
                {agendamento.procedimento.nome} (
                {agendamento.procedimento.duracaoMinutos}min)
              </p>
            </div>
          )}

          {agendamento.observacoes && (
            <div>
              <span className="text-sm text-gray-600">Observações:</span>
              <p className="text-sm">{agendamento.observacoes}</p>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alterar Status:
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.values(StatusAgendamento).map((status) => (
              <Button
                key={status}
                size="sm"
                variant={
                  agendamento.status === status ? "primary" : "secondary"
                }
                onClick={() => onUpdateStatus(agendamento.id, status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
