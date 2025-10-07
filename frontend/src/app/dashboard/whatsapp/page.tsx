// frontend/src/app/dashboard/whatsapp/page.tsx

"use client";

import Head from "next/head";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { WhatsAppStatus } from "@/components/whatsapp/WhatsAppStatus";
import { WhatsAppStats } from "@/components/whatsapp/WhatsAppStats";
import { WhatsAppTemplates } from "@/components/whatsapp/WhatsAppTemplates";
import { WhatsAppHistory } from "@/components/whatsapp/WhatsAppHistory";
import { WhatsAppQRCode } from "@/components/whatsapp/WhatsAppQRCode";
import React, { useState } from "react";
import { whatsappService } from "@/services/whatsapp.service";
import toast from "react-hot-toast";

const WhatsAppPage: React.FC = () => {
  const {
    config,
    stats,
    templates,
    qrCode,
    loading,
    refreshing,
    inicializarConexao,
    desconectar,
    atualizarTemplates,
    refresh,
    cancelarQRCode,
  } = useWhatsApp();

  const [activeTab, setActiveTab] = useState<
    "status" | "templates" | "history"
  >("status");
  const [reconfigurandoWebhook, setReconfigurandoWebhook] = useState(false);

  const handleReconfigurarWebhook = async () => {
    setReconfigurandoWebhook(true);
    try {
      const result = await whatsappService.reconfigurarWebhook();
      toast.success(result.message);
      console.log("✅ Webhook URL:", result.webhookUrl);
    } catch (error: any) {
      toast.error(
        error.response?.data?.error || "Erro ao reconfigurar webhook"
      );
    } finally {
      setReconfigurandoWebhook(false);
    }
  };

  return (
    <>
      <Head>
        <title>WhatsApp | Sistema de Agendamentos</title>
      </Head>

      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <span>💬</span>
              WhatsApp Business
            </h1>
            <p className="text-gray-600">
              Gerencie sua conexão WhatsApp e envie confirmações automáticas
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 bg-white rounded-lg shadow-md p-2">
              <button
                onClick={() => setActiveTab("status")}
                className={`flex-1 md:flex-none px-6 py-3 rounded-lg font-semibold transition-colors ${
                  activeTab === "status"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                📱 Status & Conexão
              </button>
              <button
                onClick={() => setActiveTab("templates")}
                className={`flex-1 md:flex-none px-6 py-3 rounded-lg font-semibold transition-colors ${
                  activeTab === "templates"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                📝 Templates
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex-1 md:flex-none px-6 py-3 rounded-lg font-semibold transition-colors ${
                  activeTab === "history"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                📜 Histórico
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {activeTab === "status" && (
              <>
                <WhatsAppStatus
                  config={config}
                  onConnect={inicializarConexao}
                  onDisconnect={desconectar}
                  loading={loading}
                />

                {config?.status === "CONNECTED" && (
                  <>
                    <WhatsAppStats
                      stats={stats}
                      refreshing={refreshing}
                      onRefresh={refresh}
                    />

                    {/* Card de Configurações Avançadas */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <svg
                              className="w-5 h-5 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            Configurações Avançadas
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Configure o webhook para receber respostas dos
                            pacientes
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <svg
                                className="w-5 h-5 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-800 mb-2">
                              Quando usar este botão?
                            </h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5">•</span>
                                <span>
                                  As mensagens não estão sendo recebidas pelo
                                  sistema
                                </span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5">•</span>
                                <span>
                                  Os pacientes respondem mas o status não
                                  atualiza
                                </span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5">•</span>
                                <span>
                                  Após mudanças no servidor ou URL da aplicação
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleReconfigurarWebhook}
                        disabled={reconfigurandoWebhook}
                        className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {reconfigurandoWebhook ? (
                          <>
                            <svg
                              className="w-5 h-5 animate-spin"
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
                            Reconfigurando Webhook...
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              />
                            </svg>
                            Reconfigurar Webhook
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </>
            )}

            {activeTab === "templates" && (
              <WhatsAppTemplates
                templates={templates}
                onSave={atualizarTemplates}
                loading={loading}
              />
            )}

            {activeTab === "history" && <WhatsAppHistory />}
          </div>

          {/* Informações Adicionais */}
          {config?.status === "CONNECTED" && activeTab === "status" && (
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                <span>ℹ️</span>
                Como funciona a confirmação automática?
              </h3>
              <div className="space-y-3 text-sm text-blue-900">
                <div className="flex items-start gap-2">
                  <span className="text-xl">1️⃣</span>
                  <p>
                    O sistema envia automaticamente mensagens de confirmação{" "}
                    <strong>
                      {templates?.horasAntecedencia || 24} horas antes
                    </strong>{" "}
                    de cada agendamento.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xl">2️⃣</span>
                  <p>
                    O paciente responde <strong>"1"</strong> para confirmar ou{" "}
                    <strong>"2"</strong> para reagendar.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xl">3️⃣</span>
                  <p>
                    O status do agendamento é atualizado automaticamente
                    conforme a resposta do paciente.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xl">4️⃣</span>
                  <p>
                    Todas as mensagens são enviadas com intervalo de{" "}
                    <strong>1 segundo</strong> entre cada envio.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Aviso de Desconectado */}
          {config?.status === "DISCONNECTED" && activeTab === "status" && (
            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                <span>⚠️</span>
                WhatsApp Desconectado
              </h3>
              <p className="text-sm text-yellow-900 mb-4">
                Para enviar confirmações automáticas, você precisa conectar sua
                conta do WhatsApp Business. Clique no botão "Conectar WhatsApp"
                acima para começar.
              </p>
              <div className="bg-yellow-100 rounded-lg p-4">
                <p className="text-xs font-semibold text-yellow-800 mb-2">
                  📋 Requisitos:
                </p>
                <ul className="text-xs text-yellow-900 space-y-1 list-disc list-inside">
                  <li>WhatsApp Business instalado no seu celular</li>
                  <li>Número de telefone ativo</li>
                  <li>Acesso à internet no celular</li>
                  <li>Permissão para escanear QR Code</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal QR Code */}
      {qrCode && <WhatsAppQRCode qrCode={qrCode} onCancel={cancelarQRCode} />}
    </>
  );
};

export default WhatsAppPage;
