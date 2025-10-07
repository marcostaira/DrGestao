// frontend/src/services/whatsapp.service.ts

import api from "@/lib/api";
import {
  WhatsAppConfig,
  WhatsAppMensagem,
  WhatsAppTemplates,
  WhatsAppStats,
  QRCodeResponse,
  StatusResponse,
} from "../types/whatsapp.types";

export const whatsappService = {
  // ============================================================================
  // CONEXÃO
  // ============================================================================

  async inicializarConexao(): Promise<{
    qrCode?: string;
    instanceName?: string;
    alreadyConnected?: boolean;
  }> {
    const response = await api.post("/whatsapp/inicializar");
    return response.data.data;
  },

  async buscarNovoQRCode(instanceName: string): Promise<{ qrCode: string }> {
    const response = await api.get(`/whatsapp/qrcode/${instanceName}`);
    return response.data.data;
  },

  async verificarStatus(): Promise<{
    status: string;
    phoneNumber?: string;
    profileName?: string;
    totalContacts?: number;
    totalChats?: number;
    message?: string;
  }> {
    const response = await api.get("/whatsapp/status");
    return response.data.data;
  },

  async desconectar(): Promise<{ success: boolean; message: string }> {
    const response = await api.post("/whatsapp/desconectar");
    return response.data.data;
  },

  // ============================================================================
  // TEMPLATES
  // ============================================================================

  async buscarTemplates(): Promise<WhatsAppTemplates> {
    const response = await api.get("/whatsapp/templates");
    return response.data.data;
  },

  async atualizarTemplates(
    templates: Partial<WhatsAppTemplates>
  ): Promise<WhatsAppConfig> {
    const response = await api.put("/whatsapp/templates", templates);
    return response.data.data.config;
  },

  // ============================================================================
  // ENVIO DE MENSAGENS
  // ============================================================================

  async enviarConfirmacao(
    agendamentoId: string
  ): Promise<{ mensagemId: string; message: string }> {
    const response = await api.post("/whatsapp/enviar-confirmacao", {
      agendamentoId,
    });
    return response.data.data;
  },

  async enviarConfirmacaoEmLote(agendamentoIds: string[]): Promise<{
    resultados: Array<{
      agendamentoId: string;
      success: boolean;
      mensagemId?: string;
      error?: string;
    }>;
    total: number;
    enviados: number;
    erros: number;
  }> {
    const response = await api.post("/whatsapp/enviar-lote", {
      agendamentoIds,
    });
    return response.data.data;
  },

  // ============================================================================
  // ESTATÍSTICAS E HISTÓRICO
  // ============================================================================

  async buscarEstatisticas(): Promise<WhatsAppStats> {
    const response = await api.get("/whatsapp/estatisticas");
    return response.data.data;
  },

  async buscarHistorico(params?: {
    dataInicio?: string;
    dataFim?: string;
    agendamentoId?: string;
  }): Promise<WhatsAppMensagem[]> {
    const response = await api.get("/whatsapp/historico", { params });
    return response.data.data;
  },

  // ============================================================================
  // CONFIGURAÇÃO
  // ============================================================================

  async buscarConfiguracao(): Promise<WhatsAppConfig | null> {
    const response = await api.get("/whatsapp/config");
    return response.data.data;
  },

  async ativarDesativar(
    ativo: boolean
  ): Promise<{ ativo: boolean; message: string }> {
    const response = await api.put("/whatsapp/ativar", { ativo });
    return response.data.data;
  },
};
