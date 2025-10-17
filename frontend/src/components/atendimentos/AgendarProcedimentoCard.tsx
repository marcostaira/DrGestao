// frontend/src/components/atendimentos/AgendarProcedimentoCard.tsx

"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import {
  CalendarIcon,
  UserIcon,
  ClockIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { agendamentoProcedimentosService } from "@/services/agendamentoProcedimentosService";
import { toast } from "react-hot-toast";

interface AgendarProcedimentoCardProps {
  procedimento: {
    atendimentoProcedimentoId: string;
    procedimentoNome: string;
    duracaoMinutos: number;
    valor?: number;
    ordem: number;
  };
  profissionais: any[];
  onSuccess: () => void;
  onCancel: () => void;
}

export function AgendarProcedimentoCard({
  procedimento,
  profissionais,
  onSuccess,
  onCancel,
}: AgendarProcedimentoCardProps) {
  const [submitting, setSubmitting] = useState(false);
  const [profissionalId, setProfissionalId] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [erros, setErros] = useState<string>("");

  const handleSubmit = async () => {
    if (!profissionalId) {
      setErros("Selecione um profissional");
      return;
    }
    if (!dataHora) {
      setErros("Selecione data e hora");
      return;
    }

    try {
      setSubmitting(true);
      await agendamentoProcedimentosService.agendarProcedimentoIndividual(
        procedimento.atendimentoProcedimentoId,
        profissionalId,
        new Date(dataHora).toISOString()
      );

      toast.success("Procedimento agendado com sucesso!");
      onSuccess();
    } catch (error: any) {
      toast.error(
        error.response?.data?.error || "Erro ao agendar procedimento"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-gray-900">
            {procedimento.procedimentoNome}
          </p>
          <div className="flex gap-4 mt-1 text-xs text-gray-600">
            <span className="flex items-center gap-1">
              <span>📋</span> Ordem {procedimento.ordem}
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon className="w-3 h-3" /> {procedimento.duracaoMinutos}
              min
            </span>
            {procedimento.valor && (
              <span className="flex items-center gap-1">
                💰 R$ {procedimento.valor}
              </span>
            )}
          </div>
        </div>
      </div>

      {erros && <p className="text-xs text-red-600">{erros}</p>}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            <UserIcon className="w-3 h-3 inline mr-1" />
            Profissional
          </label>
          <select
            value={profissionalId}
            onChange={(e) => {
              setProfissionalId(e.target.value);
              setErros("");
            }}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-primary-500"
          >
            <option value="">Selecione...</option>
            {profissionais.map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            <CalendarIcon className="w-3 h-3 inline mr-1" />
            Data e Hora
          </label>
          <input
            type="datetime-local"
            value={dataHora}
            onChange={(e) => {
              setDataHora(e.target.value);
              setErros("");
            }}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-primary-500"
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <Button
          size="sm"
          variant="secondary"
          onClick={onCancel}
          disabled={submitting}
        >
          <XMarkIcon className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="primary"
          onClick={handleSubmit}
          isLoading={submitting}
        >
          <CheckIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
