// frontend/src/components/atendimentos/AvaliacaoFormModal.tsx

"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import {
  PlusIcon,
  TrashIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import { CreateProcedimentoPlanoData } from "@/types/atendimento.types"; // CORRIGIDO: sem .types

interface AvaliacaoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    anotacoes: string;
    procedimentosPlano: CreateProcedimentoPlanoData[];
  }) => Promise<void>;
  procedimentos: any[];
  agendamento: any;
}

export function AvaliacaoFormModal({
  isOpen,
  onClose,
  onSubmit,
  procedimentos,
  agendamento,
}: AvaliacaoFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [anotacoes, setAnotacoes] = useState("");
  const [procedimentosPlano, setProcedimentosPlano] = useState<
    // CORRIGIDO: sintaxe
    CreateProcedimentoPlanoData[]
  >([]);

  const handleAddProcedimento = () => {
    setProcedimentosPlano([
      ...procedimentosPlano,
      {
        procedimentoId: "",
        ordem: procedimentosPlano.length + 1,
        observacoes: "",
        valorPraticado: undefined,
      },
    ]);
  };

  const handleRemoveProcedimento = (index: number) => {
    const newList = procedimentosPlano.filter((_, i) => i !== index);
    // Reordenar
    const reordered = newList.map((proc, i) => ({ ...proc, ordem: i + 1 }));
    setProcedimentosPlano(reordered);
  };

  const handleUpdateProcedimento = (
    index: number,
    field: keyof CreateProcedimentoPlanoData,
    value: any
  ) => {
    const updated = [...procedimentosPlano];
    updated[index] = { ...updated[index], [field]: value };
    setProcedimentosPlano(updated);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...procedimentosPlano];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    // Atualizar ordem
    updated[index - 1].ordem = index;
    updated[index].ordem = index + 1;
    setProcedimentosPlano(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === procedimentosPlano.length - 1) return;
    const updated = [...procedimentosPlano];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    // Atualizar ordem
    updated[index].ordem = index + 1;
    updated[index + 1].ordem = index + 2;
    setProcedimentosPlano(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (procedimentosPlano.length === 0) {
      alert("Adicione pelo menos um procedimento à avaliação");
      return;
    }

    const hasInvalidProcedimento = procedimentosPlano.some(
      (p) => !p.procedimentoId
    );
    if (hasInvalidProcedimento) {
      alert("Todos os procedimentos devem ser selecionados");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        anotacoes,
        procedimentosPlano,
      });
      handleClose();
    } catch (error) {
      console.error("Erro ao criar avaliação:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setAnotacoes("");
    setProcedimentosPlano([]);
    onClose();
  };

  const calcularValorTotal = () => {
    return procedimentosPlano.reduce((total, proc) => {
      if (proc.valorPraticado) {
        return total + Number(proc.valorPraticado);
      }
      const procedimento = procedimentos.find(
        (p) => p.id === proc.procedimentoId
      );
      return total + (procedimento?.valor ? Number(procedimento.valor) : 0);
    }, 0);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Nova Avaliação"
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Info do Paciente */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">
            Informações do Agendamento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-blue-700">Paciente:</span>
              <p className="font-medium text-blue-900">
                {agendamento?.paciente?.nome}
              </p>
            </div>
            <div>
              <span className="text-blue-700">Data:</span>
              <p className="font-medium text-blue-900">
                {agendamento?.dataHora &&
                  new Date(agendamento.dataHora).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
        </div>

        {/* Anotações */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Anotações da Avaliação
          </label>
          <textarea
            value={anotacoes}
            onChange={(e) => setAnotacoes(e.target.value)}
            rows={4}
            placeholder="Descreva a avaliação realizada..."
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Lista de Procedimentos */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Procedimentos Propostos <span className="text-red-500">*</span>
            </label>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleAddProcedimento}
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Adicionar Procedimento
            </Button>
          </div>

          {procedimentosPlano.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500 text-sm">
                Nenhum procedimento adicionado ainda.
                <br />
                Clique em "Adicionar Procedimento" para começar.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {procedimentosPlano.map((proc, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    {/* Ordem */}
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ArrowUpIcon className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-semibold text-gray-700 text-center">
                        {index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleMoveDown(index)}
                        disabled={index === procedimentosPlano.length - 1}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ArrowDownIcon className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Campos */}
                    <div className="flex-1 space-y-3">
                      {/* Procedimento */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Procedimento
                        </label>
                        <select
                          value={proc.procedimentoId}
                          onChange={(e) =>
                            handleUpdateProcedimento(
                              index,
                              "procedimentoId",
                              e.target.value
                            )
                          }
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                          required
                        >
                          <option value="">Selecione...</option>
                          {procedimentos.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.nome}
                              {p.valor && ` - R$ ${Number(p.valor).toFixed(2)}`}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {/* Valor Praticado */}
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Valor (R$)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={proc.valorPraticado || ""}
                            onChange={(e) =>
                              handleUpdateProcedimento(
                                index,
                                "valorPraticado",
                                e.target.value
                                  ? Number(e.target.value)
                                  : undefined
                              )
                            }
                            placeholder="Valor personalizado"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                          />
                        </div>

                        {/* Observações */}
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Observações
                          </label>
                          <input
                            type="text"
                            value={proc.observacoes || ""}
                            onChange={(e) =>
                              handleUpdateProcedimento(
                                index,
                                "observacoes",
                                e.target.value
                              )
                            }
                            placeholder="Ex: Urgente, 2 sessões..."
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Remover */}
                    <button
                      type="button"
                      onClick={() => handleRemoveProcedimento(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remover"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Valor Total */}
        {procedimentosPlano.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-900">
                Valor Total Estimado:
              </span>
              <span className="text-2xl font-bold text-green-900">
                R$ {calcularValorTotal().toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="primary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            disabled={procedimentosPlano.length === 0}
          >
            Criar Avaliação
          </Button>
        </div>
      </form>
    </Modal>
  );
}
