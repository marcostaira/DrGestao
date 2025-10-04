"use client";

import React from "react";
import { Anamnese, TipoCampoFormulario } from "../../types/anamnese.types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface AnamneseViewProps {
  anamnese: Anamnese;
  onClose: () => void;
}

export default function AnamneseView({ anamnese, onClose }: AnamneseViewProps) {
  const renderResposta = (campoId: string) => {
    const campo = anamnese.formulario.campos.find((c) => c.id === campoId);
    const resposta = anamnese.respostas[campoId];

    if (
      !campo ||
      resposta === undefined ||
      resposta === null ||
      resposta === ""
    ) {
      return <span className="text-gray-400 italic">Não respondido</span>;
    }

    switch (campo.tipo) {
      case TipoCampoFormulario.SIM_NAO:
        return (
          <span
            className={
              resposta
                ? "text-green-600 font-medium"
                : "text-red-600 font-medium"
            }
          >
            {resposta ? "Sim" : "Não"}
          </span>
        );

      case TipoCampoFormulario.DATA:
        return format(new Date(resposta), "dd/MM/yyyy", { locale: ptBR });

      case TipoCampoFormulario.MULTIPLA_ESCOLHA:
        return Array.isArray(resposta) ? (
          <div className="flex flex-wrap gap-2">
            {resposta.map((item: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          resposta
        );

      case TipoCampoFormulario.TEXTO_LONGO:
        return <p className="whitespace-pre-wrap">{resposta}</p>;

      default:
        return <span>{String(resposta)}</span>;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {anamnese.formulario.nome}
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              Paciente: {anamnese.paciente.nome}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Informações */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Data de preenchimento:</span>
                <p className="font-medium text-gray-900">
                  {format(
                    new Date(anamnese.createdAt),
                    "dd/MM/yyyy 'às' HH:mm",
                    {
                      locale: ptBR,
                    }
                  )}
                </p>
              </div>
              {anamnese.atendimento && (
                <div>
                  <span className="text-gray-600">Atendimento:</span>
                  <p className="font-medium text-gray-900">
                    {format(
                      new Date(anamnese.atendimento.createdAt),
                      "dd/MM/yyyy",
                      { locale: ptBR }
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Respostas */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Respostas
            </h3>
            {anamnese.formulario.campos
              .sort((a, b) => a.ordem - b.ordem)
              .map((campo) => (
                <div key={campo.id}>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    {campo.label}
                    {campo.obrigatorio && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </h4>
                  <div className="text-gray-900">
                    {renderResposta(campo.id)}
                  </div>
                </div>
              ))}
          </div>

          {/* Observações */}
          {anamnese.observacoes && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Observações
              </h3>
              <p className="text-gray-900 whitespace-pre-wrap">
                {anamnese.observacoes}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
