"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

interface BatchDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (ids: string[]) => Promise<void>;
  selectedIds: string[];
  agendamentos: any[];
}

export function BatchDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  selectedIds,
  agendamentos,
}: BatchDeleteModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const selectedAgendamentos = agendamentos.filter((a) =>
    selectedIds.includes(a.id)
  );

  const hasAtendimento = selectedAgendamentos.some((a) => a.atendimento);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm(selectedIds);
      onClose();
    } catch (error) {
      console.error("Erro ao excluir agendamentos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar Exclusão em Lote"
      size="md"
    >
      <div className="space-y-4">
        {hasAtendimento ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <svg
                className="h-5 w-5 text-red-400 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Não é possível excluir
                </h3>
                <p className="mt-2 text-sm text-red-700">
                  Um ou mais agendamentos selecionados possuem atendimentos
                  realizados e não podem ser excluídos. Por favor, remova esses
                  agendamentos da seleção.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <svg
                  className="h-5 w-5 text-yellow-400 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Atenção
                  </h3>
                  <p className="mt-2 text-sm text-yellow-700">
                    Você está prestes a excluir{" "}
                    <strong>{selectedIds.length}</strong> agendamento(s). Esta
                    ação não pode ser desfeita.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Agendamentos a serem excluídos:
              </h4>
              <ul className="space-y-2">
                {selectedAgendamentos.map((agendamento) => (
                  <li
                    key={agendamento.id}
                    className="text-sm text-gray-700 flex items-start"
                  >
                    <span className="text-gray-400 mr-2">•</span>
                    <span>
                      {agendamento.paciente?.nome || "Sem paciente"} -{" "}
                      {new Date(agendamento.dataHora).toLocaleString("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}{" "}
                      - {agendamento.profissional.nome}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Botões */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          {!hasAtendimento && (
            <Button
              type="button"
              variant="danger"
              onClick={handleConfirm}
              isLoading={isLoading}
            >
              Excluir {selectedIds.length} Agendamento(s)
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
