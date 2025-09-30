import React from "react";
import { Agendamento, StatusAgendamento } from "@/services/agendamentoService";
import { Atendimento } from "@/services/atendimentoService";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

interface AgendamentosDoDiaProps {
  agendamentos: Agendamento[];
  atendimentos: Atendimento[];
  onRegistrarAtendimento: (agendamento: Agendamento) => void;
  onVerAtendimento: (atendimento: Atendimento) => void;
  onUpdateStatus: (agendamentoId: string, status: StatusAgendamento) => void;
  onOpenStatusModal: (
    agendamento: Agendamento,
    status: StatusAgendamento
  ) => void;
}

const getStatusBadgeVariant = (status: StatusAgendamento) => {
  const variants = {
    [StatusAgendamento.MARCADO]: "warning",
    [StatusAgendamento.CONFIRMADO]: "success",
    [StatusAgendamento.COMPARECEU]: "info",
    [StatusAgendamento.FALTOU]: "danger",
    [StatusAgendamento.CANCELADO]: "default",
  } as const;
  return variants[status];
};

const getNextStatus = (
  currentStatus: StatusAgendamento
): StatusAgendamento | null => {
  const statusFlow = {
    [StatusAgendamento.MARCADO]: StatusAgendamento.CONFIRMADO,
    [StatusAgendamento.CONFIRMADO]: StatusAgendamento.COMPARECEU,
    [StatusAgendamento.COMPARECEU]: null,
    [StatusAgendamento.FALTOU]: StatusAgendamento.MARCADO,
    [StatusAgendamento.CANCELADO]: null,
  };
  return statusFlow[currentStatus];
};

const getNextStatusLabel = (currentStatus: StatusAgendamento): string => {
  const nextStatus = getNextStatus(currentStatus);
  if (!nextStatus) return "";

  const labels = {
    [StatusAgendamento.MARCADO]: "",
    [StatusAgendamento.CONFIRMADO]: "Confirmar",
    [StatusAgendamento.COMPARECEU]: "Compareceu",
    [StatusAgendamento.FALTOU]: "Reagendar",
    [StatusAgendamento.CANCELADO]: "",
  };
  return labels[nextStatus] || "";
};

const canChangeStatus = (status: StatusAgendamento): boolean => {
  return status !== StatusAgendamento.CANCELADO;
};

export const AgendamentosDoDia: React.FC<AgendamentosDoDiaProps> = ({
  agendamentos,
  atendimentos,
  onRegistrarAtendimento,
  onVerAtendimento,
  onUpdateStatus,
  onOpenStatusModal,
}) => {
  // Filtrar agendamentos não cancelados
  const agendamentosAtivos = agendamentos.filter(
    (ag) => ag.status !== StatusAgendamento.CANCELADO
  );

  if (agendamentosAtivos.length === 0) {
    return (
      <Card title="Agendamentos do Dia">
        <p className="text-center text-gray-500 py-8">
          Nenhum agendamento para este dia
        </p>
      </Card>
    );
  }

  return (
    <Card title="Agendamentos do Dia">
      <div className="space-y-3">
        {agendamentosAtivos.map((ag) => {
          const hasAtendimento = atendimentos.some(
            (at) => at.agendamentoId === ag.id
          );
          const atendimento = atendimentos.find(
            (at) => at.agendamentoId === ag.id
          );

          return (
            <div
              key={ag.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-500 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-medium text-gray-900">
                    {new Date(ag.dataHora).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span className="text-gray-600">•</span>
                  <span className="font-medium text-gray-900">
                    {ag.paciente?.nome || "Bloqueio"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{ag.profissional.nome}</span>
                  {ag.procedimento && (
                    <>
                      <span>•</span>
                      <span>{ag.procedimento.nome}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={getStatusBadgeVariant(ag.status)}>
                  {ag.status}
                </Badge>

                {(() => {
                  const nextStatus = getNextStatus(ag.status);
                  if (nextStatus && !hasAtendimento) {
                    return (
                      <Button
                        size="sm"
                        onClick={() => onUpdateStatus(ag.id, nextStatus)}
                        className="gap-1"
                      >
                        {getNextStatusLabel(ag.status)}
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Button>
                    );
                  }
                  return null;
                })()}

                {!hasAtendimento && canChangeStatus(ag.status) && (
                  <div className="flex gap-2">
                    {(ag.status === StatusAgendamento.CONFIRMADO ||
                      ag.status === StatusAgendamento.MARCADO) && (
                      <button
                        onClick={() =>
                          onOpenStatusModal(ag, StatusAgendamento.FALTOU)
                        }
                        className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 border border-red-300 rounded transition-colors"
                        title="Marcar como Faltou"
                      >
                        Faltou
                      </button>
                    )}

                    {ag.status !== StatusAgendamento.COMPARECEU && (
                      <button
                        onClick={() =>
                          onOpenStatusModal(ag, StatusAgendamento.CANCELADO)
                        }
                        className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 border border-gray-300 rounded transition-colors"
                        title="Cancelar agendamento"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                )}

                {hasAtendimento && atendimento ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onVerAtendimento(atendimento)}
                  >
                    Ver Atendimento
                  </Button>
                ) : ag.status === StatusAgendamento.COMPARECEU ? (
                  <Button size="sm" onClick={() => onRegistrarAtendimento(ag)}>
                    Registrar Atendimento
                  </Button>
                ) : ag.status === StatusAgendamento.FALTOU ? (
                  <span className="text-sm text-red-600 font-medium">
                    Não compareceu
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
