// frontend/src/components/atendimentos/detalhes/AtendimentoProcedimentos.tsx

"use client";

import { useState } from "react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ProcedimentoSlider } from "./ProcedimentoSlider";

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
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  const handleAddProcedimento = (nome: string) => {
    if (!procedimentos.includes(nome)) {
      onProcedimentosChange([...procedimentos, nome]);
    }
  };

  const handleRemove = (index: number) => {
    onProcedimentosChange(procedimentos.filter((_, i) => i !== index));
  };

  return (
    <>
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Procedimentos Realizados
            </h2>
            {isEditing && (
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => {
                  console.log("🔵 Abrindo slider...");
                  setIsSliderOpen(true);
                }}
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Adicionar
              </Button>
            )}
          </div>

          {procedimentos.length > 0 ? (
            <ul
              className={`space-y-2 ${
                isEditing ? "" : "list-disc list-inside"
              }`}
            >
              {procedimentos.map((proc, index) => (
                <li
                  key={index}
                  className={
                    isEditing
                      ? "flex items-center justify-between bg-gray-50 px-3 py-2 rounded"
                      : "text-gray-700"
                  }
                >
                  <span className="text-gray-700">{proc}</span>
                  {isEditing && (
                    <button
                      onClick={() => handleRemove(index)}
                      className="text-red-600 hover:text-red-800 ml-2"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 italic text-sm">
              {isEditing
                ? "Nenhum procedimento adicionado. Clique em 'Adicionar' para selecionar."
                : "Nenhum procedimento registrado"}
            </p>
          )}
        </div>
      </Card>

      {/* Slider */}
      <ProcedimentoSlider
        isOpen={isSliderOpen}
        onClose={() => {
          console.log("🔴 Fechando slider...");
          setIsSliderOpen(false);
        }}
        procedimentosSelecionados={procedimentos}
        onAddProcedimento={handleAddProcedimento}
      />
    </>
  );
}
