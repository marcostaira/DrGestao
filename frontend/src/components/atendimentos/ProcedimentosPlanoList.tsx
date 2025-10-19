// frontend/src/components/atendimentos/ProcedimentosPlanoList.tsx

"use client";

import { useState } from "react";
import { ProcedimentoPlanoDetalhado } from "@/types/atendimento.types";
import { ProgressoProcedimento } from "@/services/atendimentoService";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { toast } from "react-hot-toast";
import api from "@/lib/api";
import {
  CheckCircleIcon,
  ClockIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

interface ProcedimentosPlanoListProps {
  procedimentos: ProcedimentoPlanoDetalhado[];
  atendimentoId: string;
  onUpdate: () => void;
  modoVisualizacao?: boolean;
}

export function ProcedimentosPlanoList({
  procedimentos,
  atendimentoId,
  onUpdate,
  modoVisualizacao = true,
}: ProcedimentosPlanoListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const handleUpdateProgresso = async (
    procedimentoId: string,
    progresso: ProgressoProcedimento,
    percentual?: number
  ) => {
    try {
      setUpdating(procedimentoId);
      await api.put(`/atendimentos/procedimentos/${procedimentoId}/progresso`, {
        progresso,
        percentualProgresso: percentual,
      });
      toast.success("Progresso atualizado com sucesso!");
      onUpdate();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erro ao atualizar progresso");
    } finally {
      setUpdating(null);
    }
  };

  const getProgressoBadge = (progresso: ProgressoProcedimento) => {
    const variants: Record<ProgressoProcedimento, any> = {
      [ProgressoProcedimento.NAO_INICIADO]: {
        variant: "default",
        label: "Não Iniciado",
      },
      [ProgressoProcedimento.EM_ANDAMENTO]: {
        variant: "warning",
        label: "Em Andamento",
      },
      [ProgressoProcedimento.CONCLUIDO]: {
        variant: "success",
        label: "Concluído",
      },
    };
    return variants[progresso];
  };

  return (
    <div className="space-y-3">
      {procedimentos
        .sort((a, b) => a.ordem - b.ordem)
        .map((proc) => {
          const progressoInfo = getProgressoBadge(proc.progresso);
          const isExpanded = expandedId === proc.id;
          const isUpdating = updating === proc.id;
          const percentual = proc.percentualProgresso ?? 0; // Valor padrão

          return (
            <div
              key={proc.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              {/* Header do Procedimento */}
              <div className="p-4 bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                        {proc.ordem}
                      </span>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {proc.procedimento.nome}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={progressoInfo.variant} size="sm">
                            {progressoInfo.label}
                          </Badge>
                          {proc.procedimento.temStatus && (
                            <span className="text-xs text-gray-600">
                              {percentual}% concluído
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Barra de Progresso (se tem status) */}
                    {proc.procedimento.temStatus && (
                      <div className="mt-3 ml-11">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              percentual === 100
                                ? "bg-green-500"
                                : percentual > 0
                                ? "bg-yellow-500"
                                : "bg-gray-300"
                            }`}
                            style={{ width: `${percentual}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : proc.id)}
                    className="ml-4 text-gray-400 hover:text-gray-600"
                  >
                    {isExpanded ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Detalhes Expandidos */}
              {isExpanded && (
                <div className="p-4 border-t border-gray-200 space-y-4">
                  {/* Informações */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="text-gray-600">Duração</label>
                      <p className="font-medium">
                        {proc.procedimento.duracaoMinutos} minutos
                      </p>
                    </div>
                    {proc.valorPraticado !== null && (
                      <div>
                        <label className="text-gray-600">Valor</label>
                        <p className="font-medium">
                          R$ {Number(proc.valorPraticado).toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Agendamento */}
                  {proc.agendamento && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 text-blue-900">
                        <CalendarIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          Agendado para:{" "}
                          {new Date(proc.agendamento.dataHora).toLocaleString(
                            "pt-BR"
                          )}
                        </span>
                      </div>
                      <Badge variant="info" size="sm" className="mt-2">
                        {proc.agendamento.status}
                      </Badge>
                    </div>
                  )}

                  {/* Observações */}
                  {proc.observacoes && (
                    <div>
                      <label className="text-sm text-gray-600">
                        Observações
                      </label>
                      <p className="text-sm text-gray-800 mt-1">
                        {proc.observacoes}
                      </p>
                    </div>
                  )}

                  {/* Controle de Progresso (se tem status e não está em modo visualização) */}
                  {proc.procedimento.temStatus && !modoVisualizacao && (
                    <div className="pt-4 border-t border-gray-200">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Atualizar Progresso
                      </label>

                      {/* Slider de Percentual */}
                      <div className="space-y-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="5"
                          value={percentual}
                          onChange={(e) => {
                            const valor = parseInt(e.target.value);
                            handleUpdateProgresso(
                              proc.id,
                              valor === 0
                                ? ProgressoProcedimento.NAO_INICIADO
                                : valor === 100
                                ? ProgressoProcedimento.CONCLUIDO
                                : ProgressoProcedimento.EM_ANDAMENTO,
                              valor
                            );
                          }}
                          disabled={isUpdating}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>0%</span>
                          <span className="font-medium text-blue-600">
                            {percentual}%
                          </span>
                          <span>100%</span>
                        </div>
                      </div>

                      {/* Botões Rápidos */}
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            handleUpdateProgresso(
                              proc.id,
                              ProgressoProcedimento.NAO_INICIADO,
                              0
                            )
                          }
                          disabled={isUpdating}
                        >
                          Não Iniciado
                        </Button>
                        <Button
                          size="sm"
                          variant="warning"
                          onClick={() =>
                            handleUpdateProgresso(
                              proc.id,
                              ProgressoProcedimento.EM_ANDAMENTO,
                              50
                            )
                          }
                          disabled={isUpdating}
                        >
                          50%
                        </Button>
                        <Button
                          size="sm"
                          variant="success"
                          onClick={() =>
                            handleUpdateProgresso(
                              proc.id,
                              ProgressoProcedimento.CONCLUIDO,
                              100
                            )
                          }
                          disabled={isUpdating}
                        >
                          Concluir
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Data de Conclusão */}
                  {proc.concluidoEm && (
                    <div className="flex items-center gap-2 text-sm text-green-700 pt-3 border-t border-gray-200">
                      <CheckCircleIcon className="h-5 w-5" />
                      <span>
                        Concluído em{" "}
                        {new Date(proc.concluidoEm).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}
