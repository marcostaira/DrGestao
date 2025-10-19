// frontend/src/components/atendimentos/RegistroAtendimentoForm.tsx

"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { AtendimentoDetalhado } from "@/types/atendimento.types";

interface RegistroAtendimentoFormProps {
  atendimento: AtendimentoDetalhado;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export function RegistroAtendimentoForm({
  atendimento,
  onSubmit,
  onCancel,
}: RegistroAtendimentoFormProps) {
  const [formData, setFormData] = useState({
    anotacoes: atendimento.anotacoes || "",
    procedimentosRealizados: atendimento.procedimentosRealizados || [],
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await onSubmit(formData);
    } catch (error) {
      // Erro tratado no componente pai
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Anotações */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Anotações do Atendimento
        </label>
        <textarea
          value={formData.anotacoes}
          onChange={(e) =>
            setFormData({ ...formData, anotacoes: e.target.value })
          }
          rows={6}
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="Descreva detalhadamente o atendimento realizado, observações importantes, evolução do paciente, etc."
        />
        <p className="text-xs text-gray-500 mt-1">
          Estas anotações ficarão registradas no prontuário do paciente
        </p>
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button type="submit" isLoading={loading}>
          Salvar Atendimento
        </Button>
      </div>
    </form>
  );
}
