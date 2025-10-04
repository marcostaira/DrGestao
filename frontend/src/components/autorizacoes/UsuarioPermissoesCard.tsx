import React from "react";
import {
  UsuarioComAutorizacoes,
  MODULO_LABELS,
  MODULO_ICONS,
} from "../../types/autorizacao.types";

// ============================================================================
// COMPONENTE - USUARIO PERMISSOES CARD
// ============================================================================

interface UsuarioPermissoesCardProps {
  usuario: UsuarioComAutorizacoes;
  onEdit: (usuario: UsuarioComAutorizacoes) => void;
}

export const UsuarioPermissoesCard: React.FC<UsuarioPermissoesCardProps> = ({
  usuario,
  onEdit,
}) => {
  // Contar permissões ativas
  const permissoesAtivas = usuario.autorizacoes.filter(
    (a) => a.visualizar || a.criarAlterar
  ).length;

  const totalPermissoes = usuario.autorizacoes.length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      {/* Header do Card */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {usuario.nome}
              </h3>
              <span
                className={`
                  px-2 py-0.5 text-xs font-medium rounded-full
                  ${
                    usuario.tipo === "ADMIN"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  }
                `}
              >
                {usuario.tipo}
              </span>
              {!usuario.ativo && (
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                  Inativo
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">{usuario.email}</p>
          </div>

          <button
            onClick={() => onEdit(usuario)}
            disabled={usuario.tipo === "ADMIN"}
            className={`
              px-3 py-1.5 text-sm font-medium rounded-lg transition-colors
              ${
                usuario.tipo === "ADMIN"
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100"
              }
            `}
          >
            {usuario.tipo === "ADMIN" ? "Admin Total" : "Editar Permissões"}
          </button>
        </div>
      </div>

      {/* Resumo das Permissões */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">
            Permissões Ativas
          </span>
          <span className="text-sm font-semibold text-gray-900">
            {permissoesAtivas} de {totalPermissoes}
          </span>
        </div>

        {/* Barra de Progresso */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(permissoesAtivas / totalPermissoes) * 100}%` }}
          />
        </div>

        {/* Grid de Módulos - 🔥 ADICIONADO KEY PROP */}
        <div className="grid grid-cols-4 gap-2">
          {usuario.autorizacoes.map((autorizacao) => {
            const temAlgumaPermissao =
              autorizacao.visualizar || autorizacao.criarAlterar;
            const temPermissaoCompleta =
              autorizacao.visualizar && autorizacao.criarAlterar;

            return (
              <div
                key={`${usuario.id}-${autorizacao.modulo}`} // 🔥 KEY ÚNICA ADICIONADA
                className={`
                  flex flex-col items-center justify-center p-2 rounded-lg border
                  ${
                    temPermissaoCompleta
                      ? "bg-green-50 border-green-200"
                      : temAlgumaPermissao
                      ? "bg-yellow-50 border-yellow-200"
                      : "bg-gray-50 border-gray-200"
                  }
                `}
                title={`${MODULO_LABELS[autorizacao.modulo]} - ${
                  temPermissaoCompleta
                    ? "Acesso Total"
                    : temAlgumaPermissao
                    ? "Acesso Parcial"
                    : "Sem Acesso"
                }`}
              >
                <span className="text-lg mb-1">
                  {MODULO_ICONS[autorizacao.modulo]}
                </span>
                <span className="text-xs text-center text-gray-700 leading-tight">
                  {MODULO_LABELS[autorizacao.modulo]}
                </span>
                <div className="flex gap-1 mt-1">
                  {autorizacao.visualizar && (
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-blue-500"
                      title="Visualizar"
                    />
                  )}
                  {autorizacao.criarAlterar && (
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-green-500"
                      title="Criar/Alterar"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legenda */}
        <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-gray-200">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-xs text-gray-600">Visualizar</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-gray-600">Criar/Alterar</span>
          </div>
        </div>
      </div>
    </div>
  );
};
