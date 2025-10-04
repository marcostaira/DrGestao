"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { anamneseService } from "../../../../../services/anamnese.service";
import AnamneseView from "../../../../../components/anamnese/AnamneseView";
import { Anamnese } from "../../../../../types/anamnese.types";
import toast from "react-hot-toast";
import { PlusIcon, ArrowLeftIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import api from "../../../../../services/api";

export default function AtendimentoAnamnesesPage() {
  const router = useRouter();
  const params = useParams();
  const atendimentoId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [atendimento, setAtendimento] = useState<any>(null);
  const [anamneses, setAnamneses] = useState<Anamnese[]>([]);
  const [anamneseVisualizando, setAnamneseVisualizando] = useState<Anamnese | null>(null);

  useEffect(() => {
    carregarDados();
  }, [atendimentoId]);

  const carregarDados = async () => {
    try {
      setLoading(true);
      
      // Carregar atendimento
      const responseAtendimento = await api.get(`/atendimentos/${atendimentoId}`);
      setAtendimento(responseAtendimento.data.data);

      // Carregar todas as anamneses do paciente
      const pacienteId = responseAtendimento.data.data.pacienteId;
      const todasAnamneses = await anamneseService.listByPaciente(pacienteId);
      
      // Filtrar anamneses deste atendimento
      const anamnesasDoAtendimento = todasAnamneses.filter(
        (a) => a.atendimentoId === atendimentoId
      );
      setAnamneses(anamnesasDoAtendimento);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  const handleVisualizar = async (anamneseId: string) => {
    try {
      const anamnese = await anamneseService.getById(anamneseId);
      setAnamneseVisualizando(anamnese);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erro ao carregar anamnese");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.push(`/dashboard/atendimentos/${atendimentoId}`)}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Voltar para o atendimento
        </button>
        
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Anamneses do Atendimento
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Paciente: {atendimento?.paciente?.nome}
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={() =>
                router.push(`/dashboard/atendimentos/${atendimentoId}/anamnese/novo`)
              }
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Nova Anamnese
            </button>
          </div>
        </div>
      </div>

      {/* Informações do Atendimento */}
      {atendimento && (
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Paciente:</span>
              <p className="font-medium text-gray-900">{atendimento.paciente?.nome}</p>
            </div>
            <div>
              <span className="text-gray-600">Profissional:</span>
              <p className="font-medium text-gray-900">{atendimento.profissional?.nome}</p>
            </div>
            <div>
              <span className="text-gray-600">Procedimento:</span>
              <p className="font-medium text-gray-900">{atendimento.procedimento?.nome || "Não informado"}</p>
            </div>
            <div>
              <span className="text-gray-600">Data:</span>
              <p className="font-medium text-gray-900">
                {new Date(atendimento.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Lista de Anamneses */}
      <div className="bg-white rounded-lg shadow p-6">
        {anamneses.length === 0 ? (
          <div className="text-center py-12">
            <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Nenhuma anamnese vinculada
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Comece criando uma nova anamnese para este atendimento.
            </p>
            <div className="mt-6">
              <button
                onClick={() =>
                  router.push(`/dashboard/atendimentos/${atendimentoId}/anamnese/novo`)
                }
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Nova Anamnese
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {anamneses.map((anamnese) => (
              <div
                key={anamnese.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
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
                    <p className="text-sm text-gray-500 mt-2">
                      Preenchida em:{" "}
                      {new Date(anamnese.createdAt).toLocaleDateString("pt-BR")} às{" "}
                      {new Date(anamnese.createdAt).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <button
                    onClick={() => handleVisualizar(anamnese.id)}
                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                  >
                    Visualizar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Visualização */}
      {anamneseVisualizando && (
        <AnamneseView
          anamnese={anamneseVisualizando}
          onClose={() => setAnamneseVisualizando(null)}
        />
      )}
    </div>
  );
}