// frontend/src/components/atendimentos/detalhes/AtendimentoProcedimentosPlano.tsx

"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { PercentualSlider } from "./PercentualSlider";

interface ProcedimentoPlano {
  id: string;
  ordem: number;
  progresso: "NAO_INICIADO" | "EM_ANDAMENTO" | "CONCLUIDO";
  percentualProgresso?: number;
  observacoes?: string;
  valorPraticado?: number;
  procedimento: {
    nome: string;
    duracaoMinutos: number;
    temStatus: boolean;
  };
  agendamento?: {
    dataHora: string;
  };
}

interface AtendimentoProcedimentosPlanoProps {
  procedimentos: ProcedimentoPlano[];
  onUpdatePercentual?: (
    procedimentoPlanoId: string,
    percentual: number
  ) => void;
  isEditing?: boolean;
}

const formatCurrency = (value: any) => {
  if (!value) return "0,00";
  return Number(value).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatDateTime = (date: string) => {
  return new Date(date).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getProgressoBadge = (progresso: string) => {
  const badges: Record<string, { color: string; label: string }> = {
    NAO_INICIADO: { color: "gray", label: "Não Iniciado" },
    EM_ANDAMENTO: { color: "blue", label: "Em Andamento" },
    CONCLUIDO: { color: "green", label: "Concluído" },
  };
  return badges[progresso] || { color: "gray", label: progresso };
};

export function AtendimentoProcedimentosPlano({
  procedimentos,
  onUpdatePercentual,
  isEditing = false,
}: AtendimentoProcedimentosPlanoProps) {
  const [sliderOpen, setSliderOpen] = useState(false);
  const [selectedProcedimento, setSelectedProcedimento] =
    useState<ProcedimentoPlano | null>(null);

  const handleOpenSlider = (proc: ProcedimentoPlano) => {
    console.log(
      "🔵 Abrindo slider de percentual para:",
      proc.procedimento.nome
    );
    setSelectedProcedimento(proc);
    setSliderOpen(true);
  };

  const handleSavePercentual = (percentual: number) => {
    console.log("💾 Salvando percentual:", percentual);
    if (selectedProcedimento && onUpdatePercentual) {
      onUpdatePercentual(selectedProcedimento.id, percentual);
    }
  };

  return (
    <>
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Procedimentos do Plano
          </h2>
          <div className="space-y-3">
            {procedimentos.map((proc) => {
              const progressoInfo = getProgressoBadge(proc.progresso);
              return (
                <div
                  key={proc.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-500">
                          #{proc.ordem}
                        </span>
                        <h4 className="font-medium text-gray-900">
                          {proc.procedimento.nome}
                        </h4>
                      </div>

                      {proc.observacoes && (
                        <p className="text-sm text-gray-600 mb-2">
                          {proc.observacoes}
                        </p>
                      )}

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        {proc.valorPraticado && (
                          <span>R$ {formatCurrency(proc.valorPraticado)}</span>
                        )}
                        <span>{proc.procedimento.duracaoMinutos} min</span>
                        {proc.agendamento && (
                          <span>
                            Agendado:{" "}
                            {formatDateTime(proc.agendamento.dataHora)}
                          </span>
                        )}
                      </div>

                      {proc.procedimento.temStatus &&
                        proc.percentualProgresso !== undefined && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600">Progresso</span>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {proc.percentualProgresso}%
                                </span>
                                {isEditing && onUpdatePercentual && (
                                  <button
                                    onClick={() => handleOpenSlider(proc)}
                                    className="text-blue-600 hover:text-blue-800 text-xs underline"
                                  >
                                    Ajustar
                                  </button>
                                )}
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all"
                                style={{
                                  width: `${proc.percentualProgresso}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                    </div>

                    <Badge variant={progressoInfo.color as any}>
                      {progressoInfo.label}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Slider de Percentual */}
      {selectedProcedimento && (
        <PercentualSlider
          isOpen={sliderOpen}
          onClose={() => {
            console.log("🔴 Fechando slider de percentual");
            setSliderOpen(false);
            setSelectedProcedimento(null);
          }}
          procedimentoNome={selectedProcedimento.procedimento.nome}
          percentualAtual={selectedProcedimento.percentualProgresso || 0}
          onSave={handleSavePercentual}
        />
      )}
    </>
  );
}
