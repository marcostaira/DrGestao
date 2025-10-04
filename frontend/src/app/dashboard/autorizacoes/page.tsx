import { ModalEditarPermissoes } from "@/components/autorizacoes/ModalEditarPermissoes";
import { UsuarioPermissoesCard } from "@/components/autorizacoes/UsuarioPermissoesCard";
import { useAutorizacoes } from "@/hooks/useAutorizacoes";
import { UsuarioComAutorizacoes } from "@/types/autorizacao.types";
import React, { useState } from "react";

// ============================================================================
// PÁGINA - GESTÃO DE AUTORIZAÇÕES
// ============================================================================

export default function AutorizacoesPage() {
  const {
    usuarios,
    loading,
    error,
    meta,
    carregarUsuarios,
    atualizarAutorizacoes,
  } = useAutorizacoes();
  const [usuarioSelecionado, setUsuarioSelecionado] =
    useState<UsuarioComAutorizacoes | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState<
    "TODOS" | "ADMIN" | "SECRETARIA"
  >("TODOS");
  const [filtroAtivo, setFiltroAtivo] = useState<"TODOS" | "ATIVO" | "INATIVO">(
    "ATIVO"
  );
  const [busca, setBusca] = useState("");

  // Abrir modal de edição
  const handleEditarPermissoes = (usuario: UsuarioComAutorizacoes) => {
    setUsuarioSelecionado(usuario);
    setModalAberto(true);
  };

  // Fechar modal
  const handleFecharModal = () => {
    setModalAberto(false);
    setUsuarioSelecionado(null);
  };

  // Salvar permissões
  const handleSalvarPermissoes = async (
    usuarioId: string,
    autorizacoes: any[]
  ) => {
    const resultado = await atualizarAutorizacoes(usuarioId, { autorizacoes });

    if (resultado.success) {
      // Sucesso - modal será fechado automaticamente
    } else {
      throw new Error(resultado.error);
    }
  };

  // Aplicar filtros
  const usuariosFiltrados = usuarios.filter((usuario) => {
    // Filtro de tipo
    if (filtroTipo !== "TODOS" && usuario.tipo !== filtroTipo) {
      return false;
    }

    // Filtro de status
    if (filtroAtivo === "ATIVO" && !usuario.ativo) return false;
    if (filtroAtivo === "INATIVO" && usuario.ativo) return false;

    // Filtro de busca
    if (busca) {
      const termoBusca = busca.toLowerCase();
      return (
        usuario.nome.toLowerCase().includes(termoBusca) ||
        usuario.email.toLowerCase().includes(termoBusca)
      );
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gestão de Autorizações
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Configure as permissões de acesso para cada usuário do sistema
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {meta.total}
                </p>
                <p className="text-xs text-gray-500">Usuários</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Busca */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nome ou email..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Filtro Tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Usuário
              </label>
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="TODOS">Todos</option>
                <option value="ADMIN">Administradores</option>
                <option value="SECRETARIA">Secretárias</option>
              </select>
            </div>

            {/* Filtro Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filtroAtivo}
                onChange={(e) => setFiltroAtivo(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="TODOS">Todos</option>
                <option value="ATIVO">Ativos</option>
                <option value="INATIVO">Inativos</option>
              </select>
            </div>
          </div>

          {/* Contador de resultados */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Exibindo{" "}
              <span className="font-semibold">{usuariosFiltrados.length}</span>{" "}
              de <span className="font-semibold">{meta.total}</span> usuários
            </p>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <svg
                className="animate-spin h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <p className="text-sm text-gray-600">Carregando usuários...</p>
            </div>
          </div>
        )}

        {/* Erro */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-red-600 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-sm font-medium text-red-800">
                  Erro ao carregar usuários
                </p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                <button
                  onClick={() => carregarUsuarios()}
                  className="mt-3 text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Tentar novamente
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lista de Usuários */}
        {!loading && !error && (
          <>
            {usuariosFiltrados.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Nenhum usuário encontrado
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Tente ajustar os filtros de busca
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {usuariosFiltrados.map((usuario) => (
                  <UsuarioPermissoesCard
                    key={usuario.id}
                    usuario={usuario}
                    onEdit={handleEditarPermissoes}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal de Edição */}
      <ModalEditarPermissoes
        usuario={usuarioSelecionado}
        isOpen={modalAberto}
        onClose={handleFecharModal}
        onSave={handleSalvarPermissoes}
      />
    </div>
  );
}
