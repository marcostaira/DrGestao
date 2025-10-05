"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { formularioService } from "../../../../../services/formulario.service";
import FormularioBuilder from "../../../../../components/anamnese/FormularioBuilder";
import { CampoFormulario } from "../../../../../types/anamnese.types";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import api from "@/lib/api";

export default function NovoFormularioPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [profissionais, setProfissionais] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    profissionalId: "",
  });

  const [campos, setCampos] = useState<CampoFormulario[]>([]);

  useEffect(() => {
    carregarProfissionais();
  }, []);

  const carregarProfissionais = async () => {
    try {
      const response = await api.get("/profissionais");
      setProfissionais(response.data.data || []);
    } catch (error) {
      console.error("Erro ao carregar profissionais:", error);
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
      await formularioService.create({
        nome: formData.nome,
        descricao: formData.descricao || undefined,
        profissionalId: formData.profissionalId || undefined,
        campos,
      });

      toast.success("Formulário criado com sucesso!");
      router.push("/dashboard/configuracoes/formularios");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erro ao criar formulário");
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="text-2xl font-bold text-gray-900">
          Novo Formulário de Anamnese
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Crie um formulário personalizado para coletar informações dos seus
          pacientes
        </p>
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
              <p className="mt-1 text-sm text-gray-500">
                Vincule este formulário a um profissional específico ou deixe em
                branco para uso geral
              </p>
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
            {loading ? "Salvando..." : "Criar Formulário"}
          </button>
        </div>
      </form>
    </div>
  );
}
