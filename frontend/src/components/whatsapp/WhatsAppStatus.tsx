// frontend/src/components/whatsapp/WhatsAppStatus.tsx

import React from "react";
import { WhatsAppConfig } from "../../types/whatsapp.types";

interface WhatsAppStatusProps {
  config: WhatsAppConfig | null;
  onConnect: () => void;
  onDisconnect: () => void;
  loading: boolean;
}

export const WhatsAppStatus: React.FC<WhatsAppStatusProps> = ({
  config,
  onConnect,
  onDisconnect,
  loading,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONNECTED":
        return "bg-green-100 text-green-800 border-green-300";
      case "CONNECTING":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "DISCONNECTED":
      default:
        return "bg-red-100 text-red-800 border-red-300";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "CONNECTED":
        return "Conectado";
      case "CONNECTING":
        return "Conectando...";
      case "DISCONNECTED":
      default:
        return "Desconectado";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "CONNECTED":
        return "✅";
      case "CONNECTING":
        return "⏳";
      case "DISCONNECTED":
      default:
        return "❌";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span>💬</span>
          WhatsApp
        </h2>

        {config && (
          <div
            className={`px-4 py-2 rounded-full border-2 font-semibold flex items-center gap-2 ${getStatusColor(
              config.status
            )}`}
          >
            <span>{getStatusIcon(config.status)}</span>
            {getStatusText(config.status)}
          </div>
        )}
      </div>

      {config?.status === "CONNECTED" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">📱 Telefone</p>
              <p className="text-lg font-semibold text-gray-800">
                {config.phoneNumber || "N/A"}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">👤 Nome do Perfil</p>
              <p className="text-lg font-semibold text-gray-800">
                {config.profileName || "N/A"}
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">👥 Contatos</p>
              <p className="text-lg font-semibold text-gray-800">
                {config.totalContacts.toLocaleString()}
              </p>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">💬 Conversas</p>
              <p className="text-lg font-semibold text-gray-800">
                {config.totalChats.toLocaleString()}
              </p>
            </div>
          </div>

          <button
            onClick={onDisconnect}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                Desconectando...
              </>
            ) : (
              <>
                <span>🔌</span>
                Desconectar WhatsApp
              </>
            )}
          </button>
        </div>
      ) : config?.status === "CONNECTING" ? (
        <div className="text-center">
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3">
              <span className="animate-spin text-2xl">⏳</span>
              <div className="text-left">
                <p className="text-yellow-800 font-semibold">Conectando...</p>
                <p className="text-sm text-yellow-700">
                  Aguardando leitura do QR Code
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Você já escaneou o código? Aguarde alguns segundos...
          </p>
        </div>
      ) : (
        <div className="text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <span className="text-4xl">💬</span>
            </div>
            <p className="text-gray-600 mb-2">
              Conecte seu WhatsApp para enviar confirmações automáticas
            </p>
            <p className="text-sm text-gray-500">
              As confirmações serão enviadas automaticamente 24h antes dos
              agendamentos
            </p>
          </div>
          <button
            onClick={onConnect}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                Conectando...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Conectar WhatsApp
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
