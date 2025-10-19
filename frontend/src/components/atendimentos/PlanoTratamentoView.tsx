// frontend/src/components/atendimentos/PlanoTratamentoView.tsx

"use client";

import React, { useState, useEffect } from "react";
import { Atendimento, ProgressoProcedimento } from "@/types/atendimento.types";
import {
  calcularProgressoPlano,
  calcularValorTotalPlano,
} from "@/services/atendimentoService";
import { ProcedimentoProgressCard } from "./ProcedimentoProgressCard";
import { AgendarProcedimentosModal } from "./AgendarProcedimentosModal";
import {
  ChartBarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import api from "@/lib/api";
import { toast } from "react-hot-toast";

interface PlanoTratamentoViewProps {
  plano: Atendimento;
  onUpdateProgresso: (
    procedimentoId: string,
    progresso: ProgressoProcedimento,
    agendamentoId?: string,
    observacoes?: string
  ) => Promise<void>;
  readOnly?: boolean;
}

export function PlanoTratamentoView({
  plano,
  onUpdateProgresso,
  readOnly = false,
}: PlanoTratamentoViewProps) {
  const [expandedProcedimento, setExpandedProcedimento] = useState<
    string | null
  >(null);
  const [showAgendarModal, setShowAgendarModal] = useState(false);
  const [profissionais, setProfissionais] = useState<any[]>([]);
  const [loadingProfissionais, setLoadingProfissionais] = useState(false);

  // Carregar profissionais
  useEffect(() => {
    const loadProfissionais = async () => {
      try {
        setLoadingProfissionais(true);
        const response = await api.get("/profissionais");
        setProfissionais(response.data.data || []);
      } catch (error: any) {
        console.error("Erro ao carregar profissionais:", error);
        toast.error("Erro ao carregar profissionais");
      } finally {
        setLoadingProfissionais(false);
      }
    };

    loadProfissionais();
  }, []);

  const procedimentos = plano.procedimentosPlano || [];
  const progresso = calcularProgressoPlano(procedimentos);
  const valorTotal = calcularValorTotalPlano(procedimentos);

  const procedimentosConcluidos = procedimentos.filter(
    (p) => p.progresso === ProgressoProcedimento.CONCLUIDO
  ).length;

  // Verificar se é avaliação aprovada (para mostrar botão de agendar)
  const isAvaliacaoAprovada =
    plano.avaliacao && plano.avaliacao.statusAprovacao === "APROVADO";

  // Verificar se é plano de tratamento
  const isPlanoTratamento = plano.tipo === "PLANO_TRATAMENTO";

  const handleAgendarSuccess = () => {
    setShowAgendarModal(false);
    toast.success("Procedimentos agendados com sucesso!");
    // Recarregar página para atualizar dados
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header com Info da Avaliação */}
      {plano.avaliacao && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">
            Baseado na Avaliação
          </h3>
          <div className="text-sm text-blue-800">
            <p>
              <span className="font-medium">Data da Avaliação:</span>{" "}
              {plano.avaliacao.createdAt
                ? new Date(plano.avaliacao.createdAt).toLocaleDateString(
                    "pt-BR"
                  )
                : new Date(plano.createdAt).toLocaleDateString("pt-BR")}
            </p>
            <p>
              <span className="font-medium">Aprovado por:</span>{" "}
              {plano.aprovadoPor || "N/A"}
            </p>
            <p>
              <span className="font-medium">Aprovado em:</span>{" "}
              {plano.aprovadoEm
                ? new Date(plano.aprovadoEm).toLocaleDateString("pt-BR")
                : "N/A"}
            </p>
          </div>
        </div>
      )}

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Progresso Geral */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Progresso</p>
              <p className="text-2xl font-bold text-gray-900">{progresso}%</p>
            </div>
          </div>
        </div>

        {/* Total de Procedimentos */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Procedimentos</p>
              <p className="text-2xl font-bold text-gray-900">
                {procedimentos.length}
              </p>
            </div>
          </div>
        </div>

        {/* Concluídos */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Concluídos</p>
              <p className="text-2xl font-bold text-gray-900">
                {procedimentosConcluidos}
              </p>
            </div>
          </div>
        </div>

        {/* Valor Total */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Valor Total</p>
              <p className="text-xl font-bold text-green-900">
                R$ {valorTotal.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Progresso */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Andamento do Tratamento
          </span>
          <span className="text-sm font-semibold text-blue-600">
            {progresso}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>

      {/* Anotações do Plano */}
      {plano.anotacoes && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">
            Observações do Plano
          </h3>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {plano.anotacoes}
          </p>
        </div>
      )}

      {/* Botão Agendar Procedimentos */}
      {isAvaliacaoAprovada && isPlanoTratamento && !readOnly && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-amber-900">
                Procedimentos Pendentes de Agendamento
              </h3>
              <p className="text-sm text-amber-800 mt-1">
                Selecione os profissionais e datas para agendar os procedimentos
                da avaliação
              </p>
            </div>
            <Button
              variant="primary"
              onClick={() => setShowAgendarModal(true)}
              disabled={loadingProfissionais}
            >
              <PlusCircleIcon className="w-5 h-5 mr-2 inline" />
              Agendar Procedimentos
            </Button>
          </div>
        </div>
      )}

      {/* Lista de Procedimentos */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">
          Procedimentos do Plano ({procedimentos.length})
        </h3>
        <div className="space-y-3">
          {procedimentos.map((proc) => (
            <ProcedimentoProgressCard
              key={proc.id}
              procedimento={proc}
              onUpdateProgresso={onUpdateProgresso}
              isExpanded={expandedProcedimento === proc.id}
              onToggleExpand={() =>
                setExpandedProcedimento(
                  expandedProcedimento === proc.id ? null : proc.id
                )
              }
              readOnly={readOnly}
            />
          ))}
        </div>
      </div>

      {/* Modal Agendar Procedimentos */}
      <AgendarProcedimentosModal
        isOpen={showAgendarModal}
        onClose={() => setShowAgendarModal(false)}
        onSuccess={handleAgendarSuccess}
        avaliacaoId={plano.avaliacao?.id || plano.id}
        pacienteNome={plano.paciente?.nome || "Paciente"}
        profissionais={profissionais}
      />
    </div>
  );
}
