// frontend/src/components/agenda/AgendamentoDetailModal.tsx

import React, { useState, useEffect } from "react";
import { Agendamento, StatusAgendamento } from "@/services/agendamentoService";
import Modal from "@/components/ui/Modal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { getStatusBadge, formatDateTime } from "@/utils/agendaUtils";
import { WhatsAppConfirmButton } from "../whatsapp/WhatsAppConfirmButton";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { whatsappService } from "@/services/whatsapp.service";

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
  const { config } = useWhatsApp();
  const isWhatsAppConnected = config?.status === "CONNECTED";
  const [mensagensWhatsApp, setMensagensWhatsApp] = useState<any[]>([]);
  const [loadingMensagens, setLoadingMensagens] = useState(false);

  // Buscar mensagens do agendamento quando abrir o modal
  useEffect(() => {
    if (isOpen && agendamento?.id) {
      buscarMensagensAgendamento();
    }
  }, [isOpen, agendamento?.id]);

  const buscarMensagensAgendamento = async () => {
    if (!agendamento?.id) return;

    setLoadingMensagens(true);
    try {
      const mensagens = await whatsappService.buscarHistorico({
        agendamentoId: agendamento.id,
      });
      setMensagensWhatsApp(mensagens);
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
    } finally {
      setLoadingMensagens(false);
    }
  };

  if (!agendamento) return null;

  // Verificar se tem confirmação enviada
  const temConfirmacaoEnviada = mensagensWhatsApp.some(
    (msg) =>
      msg.tipo === "CONFIRMACAO" &&
      (msg.status === "ENVIADA" || msg.status === "RESPONDIDA")
  );

  const ultimaConfirmacao = mensagensWhatsApp
    .filter((msg) => msg.tipo === "CONFIRMACAO")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detalhes do Agendamento">
      <div className="space-y-4">
        {/* Header com Status e Ações */}
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

        {/* Status da Confirmação WhatsApp */}
        {isWhatsAppConnected && agendamento.paciente?.telefone && (
          <div className="pb-4 border-b border-gray-200">
            {temConfirmacaoEnviada && ultimaConfirmacao ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-green-800 mb-1">
                      Confirmação já enviada
                    </p>
                    <p className="text-xs text-green-700">
                      Enviada em{" "}
                      {new Date(
                        ultimaConfirmacao.enviadaEm ||
                          ultimaConfirmacao.createdAt
                      ).toLocaleString("pt-BR")}
                    </p>
                    {ultimaConfirmacao.status === "RESPONDIDA" &&
                      ultimaConfirmacao.respostaRecebida && (
                        <p className="text-xs text-green-700 mt-1">
                          Resposta:{" "}
                          <strong>
                            {ultimaConfirmacao.respostaRecebida === "1"
                              ? "Confirmado"
                              : "Reagendar"}
                          </strong>
                        </p>
                      )}
                  </div>
                </div>
              </div>
            ) : (
              <WhatsAppConfirmButton
                agendamentoId={agendamento.id}
                pacienteNome={agendamento.paciente.nome}
                pacienteTelefone={agendamento.paciente.telefone}
                onSuccess={() => {
                  buscarMensagensAgendamento();
                }}
              />
            )}
          </div>
        )}

        {/* Detalhes do Agendamento */}
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

        {/* Alterar Status */}
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
