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

class EvolutionService {
  private client: ReturnType<typeof axios.create>;
  private config: EvolutionConfig;

  constructor() {
    this.config = {
      apiUrl: process.env.EVOLUTION_API_URL || "http://localhost:8080",
      apiKey: process.env.EVOLUTION_API_KEY || "",
    };

    this.client = axios.create({
      baseURL: this.config.apiUrl,
      headers: {
        "Content-Type": "application/json",
        apikey: this.config.apiKey,
      },
      timeout: 30000,
    });
  }

  // Criar instância
  async createInstance(payload: CreateInstancePayload): Promise<InstanceInfo> {
    try {
      const response = await this.client.post<InstanceInfo>(
        "/instance/create",
        payload
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Erro ao criar instância: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }

  // Buscar QR Code
  async fetchQRCode(instanceName: string): Promise<QRCodeResponse> {
    try {
      const response = await this.client.get<QRCodeResponse>(
        `/instance/connect/${instanceName}`
      );
      return response.data;
    } catch (error: any) {
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
      const response = await this.client.get<InstanceInfo>(
        `/instance/connectionState/${instanceName}`
      );
      return response.data;
    } catch (error: any) {
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
      const response = await this.client.post<any>(
        `/message/sendText/${instanceName}`,
        payload
      );
      return response.data;
    } catch (error: any) {
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
      const response = await this.client.get<ProfileInfo>(
        `/instance/profileInfo/${instanceName}`
      );
      return response.data;
    } catch (error: any) {
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
}

export const evolutionService = new EvolutionService();
