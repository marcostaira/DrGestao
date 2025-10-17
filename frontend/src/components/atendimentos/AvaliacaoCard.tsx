// frontend/src/components/atendimentos/AvaliacaoCard.tsx

"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  LinkIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import { agendamentoProcedimentosService } from "@/services/agendamentoProcedimentosService";
import { toast } from "react-hot-toast";
import api from "@/lib/api";

interface AvaliacaoCardProps {
  avaliacao: any;
  onAprovar: (avaliacao: any) => void;
  onGerarLink: (avaliacao: any) => void;
  onEditar: (avaliacao: any) => void;
  onAgendarProcedimentos?: (avaliacao: any) => void;
}

export function AvaliacaoCard({
  avaliacao,
  onAprovar,
  onGerarLink,
  onEditar,
  onAgendarProcedimentos,
}: AvaliacaoCardProps) {
  const [showActions, setShowActions] = useState(false);
  const [linkData, setLinkData] = useState<any>(null);
  const [loadingLink, setLoadingLink] = useState(false);
  const [reenviandoWhatsApp, setReenviandoWhatsApp] = useState(false);
  const [procedimentosPendentes, setProcedimentosPendentes] = useState(0);
  const [showLinkInfo, setShowLinkInfo] = useState(false);

  useEffect(() => {
    if (avaliacao.statusAprovacao === "PENDENTE") {
      checkExistingLink();
    }
    if (avaliacao.statusAprovacao === "APROVADO") {
      loadProcedimentosPendentes();
    }
  }, [avaliacao.id, avaliacao.statusAprovacao]);

  const checkExistingLink = async () => {
    try {
      setLoadingLink(true);
      const response = await api.get(
        `/atendimentos/${avaliacao.id}/link-aprovacao/status`
      );

      if (response.data.data && response.data.data.linkValido) {
        setLinkData(response.data.data);
      }
    } catch (error) {
      setLinkData(null);
    } finally {
      setLoadingLink(false);
    }
  };

  const loadProcedimentosPendentes = async () => {
    try {
      const data =
        await agendamentoProcedimentosService.listarProcedimentosParaAgendar(
          avaliacao.id
        );
      setProcedimentosPendentes(data.procedimentosParaAgendar?.length || 0);
    } catch (error) {
      console.error("Erro ao carregar procedimentos pendentes:", error);
    }
  };

  const handleReenviarWhatsApp = async () => {
    try {
      setReenviandoWhatsApp(true);
      await api.post(`/atendimentos/${avaliacao.id}/link-aprovacao/whatsapp`);
      toast.success("Link reenviado via WhatsApp com sucesso!");
      await checkExistingLink();
    } catch (error: any) {
      toast.error(
        error.response?.data?.error || "Erro ao reenviar link via WhatsApp"
      );
    } finally {
      setReenviandoWhatsApp(false);
    }
  };

  const handleCopyLink = () => {
    if (linkData?.link) {
      navigator.clipboard.writeText(linkData.link);
      toast.success("Link copiado para a área de transferência!");
    }
  };

  const formatExpiration = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `Expira em ${diffDays} dia${diffDays > 1 ? "s" : ""}`;
    } else if (diffHours > 0) {
      return `Expira em ${diffHours} hora${diffHours > 1 ? "s" : ""}`;
    } else {
      return "Expira em breve";
    }
  };

  const getStatusBadge = () => {
    switch (avaliacao.statusAprovacao) {
      case "PENDENTE":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
            <ClockIcon className="w-4 h-4" />
            Pendente
          </span>
        );
      case "APROVADO":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
            <CheckCircleIcon className="w-4 h-4" />
            Aprovado
          </span>
        );
      case "REPROVADO":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
            <XCircleIcon className="w-4 h-4" />
            Reprovado
          </span>
        );
      default:
        return null;
    }
  };

  const valorTotal = avaliacao.procedimentosPlano?.reduce(
    (total: number, proc: any) => {
      return (
        total + Number(proc.valorPraticado || proc.procedimento?.valor || 0)
      );
    },
    0
  );

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-gray-900">Avaliação</h4>
            {getStatusBadge()}
          </div>
          <p className="text-sm text-gray-600">
            {new Date(avaliacao.createdAt).toLocaleDateString("pt-BR")} às{" "}
            {new Date(avaliacao.createdAt).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <button
          onClick={() => setShowActions(!showActions)}
          className="text-gray-400 hover:text-gray-600 p-1"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Anotações */}
      {avaliacao.anotacoes && (
        <div className="mb-3 p-2 bg-gray-50 rounded text-sm text-gray-700 line-clamp-2">
          {avaliacao.anotacoes}
        </div>
      )}

      {/* Status Aprovado com Procedimentos Pendentes */}
      {avaliacao.statusAprovacao === "APROVADO" &&
        procedimentosPendentes > 0 && (
          <div className="mb-3 p-2 bg-amber-50 border border-amber-200 rounded">
            <p className="text-xs text-amber-800 font-medium">
              📋 {procedimentosPendentes} procedimento
              {procedimentosPendentes > 1 ? "s" : ""} pendente
              {procedimentosPendentes > 1 ? "s" : ""} de agendamento
            </p>
          </div>
        )}

      {/* Link Info (se PENDENTE e tem link) */}
      {avaliacao.statusAprovacao === "PENDENTE" && linkData && (
        <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded">
          <div className="flex items-center justify-between">
            <p className="text-xs text-blue-800 flex items-center gap-1">
              <LinkIcon className="w-3 h-3" />
              Link de aprovação enviado
            </p>
            <button
              onClick={() => setShowLinkInfo(!showLinkInfo)}
              className="text-xs text-blue-600 font-medium hover:text-blue-800"
            >
              {showLinkInfo ? "Ocultar" : "Ver"}
            </button>
          </div>

          {showLinkInfo && (
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={linkData.link}
                  readOnly
                  className="flex-1 px-2 py-1 text-xs bg-white border border-blue-300 rounded"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 whitespace-nowrap"
                >
                  Copiar
                </button>
              </div>

              <p className="text-xs text-blue-700">
                {formatExpiration(linkData.expiresAt)}
              </p>

              {linkData.enviadoWhatsApp && linkData.enviadoEm && (
                <div className="flex items-center justify-between pt-2 border-t border-blue-200">
                  <p className="text-xs text-blue-700">
                    ✓ Enviado via WhatsApp em{" "}
                    {new Date(linkData.enviadoEm).toLocaleDateString("pt-BR")}
                  </p>
                  <button
                    onClick={handleReenviarWhatsApp}
                    disabled={reenviandoWhatsApp}
                    className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    {reenviandoWhatsApp ? "Reenviando..." : "Reenviar"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Procedimentos Propostos */}
      {avaliacao.procedimentosPlano &&
        avaliacao.procedimentosPlano.length > 0 && (
          <div className="mb-3 space-y-2">
            <h5 className="text-sm font-medium text-gray-700">
              Procedimentos Propostos:
            </h5>
            {avaliacao.procedimentosPlano.map((proc: any, index: number) => (
              <div
                key={proc.id}
                className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded"
              >
                <div className="flex items-center gap-2 flex-1">
                  <span className="font-medium text-gray-500">
                    {index + 1}.
                  </span>
                  <span className="text-gray-900">
                    {proc.procedimento?.nome || "Procedimento"}
                  </span>
                  {proc.observacoes && (
                    <span className="text-gray-500 text-xs">
                      ({proc.observacoes})
                    </span>
                  )}
                </div>
                <span className="font-medium text-gray-900">
                  R${" "}
                  {Number(
                    proc.valorPraticado || proc.procedimento?.valor || 0
                  ).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="font-semibold text-gray-900">Total:</span>
              <span className="font-bold text-green-600 text-lg">
                R$ {valorTotal?.toFixed(2) || "0.00"}
              </span>
            </div>
          </div>
        )}

      {/* Status Info */}
      {avaliacao.statusAprovacao === "APROVADO" && (
        <div className="mb-3 bg-green-50 border border-green-200 rounded p-2 text-sm">
          <p className="text-green-800">
            ✓ Aprovado por <strong>{avaliacao.aprovadoPor}</strong> em{" "}
            {new Date(avaliacao.aprovadoEm).toLocaleDateString("pt-BR")}
          </p>
        </div>
      )}

      {avaliacao.statusAprovacao === "REPROVADO" && (
        <div className="mb-3 bg-red-50 border border-red-200 rounded p-2 text-sm">
          <p className="text-red-800">
            ✗ Reprovado em{" "}
            {new Date(avaliacao.reprovadoEm).toLocaleDateString("pt-BR")}
          </p>
          {avaliacao.reprovadoMotivo && (
            <p className="text-red-700 mt-1">
              Motivo: {avaliacao.reprovadoMotivo}
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      {showActions && (
        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t">
          {avaliacao.statusAprovacao === "PENDENTE" && (
            <>
              <Button
                size="sm"
                variant="primary"
                onClick={() => {
                  onAprovar(avaliacao);
                  setShowActions(false);
                }}
              >
                Aprovar
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  onEditar(avaliacao);
                  setShowActions(false);
                }}
              >
                Editar
              </Button>
              {linkData ? (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleReenviarWhatsApp}
                  disabled={reenviandoWhatsApp}
                >
                  {reenviandoWhatsApp ? "Reenviando..." : "Reenviar WhatsApp"}
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    onGerarLink(avaliacao);
                    setShowActions(false);
                  }}
                >
                  Gerar Link
                </Button>
              )}
            </>
          )}

          {avaliacao.statusAprovacao === "APROVADO" &&
            procedimentosPendentes > 0 && (
              <Button
                size="sm"
                variant="primary"
                onClick={() => {
                  if (onAgendarProcedimentos) {
                    onAgendarProcedimentos(avaliacao);
                  }
                  setShowActions(false);
                }}
              >
                Agendar Procedimentos
              </Button>
            )}

          {avaliacao.statusAprovacao === "REPROVADO" && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                onEditar(avaliacao);
                setShowActions(false);
              }}
            >
              Editar e Reenviar
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
