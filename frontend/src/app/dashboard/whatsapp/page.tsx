// src/app/dashboard/whatsapp/page.tsx
"use client";

import Head from "next/head";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { WhatsAppStatus } from "@/components/whatsapp/WhatsAppStatus";
import { WhatsAppStats } from "@/components/whatsapp/WhatsAppStats";
import { WhatsAppTemplates } from "@/components/whatsapp/WhatsAppTemplates";
import { WhatsAppHistory } from "@/components/whatsapp/WhatsAppHistory";
import { WhatsAppQRCode } from "@/components/whatsapp/WhatsAppQRCode";
import React, { useState } from "react";

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
    cancelarQRCode, // Usar o novo método
  } = useWhatsApp();

  const [activeTab, setActiveTab] = useState<
    "status" | "templates" | "history"
  >("status");

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
                  <WhatsAppStats
                    stats={stats}
                    refreshing={refreshing}
                    onRefresh={refresh}
                  />
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
