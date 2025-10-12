// frontend/src/components/atendimentos/AvaliacaoApprovalModal.tsx

"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { CheckIcon, XMarkIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Atendimento } from "@/types/atendimento.types";
import { calcularValorTotalPlano } from "@/services/atendimentoService";
import { toast } from "react-hot-toast";

interface AvaliacaoApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAprovar: (aprovadoPor: string) => Promise<void>;
  onReprovar: (motivo: string) => Promise<void>;
  onEditar?: () => void; // ✅ NOVO
  avaliacao: Atendimento;
}

export function AvaliacaoApprovalModal({
  isOpen,
  onClose,
  onAprovar,
  onReprovar,
  onEditar, // ✅ NOVO
  avaliacao,
}: AvaliacaoApprovalModalProps) {
  const [mode, setMode] = useState<"view" | "aprovar" | "reprovar">("view");
  const [aprovadoPor, setAprovadoPor] = useState("");
  const [motivo, setMotivo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAprovar = async () => {
    if (!aprovadoPor.trim()) {
      toast.error("Informe quem está aprovando a avaliação");
      return;
    }

    if (isSubmitting) {
      console.log("⚠️ Já está processando, ignorando clique duplicado");
      return;
    }

    setIsSubmitting(true);
    try {
      await onAprovar(aprovadoPor);
      // Não precisa de toast aqui, será mostrado no page.tsx
    } catch (error: any) {
      console.error("Erro ao aprovar:", error);
      toast.error(error.response?.data?.error || "Erro ao aprovar avaliação");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReprovar = async () => {
    if (!motivo.trim()) {
      toast.error("Informe o motivo da reprovação");
      return;
    }

    if (isSubmitting) {
      console.log("⚠️ Já está processando, ignorando clique duplicado");
      return;
    }

    setIsSubmitting(true);
    try {
      await onReprovar(motivo);
      // Não precisa de toast aqui, será mostrado no page.tsx
    } catch (error: any) {
      console.error("Erro ao reprovar:", error);
      toast.error(error.response?.data?.error || "Erro ao reprovar avaliação");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setMode("view");
    setAprovadoPor("");
    setMotivo("");
    onClose();
  };

  const valorTotal = avaliacao.procedimentosPlano
    ? calcularValorTotalPlano(avaliacao.procedimentosPlano)
    : 0;

  const paciente =
    avaliacao.paciente || (avaliacao.agendamento as any)?.paciente;
  const profissional =
    avaliacao.profissional || (avaliacao.agendamento as any)?.profissional;

  if (!paciente) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title="Erro">
        <div className="p-4 text-center">
          <p className="text-red-600">
            Dados da avaliação incompletos. Por favor, recarregue a página.
          </p>
          <Button onClick={handleClose} className="mt-4">
            Fechar
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Aprovação da Avaliação"
      size="lg"
    >
      <div className="space-y-6">
        {/* Info do Paciente */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Paciente</h3>
          <p className="text-lg font-medium text-blue-900">{paciente.nome}</p>
          {paciente.telefone && (
            <p className="text-sm text-blue-700">{paciente.telefone}</p>
          )}
        </div>

        {/* Anotações */}
        {avaliacao.anotacoes && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Anotações da Avaliação
            </h3>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {avaliacao.anotacoes}
              </p>
            </div>
          </div>
        )}

        {/* Procedimentos Propostos */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">
            Procedimentos Propostos
          </h3>

          {!avaliacao.procedimentosPlano ||
          avaliacao.procedimentosPlano.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              Nenhum procedimento adicionado à avaliação
            </div>
          ) : (
            <>
              <div className="space-y-2">
                {avaliacao.procedimentosPlano.map((proc, index) => (
                  <div
                    key={proc.id}
                    className="bg-white border border-gray-200 rounded-lg p-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                            {index + 1}
                          </span>
                          <h4 className="font-medium text-gray-900">
                            {proc.procedimento?.nome ||
                              "Procedimento não disponível"}
                          </h4>
                        </div>
                        {proc.observacoes && (
                          <p className="text-sm text-gray-600 mt-1 ml-8">
                            {proc.observacoes}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          R${" "}
                          {Number(
                            proc.valorPraticado || proc.procedimento?.valor || 0
                          ).toFixed(2)}
                        </p>
                        {proc.procedimento?.duracaoMinutos && (
                          <p className="text-xs text-gray-500">
                            {proc.procedimento.duracaoMinutos} min
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Valor Total */}
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-green-900">
                    Valor Total do Tratamento:
                  </span>
                  <span className="text-2xl font-bold text-green-900">
                    R$ {valorTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Formulários de Aprovação/Reprovação */}
        {mode === "aprovar" && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-3">
              Confirmar Aprovação
            </h3>
            <label className="block text-sm font-medium text-green-900 mb-2">
              Nome de quem está aprovando{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={aprovadoPor}
              onChange={(e) => setAprovadoPor(e.target.value)}
              placeholder="Ex: João Silva (paciente) ou Maria Silva (responsável)"
              className="w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              autoFocus
              disabled={isSubmitting}
            />
            <p className="text-xs text-green-700 mt-2">
              Ao aprovar, um Plano de Tratamento será criado automaticamente
            </p>
          </div>
        )}

        {mode === "reprovar" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 mb-3">
              Motivo da Reprovação
            </h3>
            <label className="block text-sm font-medium text-red-900 mb-2">
              Descreva o motivo <span className="text-red-500">*</span>
            </label>
            <textarea
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              rows={4}
              placeholder="Ex: Paciente não pode arcar com os custos no momento..."
              className="w-full rounded-md border-red-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              autoFocus
              disabled={isSubmitting}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          {mode === "view" && (
            <>
              <Button variant="secondary" onClick={handleClose}>
                Fechar
              </Button>

              {/* ✅ NOVO: Botão Editar */}
              {onEditar && (
                <Button variant="secondary" onClick={onEditar}>
                  <PencilIcon className="h-5 w-5 mr-2" />
                  Editar
                </Button>
              )}

              <Button
                variant="danger"
                onClick={() => setMode("reprovar")}
                disabled={isSubmitting}
              >
                <XMarkIcon className="h-5 w-5 mr-2" />
                Reprovar
              </Button>
              <Button
                variant="primary"
                onClick={() => setMode("aprovar")}
                disabled={isSubmitting}
              >
                <CheckIcon className="h-5 w-5 mr-2" />
                Aprovar
              </Button>
            </>
          )}

          {mode === "aprovar" && (
            <>
              <Button
                variant="secondary"
                onClick={() => setMode("view")}
                disabled={isSubmitting}
              >
                Voltar
              </Button>
              <Button
                variant="primary"
                onClick={handleAprovar}
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                <CheckIcon className="h-5 w-5 mr-2" />
                Confirmar Aprovação
              </Button>
            </>
          )}

          {mode === "reprovar" && (
            <>
              <Button
                variant="secondary"
                onClick={() => setMode("view")}
                disabled={isSubmitting}
              >
                Voltar
              </Button>
              <Button
                variant="danger"
                onClick={handleReprovar}
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                <XMarkIcon className="h-5 w-5 mr-2" />
                Confirmar Reprovação
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
