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

interface AgendamentoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateAgendamentoData) => Promise<boolean>;
  editingAgendamento?: Agendamento | null;
  initialDateTime?: Date;
  profissionais: Profissional[];
  pacientes: Paciente[];
  procedimentos: Procedimento[];
}

// Função auxiliar para converter Date local para string datetime-local
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
  const [formData, setFormData] = useState<CreateAgendamentoData>({
    pacienteId: "",
    profissionalId: "",
    procedimentoId: "",
    dataHora: "",
    observacoes: "",
  });

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

    // Enviar data/hora local SEM conversão para UTC
    // O backend vai receber e interpretar como está
    console.log("DEBUG Frontend - Enviando agendamento:");
    console.log("- Data/hora local (input):", formData.dataHora);

    const data = {
      ...formData,
      dataHora: formData.dataHora, // Enviar como está
      pacienteId: formData.pacienteId || undefined,
      procedimentoId: formData.procedimentoId || undefined,
      observacoes: formData.observacoes || undefined,
    };

    const success = await onSubmit(data);
    setIsSubmitting(false);

    if (success) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingAgendamento ? "Editar Agendamento" : "Novo Agendamento"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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
          >
            <option value="">Sem paciente (bloqueio de horário)</option>
            {pacientes.map((pac) => (
              <option key={pac.id} value={pac.id}>
                {pac.nome}
              </option>
            ))}
          </select>
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

        <Input
          label="Data e Hora"
          type="datetime-local"
          value={formData.dataHora}
          onChange={(e) =>
            setFormData({ ...formData, dataHora: e.target.value })
          }
          required
        />

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
            {editingAgendamento ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
