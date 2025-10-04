"use client";

import React from "react";
import { Anamnese } from "../../types/anamnese.types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  DocumentTextIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface AnamneseListProps {
  anamneses: Anamnese[];
  onView: (id: string) => void;
  onDelete?: (id: string) => void;
  loading?: boolean;
}

export default function AnamneseList({
  anamneses,
  onView,
  onDelete,
  loading = false,
}: AnamneseListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (anamneses.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          Nenhuma anamnese
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Comece criando uma nova anamnese para este paciente.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {anamneses.map((anamnese) => (
        <div
          key={anamnese.id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="text-base font-semibold text-gray-900">
                {anamnese.formulario.nome}
              </h4>
              {anamnese.formulario.descricao && (
                <p className="text-sm text-gray-600 mt-1">
                  {anamnese.formulario.descricao}
                </p>
              )}
              <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                <span>
                  Preenchida em:{" "}
                  {format(
                    new Date(anamnese.createdAt),
                    "dd/MM/yyyy 'às' HH:mm",
                    {
                      locale: ptBR,
                    }
                  )}
                </span>
                {anamnese.atendimento && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Vinculada ao atendimento
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => onView(anamnese.id)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Visualizar"
              >
                <EyeIcon className="h-5 w-5" />
              </button>
              {onDelete && (
                <button
                  onClick={() => onDelete(anamnese.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Excluir"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
