import React, { useState } from "react";
import {
  TipoCampoFormulario,
  CampoFormulario,
  TIPO_CAMPO_LABELS,
} from "../../types/anamnese.types";
import {
  PlusIcon,
  TrashIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

interface FormularioBuilderProps {
  campos: CampoFormulario[];
  onChange: (campos: CampoFormulario[]) => void;
}

export default function FormularioBuilder({
  campos,
  onChange,
}: FormularioBuilderProps) {
  const [campoEditando, setCampoEditando] = useState<string | null>(null);

  const adicionarCampo = () => {
    const novoCampo: CampoFormulario = {
      id: `campo_${Date.now()}`,
      label: "Novo Campo",
      tipo: TipoCampoFormulario.TEXTO,
      obrigatorio: false,
      ordem: campos.length,
    };
    onChange([...campos, novoCampo]);
    setCampoEditando(novoCampo.id);
  };

  const atualizarCampo = (id: string, updates: Partial<CampoFormulario>) => {
    onChange(
      campos.map((campo) =>
        campo.id === id ? { ...campo, ...updates } : campo
      )
    );
  };

  const removerCampo = (id: string) => {
    onChange(campos.filter((campo) => campo.id !== id));
  };

  const moverCampo = (index: number, direction: "up" | "down") => {
    const newCampos = [...campos];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= campos.length) return;

    [newCampos[index], newCampos[newIndex]] = [
      newCampos[newIndex],
      newCampos[index],
    ];

    // Atualizar ordem
    newCampos.forEach((campo, idx) => {
      campo.ordem = idx;
    });

    onChange(newCampos);
  };

  const tiposComOpcoes = [
    TipoCampoFormulario.SELECAO,
    TipoCampoFormulario.MULTIPLA_ESCOLHA,
    TipoCampoFormulario.RADIO,
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Campos do Formulário
        </h3>
        <button
          type="button"
          onClick={adicionarCampo}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Adicionar Campo
        </button>
      </div>

      {campos.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500">
            Nenhum campo adicionado. Clique em "Adicionar Campo" para começar.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {campos.map((campo, index) => (
            <div
              key={campo.id}
              className="bg-white border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-500">
                    #{index + 1}
                  </span>
                  <input
                    type="text"
                    value={campo.label}
                    onChange={(e) =>
                      atualizarCampo(campo.id, { label: e.target.value })
                    }
                    className="text-base font-medium text-gray-900 border-0 border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:ring-0 px-0"
                    placeholder="Nome do campo"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => moverCampo(index, "up")}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    <ArrowUpIcon className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moverCampo(index, "down")}
                    disabled={index === campos.length - 1}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    <ArrowDownIcon className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removerCampo(campo.id)}
                    className="p-1 text-red-400 hover:text-red-600"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tipo do Campo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Campo
                  </label>
                  <select
                    value={campo.tipo}
                    onChange={(e) =>
                      atualizarCampo(campo.id, {
                        tipo: e.target.value as TipoCampoFormulario,
                        opcoes: tiposComOpcoes.includes(
                          e.target.value as TipoCampoFormulario
                        )
                          ? ["Opção 1"]
                          : undefined,
                      })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {Object.entries(TIPO_CAMPO_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Obrigatório */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`obrigatorio-${campo.id}`}
                    checked={campo.obrigatorio}
                    onChange={(e) =>
                      atualizarCampo(campo.id, {
                        obrigatorio: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`obrigatorio-${campo.id}`}
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Campo obrigatório
                  </label>
                </div>

                {/* Placeholder */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Placeholder (Texto de ajuda)
                  </label>
                  <input
                    type="text"
                    value={campo.placeholder || ""}
                    onChange={(e) =>
                      atualizarCampo(campo.id, { placeholder: e.target.value })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Ex: Digite aqui..."
                  />
                </div>

                {/* Opções (para tipos específicos) */}
                {tiposComOpcoes.includes(campo.tipo) && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Opções
                    </label>
                    <div className="space-y-2">
                      {(campo.opcoes || []).map((opcao, opcaoIndex) => (
                        <div
                          key={opcaoIndex}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="text"
                            value={opcao}
                            onChange={(e) => {
                              const novasOpcoes = [...(campo.opcoes || [])];
                              novasOpcoes[opcaoIndex] = e.target.value;
                              atualizarCampo(campo.id, { opcoes: novasOpcoes });
                            }}
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder={`Opção ${opcaoIndex + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const novasOpcoes = campo.opcoes?.filter(
                                (_, i) => i !== opcaoIndex
                              );
                              atualizarCampo(campo.id, { opcoes: novasOpcoes });
                            }}
                            className="p-2 text-red-500 hover:text-red-700"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const novasOpcoes = [
                            ...(campo.opcoes || []),
                            `Opção ${(campo.opcoes?.length || 0) + 1}`,
                          ];
                          atualizarCampo(campo.id, { opcoes: novasOpcoes });
                        }}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        + Adicionar Opção
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
