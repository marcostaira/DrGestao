// frontend/src/components/atendimentos/ProcedimentoProgressCard.tsx

"use client";

import React, { useState } from "react";
import { ProcedimentoPlano, ProgressoProcedimento } from "@/types/atendimento.types";
import {
  getProgressoProcedimentoLabel,
  getProgressoProcedimentoColor,
} from "@/services/atendimentoService";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckCircleIcon,
  ClockIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

interface ProcedimentoProgressCardProps {
  procedimento: ProcedimentoPlano;
  onUpdateProgresso: (
    procedimentoId: string,
    progresso: ProgressoProcedimento, // CORRIGIDO: tipo específico
    agendamentoId?: string,
    observacoes?: string
  ) => Promise<void>;
  isExpanded: boolean;
  onToggleExpand: () => void;
  readOnly?: boolean;
}

export function ProcedimentoProgressCard({
  procedimento,
  onUpdateProgresso,
  isExpanded,
  onToggleExpand,
  readOnly = false,
}: ProcedimentoProgressCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [newProgresso, setNewProgresso] = useState<ProgressoProcedimento>( // CORRIGIDO: tipo específico
    procedimento.progresso
  );
  const [observacoes, setObservacoes] = useState(procedimento.observacoes || "");

  const handleUpdateProgresso = async () => {
    if (newProgresso === procedimento.progresso) {
      return;
    }

    setIsUpdating(true);
    try {
      await onUpdateProgresso(
        procedimento.id,
        newProgresso,
        procedimento.agendamentoId,
        observacoes
      );
      onToggleExpand();
    } catch (error) {
      console.error("Erro ao atualizar progresso:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const progressoColor = getProgressoProcedimentoColor(procedimento.progresso);
  const progressoLabel = getProgressoProcedimentoLabel(procedimento.progresso);

  const valor =
    procedimento.valorPraticado || procedimento.procedimento.valor || 0;

  // CORRIGIDO: Mapeamento de cores para variantes do Badge
  const badgeVariantMap: Record<string, "default" | "success" | "warning" | "danger" | "info"> = {
    gray: "default",
    green: "success",
    blue: "info",
    yellow: "warning",
    red: "danger",
  };

  const badgeVariant = badgeVariantMap[progressoColor] || "default";

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header - Sempre visível */}
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggleExpand}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                {procedimento.ordem}
              </span>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">
                  {procedimento.procedimento.nome}
                </h4>
                <div className="flex items-center gap-3 mt-1">
                  {/* CORRIGIDO: usando variant ao invés de color */}
                  <Badge variant={badgeVariant}>{progressoLabel}</Badge>
                  <span className="text-sm text-gray-500">
                    {procedimento.procedimento.duracaoMinutos} min
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    R$ {Number(valor).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Ícone de Expandir */}
          <button 
            type="button"
            className="p-1 text-gray-400 hover:text-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
          >
            {isExpanded ? (
              <ChevronUpIcon className="h-5 w-5" />
            ) : (
              <ChevronDownIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Info rápida quando recolhido */}
        {!isExpanded && (
          <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
            {procedimento.agendamento && (
              <span className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                Agendado para{" "}
                {new Date(procedimento.agendamento.dataHora).toLocaleDateString(
                  "pt-BR"
                )}
              </span>
            )}
            {procedimento.concluidoEm && (
              <span className="flex items-center gap-1 text-green-600">
                <CheckCircleIcon className="h-4 w-4" />
                Concluído em{" "}
                {new Date(procedimento.concluidoEm).toLocaleDateString("pt-BR")}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Conteúdo Expandido */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-4">
          {/* Observações existentes */}
          {procedimento.observacoes && !readOnly && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observações Atuais
              </label>
              <p className="text-sm text-gray-600 bg-white rounded p-2 border">
                {procedimento.observacoes}
              </p>
            </div>
          )}

          {/* Agendamento vinculado */}
          {procedimento.agendamento && (
            <div className="bg-blue-50 border border-blue-200 rounded p-3">
              <div className="flex items-center gap-2 text-blue-900">
                <CalendarIcon className="h-5 w-5" />
                <div>
                  <p className="text-sm font-medium">Agendamento vinculado</p>
                  <p className="text-xs">
                    {new Date(
                      procedimento.agendamento.dataHora
                    ).toLocaleDateString("pt-BR")}{" "}
                    às{" "}
                    {new Date(
                      procedimento.agendamento.dataHora
                    ).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-xs">
                    com {procedimento.agendamento.profissional.nome}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Data de conclusão */}
          {procedimento.concluidoEm && (
            <div className="bg-green-50 border border-green-200 rounded p-3">
              <div className="flex items-center gap-2 text-green-900">
                <CheckCircleIcon className="h-5 w-5" />
                <div>
                  <p className="text-sm font-medium">Procedimento concluído</p>
                  <p className="text-xs">
                    {new Date(procedimento.concluidoEm).toLocaleDateString(
                      "pt-BR"
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Formulário de atualização */}
          {!readOnly && (
            <div className="space-y-3 pt-3 border-t">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Atualizar Progresso
                </label>
                <select
                  value={newProgresso}
                  onChange={(e) => setNewProgresso(e.target.value as ProgressoProcedimento)} // CORRIGIDO: cast explícito
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  disabled={procedimento.progresso === ProgressoProcedimento.CONCLUIDO}
                >
                  <option value={ProgressoProcedimento.NAO_INICIADO}>
                    Não Iniciado
                  </option>
                  <option value={ProgressoProcedimento.EM_ANDAMENTO}>
                    Em Andamento
                  </option>
                  <option value={ProgressoProcedimento.CONCLUIDO}>
                    Concluído
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observações Adicionais
                </label>
                <textarea
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  rows={2}
                  placeholder="Adicione observações sobre o procedimento..."
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  disabled={procedimento.progresso === ProgressoProcedimento.CONCLUIDO}
                />
              </div>

              {procedimento.progresso !== ProgressoProcedimento.CONCLUIDO && (
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleUpdateProgresso}
                  isLoading={isUpdating}
                  disabled={newProgresso === procedimento.progresso}
                  className="w-full"
                >
                  Salvar Atualização
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}