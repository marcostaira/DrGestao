// frontend/src/components/atendimentos/detalhes/AtendimentoAnotacoes.tsx

"use client";

import Card from "@/components/ui/Card";

interface AtendimentoAnotacoesProps {
  isEditing: boolean;
  anotacoes: string;
  onAnotacoesChange: (value: string) => void;
}

export function AtendimentoAnotacoes({
  isEditing,
  anotacoes,
  onAnotacoesChange,
}: AtendimentoAnotacoesProps) {
  return (
    <Card>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Anotações</h2>

        {isEditing ? (
          <textarea
            value={anotacoes}
            onChange={(e) => onAnotacoesChange(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite as anotações do atendimento..."
          />
        ) : (
          <p className="text-gray-700 whitespace-pre-wrap">
            {anotacoes || (
              <span className="text-gray-400 italic">
                Nenhuma anotação registrada
              </span>
            )}
          </p>
        )}
      </div>
    </Card>
  );
}
