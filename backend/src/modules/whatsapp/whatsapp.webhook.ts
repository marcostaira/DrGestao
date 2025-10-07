// backend/src/modules/whatsapp/whatsapp.webhook.ts

import { Request, Response } from "express";
import { whatsappService } from "./whatsapp.service";
import { whatsappModel } from "./whatsapp.model";
import { prisma } from "../../config/database";

interface WebhookPayload {
  event: string;
  instance: string;
  data: {
    key?: {
      remoteJid?: string;
      fromMe?: boolean;
      id?: string;
    };
    message?: {
      conversation?: string;
      extendedTextMessage?: {
        text?: string;
      };
    };
    pushName?: string;
    state?: string;
    qrcode?: string;
  };
}

export class WhatsAppWebhookHandler {
  async handleWebhook(req: Request, res: Response) {
    try {
      const payload: WebhookPayload = req.body;

      console.log("==========================================");
      console.log("📥 WEBHOOK RECEBIDO");
      console.log("==========================================");
      console.log("Evento:", payload.event);
      console.log("Instance:", payload.instance);
      console.log("Data:", JSON.stringify(payload.data, null, 2));
      console.log("==========================================");

      // Responder imediatamente
      res.status(200).json({ success: true });

      // Processar evento de forma assíncrona
      this.processEvent(payload).catch((error) => {
        console.error("❌ Erro ao processar evento:", error);
      });
    } catch (error: any) {
      console.error("❌ Erro ao processar webhook:", error);
      res.status(500).json({ error: error.message });
    }
  }

  private async processEvent(payload: WebhookPayload) {
    try {
      const { event, instance, data } = payload;

      console.log(`🔔 Processando evento: ${event}`);

      switch (event) {
        case "messages.upsert":
        case "MESSAGES_UPSERT":
          await this.handleMessage(instance, data);
          break;

        case "connection.update":
        case "CONNECTION_UPDATE":
          await this.handleConnectionUpdate(instance, data);
          break;

        case "qrcode.updated":
        case "QRCODE_UPDATED":
          await this.handleQRCodeUpdate(instance, data);
          break;

        default:
          console.log(`⏭️ Evento não tratado: ${event}`);
      }
    } catch (error: any) {
      console.error("❌ Erro ao processar evento:", error);
    }
  }

  private async handleMessage(instance: string, data: any) {
    try {
      console.log("📨 Processando mensagem recebida...");

      // Verificar se tem a estrutura de mensagem
      if (!data.key || !data.message) {
        console.log("⏭️ Estrutura de mensagem inválida");
        return;
      }

      const key = data.key;
      const message = data.message;

      console.log("Key:", JSON.stringify(key, null, 2));
      console.log("Message:", JSON.stringify(message, null, 2));

      // Ignorar mensagens enviadas por nós
      if (key.fromMe) {
        console.log("⏭️ Ignorando mensagem enviada por nós (fromMe = true)");
        return;
      }

      // Extrair telefone com formato completo
      const remoteJid = key.remoteJid || "";

      console.log("📱 RemoteJid completo:", remoteJid);

      // Ignorar grupos
      if (remoteJid.includes("@g.us")) {
        console.log("⏭️ Mensagem de grupo ignorada");
        return;
      }

      // Extrair texto da mensagem
      const messageText =
        message.conversation || message.extendedTextMessage?.text || "";

      console.log("💬 Texto da mensagem:", messageText);

      if (!messageText || messageText.trim() === "") {
        console.log("⏭️ Mensagem sem texto, ignorando");
        return;
      }

      // Buscar config pela instance
      console.log("🔍 Buscando config pela instance:", instance);

      const config = await prisma.whatsAppConfig.findFirst({
        where: { instanceName: instance },
      });

      if (!config) {
        console.log("⚠️ Config não encontrada para instance:", instance);
        return;
      }

      console.log("✅ Tenant encontrado:", config.tenantId);

      // Processar resposta com o número no formato completo (com @s.whatsapp.net)
      console.log("🔄 Processando resposta do paciente...");

      await whatsappService.processarResposta(
        config.tenantId,
        remoteJid, // Passar com @s.whatsapp.net para bater com o formato salvo
        messageText.trim()
      );

      console.log("✅ Resposta processada com sucesso!");
      console.log("==========================================");
    } catch (error: any) {
      console.error("❌ Erro ao processar mensagem:", error);
      console.error(error.stack);
      console.log("==========================================");
    }
  }

  private async handleConnectionUpdate(instance: string, data: any) {
    try {
      console.log("🔌 Atualização de conexão...");
      console.log("State:", data.state);

      const config = await prisma.whatsAppConfig.findFirst({
        where: { instanceName: instance },
      });

      if (!config) {
        console.log("⚠️ Config não encontrada para instance:", instance);
        return;
      }

      let status: "CONNECTED" | "CONNECTING" | "DISCONNECTED" = "DISCONNECTED";

      const state = data.state?.toLowerCase();

      if (state === "open" || state === "connected") {
        status = "CONNECTED";
        console.log("✅ WhatsApp conectado!");
      } else if (state === "connecting" || state === "qr") {
        status = "CONNECTING";
        console.log("⏳ WhatsApp conectando...");
      } else {
        status = "DISCONNECTED";
        console.log("❌ WhatsApp desconectado");
      }

      await whatsappModel.updateConfig(config.tenantId, { status });
      console.log(`📊 Status atualizado para: ${status}`);
    } catch (error: any) {
      console.error("❌ Erro ao atualizar status de conexão:", error);
    }
  }

  private async handleQRCodeUpdate(instance: string, data: any) {
    try {
      console.log("📱 QR Code atualizado");

      const config = await prisma.whatsAppConfig.findFirst({
        where: { instanceName: instance },
      });

      if (!config) {
        console.log("⚠️ Config não encontrada para instance:", instance);
        return;
      }

      // Se tiver QR Code no data, atualizar no banco
      if (data.qrcode) {
        await whatsappModel.updateConfig(config.tenantId, {
          qrCode: data.qrcode,
          status: "CONNECTING",
        });
        console.log("✅ QR Code salvo no banco");
      }
    } catch (error: any) {
      console.error("❌ Erro ao processar atualização de QR Code:", error);
    }
  }
}

export const webhookHandler = new WhatsAppWebhookHandler();
