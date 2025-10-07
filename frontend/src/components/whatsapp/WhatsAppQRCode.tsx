// frontend/src/components/whatsapp/WhatsAppQRCode.tsx

import React, { useEffect, useState } from "react";

interface WhatsAppQRCodeProps {
  qrCode: string | null;
  onCancel: () => void;
}

export const WhatsAppQRCode: React.FC<WhatsAppQRCodeProps> = ({
  qrCode,
  onCancel,
}) => {
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutos

  useEffect(() => {
    if (!qrCode) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [qrCode]);

  useEffect(() => {
    if (timeLeft === 0) {
      // QR Code expirou
      setTimeout(() => {
        onCancel();
      }, 2000);
    }
  }, [timeLeft, onCancel]);

  if (!qrCode) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-block bg-green-100 rounded-full p-4 mb-4">
            <span className="text-4xl">📱</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Escaneie o QR Code
          </h3>
          <p className="text-gray-600">
            Abra o WhatsApp no seu celular e escaneie este código
          </p>
        </div>

        {/* QR Code */}
        <div className="relative bg-white p-4 rounded-xl border-4 border-green-500 mb-6 shadow-lg">
          {timeLeft > 0 ? (
            <img
              src={qrCode}
              alt="QR Code WhatsApp"
              className="w-full h-auto rounded-lg"
            />
          ) : (
            <div className="aspect-square flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="text-center">
                <span className="text-6xl mb-4 block">⏰</span>
                <p className="text-red-600 font-semibold">QR Code Expirado</p>
                <p className="text-sm text-gray-600 mt-2">
                  Gerando novo código...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Timer */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">{timeLeft > 30 ? "⏱️" : "⚠️"}</span>
            <span
              className={`text-2xl font-bold ${
                timeLeft <= 30 ? "text-red-600 animate-pulse" : "text-gray-800"
              }`}
            >
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </span>
          </div>
          <p className="text-sm text-gray-600 text-center">
            {timeLeft > 30
              ? `O código expira em ${minutes} minuto${
                  minutes !== 1 ? "s" : ""
                } e ${seconds} segundo${seconds !== 1 ? "s" : ""}`
              : "⚠️ O código está expirando em breve!"}
          </p>
        </div>

        {/* Instruções */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-4 mb-6">
          <p className="text-sm font-semibold text-green-900 mb-3 flex items-center gap-2">
            <span className="text-lg">📱</span>
            Como conectar:
          </p>
          <ol className="text-sm text-green-800 space-y-2">
            <li className="flex items-start gap-2">
              <span className="font-bold min-w-[20px]">1.</span>
              <span>
                Abra o <strong>WhatsApp</strong> no seu celular
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold min-w-[20px]">2.</span>
              <span>
                Toque em <strong>Configurações</strong> →{" "}
                <strong>Aparelhos conectados</strong>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold min-w-[20px]">3.</span>
              <span>
                Toque em <strong>Conectar um aparelho</strong>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold min-w-[20px]">4.</span>
              <span>Aponte a câmera para este QR Code</span>
            </li>
          </ol>
        </div>

        {/* Aviso de Segurança */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
          <div className="flex items-start gap-2">
            <span className="text-lg">🔒</span>
            <div>
              <p className="text-xs font-semibold text-yellow-800 mb-1">
                Segurança
              </p>
              <p className="text-xs text-yellow-700">
                Nunca compartilhe este QR Code com outras pessoas. Ele dá acesso
                completo à sua conta do WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>❌</span>
            Cancelar
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>🔄</span>
            Gerar Novo
          </button>
        </div>

        {/* Dica */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            💡 Dica: Mantenha o celular próximo e com boa iluminação
          </p>
        </div>
      </div>

      {/* Estilos para animação */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};
