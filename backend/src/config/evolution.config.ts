// backend/src/config/evolution.config.ts

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export interface EvolutionConfig {
  apiUrl: string;
  apiKey: string;
}

export interface CreateInstancePayload {
  instanceName: string;
  token?: string;
  number?: string;
  qrcode?: boolean;
  integration?: string;
  webhookUrl?: string;
  webhookByEvents?: boolean;
  webhookBase64?: boolean;
  webhookEvents?: string[];
}

export interface SendMessagePayload {
  number: string;
  text: string;
  delay?: number;
}

export interface InstanceInfo {
  instance: {
    instanceName: string;
    status: string;
  };
  qrcode?: {
    code: string;
    base64: string;
  };
  connectionStatus?: string;
  phoneNumber?: string;
  profileName?: string;
}

export interface QRCodeResponse {
  qrcode: {
    base64: string;
    code: string;
  };
}

export interface MessageResponse {
  message: string;
}

export interface ProfileInfo {
  number?: string;
  name?: string;
  [key: string]: any;
}

export interface Contact {
  id: string;
  name?: string;
  [key: string]: any;
}

export interface Chat {
  id: string;
  name?: string;
  [key: string]: any;
}

// Adicionar interface para o retorno
export interface FetchInstancesResponse {
  id: string;
  name: string;
  connectionStatus: string;
  ownerJid: string;
  profileName: string | null;
  profilePicUrl: string | null;
  integration: string;
  number: string | null;
  businessId: string | null;
  token: string;
  clientName: string;
  disconnectionReasonCode: string | null;
  disconnectionObject: any;
  disconnectionAt: string | null;
  createdAt: string;
  updatedAt: string;
  _count: {
    Message: number;
    Contact: number;
    Chat: number;
  };
}

class EvolutionService {
  private client: ReturnType<typeof axios.create>;
  private config: EvolutionConfig;

  constructor() {
    this.config = {
      apiUrl: process.env.EVOLUTION_API_URL || "http://localhost:8080",
      apiKey: process.env.EVOLUTION_API_KEY || "",
    };

    console.log("🔑 Evolution API Config:", {
      url: this.config.apiUrl,
      hasKey: !!this.config.apiKey,
      keyLength: this.config.apiKey?.length || 0,
    });

    // A Evolution API v2 usa o header 'apikey' (minúsculo)
    this.client = axios.create({
      baseURL: this.config.apiUrl,
      headers: {
        "Content-Type": "application/json",
        apikey: this.config.apiKey,
      },
      timeout: 30000,
    });

    // Log interceptor para debug
    this.client.interceptors.request.use(
      (config) => {
        console.log("📤 Requisição Evolution:", {
          method: config.method?.toUpperCase(),
          url: config.url,
          headers: config.headers
            ? {
                ...config.headers,
                apikey: (config.headers as any).apikey ? "***" : "MISSING",
              }
            : "NO_HEADERS",
        });
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        console.log("📥 Resposta Evolution:", {
          status: response.status,
          url: response.config?.url,
        });
        return response;
      },
      (error) => {
        console.error("❌ Erro Evolution:", {
          status: error.response?.status,
          url: error.config?.url,
          data: error.response?.data,
        });
        return Promise.reject(error);
      }
    );
  }

  // Criar instância

  async createInstance(payload: CreateInstancePayload): Promise<InstanceInfo> {
    try {
      console.log("📦 Payload para criar instância:", payload);
      const response = await this.client.post<InstanceInfo>(
        "/instance/create",
        payload
      );
      return response.data;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message;
      const errorData = error.response?.data || {};
      console.error("Detalhes completos do erro:", errorData);

      // Lançar o erro com os dados originais anexados
      const newError: any = new Error(`${errorMsg}`);
      newError.originalError = error;
      newError.errorData = errorData;
      throw newError;
    }
  }

