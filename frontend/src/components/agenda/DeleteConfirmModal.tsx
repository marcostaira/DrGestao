"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { countRecorrencia } from "@/services/agendamentoService";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (recorrenciaId?: string) => Promise<boolean>;
  agendamento?: any;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  agendamento,
}: DeleteConfirmModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [deleteRecorrencia, setDeleteRecorrencia] = useState(false);
  const [recorrenciaCount, setRecorrenciaCount] = useState(0);
  const [confirmText, setConfirmText] = useState("");

  useEffect(() => {
    const loadCount = async () => {
      if (agendamento?.recorrenciaId) {
        try {
          const count = await countRecorrencia(agendamento.recorrenciaId);
          setRecorrenciaCount(count);
        } catch (error) {
          setRecorrenciaCount(0);
        }
      } else {
        setRecorrenciaCount(0);
        setDeleteRecorrencia(false);
      }
    };

    if (isOpen) {
      loadCount();
      setConfirmText("");
      setDeleteRecorrencia(false);
    }
  }, [isOpen, agendamento]);

  const handleConfirm = async () => {
    // Se está deletando recorrência, exigir confirmação por texto
    if (deleteRecorrencia && recorrenciaCount > 1) {
      if (confirmText.toUpperCase() !== "EXCLUIR") {
        alert('Digite "EXCLUIR" para confirmar a exclusão em lote');
        return;
      }
    }

    setIsLoading(true);
    try {
      const success = await onConfirm(
        deleteRecorrencia ? agendamento?.recorrenciaId : undefined
      );
      if (success) {
        onClose();
        setDeleteRecorrencia(false);
        setConfirmText("");
      }
    } catch (error) {
      console.error("Erro ao excluir:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar Exclusão"
      size="md"
    >
      <div className="space-y-4">
        {/* Opção de deletar recorrência */}
        {agendamento?.recorrenciaId && recorrenciaCount > 1 && (
          <div className="mb-4">
            <label className="flex items-start cursor-pointer p-3 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors">
              <input
                type="checkbox"
                checked={deleteRecorrencia}
                onChange={(e) => setDeleteRecorrencia(e.target.checked)}
                className="mt-1 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="ml-3 text-sm text-gray-700">
                <strong className="text-red-600">
                  Excluir todos os {recorrenciaCount} agendamentos
                </strong>{" "}
                desta recorrência
              </span>
            </label>
          </div>
        )}

        {/* Aviso de exclusão de recorrência */}
        {deleteRecorrencia && recorrenciaCount > 1 ? (
          <>
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
              <div className="flex">
                <svg
                  className="h-6 w-6 text-red-600 mt-0.5 flex-shrink-0"
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
                  <h3 className="text-sm font-bold text-red-800">
                    ATENÇÃO: Ação Irreversível!
                  </h3>
                  <div className="mt-2 text-sm text-red-700 space-y-2">
                    <p>
                      Você está prestes a excluir{" "}
                      <strong>{recorrenciaCount} agendamentos</strong>{" "}
                      vinculados a esta recorrência.
                    </p>
                    <p className="font-medium">Esta ação:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>NÃO PODE SER DESFEITA</li>
                      <li>
                        Excluirá TODOS os agendamentos da recorrência, exceto os
                        que já possuem atendimento realizado
                      </li>
                      <li>Afetará múltiplas datas e pacientes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Campo de confirmação por texto */}
            <div className="bg-white border-2 border-red-300 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Para confirmar, digite{" "}
                <span className="font-bold text-red-600">EXCLUIR</span> abaixo:
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Digite EXCLUIR"
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 uppercase"
                autoComplete="off"
              />
              {confirmText && confirmText.toUpperCase() !== "EXCLUIR" && (
                <p className="mt-1 text-xs text-red-600">
                  Digite "EXCLUIR" exatamente como mostrado
                </p>
              )}
            </div>
          </>
        ) : (
          /* Aviso de exclusão individual */
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
                  Confirmar exclusão
                </h3>
                <p className="mt-2 text-sm text-yellow-700">
                  Você está prestes a excluir{" "}
                  {agendamento?.paciente?.nome ? (
                    <>
                      o agendamento de{" "}
                      <strong>{agendamento.paciente.nome}</strong> para{" "}
                      <strong>
                        {new Date(agendamento.dataHora).toLocaleString(
                          "pt-BR",
                          {
                            dateStyle: "short",
                            timeStyle: "short",
                          }
                        )}
                      </strong>
                    </>
                  ) : (
                    "este agendamento"
                  )}
                  . Esta ação não pode ser desfeita.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Botões */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={handleConfirm}
            isLoading={isLoading}
            disabled={
              deleteRecorrencia &&
              recorrenciaCount > 1 &&
              confirmText.toUpperCase() !== "EXCLUIR"
            }
          >
            {deleteRecorrencia && recorrenciaCount > 1
              ? `Excluir ${recorrenciaCount} Agendamentos`
              : "Excluir Agendamento"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
