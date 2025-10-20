// frontend/src/components/atendimentos/detalhes/ProcedimentoSlider.tsx

"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon, PlusIcon, CheckIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import { getProcedimentos, Procedimento } from "@/services/procedimentoService";

interface ProcedimentoSliderProps {
  isOpen: boolean;
  onClose: () => void;
  procedimentosSelecionados: string[];
  onAddProcedimento: (nome: string) => void;
}

export function ProcedimentoSlider({
  isOpen,
  onClose,
  procedimentosSelecionados,
  onAddProcedimento,
}: ProcedimentoSliderProps) {
  const [procedimentos, setProcedimentos] = useState<Procedimento[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [novoProcedimento, setNovoProcedimento] = useState("");

  useEffect(() => {
    if (isOpen) {
      loadProcedimentos();
    }
  }, [isOpen]);

  const loadProcedimentos = async () => {
    try {
      setLoading(true);
      const data = await getProcedimentos();
      setProcedimentos(data);
    } catch (error) {
      console.error("Erro ao carregar procedimentos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFromList = (nome: string) => {
    if (!procedimentosSelecionados.includes(nome)) {
      onAddProcedimento(nome);
    }
  };

  const handleAddManual = () => {
    if (
      novoProcedimento.trim() &&
      !procedimentosSelecionados.includes(novoProcedimento.trim())
    ) {
      onAddProcedimento(novoProcedimento.trim());
      setNovoProcedimento("");
    }
  };

  const filteredProcedimentos = procedimentos.filter((proc) =>
    proc.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  const content = (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Slider Panel */}
      <div className="absolute inset-y-0 right-0 max-w-lg w-full bg-white shadow-xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Adicionar Procedimentos
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Search */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Buscar procedimento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {/* Lista de procedimentos cadastrados */}
              {filteredProcedimentos.length > 0 ? (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Procedimentos Cadastrados ({filteredProcedimentos.length})
                  </h4>
                  {filteredProcedimentos.map((proc) => {
                    const isAdded = procedimentosSelecionados.includes(
                      proc.nome
                    );
                    return (
                      <button
                        key={proc.id}
                        onClick={() => handleAddFromList(proc.nome)}
                        disabled={isAdded}
                        className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                          isAdded
                            ? "bg-green-50 border-green-200 cursor-not-allowed"
                            : "bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {proc.nome}
                            </p>
                            <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                              {proc.valor && (
                                <span>
                                  R${" "}
                                  {Number(proc.valor).toLocaleString("pt-BR", {
                                    minimumFractionDigits: 2,
                                  })}
                                </span>
                              )}
                              <span>{proc.duracaoMinutos} min</span>
                            </div>
                          </div>
                          {isAdded && (
                            <CheckIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : searchTerm ? (
                <p className="text-center text-gray-500 py-8">
                  Nenhum procedimento encontrado para "{searchTerm}"
                </p>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  Nenhum procedimento cadastrado
                </p>
              )}

              {/* Adicionar procedimento manual */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Adicionar Manualmente
                </h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={novoProcedimento}
                    onChange={(e) => setNovoProcedimento(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddManual();
                      }
                    }}
                    placeholder="Digite o nome do procedimento"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button type="button" size="sm" onClick={handleAddManual}>
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Use esta opção para adicionar procedimentos não cadastrados
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {procedimentosSelecionados.length} procedimento(s) adicionado(s)
            </p>
            <Button onClick={onClose}>Concluir</Button>
          </div>
        </div>
      </div>
    </div>
  );

  // Usar portal para renderizar fora da hierarquia atual
  return typeof window !== "undefined"
    ? createPortal(content, document.body)
    : null;
}
