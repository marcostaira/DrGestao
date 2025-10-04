"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { formularioService } from "../../../../../../services/formulario.service";
import { anamneseService } from "../../../../../../services/anamnese.service";
import FormularioRenderer from "../../../../../../components/anamnese/FormularioRenderer";
import {
  Formulario,
  RespostaAnamnese,
} from "../../../../../../types/anamnese.types";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import api from "../../../../../../services/api";

export default function NovaAnamnPacientePage() {
  const router = useRouter();
  const params = useParams();
  const pacienteId = params?.id as string;

  const [loading, setLoading] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [formularios, setFormularios] = useState<Formulario[]>([]);
  const [formularioSelecionado, setFormularioSelecionado] =
    useState<Formulario | null>(null);
  const [paciente, setPaciente] = useState<any>(null);
  const [respostas, setRespostas] = useState<RespostaAnamnese>({});
  const [observacoes, setObservacoes] = useState("");

  useEffect(() => {
    carregarDados();
  }, [pacienteId]);

  const carregarDados = async () => {
    try {
      setCarregando(true);

      // Carregar paciente
      const responsePaciente = await api.get(`/pacientes/${pacienteId}`);
      setPaciente(responsePaciente.data.data);

      // Carregar formulários ativos
      const formsData = await formularioService.list({ ativo: true });
      setFormularios(formsData);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erro ao carregar dados");
    } finally {
      setCarregando(false);
    }
  };

  const handleSelecionarFormulario = async (formularioId: string) => {
    try {
      const formulario = await formularioService.getById(formularioId);
      setFormularioSelecionado(formulario);
      setRespostas({});
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erro ao carregar formulário");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formularioSelecionado) {
      toast.error("Selecione um formulário");
      return;
    }

    try {
      setLoading(true);
      await anamneseService.create({
        pacienteId,
        formularioId: formularioSelecionado.id,
        respostas,
        observacoes: observacoes || undefined,
      });

      toast.success("Anamnese salva com sucesso!");
      router.push(`/dashboard/pacientes/${pacienteId}/anamnese`);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erro ao salvar anamnese");
    } finally {
      setLoading(false);
    }
  };

  if (carregando) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Voltar
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Nova Anamnese</h1>
        <p className="mt-2 text-sm text-gray-700">
          Paciente: <span className="font-medium">{paciente?.nome}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Seleção de Formulário */}
        {!formularioSelecionado ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Selecione o Formulário
            </h2>

            {formularios.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Nenhum formulário ativo disponível.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    router.push("/dashboard/configuracoes/formularios/novo")
                  }
                  className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Criar primeiro formulário
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formularios.map((formulario) => (
                  <button
                    key={formulario.id}
                    type="button"
                    onClick={() => handleSelecionarFormulario(formulario.id)}
                    className="text-left p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold text-gray-900">
                      {formulario.nome}
                    </h3>
                    {formulario.descricao && (
                      <p className="text-sm text-gray-600 mt-1">
                        {formulario.descricao}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                      {formulario.campos.length} campos
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Formulário Selecionado */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-blue-900">
                    {formularioSelecionado.nome}
                  </h3>
                  {formularioSelecionado.descricao && (
                    <p className="text-sm text-blue-700 mt-1">
                      {formularioSelecionado.descricao}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFormularioSelecionado(null);
                    setRespostas({});
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Trocar formulário
                </button>
              </div>
            </div>

            {/* Campos do Formulário */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Preencha os Campos
              </h2>
              <FormularioRenderer
                campos={formularioSelecionado.campos}
                respostas={respostas}
                onChange={setRespostas}
              />
            </div>

            {/* Observações */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Observações Adicionais
              </h2>
              <textarea
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Adicione observações gerais sobre esta anamnese..."
                rows={4}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Botões de Ação */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Salvando..." : "Salvar Anamnese"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
