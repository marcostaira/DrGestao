"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import TextArea from "@/components/ui/TextArea";
import { RecorrenciaData } from "@/services/agendamentoService";
import { format, addDays } from "date-fns";

interface BatchCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  profissionais: any[];
  pacientes: any[];
  procedimentos: any[];
  initialDateTime?: Date;
}

export function BatchCreateModal({
  isOpen,
  onClose,
  onSubmit,
  profissionais,
  pacientes,
  procedimentos,
  initialDateTime,
}: BatchCreateModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showRecorrencia, setShowRecorrencia] = useState(false);

  const [formData, setFormData] = useState({
    pacienteId: "",
    profissionalId: "",
    procedimentoId: "",
    dataHora: initialDateTime
      ? format(initialDateTime, "yyyy-MM-dd'T'HH:mm")
      : "",
    observacoes: "",
  });

  const [recorrencia, setRecorrencia] = useState<RecorrenciaData>({
    tipo: "DIARIA",
    dataFim: format(addDays(new Date(), 30), "yyyy-MM-dd"),
    diasSemana: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.dataHora || !formData.profissionalId) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    setIsLoading(true);

    try {
      const submitData: any = {
        ...formData,
        pacienteId: formData.pacienteId || undefined,
        procedimentoId: formData.procedimentoId || undefined,
      };

      if (showRecorrencia) {
        submitData.recorrencia = recorrencia;
      }

      await onSubmit(submitData);
      onClose();
      resetForm();
    } catch (error) {
      console.error("Erro ao criar agendamentos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      pacienteId: "",
      profissionalId: "",
      procedimentoId: "",
      dataHora: "",
      observacoes: "",
    });
    setRecorrencia({
      tipo: "DIARIA",
      dataFim: format(addDays(new Date(), 30), "yyyy-MM-dd"),
      diasSemana: [],
    });
    setShowRecorrencia(false);
  };

  const handleDiaSemanaToggle = (dia: number) => {
    setRecorrencia((prev) => {
      const diasSemana = prev.diasSemana || [];
      if (diasSemana.includes(dia)) {
        return {
          ...prev,
          diasSemana: diasSemana.filter((d) => d !== dia),
        };
      } else {
        return {
          ...prev,
          diasSemana: [...diasSemana, dia].sort(),
        };
      }
    });
  };

  const diasSemanaNomes = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Criar Agendamento(s)"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Paciente */}
        <Select
          label="Paciente (opcional)"
          value={formData.pacienteId}
          onChange={(e) =>
            setFormData({ ...formData, pacienteId: e.target.value })
          }
        >
          <option value="">Sem paciente (bloqueio)</option>
          {pacientes.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome} - {p.telefone}
            </option>
          ))}
        </Select>

        {/* Profissional */}
        <Select
          label="Profissional *"
          value={formData.profissionalId}
          onChange={(e) =>
            setFormData({ ...formData, profissionalId: e.target.value })
          }
          required
        >
          <option value="">Selecione...</option>
          {profissionais.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome} - {p.especialidade}
            </option>
          ))}
        </Select>

        {/* Procedimento */}
        <Select
          label="Procedimento (opcional)"
          value={formData.procedimentoId}
          onChange={(e) =>
            setFormData({ ...formData, procedimentoId: e.target.value })
          }
        >
          <option value="">Nenhum</option>
          {procedimentos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome} ({p.duracaoMinutos} min)
            </option>
          ))}
        </Select>

        {/* Data e Hora */}
        <Input
          label="Data e Hora *"
          type="datetime-local"
          value={formData.dataHora}
          onChange={(e) =>
            setFormData({ ...formData, dataHora: e.target.value })
          }
          required
        />

        {/* Toggle Recorrência */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="showRecorrencia"
            checked={showRecorrencia}
            onChange={(e) => setShowRecorrencia(e.target.checked)}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="showRecorrencia" className="text-sm text-gray-700">
            Criar múltiplos agendamentos (recorrência)
          </label>
        </div>

        {/* Configuração de Recorrência */}
        {showRecorrencia && (
          <div className="border border-gray-200 rounded-lg p-4 space-y-4 bg-gray-50">
            <h4 className="font-medium text-gray-900">
              Configuração de Recorrência
            </h4>

            {/* Tipo de Recorrência */}
            <Select
              label="Tipo de Recorrência"
              value={recorrencia.tipo}
              onChange={(e) =>
                setRecorrencia({
                  ...recorrencia,
                  tipo: e.target.value as "DIARIA" | "SEMANAL" | "MENSAL",
                })
              }
            >
              <option value="DIARIA">Diária</option>
              <option value="SEMANAL">Semanal</option>
              <option value="MENSAL">Mensal</option>
            </Select>

            {/* Dias da Semana (apenas para SEMANAL) */}
            {recorrencia.tipo === "SEMANAL" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dias da Semana
                </label>
                <div className="flex flex-wrap gap-2">
                  {diasSemanaNomes.map((nome, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleDiaSemanaToggle(index)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        recorrencia.diasSemana?.includes(index)
                          ? "bg-primary-600 text-white"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {nome.substring(0, 3)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Data Final */}
            <Input
              label="Repetir até"
              type="date"
              value={recorrencia.dataFim}
              onChange={(e) =>
                setRecorrencia({ ...recorrencia, dataFim: e.target.value })
              }
              min={format(new Date(), "yyyy-MM-dd")}
              required
            />

            <p className="text-xs text-gray-500">
              Os agendamentos serão criados automaticamente até a data
              especificada, respeitando a recorrência escolhida.
            </p>
          </div>
        )}

        {/* Observações */}
        <TextArea
          label="Observações"
          value={formData.observacoes}
          onChange={(e) =>
            setFormData({ ...formData, observacoes: e.target.value })
          }
          rows={3}
        />

        {/* Botões */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {showRecorrencia ? "Criar Agendamentos" : "Criar Agendamento"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
