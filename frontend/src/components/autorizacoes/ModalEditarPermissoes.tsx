import React, { useState, useEffect } from "react";
import {
  UsuarioComAutorizacoes,
  Modulo,
  MODULO_LABELS,
  MODULO_ICONS,
  MODULO_COLORS,
} from "../../types/autorizacao.types";
import { PermissaoToggle } from "./PermissaoToggle";

// ============================================================================
// COMPONENTE - MODAL EDITAR PERMISSOES
// ============================================================================

interface ModalEditarPermissoesProps {
  usuario: UsuarioComAutorizacoes | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (usuarioId: string, autorizacoes: any[]) => Promise<void>;
}

export const ModalEditarPermissoes: React.FC<ModalEditarPermissoesProps> = ({
  usuario,
  isOpen,
  onClose,
  onSave,
}) => {
  // 🔥 CORREÇÃO: Sintaxe correta do useState
  const [permissoes, setPermissoes] = useState<
    Record<
      string,
      { visualizar: boolean; criarAlterar: boolean; cancelar: boolean }
    >
  >({});
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // Inicializar permissões quando o usuário mudar
  useEffect(() => {
    if (usuario) {
      const perms: Record<
        string,
        { visualizar: boolean; criarAlterar: boolean; cancelar: boolean }
      > = {};

      usuario.autorizacoes.forEach((auth) => {
        perms[auth.modulo] = {
          visualizar: auth.visualizar,
          criarAlterar: auth.criarAlterar,
          cancelar: auth.cancelar || false,
        };
      });

      setPermissoes(perms);
    }
  }, [usuario]);

  if (!isOpen || !usuario) return null;

  const handleToggle = (
    modulo: Modulo,
    tipo: "visualizar" | "criarAlterar" | "cancelar",
    valor: boolean
  ) => {
    setPermissoes((prev) => ({
      ...prev,
      [modulo]: {
        ...prev[modulo],
        [tipo]: valor,
      },
    }));
  };

  const handleSelectAll = (
    tipo: "visualizar" | "criarAlterar" | "cancelar"
  ) => {
    const novasPermissoes = { ...permissoes };
    Object.keys(novasPermissoes).forEach((modulo) => {
      novasPermissoes[modulo] = {
        ...novasPermissoes[modulo],
        [tipo]: true,
      };
    });
    setPermissoes(novasPermissoes);
  };

  const handleDeselectAll = (
    tipo: "visualizar" | "criarAlterar" | "cancelar"
  ) => {
    const novasPermissoes = { ...permissoes };
    Object.keys(novasPermissoes).forEach((modulo) => {
      novasPermissoes[modulo] = {
        ...novasPermissoes[modulo],
        [tipo]: false,
      };
    });
    setPermissoes(novasPermissoes);
  };

  const handleSave = async () => {
    try {
      setSalvando(true);
      setErro(null);

      const autorizacoes = Object.entries(permissoes).map(
        ([modulo, perms]) => ({
          modulo: modulo as Modulo,
          visualizar: perms.visualizar,
          criarAlterar: perms.criarAlterar,
          cancelar: perms.cancelar,
        })
      );

      await onSave(usuario.id, autorizacoes);
      onClose();
    } catch (err: any) {
      setErro(err.message || "Erro ao salvar permissões");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Editar Permissões
                </h2>
                <p className="text-sm text-blue-100 mt-1">
                  {usuario.nome} ({usuario.email})
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div
            className="p-6 overflow-y-auto"
            style={{ maxHeight: "calc(90vh - 180px)" }}
          >
            {/* Ações em Massa */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Ações Rápidas
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-2 font-medium">
                    Visualizar
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSelectAll("visualizar")}
                      className="flex-1 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                    >
                      Marcar Todos
                    </button>
                    <button
                      onClick={() => handleDeselectAll("visualizar")}
                      className="flex-1 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                    >
                      Desmarcar
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-2 font-medium">
                    Criar/Alterar
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSelectAll("criarAlterar")}
                      className="flex-1 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 rounded hover:bg-green-100 transition-colors"
                    >
                      Marcar Todos
                    </button>
                    <button
                      onClick={() => handleDeselectAll("criarAlterar")}
                      className="flex-1 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                    >
                      Desmarcar
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-2 font-medium">
                    Cancelar
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSelectAll("cancelar")}
                      className="flex-1 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded hover:bg-red-100 transition-colors"
                    >
                      Marcar Todos
                    </button>
                    <button
                      onClick={() => handleDeselectAll("cancelar")}
                      className="flex-1 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                    >
                      Desmarcar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de Módulos */}
            <div className="space-y-4">
              {Object.values(Modulo).map((modulo) => {
                const perm = permissoes[modulo] || {
                  visualizar: false,
                  criarAlterar: false,
                  cancelar: false,
                };

                return (
                  <div
                    key={modulo}
                    className="border-2 rounded-lg p-4 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{MODULO_ICONS[modulo]}</span>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {MODULO_LABELS[modulo]}
                      </h4>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <PermissaoToggle
                        label="Visualizar"
                        checked={perm.visualizar}
                        onChange={(val) =>
                          handleToggle(modulo, "visualizar", val)
                        }
                        description="Ver e consultar dados"
                      />
                      <PermissaoToggle
                        label="Criar/Alterar"
                        checked={perm.criarAlterar}
                        onChange={(val) =>
                          handleToggle(modulo, "criarAlterar", val)
                        }
                        description="Criar, editar e excluir"
                      />
                      {/* CANCELAR - apenas para ATENDIMENTOS e AGENDA */}
                      {(modulo === Modulo.ATENDIMENTOS ||
                        modulo === Modulo.AGENDA) && (
                        <PermissaoToggle
                          label="Cancelar"
                          checked={perm.cancelar}
                          onChange={(val) =>
                            handleToggle(modulo, "cancelar", val)
                          }
                          description="Cancelar registros"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Erro */}
            {erro && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
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
                  <p className="text-sm text-red-800">{erro}</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                disabled={salvando}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={salvando}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {salvando && (
                  <svg
                    className="animate-spin h-4 w-4"
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
                )}
                {salvando ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