  // Buscar QR Code
  async fetchQRCode(instanceName: string): Promise<QRCodeResponse> {
    try {
      const response = await this.client.get<any>(
        `/instance/connect/${instanceName}`
      );

      // Logar a resposta completa para debug
      console.log(
        "📋 Resposta completa do QR Code:",
        JSON.stringify(response.data, null, 2)
      );

      // A Evolution API pode retornar em diferentes formatos dependendo da versão
      // Vamos tentar diferentes possibilidades:

      let qrCodeData: QRCodeResponse;

      if (response.data.qrcode) {
        // Formato: { qrcode: { base64: "...", code: "..." } }
        qrCodeData = response.data;
      } else if (response.data.base64) {
        // Formato: { base64: "...", code: "..." }
        qrCodeData = { qrcode: response.data };
      } else if (response.data.pairingCode) {
        // Formato novo com pairing code
        qrCodeData = {
          qrcode: {
            base64: response.data.base64 || response.data.qrcode || "",
            code: response.data.pairingCode || response.data.code || "",
          },
        };
      } else {
        // Se não encontrar nenhum formato conhecido, retornar o que vier
        qrCodeData = {
          qrcode: {
            base64:
              response.data.base64 ||
              response.data.qr ||
              response.data.qrcode ||
              "",
            code: response.data.code || "",
          },
        };
      }

      console.log("✅ QR Code formatado:", qrCodeData);

      return qrCodeData;
    } catch (error: any) {
      console.error("❌ Erro ao buscar QR Code:", error.response?.data);
      throw new Error(
        `Erro ao buscar QR Code: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }

  // Verificar status da instância
  async getInstanceStatus(instanceName: string): Promise<InstanceInfo> {
    try {
      const response = await this.client.get<any>(
        `/instance/connectionState/${instanceName}`
      );

      console.log(
        "📋 =========== Resposta COMPLETA do status:",
        JSON.stringify(response.data, null, 2)
      );

      // A Evolution pode retornar diferentes formatos
      let connectionStatus = "close";

      // Tentar diferentes possibilidades
      if (response.data.instance?.state) {
        connectionStatus = response.data.instance.state;
        console.log(
          "✅ Status encontrado em: instance.state =",
          connectionStatus
        );
      } else if (response.data.state) {
        connectionStatus = response.data.state;
        console.log("✅ Status encontrado em: state =", connectionStatus);
      } else if (response.data.connectionStatus) {
        connectionStatus = response.data.connectionStatus;
        console.log(
          "✅ Status encontrado em: connectionStatus =",
          connectionStatus
        );
      } else if (response.data.status) {
        connectionStatus = response.data.status;
        console.log("✅ Status encontrado em: status =", connectionStatus);
      } else {
        console.log('⚠️ Status não encontrado, usando "close" como padrão');
      }

      console.log("🎯 Connection Status final:", connectionStatus);

      return {
        instance: {
          instanceName: instanceName,
          status: connectionStatus,
        },
        connectionStatus: connectionStatus,
      };
    } catch (error: any) {
      console.error(
        "❌ Erro ao buscar status da instância:",
        error.response?.data
      );
      throw new Error(
        `Erro ao verificar status: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }

  // Desconectar instância
  async logoutInstance(instanceName: string): Promise<MessageResponse> {
    try {
      const response = await this.client.delete<MessageResponse>(
        `/instance/logout/${instanceName}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Erro ao desconectar: ${error.response?.data?.message || error.message}`
      );
    }
  }

  // Deletar instância
  async deleteInstance(instanceName: string): Promise<MessageResponse> {
    try {
      const response = await this.client.delete<MessageResponse>(
        `/instance/delete/${instanceName}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Erro ao deletar instância: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }

  // Enviar mensagem de texto
  async sendTextMessage(
    instanceName: string,
    payload: SendMessagePayload
  ): Promise<any> {
    try {
      console.log("📤 Enviando mensagem de texto...");
      console.log("Instance:", instanceName);
      console.log("Payload completo:", JSON.stringify(payload, null, 2));

      const response = await this.client.post<any>(
        `/message/sendText/${instanceName}`,
        payload
      );

      console.log("✅ Mensagem enviada com sucesso:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("❌ Erro ao enviar mensagem:", error.response?.data);
      console.error(
        "Payload que causou erro:",
        JSON.stringify(payload, null, 2)
      );
      throw new Error(
        `Erro ao enviar mensagem: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }

  // Buscar informações do perfil
  async getProfileInfo(instanceName: string): Promise<ProfileInfo> {
    try {
      // Tentar primeiro a rota mais comum
      let response;
      try {
        response = await this.client.get<ProfileInfo>(
          `/chat/fetchProfile/${instanceName}`
        );
      } catch (err) {
        // Se não funcionar, tentar rota alternativa
        try {
          response = await this.client.get<ProfileInfo>(
            `/instance/fetchProfile/${instanceName}`
          );
        } catch (err2) {
          // Última tentativa
          response = await this.client.get<ProfileInfo>(
            `/instance/profileInfo/${instanceName}`
          );
        }
      }

      return response.data;
    } catch (error: any) {
      console.error(
        "❌ Erro ao buscar perfil (todas as rotas falharam):",
        error.response?.data
      );
      throw new Error(
        `Erro ao buscar perfil: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }

  // Buscar contatos
  async fetchContacts(instanceName: string): Promise<Contact[]> {
    try {
      const response = await this.client.get<Contact[]>(
        `/chat/findContacts/${instanceName}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Erro ao buscar contatos: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }

  // Buscar conversas
  async fetchChats(instanceName: string): Promise<Chat[]> {
    try {
      const response = await this.client.get<Chat[]>(
        `/chat/findChats/${instanceName}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Erro ao buscar conversas: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }

  // Configurar webhook
  async setWebhook(
    instanceName: string,
    webhookUrl: string,
    events: string[]
  ): Promise<any> {
    try {
      const response = await this.client.post<any>(
        `/webhook/set/${instanceName}`,
        {
          url: webhookUrl,
          enabled: true,
          webhookByEvents: true,
          webhookBase64: false,
          events,
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Erro ao configurar webhook: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }

  async fetchInstances(
    instanceName?: string
  ): Promise<FetchInstancesResponse[]> {
    try {
      console.log("🔍 Buscando instâncias...");
      const response = await this.client.get<FetchInstancesResponse[]>(
        "/instance/fetchInstances"
      );

      console.log("📋 Total de instâncias encontradas:", response.data.length);

      // Se foi passado um instanceName, filtrar
      if (instanceName) {
        const filtered = response.data.filter(
          (instance) => instance.name === instanceName
        );
        console.log("🔍 Instâncias filtradas por nome:", filtered.length);
        return filtered;
      }

      return response.data;
    } catch (error: any) {
      console.error("❌ Erro ao buscar instâncias:", error.response?.data);
      throw new Error(
        `Erro ao buscar instâncias: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }

  // Atualizar o método configureWebhook
  async configureWebhook(
    instanceName: string,
    webhookUrl: string
  ): Promise<any> {
    try {
      console.log("🔧 Configurando webhook...");
      console.log("Instance:", instanceName);
      console.log("Webhook URL:", webhookUrl);

      // Formato correto para a Evolution API v2
      const payload = {
        enabled: true,
        url: webhookUrl,
        webhookByEvents: false, // ou true, dependendo da versão
        webhookBase64: false,
        events: [
          "QRCODE_UPDATED",
          "MESSAGES_UPSERT",
          "MESSAGES_UPDATE",
          "MESSAGES_DELETE",
          "SEND_MESSAGE",
          "CONNECTION_UPDATE",
        ],
      };

      console.log("📦 Payload do webhook:", JSON.stringify(payload, null, 2));

      // Tentar a rota mais comum primeiro
      let response;
      try {
        response = await this.client.post<any>(
          `/webhook/set/${instanceName}`,
          payload
        );
      } catch (err: any) {
        // Se falhar, tentar rota alternativa
        console.log(
          "⚠️ Primeira tentativa falhou, tentando rota alternativa..."
        );

        // Algumas versões da Evolution usam essa estrutura
        const alternativePayload = {
          webhook: {
            enabled: true,
            url: webhookUrl,
            webhookByEvents: false,
            webhookBase64: false,
            events: [
              "QRCODE_UPDATED",
              "MESSAGES_UPSERT",
              "MESSAGES_UPDATE",
              "MESSAGES_DELETE",
              "SEND_MESSAGE",
              "CONNECTION_UPDATE",
            ],
          },
        };

        try {
          response = await this.client.post<any>(
            `/webhook/set/${instanceName}`,
            alternativePayload
          );
        } catch (err2: any) {
          // Terceira tentativa: PUT em vez de POST
          console.log("⚠️ Segunda tentativa falhou, tentando PUT...");
          response = await this.client.put<any>(
            `/webhook/set/${instanceName}`,
            payload
          );
        }
      }

      console.log("✅ Webhook configurado com sucesso:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("❌ Erro ao configurar webhook:", error.response?.data);
      console.error(
        "❌ Detalhes completos:",
        JSON.stringify(error.response?.data, null, 2)
      );
      throw new Error(
        `Erro ao configurar webhook: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }

  // Atualizar o método updateSettings
  async updateSettings(
    instanceName: string,
    settings: {
      reject_call?: boolean;
      msg_call?: string;
      groups_ignore?: boolean;
      always_online?: boolean;
      read_messages?: boolean;
      read_status?: boolean;
    }
  ): Promise<any> {
    try {
      console.log("⚙️ Atualizando configurações da instância...");
      console.log("Instance:", instanceName);
      console.log("Settings:", JSON.stringify(settings, null, 2));

      // Formato correto para Evolution API
      const payload = {
        rejectCall: settings.reject_call || false,
        msgCall: settings.msg_call || "",
        groupsIgnore: settings.groups_ignore || false,
        alwaysOnline: settings.always_online || false,
        readMessages: settings.read_messages || false,
        readStatus: settings.read_status || false,
      };

      console.log("📦 Payload das settings:", JSON.stringify(payload, null, 2));

      let response;
      try {
        response = await this.client.post<any>(
          `/settings/set/${instanceName}`,
          payload
        );
      } catch (err: any) {
        // Tentar PUT se POST falhar
        console.log("⚠️ POST falhou, tentando PUT...");
        response = await this.client.put<any>(
          `/settings/set/${instanceName}`,
          payload
        );
      }

      console.log("✅ Configurações atualizadas:", response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        "❌ Erro ao atualizar configurações:",
        error.response?.data
      );
      console.error(
        "❌ Detalhes completos:",
        JSON.stringify(error.response?.data, null, 2)
      );
      throw new Error(
        `Erro ao atualizar configurações: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }
}

export const evolutionService = new EvolutionService();
