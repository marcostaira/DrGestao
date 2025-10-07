// frontend/src/components/whatsapp/WhatsAppBulkConfirm.tsx

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { whatsappService } from "@/services/whatsapp.service";

interface WhatsAppBulkConfirmProps {
  agendamentoIds: string[];
  onSuccess?: () => void;
  onClose?: () => void;
}

export const WhatsAppBulkConfirm: React.FC<WhatsAppBulkConfirmProps> = ({
  agendamentoIds,
  onSuccess,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);

  const handleEnviarEmLote = async () => {
    setLoading(true);
    try {
      const result = await whatsappService.enviarConfirmacaoEmLote(
        agendamentoIds
      );

      toast.success(
        `${result.enviados} confirmações enviadas com sucesso!${
          result.erros > 0 ? ` ${result.erros} falharam.` : ""
        }`
      );

      onSuccess?.();
      onClose?.();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erro ao enviar confirmações");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>📱</span>
          Confirmar Envio em Lote
        </h3>

        <p className="text-gray-600 mb-6">
          Deseja enviar confirmações via WhatsApp para{" "}
          <strong>{agendamentoIds.length}</strong> agendamento(s)?
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>ℹ️ Importante:</strong>
          </p>
          <ul className="text-sm text-blue-700 mt-2 space-y-1 list-disc list-inside">
            <li>Apenas pacientes com telefone receberão</li>
            <li>As mensagens serão enviadas com 1 segundo de intervalo</li>
            <li>Os pacientes poderão responder para confirmar ou reagendar</li>
          </ul>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleEnviarEmLote}
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                Enviando...
              </>
            ) : (
              <>
                <span>📤</span>
                Enviar {agendamentoIds.length}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
