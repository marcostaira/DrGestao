// frontend/src/components/atendimentos/AgendarProcedimentosModal.tsx

"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import {
  XMarkIcon,
  CalendarIcon,
  UserIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { agendamentoProcedimentosService } from "@/services/agendamentoProcedimentosService";
import { ProcedimentoParaAgendar } from "@/types/agendamento-procedimentos.types";
import { toast } from "react-hot-toast";

interface AgendarProcedimentosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  avaliacaoId: string;
  pacienteNome: string;
  profissionais: any[];
}

interface FormData {
  [key: string]: {
    profissionalId: string;
    dataHora: string;
  };
}

export function AgendarProcedimentosModal({
  isOpen,
  onClose,
  onSuccess,
  avaliacaoId,
  pacienteNome,
  profissionais,
}: AgendarProcedimentosModalProps) {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [procedimentos, setProcedimentos] = useState<ProcedimentoParaAgendar[]>(
    []
  );
  const [formData, setFormData] = useState<FormData>({});
  const [erros, setErros] = useState<{ [key: string]: string }>({});
  const [proximosAgendamentos, setProximosAgendamentos] = useState<string[]>(
    []
  );

  // Carregar procedimentos pendentes
  useEffect(() => {
    if (isOpen) {
      loadProcedimentos();
    }
  }, [isOpen]);

  const loadProcedimentos = async () => {
    try {
      setLoading(true);
      const data =
        await agendamentoProcedimentosService.listarProcedimentosParaAgendar(
          avaliacaoId
        );

      setProcedimentos(data.procedimentosParaAgendar || []);

      // Inicializar formData
      const initialFormData: FormData = {};
      data.procedimentosParaAgendar?.forEach((proc: any) => {
        initialFormData[proc.atendimentoProcedimentoId] = {
          profissionalId: "",
          dataHora: "",
        };
      });
      setFormData(initialFormData);
    } catch (error: any) {
      console.error("Erro ao carregar procedimentos:", error);
      toast.error(
        error.response?.data?.error ||
          "Erro ao carregar procedimentos para agendar"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleProfissionalChange = (
    procedimentoId: string,
    profissionalId: string
  ) => {
    setFormData({
      ...formData,
      [procedimentoId]: {
        ...formData[procedimentoId],
        profissionalId,
      },
    });
    // Limpar erro se houver
    if (erros[procedimentoId]) {
      const newErros = { ...erros };
      delete newErros[procedimentoId];
      setErros(newErros);
    }
  };

  const handleDataHoraChange = (procedimentoId: string, dataHora: string) => {
    setFormData({
      ...formData,
      [procedimentoId]: {
        ...formData[procedimentoId],
        dataHora,
      },
    });
  };

  const validarFormulario = (): boolean => {
    const newErros: { [key: string]: string } = {};

    Object.entries(formData).forEach(([procId, data]) => {
      if (!data.profissionalId) {
        newErros[procId] = "Selecione um profissional";
      } else if (!data.dataHora) {
        newErros[procId] = "Selecione data e hora";
      }
    });

    setErros(newErros);
    return Object.keys(newErros).length === 0;
  };

  const handleSubmit = async () => {
    if (!validarFormulario()) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        avaliacaoId,
        procedimentos: Object.entries(formData).map(([procId, data]) => ({
          atendimentoProcedimentoId: procId,
          profissionalId: data.profissionalId,
          dataHora: new Date(data.dataHora).toISOString(),
        })),
      };

      const resultado =
        await agendamentoProcedimentosService.agendarProcedimentos(payload);

      toast.success(
        `${resultado.totalAgendados} procedimento(s) agendado(s) com sucesso!`
      );

      if (resultado.erros && resultado.erros.length > 0) {
        toast.error(
          `Atenção: ${resultado.erros.length} procedimento(s) não foram agendados`
        );
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Erro ao agendar:", error);
      toast.error(
        error.response?.data?.error || "Erro ao agendar procedimentos"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Agendar Procedimentos da Avaliação"
      size="lg"
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Paciente:</span> {pacienteNome}
          </p>
          <p className="text-sm text-blue-900 mt-1">
            <span className="font-semibold">Total de procedimentos:</span>{" "}
            {procedimentos.length}
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        )}

        {/* Sem procedimentos */}
        {!loading && procedimentos.length === 0 && (
          <div className="text-center py-8">
            <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500 mb-2" />
            <p className="text-gray-600">
              Todos os procedimentos desta avaliação já foram agendados! ✅
            </p>
          </div>
        )}

        {/* Procedimentos */}
        {!loading && procedimentos.length > 0 && (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {procedimentos.map((proc) => (
              <div
                key={proc.atendimentoProcedimentoId}
                className="border rounded-lg p-4 space-y-3"
              >
                {/* Nome do Procedimento */}
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {proc.procedimentoNome}
                  </p>
                  <div className="flex gap-4 mt-1 text-xs text-gray-500">
                    <span>📋 Ordem: {proc.ordem}</span>
                    <span>⏱️ Duração: {proc.duracaoMinutos}min</span>
                    {proc.valor && <span>💰 Valor: R$ {proc.valor}</span>}
                  </div>
                  {proc.observacoes && (
                    <p className="text-xs text-gray-600 mt-1 italic">
                      Obs: {proc.observacoes}
                    </p>
                  )}
                </div>

                {/* Profissional */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    <UserIcon className="w-4 h-4 inline mr-1" />
                    Profissional *
                  </label>
                  <select
                    value={
                      formData[proc.atendimentoProcedimentoId]
                        ?.profissionalId || ""
                    }
                    onChange={(e) =>
                      handleProfissionalChange(
                        proc.atendimentoProcedimentoId,
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Selecione...</option>
                    {profissionais.map((prof) => (
                      <option key={prof.id} value={prof.id}>
                        {prof.nome}
                      </option>
                    ))}
                  </select>
                  {erros[proc.atendimentoProcedimentoId] && (
                    <p className="text-xs text-red-600 mt-1">
                      {erros[proc.atendimentoProcedimentoId]}
                    </p>
                  )}
                </div>

                {/* Data e Hora */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    <CalendarIcon className="w-4 h-4 inline mr-1" />
                    Data e Hora *
                  </label>
                  <input
                    type="datetime-local"
                    value={
                      formData[proc.atendimentoProcedimentoId]?.dataHora || ""
                    }
                    onChange={(e) =>
                      handleDataHoraChange(
                        proc.atendimentoProcedimentoId,
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        {!loading && procedimentos.length > 0 && (
          <div className="flex gap-3 justify-end border-t pt-4">
            <Button variant="secondary" onClick={onClose} disabled={submitting}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              isLoading={submitting}
            >
              Agendar {procedimentos.length} Procedimento
              {procedimentos.length > 1 ? "s" : ""}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
