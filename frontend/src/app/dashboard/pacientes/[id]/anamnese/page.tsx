"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { anamneseService } from "../../../../../services/anamnese.service";
import AnamneseList from "../../../../../components/anamnese/AnamneseList";
import AnamneseView from "../../../../../components/anamnese/AnamneseView";
import { Anamnese } from "../../../../../types/anamnese.types";
import toast from "react-hot-toast";
import { PlusIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import api from "@/lib/api";

export default function PacienteAnamnesesPage() {
  const router = useRouter();
  const params = useParams();
  const pacienteId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [anamneses, setAnamneses] = useState<Anamnese[]>([]);
  const [paciente, setPaciente] = useState<any>(null);
  const [anamneseVisualizando, setAnamneseVisualizando] =
    useState<Anamnese | null>(null);

  useEffect(() => {
    carregarDados();
  }, [pacienteId]);

  const carregarDados = async () => {
    try {
      setLoading(true);

      // Carregar paciente
      const responsePaciente = await api.get(`/pacientes/${pacienteId}`);
      setPaciente(responsePaciente.data.data);

      // Carregar anamneses
      const anamnesasData = await anamneseService.listByPaciente(pacienteId);
      setAnamneses(anamnesasData);
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

  const handleExcluir = async (anamneseId: string) => {
    if (!confirm("Deseja realmente excluir esta anamnese?")) return;

    try {
      await anamneseService.delete(anamneseId);
      toast.success("Anamnese excluída com sucesso!");
      carregarDados();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erro ao excluir anamnese");
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
          onClick={() => router.push(`/dashboard/pacientes/${pacienteId}`)}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Voltar para o paciente
        </button>

        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Anamneses - {paciente?.nome}
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Histórico de anamneses preenchidas para este paciente
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={() =>
                router.push(`/dashboard/pacientes/${pacienteId}/anamnese/novo`)
              }
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Nova Anamnese
            </button>
          </div>
        </div>
      </div>

      {/* Informações do Paciente */}
      {paciente && (
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Nome:</span>
              <p className="font-medium text-gray-900">{paciente.nome}</p>
            </div>
            <div>
              <span className="text-gray-600">Telefone:</span>
              <p className="font-medium text-gray-900">{paciente.telefone}</p>
            </div>
            {paciente.email && (
              <div>
                <span className="text-gray-600">Email:</span>
                <p className="font-medium text-gray-900">{paciente.email}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lista de Anamneses */}
      <div className="bg-white rounded-lg shadow p-6">
        <AnamneseList
          anamneses={anamneses}
          onView={handleVisualizar}
          onDelete={handleExcluir}
          loading={loading}
        />
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
