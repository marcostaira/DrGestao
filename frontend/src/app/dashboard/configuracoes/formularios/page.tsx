"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { formularioService } from "../../../../services/formulario.service";
import { Formulario } from "../../../../types/anamnese.types";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export default function FormulariosPage() {
  const router = useRouter();
  const [formularios, setFormularios] = useState<Formulario[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [filtroAtivo, setFiltroAtivo] = useState<boolean | undefined>(true);

  useEffect(() => {
    carregarFormularios();
  }, [filtroAtivo]);

  const carregarFormularios = async () => {
    try {
      setLoading(true);
      const data = await formularioService.list({
        ativo: filtroAtivo,
        busca: busca || undefined,
      });
      setFormularios(data);
    } catch (error: any) {
      toast.error(
        error.response?.data?.error || "Erro ao carregar formulários"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBuscar = () => {
    carregarFormularios();
  };

  const handleDuplicar = async (id: string) => {
    if (!confirm("Deseja duplicar este formulário?")) return;

    try {
      await formularioService.duplicate(id);
      toast.success("Formulário duplicado com sucesso!");
      carregarFormularios();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erro ao duplicar formulário");
    }
  };

  const handleExcluir = async (id: string) => {
    if (!confirm("Deseja realmente excluir este formulário?")) return;

    try {
      await formularioService.delete(id);
      toast.success("Formulário excluído com sucesso!");
      carregarFormularios();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erro ao excluir formulário");
    }
  };

  const handleToggleAtivo = async (formulario: Formulario) => {
    try {
      await formularioService.update(formulario.id, {
        ativo: !formulario.ativo,
      });
      toast.success(
        formulario.ativo
          ? "Formulário desativado com sucesso!"
          : "Formulário ativado com sucesso!"
      );
      carregarFormularios();
    } catch (error: any) {
      toast.error(
        error.response?.data?.error || "Erro ao atualizar formulário"
      );
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Formulários de Anamnese
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Crie e gerencie formulários personalizados para seus pacientes
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() =>
              router.push("/dashboard/configuracoes/formularios/novo")
            }
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Novo Formulário
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="mt-6 bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Busca */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleBuscar()}
                placeholder="Nome ou descrição..."
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                onClick={handleBuscar}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Filtro Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={
                filtroAtivo === undefined
                  ? "todos"
                  : filtroAtivo
                  ? "ativo"
                  : "inativo"
              }
              onChange={(e) =>
                setFiltroAtivo(
                  e.target.value === "todos"
                    ? undefined
                    : e.target.value === "ativo"
                )
              }
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="todos">Todos</option>
              <option value="ativo">Ativos</option>
              <option value="inativo">Inativos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Formulários */}
      <div className="mt-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : formularios.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">
              Nenhum formulário encontrado.
              {busca && " Tente ajustar os filtros."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {formularios.map((formulario) => (
              <div
                key={formulario.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {formulario.nome}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          formulario.ativo
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {formulario.ativo ? "Ativo" : "Inativo"}
                      </span>
                    </div>

                    {formulario.descricao && (
                      <p className="mt-2 text-sm text-gray-600">
                        {formulario.descricao}
                      </p>
                    )}

                    <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500">
                      <span>{formulario.campos.length} campos</span>
                      {formulario._count && (
                        <span>
                          {formulario._count.anamneses} anamnese(s)
                          preenchida(s)
                        </span>
                      )}
                      {formulario.profissional && (
                        <span>
                          Profissional: {formulario.profissional.nome}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() =>
                        router.push(
                          `/dashboard/configuracoes/formularios/${formulario.id}`
                        )
                      }
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>

                    <button
                      onClick={() => handleDuplicar(formulario.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Duplicar"
                    >
                      <DocumentDuplicateIcon className="h-5 w-5" />
                    </button>

                    <button
                      onClick={() => handleToggleAtivo(formulario)}
                      className={`px-3 py-1 text-sm rounded-md ${
                        formulario.ativo
                          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {formulario.ativo ? "Desativar" : "Ativar"}
                    </button>

                    <button
                      onClick={() => handleExcluir(formulario.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Excluir"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
