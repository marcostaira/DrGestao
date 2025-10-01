import React, { useState, useEffect } from "react";
import {
  Agendamento,
  CreateAgendamentoData,
} from "@/services/agendamentoService";
import { Profissional } from "@/services/profissionalService";
import { Paciente } from "@/services/pacienteService";
import { Procedimento } from "@/services/procedimentoService";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { countRecorrencia } from "@/services/agendamentoService";

interface AgendamentoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<boolean>;
  editingAgendamento?: Agendamento | null;
  initialDateTime?: Date;
  profissionais: Profissional[];
  pacientes: Paciente[];
  procedimentos: Procedimento[];
}

const toLocalISOString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const AgendamentoFormModal: React.FC<AgendamentoFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingAgendamento,
  initialDateTime,
  profissionais,
  pacientes,
  procedimentos,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editarRecorrencia, setEditarRecorrencia] = useState(false);
  const [recorrenciaCount, setRecorrenciaCount] = useState(0);

  const [formData, setFormData] = useState<CreateAgendamentoData>({
    pacienteId: "",
    profissionalId: "",
    procedimentoId: "",
    dataHora: "",
    observacoes: "",
  });

  // Carregar contagem de recorrência
  useEffect(() => {
    const loadRecorrenciaCount = async () => {
      if (editingAgendamento?.recorrenciaId) {
        try {
          const count = await countRecorrencia(
            editingAgendamento.recorrenciaId
          );
          setRecorrenciaCount(count);
        } catch (error) {
          console.error("Erro ao carregar contagem de recorrência:", error);
          setRecorrenciaCount(0);
        }
      } else {
        setRecorrenciaCount(0);
        setEditarRecorrencia(false);
      }
    };

    if (isOpen) {
      loadRecorrenciaCount();
    }
  }, [editingAgendamento, isOpen]);

  useEffect(() => {
    if (editingAgendamento) {
      const localDate = new Date(editingAgendamento.dataHora);
      setFormData({
        pacienteId: editingAgendamento.pacienteId || "",
        profissionalId: editingAgendamento.profissionalId,
        procedimentoId: editingAgendamento.procedimentoId || "",
        dataHora: toLocalISOString(localDate),
        observacoes: editingAgendamento.observacoes || "",
      });
    } else {
      const defaultDateTime = initialDateTime || new Date();
      setFormData({
        pacienteId: "",
        profissionalId: profissionais[0]?.id || "",
        procedimentoId: "",
        dataHora: toLocalISOString(defaultDateTime),
        observacoes: "",
      });
    }
  }, [editingAgendamento, initialDateTime, profissionais, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let success = false;

      const data = {
        ...formData,
        dataHora: formData.dataHora,
        pacienteId: formData.pacienteId || undefined,
        procedimentoId: formData.procedimentoId || undefined,
        observacoes: formData.observacoes || undefined,
      };

      if (
        editingAgendamento &&
        editarRecorrencia &&
        editingAgendamento.recorrenciaId
      ) {
        // Editar toda a recorrência
        success = await onSubmit({
          recorrenciaId: editingAgendamento.recorrenciaId,
          data: {
            profissionalId: data.profissionalId,
            procedimentoId: data.procedimentoId,
            observacoes: data.observacoes,
          },
          isRecorrencia: true,
        });
      } else {
        // Criar ou editar apenas este agendamento
        success = await onSubmit(data);
      }

      if (success) {
        onClose();
        setEditarRecorrencia(false);
      }
    } catch (error) {
      console.error("Erro ao salvar agendamento:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingAgendamento ? "Editar Agendamento" : "Novo Agendamento"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Alerta de Recorrência */}
        {editingAgendamento?.recorrenciaId && recorrenciaCount > 1 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg
                className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-blue-800">
                  Este agendamento faz parte de uma recorrência
                </h3>
                <p className="mt-2 text-sm text-blue-700">
                  Existem <strong>{recorrenciaCount}</strong> agendamentos
                  vinculados a esta recorrência.
                </p>
                <div className="mt-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editarRecorrencia}
                      onChange={(e) => setEditarRecorrencia(e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-blue-800 font-medium">
                      Aplicar alterações a todos os {recorrenciaCount}{" "}
                      agendamentos desta recorrência
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Paciente{" "}
            <span className="text-xs text-gray-500">
              (opcional para bloqueio)
            </span>
          </label>
          <select
            value={formData.pacienteId}
            onChange={(e) =>
              setFormData({ ...formData, pacienteId: e.target.value })
            }
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={editarRecorrencia}
          >
            <option value="">Sem paciente (bloqueio de horário)</option>
            {pacientes.map((pac) => (
              <option key={pac.id} value={pac.id}>
                {pac.nome}
              </option>
            ))}
          </select>
          {editarRecorrencia && (
            <p className="mt-1 text-xs text-gray-500">
              Paciente não pode ser alterado em edição de recorrência
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profissional <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.profissionalId}
            onChange={(e) =>
              setFormData({ ...formData, profissionalId: e.target.value })
            }
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          >
            <option value="">Selecione um profissional</option>
            {profissionais.map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Procedimento <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.procedimentoId}
            onChange={(e) =>
              setFormData({ ...formData, procedimentoId: e.target.value })
            }
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          >
            <option value="">Selecione um procedimento</option>
            {procedimentos.map((proc) => (
              <option key={proc.id} value={proc.id}>
                {proc.nome} ({proc.duracaoMinutos}min)
              </option>
            ))}
          </select>
        </div>

        <div>
          <Input
            label="Data e Hora"
            type="datetime-local"
            value={formData.dataHora}
            onChange={(e) =>
              setFormData({ ...formData, dataHora: e.target.value })
            }
            required
            disabled={editarRecorrencia}
          />
          {editarRecorrencia && (
            <p className="mt-1 text-xs text-gray-500">
              Data/hora não pode ser alterada em edição de recorrência
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Observações
          </label>
          <textarea
            value={formData.observacoes}
            onChange={(e) =>
              setFormData({ ...formData, observacoes: e.target.value })
            }
            rows={3}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Informações adicionais..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {editingAgendamento
              ? editarRecorrencia
                ? `Atualizar ${recorrenciaCount} Agendamentos`
                : "Atualizar"
              : "Criar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
