// frontend/src/components/atendimentos/detalhes/AtendimentoProcedimentos.tsx

"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface AtendimentoProcedimentosProps {
  isEditing: boolean;
  procedimentos: string[];
  onProcedimentosChange: (procedimentos: string[]) => void;
}

export function AtendimentoProcedimentos({
  isEditing,
  procedimentos,
  onProcedimentosChange,
}: AtendimentoProcedimentosProps) {
  const [novoProcedimento, setNovoProcedimento] = useState("");

  const handleAdd = () => {
    if (novoProcedimento.trim()) {
      onProcedimentosChange([...procedimentos, novoProcedimento.trim()]);
      setNovoProcedimento("");
    }
  };

  const handleRemove = (index: number) => {
    onProcedimentosChange(procedimentos.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Procedimentos Realizados
        </h2>

        {isEditing ? (
          <div className="space-y-3">
            {procedimentos.length > 0 ? (
              <ul className="space-y-2">
                {procedimentos.map((proc, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded"
                  >
                    <span className="text-gray-700">{proc}</span>
                    <button
                      onClick={() => handleRemove(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 italic text-sm">
                Nenhum procedimento adicionado
              </p>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                value={novoProcedimento}
                onChange={(e) => setNovoProcedimento(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAdd();
                  }
                }}
                placeholder="Digite um procedimento e pressione Enter"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button type="button" size="sm" onClick={handleAdd}>
                Adicionar
              </Button>
            </div>
          </div>
        ) : (
          <>
            {procedimentos.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {procedimentos.map((proc, index) => (
                  <li key={index} className="text-gray-700">
                    {proc}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 italic">
                Nenhum procedimento registrado
              </p>
            )}
          </>
        )}
      </div>
    </Card>
  );
}
