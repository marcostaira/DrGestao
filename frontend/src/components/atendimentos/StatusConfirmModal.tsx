import React from "react";
import { Agendamento, StatusAgendamento } from "@/services/agendamentoService";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

interface StatusConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  agendamento: Agendamento | null;
  newStatus: StatusAgendamento | null;
  isSubmitting: boolean;
}

const getStatusDisplayName = (status: StatusAgendamento): string => {
  const names = {
    [StatusAgendamento.MARCADO]: "Marcado",
    [StatusAgendamento.CONFIRMADO]: "Confirmado",
    [StatusAgendamento.COMPARECEU]: "Compareceu",
    [StatusAgendamento.FALTOU]: "Faltou",
    [StatusAgendamento.CANCELADO]: "Cancelado",
  };
  return names[status];
};

export const StatusConfirmModal: React.FC<StatusConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  agendamento,
  newStatus,
  isSubmitting,
}) => {
  if (!agendamento || !newStatus) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar Alteração de Status"
    >
      <div className="space-y-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Agendamento:</strong>{" "}
            {agendamento.paciente?.nome || "Sem paciente"}
            <br />
            <strong>Data/Hora:</strong>{" "}
            {new Date(agendamento.dataHora).toLocaleString("pt-BR")}
            <br />
            <strong>Status atual:</strong>{" "}
            {getStatusDisplayName(agendamento.status)}
            <br />
            <strong>Novo status:</strong> {getStatusDisplayName(newStatus)}
          </p>
        </div>

        {newStatus === StatusAgendamento.CANCELADO && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">
              ⚠️ <strong>Atenção:</strong> Agendamentos cancelados não poderão
              ter o status alterado novamente.
            </p>
          </div>
        )}

        {newStatus === StatusAgendamento.FALTOU && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-sm text-orange-800">
              ℹ️ Agendamentos marcados como "Faltou" poderão ser reagendados
              posteriormente.
            </p>
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button
            variant={
              newStatus === StatusAgendamento.CANCELADO ? "danger" : "primary"
            }
            onClick={onConfirm}
            isLoading={isSubmitting}
          >
            Confirmar {getStatusDisplayName(newStatus)}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
