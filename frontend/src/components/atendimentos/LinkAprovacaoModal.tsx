// frontend/src/components/atendimentos/LinkAprovacaoModal.tsx

"use client";

import React, { useState, useEffect } from "react";
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
  const [checkingExisting, setCheckingExisting] = useState(true); // ✅ NOVO
  const [link, setLink] = useState<string>("");
  const [expiresAt, setExpiresAt] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [expiresInDays, setExpiresInDays] = useState(7);
  const [sendingWhatsApp, setSendingWhatsApp] = useState(false);
  const [enviadoWhatsApp, setEnviadoWhatsApp] = useState(false); // ✅ NOVO
  const [enviadoEm, setEnviadoEm] = useState<string>(""); // ✅ NOVO

  // ✅ NOVO: Verificar se já existe link válido ao abrir modal
  useEffect(() => {
    if (isOpen) {
      checkExistingLink();
    }
  }, [isOpen, avaliacaoId]);

  const checkExistingLink = async () => {
    try {
      setCheckingExisting(true);
      const response = await api.get(
        `/atendimentos/${avaliacaoId}/link-aprovacao/status`
      );

      if (response.data.data && response.data.data.linkValido) {
        const data = response.data.data;
        setLink(data.link);
        setExpiresAt(data.expiresAt);
        setEnviadoWhatsApp(data.enviadoWhatsApp || false);
        setEnviadoEm(data.enviadoEm || "");
      }
    } catch (error) {
      // Sem link existente ou link expirado
      setLink("");
      setExpiresAt("");
    } finally {
      setCheckingExisting(false);
    }
  };

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

      // Atualizar estado de envio
      setEnviadoWhatsApp(true);
      setEnviadoEm(new Date().toISOString());
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
    setEnviadoWhatsApp(false);
    setEnviadoEm("");
    onClose();
  };

  // ✅ Formato de data mais legível
  const formatExpiration = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    const formattedDate = date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    if (diffDays > 0) {
      return `${formattedDate} (${diffDays} dia${diffDays > 1 ? "s" : ""})`;
    } else if (diffHours > 0) {
      return `${formattedDate} (${diffHours} hora${diffHours > 1 ? "s" : ""})`;
    } else {
      return `${formattedDate} (expira em breve)`;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={link ? "Link de Aprovação" : "Gerar Link de Aprovação"}
      size="md"
    >
      <div className="space-y-6">
        {/* Info do Paciente */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-1">Paciente</h3>
          <p className="text-lg font-medium text-blue-900">{pacienteNome}</p>
          <p className="text-sm text-blue-700">{pacienteTelefone}</p>
        </div>

        {/* ✅ Loading ao verificar link existente */}
        {checkingExisting ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : !link ? (
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
                Expira em: {formatExpiration(expiresAt)}
              </p>
            </div>

            {/* ✅ Info de envio WhatsApp */}
            {enviadoWhatsApp && enviadoEm && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-800">
                  ✓ Link enviado via WhatsApp em{" "}
                  {new Date(enviadoEm).toLocaleDateString("pt-BR")} às{" "}
                  {new Date(enviadoEm).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            )}

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
              {/* ✅ NOVO: Botão Reenviar se já foi enviado */}
              {enviadoWhatsApp ? (
                <Button
                  variant="primary"
                  onClick={handleEnviarWhatsApp}
                  isLoading={sendingWhatsApp}
                  disabled={sendingWhatsApp}
                >
                  <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                  Reenviar via WhatsApp
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleEnviarWhatsApp}
                  isLoading={sendingWhatsApp}
                  disabled={sendingWhatsApp}
                >
                  <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                  Enviar via WhatsApp
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
