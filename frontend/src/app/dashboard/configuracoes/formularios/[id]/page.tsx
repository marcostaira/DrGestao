"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { formularioService } from "@/services/formulario.service";
import FormularioBuilder from "@/components/anamnese/FormularioBuilder";
import {
  CampoFormulario,
  Formulario,
} from "../../../../../types/anamnese.types";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import api from "@/lib/api";

export default function EditarFormularioPage() {
  const router = useRouter();
  const params = useParams();
  const formularioId = params?.id as string;

  const [loading, setLoading] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [profissionais, setProfissionais] = useState<any[]>([]);
  const [formulario, setFormulario] = useState<Formulario | null>(null);

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    profissionalId: "",
    ativo: true,
  });

  const [campos, setCampos] = useState<CampoFormulario[]>([]);

  useEffect(() => {
    carregarDados();
  }, [formularioId]);

  const carregarDados = async () => {
    try {
      setCarregando(true);

      // Carregar formulário
      const formData = await formularioService.getById(formularioId);
      setFormulario(formData);
      setFormData({
        nome: formData.nome,
        descricao: formData.descricao || "",
        profissionalId: formData.profissionalId || "",
        ativo: formData.ativo,
      });
      setCampos(formData.campos);

      // Carregar profissionais
      const response = await api.get("/profissionais");
      setProfissionais(response.data.data || []);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erro ao carregar formulário");
      router.push("/dashboard/configuracoes/formularios");
    } finally {
      setCarregando(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (campos.length === 0) {
      toast.error("Adicione pelo menos um campo ao formulário");
      return;
    }

    try {
      setLoading(true);
      await formularioService.update(formularioId, {
        nome: formData.nome,
        descricao: formData.descricao || undefined,
        profissionalId: formData.profissionalId || undefined,
        campos,
        ativo: formData.ativo,
      });

      toast.success("Formulário atualizado com sucesso!");
      router.push("/dashboard/configuracoes/formularios");
    } catch (error: any) {
      toast.error(
        error.response?.data?.error || "Erro ao atualizar formulário"
      );
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
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Voltar
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Editar Formulário
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Atualize as informações e campos do formulário
            </p>
          </div>
          {formulario?._count && formulario._count.anamneses > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                ⚠️ Este formulário já tem {formulario._count.anamneses}{" "}
                anamnese(s) preenchida(s).
                <br />
                Alterações podem afetar a visualização dos dados anteriores.
              </p>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações Básicas */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Informações Básicas
          </h2>

          <div className="space-y-4">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Formulário <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                placeholder="Ex: Anamnese Odontológica Completa"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                value={formData.descricao}
                onChange={(e) =>
                  setFormData({ ...formData, descricao: e.target.value })
                }
                placeholder="Descreva o objetivo deste formulário..."
                rows={3}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Profissional */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profissional (opcional)
              </label>
              <select
                value={formData.profissionalId}
                onChange={(e) =>
                  setFormData({ ...formData, profissionalId: e.target.value })
                }
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Nenhum profissional específico</option>
                {profissionais.map((prof) => (
                  <option key={prof.id} value={prof.id}>
                    {prof.nome}{" "}
                    {prof.especialidade && `- ${prof.especialidade}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="ativo"
                checked={formData.ativo}
                onChange={(e) =>
                  setFormData({ ...formData, ativo: e.target.checked })
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="ativo"
                className="ml-2 block text-sm text-gray-700"
              >
                Formulário ativo (disponível para uso)
              </label>
            </div>
          </div>
        </div>

        {/* Builder de Campos */}
        <div className="bg-white rounded-lg shadow p-6">
          <FormularioBuilder campos={campos} onChange={setCampos} />
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
            disabled={loading || campos.length === 0}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}
