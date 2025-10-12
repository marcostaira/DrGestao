// frontend/src/components/atendimentos/LinkAprovacaoModal.tsx

"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import {
  LinkIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import api from "@/lib/api";

interface LinkAprovacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  avaliacaoId: string;
  pacienteNome: string;
  pacienteTelefone: string;
}

export function LinkAprovacaoModal({
  isOpen,
  onClose,
  avaliacaoId,
  pacienteNome,
  pacienteTelefone,
}: LinkAprovacaoModalProps) {
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState<string>("");
  const [expiresAt, setExpiresAt] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [expiresInDays, setExpiresInDays] = useState(7);
  const [sendingWhatsApp, setSendingWhatsApp] = useState(false);

  const handleGerarLink = async () => {
    try {
      setLoading(true);
      const response = await api.post(
        `/atendimentos/${avaliacaoId}/link-aprovacao`,
        {
          expiresInDays,
        }
      );

      setLink(response.data.data.link);
      setExpiresAt(response.data.data.expiresAt);
      toast.success("Link gerado com sucesso!");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erro ao gerar link");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopiarLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success("Link copiado para a área de transferência!");

      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      toast.error("Erro ao copiar link");
    }
  };

  const handleEnviarWhatsApp = async () => {
    try {
      setSendingWhatsApp(true);
      await api.post(`/atendimentos/${avaliacaoId}/link-aprovacao/whatsapp`);
      toast.success("Link enviado via WhatsApp!");
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erro ao enviar via WhatsApp");
      console.error(error);
    } finally {
      setSendingWhatsApp(false);
    }
  };

  const handleClose = () => {
    setLink("");
    setExpiresAt("");
    setCopied(false);
    setExpiresInDays(7);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Gerar Link de Aprovação"
      size="md"
    >
      <div className="space-y-6">
        {/* Info do Paciente */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-1">Paciente</h3>
          <p className="text-lg font-medium text-blue-900">{pacienteNome}</p>
          <p className="text-sm text-blue-700">{pacienteTelefone}</p>
        </div>

        {!link ? (
          <>
            {/* Configuração de Expiração */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Validade do Link
              </label>
              <select
                value={expiresInDays}
                onChange={(e) => setExpiresInDays(Number(e.target.value))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value={1}>1 dia</option>
                <option value={3}>3 dias</option>
                <option value={7}>7 dias (padrão)</option>
                <option value={15}>15 dias</option>
                <option value={30}>30 dias</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                O link expirará após o período selecionado
              </p>
            </div>

            {/* Botão Gerar */}
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={handleGerarLink}
                isLoading={loading}
                disabled={loading}
              >
                <LinkIcon className="h-5 w-5 mr-2" />
                Gerar Link
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Link Gerado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link de Aprovação
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={link}
                  readOnly
                  className="flex-1 rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                />
                <button
                  onClick={handleCopiarLink}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    copied
                      ? "bg-green-600 text-white"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                  title={copied ? "Copiado!" : "Copiar link"}
                >
                  {copied ? (
                    <CheckIcon className="h-5 w-5" />
                  ) : (
                    <ClipboardDocumentIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Expira em:{" "}
                {new Date(expiresAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {/* Informações */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Atenção:</strong> Compartilhe este link apenas com o
                paciente. O link permite aprovar ou reprovar a avaliação sem
                necessidade de login.
              </p>
            </div>

            {/* Ações */}
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={handleClose}>
                Fechar
              </Button>
              <Button
                variant="primary"
                onClick={handleEnviarWhatsApp}
                isLoading={sendingWhatsApp}
                disabled={sendingWhatsApp}
              >
                <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                Enviar via WhatsApp
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
