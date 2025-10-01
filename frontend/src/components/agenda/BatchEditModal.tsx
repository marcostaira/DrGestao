"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import TextArea from "@/components/ui/TextArea";
import { StatusAgendamento } from "@/services/agendamentoService";

interface BatchEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  selectedIds: string[];
  profissionais: any[];
  procedimentos: any[];
}

export function BatchEditModal({
  isOpen,
  onClose,
  onSubmit,
  selectedIds,
  profissionais,
  procedimentos,
}: BatchEditModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    profissionalId: "",
    procedimentoId: "",
    status: "",
    observacoes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar se pelo menos um campo foi preenchido
    const hasChanges = Object.values(formData).some((value) => value !== "");

    if (!hasChanges) {
      alert("Preencha pelo menos um campo para atualizar");
      return;
    }

    setIsLoading(true);

    try {
      const updateData: any = {};

      if (formData.profissionalId)
        updateData.profissionalId = formData.profissionalId;
      if (formData.procedimentoId)
        updateData.procedimentoId = formData.procedimentoId;
      if (formData.status) updateData.status = formData.status;
      if (formData.observacoes) updateData.observacoes = formData.observacoes;

      await onSubmit({ ids: selectedIds, data: updateData });
      onClose();
      resetForm();
    } catch (error) {
      console.error("Erro ao atualizar agendamentos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      profissionalId: "",
      procedimentoId: "",
      status: "",
      observacoes: "",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Editar ${selectedIds.length} Agendamento(s)`}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-blue-800">
            <strong>Atenção:</strong> As alterações serão aplicadas a{" "}
            <strong>{selectedIds.length}</strong> agendamento(s) selecionado(s).
            Campos não preenchidos permanecerão inalterados.
          </p>
        </div>

        {/* Profissional */}
        <Select
          label="Alterar Profissional (opcional)"
          value={formData.profissionalId}
          onChange={(e) =>
            setFormData({ ...formData, profissionalId: e.target.value })
          }
        >
          <option value="">Não alterar</option>
          {profissionais.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome} - {p.especialidade}
            </option>
          ))}
        </Select>

        {/* Procedimento */}
        <Select
          label="Alterar Procedimento (opcional)"
          value={formData.procedimentoId}
          onChange={(e) =>
            setFormData({ ...formData, procedimentoId: e.target.value })
          }
        >
          <option value="">Não alterar</option>
          {procedimentos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome} ({p.duracaoMinutos} min)
            </option>
          ))}
        </Select>

        {/* Status */}
        <Select
          label="Alterar Status (opcional)"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="">Não alterar</option>
          <option value={StatusAgendamento.MARCADO}>🟡 Marcado</option>
          <option value={StatusAgendamento.CONFIRMADO}>🟢 Confirmado</option>
          <option value={StatusAgendamento.COMPARECEU}>🔵 Compareceu</option>
          <option value={StatusAgendamento.FALTOU}>🔴 Faltou</option>
          <option value={StatusAgendamento.CANCELADO}>⚫ Cancelado</option>
        </Select>

        {/* Observações */}
        <TextArea
          label="Alterar Observações (opcional)"
          value={formData.observacoes}
          onChange={(e) =>
            setFormData({ ...formData, observacoes: e.target.value })
          }
          rows={3}
          placeholder="Digite para sobrescrever as observações existentes"
        />

        {/* Botões */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Atualizar {selectedIds.length} Agendamento(s)
          </Button>
        </div>
      </form>
    </Modal>
  );
}
