// frontend/src/components/anamnese/SendAnamneseWhatsApp.tsx

"use client";

import React, { useState, useEffect } from "react";
import { anamneseService, LinkAnamnese } from "@/services/anamnese.service";
import { formularioService } from "@/services/formulario.service";
import toast from "react-hot-toast";

interface SendAnamneseWhatsAppProps {
  pacienteId: string;
  pacienteNome: string;
  pacienteTelefone?: string;
  agendamentoId?: string;
  onSuccess?: () => void;
}

export const SendAnamneseWhatsApp: React.FC<SendAnamneseWhatsAppProps> = ({
  pacienteId,
  pacienteNome,
  pacienteTelefone,
  agendamentoId,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [formularios, setFormularios] = useState<any[]>([]);
  const [formularioId, setFormularioId] = useState("");
  const [links, setLinks] = useState<LinkAnamnese[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loadingLinks, setLoadingLinks] = useState(false);

  useEffect(() => {
    loadFormularios();
  }, []);

  useEffect(() => {
    if (showModal) {
      loadLinks();
    }
  }, [showModal]);

  const loadFormularios = async () => {
    try {
      const data = await formularioService.list({ ativo: true });
      setFormularios(data);
      if (data.length > 0) {
        setFormularioId(data[0].id);
      }
    } catch (error) {
      console.error("Erro ao carregar formulários:", error);
    }
  };

  const loadLinks = async () => {
    try {
      setLoadingLinks(true);
      const data = await anamneseService.listLinksByPaciente(pacienteId);
      setLinks(data);
    } catch (error) {
      console.error("Erro ao carregar links:", error);
    } finally {
      setLoadingLinks(false);
    }
  };

  const handleSend = async () => {
    if (!pacienteTelefone) {
      toast.error("Paciente não possui telefone cadastrado");
      return;
    }

    if (!formularioId) {
      toast.error("Selecione um formulário");
      return;
    }

    setLoading(true);
    try {
      const result = await anamneseService.sendViaWhatsApp({
        pacienteId,
        formularioId,
        agendamentoId,
      });

      toast.success("Link enviado com sucesso via WhatsApp!");
      setShowModal(false);
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erro ao enviar link");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      setLoading(true);
      const link = await anamneseService.createLink({
        pacienteId,
        formularioId,
        agendamentoId,
      });

      await navigator.clipboard.writeText(link.url);
      toast.success("Link copiado para a área de transferência!");
      setShowModal(false);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erro ao gerar link");
    } finally {
      setLoading(false);
    }
  };

  if (!pacienteTelefone) {
    return (
      <button
        disabled
        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed"
        title="Paciente sem telefone cadastrado"
      >
        <span>📋</span>
        Enviar Anamnese
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
      >
        <span>📋</span>
        Enviar Anamnese
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span>📋</span>
                  Enviar Anamnese
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
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

              {/* Paciente Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Paciente:</strong> {pacienteNome}
                </p>
                <p className="text-sm text-blue-700">
                  <strong>Telefone:</strong> {pacienteTelefone}
                </p>
              </div>

              {/* Selecionar Formulário */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Selecione o Formulário
                </label>
                <select
                  value={formularioId}
                  onChange={(e) => setFormularioId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  {formularios.map((form) => (
                    <option key={form.id} value={form.id}>
                      {form.nome}
                    </option>
                  ))}
                </select>
                {formularios.length === 0 && (
                  <p className="text-sm text-red-600 mt-1">
                    Nenhum formulário ativo disponível
                  </p>
                )}
              </div>

              {/* Links Anteriores */}
              {loadingLinks ? (
                <div className="mb-6 text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                </div>
              ) : (
                links.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      Links Enviados Anteriormente ({links.length})
                    </h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {links.map((link) => (
                        <div
                          key={link.id}
                          className={`p-3 rounded-lg border ${
                            link.preenchido
                              ? "bg-green-50 border-green-200"
                              : new Date() > new Date(link.expiresAt)
                              ? "bg-gray-50 border-gray-200"
                              : "bg-yellow-50 border-yellow-200"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                {link.formulario.nome}
                              </p>
                              <p className="text-xs text-gray-600">
                                {new Date(link.createdAt).toLocaleString(
                                  "pt-BR"
                                )}
                              </p>
                            </div>
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded ${
                                link.preenchido
                                  ? "bg-green-100 text-green-800"
                                  : new Date() > new Date(link.expiresAt)
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {link.preenchido
                                ? "✅ Preenchido"
                                : new Date() > new Date(link.expiresAt)
                                ? "⏰ Expirado"
                                : "⏳ Pendente"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}

              {/* Informações */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-purple-800 mb-2">
                  <strong>ℹ️ Como funciona:</strong>
                </p>
                <ul className="text-sm text-purple-700 space-y-1 list-disc list-inside">
                  <li>O paciente receberá um link via WhatsApp</li>
                  <li>O link é válido por 30 dias</li>
                  <li>
                    Após preenchido, as informações ficam disponíveis no
                    prontuário
                  </li>
                  <li>O link só pode ser preenchido uma vez</li>
                </ul>
              </div>

              {/* Botões */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCopyLink}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  disabled={loading || !formularioId}
                >
                  {loading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Gerando...
                    </>
                  ) : (
                    <>
                      <span>📋</span>
                      Copiar Link
                    </>
                  )}
                </button>
                <button
                  onClick={handleSend}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  disabled={loading || !formularioId}
                >
                  {loading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <span>📤</span>
                      Enviar WhatsApp
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
