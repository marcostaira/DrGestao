// frontend/src/components/whatsapp/WhatsAppHistory.tsx

import React, { useState, useEffect } from "react";
import { whatsappService } from "../../services/whatsapp.service";
import { WhatsAppMensagem } from "../../types/whatsapp.types";
import { toast } from "react-hot-toast";

export const WhatsAppHistory: React.FC = () => {
  const [mensagens, setMensagens] = useState<WhatsAppMensagem[]>([]);
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState({
    dataInicio: "",
    dataFim: "",
  });

  const fetchHistorico = async () => {
    setLoading(true);
    try {
      const params: any = {};

      if (filtros.dataInicio) {
        params.dataInicio = new Date(filtros.dataInicio).toISOString();
      }

      if (filtros.dataFim) {
        params.dataFim = new Date(filtros.dataFim).toISOString();
      }

      const data = await whatsappService.buscarHistorico(params);
      setMensagens(data);
    } catch (error: any) {
      console.error("Erro ao buscar histórico:", error);
      toast.error("Erro ao buscar histórico de mensagens");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistorico();
  }, []);

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string; icon: string }> = {
      PENDENTE: { bg: "bg-yellow-100", text: "text-yellow-800", icon: "⏳" },
      ENVIANDO: { bg: "bg-blue-100", text: "text-blue-800", icon: "📤" },
      ENVIADA: { bg: "bg-green-100", text: "text-green-800", icon: "✅" },
      ERRO: { bg: "bg-red-100", text: "text-red-800", icon: "❌" },
      RESPONDIDA: { bg: "bg-purple-100", text: "text-purple-800", icon: "💬" },
    };

    const badge = badges[status] || badges.PENDENTE;

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text} flex items-center gap-1 w-fit`}
      >
        <span>{badge.icon}</span>
        {status}
      </span>
    );
  };

  const getTipoBadge = (tipo: string) => {
    const badges: Record<string, { bg: string; text: string; label: string }> =
      {
        CONFIRMACAO: {
          bg: "bg-blue-100",
          text: "text-blue-800",
          label: "Confirmação",
        },
        RESPOSTA_CONFIRMADO: {
          bg: "bg-green-100",
          text: "text-green-800",
          label: "Confirmado",
        },
        RESPOSTA_REAGENDAR: {
          bg: "bg-orange-100",
          text: "text-orange-800",
          label: "Reagendar",
        },
        RESPOSTA_INVALIDA: {
          bg: "bg-red-100",
          text: "text-red-800",
          label: "Inválida",
        },
      };

    const badge = badges[tipo] || {
      bg: "bg-gray-100",
      text: "text-gray-800",
      label: tipo,
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}
      >
        {badge.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span>📜</span>
          Histórico de Mensagens
        </h2>
        <button
          onClick={fetchHistorico}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span className={loading ? "animate-spin" : ""}>🔄</span>
          {loading ? "Carregando..." : "Atualizar"}
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📅 Data Início
            </label>
            <input
              type="date"
              value={filtros.dataInicio}
              onChange={(e) =>
                setFiltros({ ...filtros, dataInicio: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📅 Data Fim
            </label>
            <input
              type="date"
              value={filtros.dataFim}
              onChange={(e) =>
                setFiltros({ ...filtros, dataFim: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={fetchHistorico}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🔍 Filtrar
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Mensagens */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Carregando histórico...</p>
        </div>
      ) : mensagens.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-600 text-lg">Nenhuma mensagem encontrada</p>
        </div>
      ) : (
        <div className="space-y-4">
          {mensagens.map((mensagem) => (
            <div
              key={mensagem.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                    💬
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {mensagem.paciente?.nome || "Paciente não encontrado"}
                    </p>
                    <p className="text-sm text-gray-600">
                      📱 {mensagem.telefone}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {getStatusBadge(mensagem.status)}
                  {getTipoBadge(mensagem.tipo)}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {mensagem.mensagem}
                </p>
              </div>

              {mensagem.respostaRecebida && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                  <p className="text-xs font-semibold text-blue-800 mb-1">
                    💬 Resposta do paciente:
                  </p>
                  <p className="text-sm text-blue-900">
                    {mensagem.respostaRecebida}
                  </p>
                </div>
              )}

              {mensagem.erroMensagem && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                  <p className="text-xs font-semibold text-red-800 mb-1">
                    ❌ Erro:
                  </p>
                  <p className="text-sm text-red-900">
                    {mensagem.erroMensagem}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                {mensagem.enviadaEm && (
                  <span>📤 Enviada: {formatDate(mensagem.enviadaEm)}</span>
                )}
                {mensagem.respostaEm && (
                  <span>💬 Respondida: {formatDate(mensagem.respostaEm)}</span>
                )}
                {mensagem.tentativas > 0 && (
                  <span>🔄 Tentativas: {mensagem.tentativas}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
