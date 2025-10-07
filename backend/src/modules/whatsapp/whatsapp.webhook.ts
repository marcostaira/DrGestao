/* eslint-disable @typescript-eslint/no-var-requires */
// backend/src/modules/whatsapp/whatsapp.webhook.ts

import { Request, Response } from "express";
import { whatsappService } from "./whatsapp.service";
import { whatsappModel } from "./whatsapp.model";

interface WebhookPayload {
  event: string;
  instance: string;
  data: {
    key?: {
      remoteJid?: string;
      fromMe?: boolean;
    };
    message?: {
      conversation?: string;
      extendedTextMessage?: {
        text?: string;
      };
    };
    pushName?: string;
    state?: string;
  };
}

export class WhatsAppWebhookHandler {
  async handleWebhook(req: Request, res: Response) {
    try {
      const payload: WebhookPayload = req.body;

      console.log("Webhook recebido:", JSON.stringify(payload, null, 2));

      // Responder imediatamente
      res.status(200).json({ success: true });

      // Processar evento
      await this.processEvent(payload);
    } catch (error: any) {
      console.error("Erro ao processar webhook:", error);
      res.status(500).json({ error: error.message });
    }
  }

  private async processEvent(payload: WebhookPayload) {
    try {
      const { event, instance, data } = payload;

      // Buscar config pela instance
      const config = await whatsappModel.findConfigByTenantId(""); // Precisamos buscar pelo instanceName

      // Como não temos acesso direto ao tenantId pelo webhook, vamos buscar pela instanceName
      // Isso pode ser otimizado com um índice ou cache

      switch (event) {
        case "MESSAGES_UPSERT":
          await this.handleMessage(instance, data);
          break;

        case "CONNECTION_UPDATE":
          await this.handleConnectionUpdate(instance, data);
          break;

        case "QRCODE_UPDATED":
          await this.handleQRCodeUpdate(instance, data);
          break;

        default:
          console.log(`Evento não tratado: ${event}`);
      }
    } catch (error: any) {
      console.error("Erro ao processar evento:", error);
    }
  }

  private async handleMessage(instance: string, data: any) {
    try {
      // Ignorar mensagens enviadas por nós
      if (data.key?.fromMe) {
        return;
      }

      // Extrair telefone (remover sufixos do WhatsApp)
      const remoteJid = data.key?.remoteJid || "";
      const telefone = remoteJid
        .replace("@s.whatsapp.net", "")
        .replace("@g.us", "");

      // Ignorar grupos
      if (remoteJid.includes("@g.us")) {
        console.log("Mensagem de grupo ignorada");
        return;
      }

      // Extrair mensagem
      const mensagem =
        data.message?.conversation ||
        data.message?.extendedTextMessage?.text ||
        "";

      if (!mensagem) {
        return;
      }

      console.log(`Mensagem recebida de ${telefone}: ${mensagem}`);

      // Buscar tenant pela instance
      // Aqui vamos precisar de uma query customizada
      const configs = await this.findConfigByInstance(instance);

      if (!configs || configs.length === 0) {
        console.log("Config não encontrada para a instância");
        return;
      }

      // Processar resposta para cada tenant (normalmente será apenas 1)
      for (const config of configs) {
        await whatsappService.processarResposta(
          config.tenantId,
          telefone,
          mensagem
        );
      }
    } catch (error: any) {
      console.error("Erro ao processar mensagem:", error);
    }
  }

  private async handleConnectionUpdate(instance: string, data: any) {
    try {
      console.log(`Status da conexão atualizado: ${data.state}`);

      const configs = await this.findConfigByInstance(instance);

      if (!configs || configs.length === 0) {
        return;
      }

      for (const config of configs) {
        let status = "DISCONNECTED";

        if (data.state === "open") {
          status = "CONNECTED";
        } else if (data.state === "connecting") {
          status = "CONNECTING";
        }

        await whatsappModel.updateConfig(config.tenantId, { status });
      }
    } catch (error: any) {
      console.error("Erro ao atualizar status de conexão:", error);
    }
  }

  private async handleQRCodeUpdate(instance: string, data: any) {
    try {
      console.log("QR Code atualizado");

      // Aqui você pode implementar lógica adicional se necessário
      // Por exemplo, enviar o QR Code via WebSocket para o frontend
    } catch (error: any) {
      console.error("Erro ao processar atualização de QR Code:", error);
    }
  }

  private async findConfigByInstance(instanceName: string) {
    // Query customizada para buscar config pela instanceName
    const { PrismaClient } = require("@prisma/client");
    const prisma = new PrismaClient();

    try {
      const configs = await prisma.whatsAppConfig.findMany({
        where: { instanceName },
      });

      return configs;
    } catch (error) {
      console.error("Erro ao buscar config:", error);
      return [];
    }
  }
}

export const webhookHandler = new WhatsAppWebhookHandler();
