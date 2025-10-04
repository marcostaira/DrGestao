"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

interface AtendimentoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => Promise<boolean>;
  onCancel: (id: string) => Promise<boolean>;
  agendamento: any;
  procedimentos: any[];
  atendimento?: any;
}

export function AtendimentoFormModal({
  isOpen,
  onClose,
  onSubmit,
  onCancel,
  agendamento,
  procedimentos,
  atendimento,
}: AtendimentoFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    agendamentoId: "",
    anotacoes: "",
    procedimentosRealizados: [] as {
      procedimentoId: string;
      observacao: string;
    }[],
  });

  const isViewing = !!atendimento;

  useEffect(() => {
    if (atendimento) {
      setFormData({
        agendamentoId: atendimento.agendamentoId,
        anotacoes: atendimento.anotacoes || "",
        procedimentosRealizados: atendimento.procedimentosRealizados || [],
      });
    } else if (agendamento) {
      setFormData({
        agendamentoId: agendamento.id,
        anotacoes: "",
        procedimentosRealizados: agendamento.procedimentoId
          ? [{ procedimentoId: agendamento.procedimentoId, observacao: "" }]
          : [],
      });
    }
  }, [atendimento, agendamento, isOpen]);

  const handleAddProcedimento = () => {
    setFormData({
      ...formData,
      procedimentosRealizados: [
        ...formData.procedimentosRealizados,
        { procedimentoId: "", observacao: "" },
      ],
    });
  };

  const handleRemoveProcedimento = (index: number) => {
    const newProcs = [...formData.procedimentosRealizados];
    newProcs.splice(index, 1);
    setFormData({ ...formData, procedimentosRealizados: newProcs });
  };

  const handleProcedimentoChange = (
    index: number,
    field: "procedimentoId" | "observacao",
    value: string
  ) => {
    const newProcs = [...formData.procedimentosRealizados];
    newProcs[index][field] = value;
    setFormData({ ...formData, procedimentosRealizados: newProcs });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSubmit || isViewing) return;

    setIsSubmitting(true);
    const success = await onSubmit(formData);
    setIsSubmitting(false);

    if (success) {
      onClose();
    }
  };

  const handleCancelAtendimento = async () => {
    if (!atendimento) return;

    if (
      !confirm(
        "Tem certeza que deseja cancelar este atendimento? Esta ação não pode ser desfeita."
      )
    ) {
      return;
    }

    setIsSubmitting(true);
    const success = await onCancel(atendimento.id);
    setIsSubmitting(false);

    if (success) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isViewing ? "Visualizar Atendimento" : "Registrar Atendimento"}
      size="lg"
    >
      {atendimento?.cancelado && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-800 font-medium">
            ⚠️ Atendimento cancelado em{" "}
            {new Date(atendimento.canceladoEm).toLocaleString("pt-BR")}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Informações do Agendamento */}
        {agendamento && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Informações do Agendamento
            </h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <strong>Paciente:</strong> {agendamento.paciente?.nome || "N/A"}
              </p>
              <p>
                <strong>Data/Hora:</strong>{" "}
                {new Date(agendamento.dataHora).toLocaleString("pt-BR")}
              </p>
              <p>
                <strong>Profissional:</strong> {agendamento.profissional?.nome}
              </p>
              {agendamento.procedimento && (
                <p>
                  <strong>Procedimento:</strong> {agendamento.procedimento.nome}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Anotações */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Anotações do Atendimento
          </label>
          <textarea
            value={formData.anotacoes}
            onChange={(e) =>
              !isViewing &&
              setFormData({ ...formData, anotacoes: e.target.value })
            }
            rows={5}
            disabled={isViewing}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:text-gray-600"
            placeholder="Descreva o atendimento realizado..."
          />
        </div>

        {/* Procedimentos Realizados - Modo Visualização */}
        {isViewing && formData.procedimentosRealizados?.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Procedimentos Realizados
            </label>
            {formData.procedimentosRealizados.map(
              (proc: any, index: number) => {
                const procedimento = procedimentos.find(
                  (p) => p.id === proc.procedimentoId
                );
                return (
                  <div
                    key={index}
                    className="mb-2 p-3 bg-gray-50 border border-gray-200 rounded-lg"
                  >
                    <p className="text-sm font-medium">
                      {procedimento?.nome || "Procedimento"}
                    </p>
                    {proc.observacao && (
                      <p className="text-sm text-gray-600 mt-1">
                        {proc.observacao}
                      </p>
                    )}
                  </div>
                );
              }
            )}
          </div>
        )}

        {/* Procedimentos Realizados - Modo Edição */}
        {!isViewing && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Procedimentos Realizados
            </label>

            {formData.procedimentosRealizados.map((proc, index) => (
              <div
                key={index}
                className="mb-3 p-3 border border-gray-200 rounded-lg"
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1 space-y-2">
                    <select
                      value={proc.procedimentoId}
                      onChange={(e) =>
                        handleProcedimentoChange(
                          index,
                          "procedimentoId",
                          e.target.value
                        )
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    >
                      <option value="">Selecione o procedimento</option>
                      {procedimentos.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.nome}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      value={proc.observacao}
                      onChange={(e) =>
                        handleProcedimentoChange(
                          index,
                          "observacao",
                          e.target.value
                        )
                      }
                      placeholder="Observações (opcional)"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveProcedimento(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
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
            ))}

            <Button
              type="button"
              variant="secondary"
              onClick={handleAddProcedimento}
              className="w-full"
            >
              + Adicionar Procedimento
            </Button>
          </div>
        )}

        {/* Botões */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            {isViewing ? "Fechar" : "Cancelar"}
          </Button>

          {isViewing && !atendimento?.cancelado && (
            <Button
              type="button"
              variant="danger"
              onClick={handleCancelAtendimento}
              isLoading={isSubmitting}
            >
              Cancelar Atendimento
            </Button>
          )}

          {!isViewing && (
            <Button type="submit" isLoading={isSubmitting}>
              Registrar
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
}
