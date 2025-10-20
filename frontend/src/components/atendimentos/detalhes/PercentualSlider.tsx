// frontend/src/components/atendimentos/detalhes/PercentualSlider.tsx

"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import { useState } from "react";

interface PercentualSliderProps {
  isOpen: boolean;
  onClose: () => void;
  procedimentoNome: string;
  percentualAtual: number;
  onSave: (percentual: number) => void;
}

export function PercentualSlider({
  isOpen,
  onClose,
  procedimentoNome,
  percentualAtual,
  onSave,
}: PercentualSliderProps) {
  const [percentual, setPercentual] = useState(percentualAtual);

  const handleSave = () => {
    onSave(percentual);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 99999 }}>
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Slider Panel */}
      <div
        className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-xl flex flex-col"
        style={{ zIndex: 100000 }}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Progresso do Procedimento
              </h3>
              <p className="text-sm text-gray-500 mt-1">{procedimentoNome}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 bg-white">
          <div className="space-y-6">
            {/* Valor Atual Grande */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-blue-50 border-4 border-blue-500">
                <span className="text-4xl font-bold text-blue-600">
                  {percentual}%
                </span>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Ajustar Percentual de Conclusão
              </label>

              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={percentual}
                onChange={(e) => setPercentual(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                style={{
                  background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${percentual}%, #E5E7EB ${percentual}%, #E5E7EB 100%)`,
                }}
              />

              {/* Marcadores de Percentual */}
              <div className="flex justify-between text-xs text-gray-500">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Input Manual */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Ou digite o valor manualmente
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={percentual}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 0 && val <= 100) {
                      setPercentual(val);
                    }
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="flex items-center px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700 font-medium">
                  %
                </span>
              </div>
            </div>

            {/* Atalhos Rápidos */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Atalhos Rápidos
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[0, 25, 50, 75, 100].map((val) => (
                  <button
                    key={val}
                    onClick={() => setPercentual(val)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      percentual === val
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {val}%
                  </button>
                ))}
              </div>
            </div>

            {/* Barra de Progresso Visual */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Visualização
              </label>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-blue-600 h-4 transition-all duration-300 rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${percentual}%` }}
                >
                  {percentual > 10 && (
                    <span className="text-xs font-medium text-white">
                      {percentual}%
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Status Textual */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div
                    className={`w-3 h-3 rounded-full mt-1 ${
                      percentual === 0
                        ? "bg-gray-400"
                        : percentual < 100
                        ? "bg-blue-500"
                        : "bg-green-500"
                    }`}
                  ></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {percentual === 0 && "Procedimento não iniciado"}
                    {percentual > 0 &&
                      percentual < 100 &&
                      "Procedimento em andamento"}
                    {percentual === 100 && "Procedimento concluído"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {percentual === 0 &&
                      "O procedimento ainda não foi iniciado. Defina um percentual para começar o acompanhamento."}
                    {percentual > 0 &&
                      percentual < 100 &&
                      `Faltam ${
                        100 - percentual
                      }% para a conclusão total deste procedimento.`}
                    {percentual === 100 &&
                      "Este procedimento foi marcado como 100% concluído."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-3">
            <Button variant="secondary" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Salvar Progresso
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
