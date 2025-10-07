/* eslint-disable @typescript-eslint/no-var-requires */
// backend/src/modules/whatsapp/whatsapp.controller.ts

import { Response } from "express";
import { AuthenticatedRequest } from "../../types";
import { whatsappService } from "./whatsapp.service";
import { webhookHandler } from "./whatsapp.webhook";

export class WhatsAppController {
  // ============================================================================
  // CONEXÃO
  // ============================================================================

  async inicializarConexao(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;

      const resultado = await whatsappService.inicializarConexao(tenantId);

      res.json({
        success: true,
        data: resultado,
      });
    } catch (error: any) {
      console.error("Erro ao inicializar conexão:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async verificarStatus(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;

      const status = await whatsappService.verificarStatus(tenantId);

      res.json({
        success: true,
        data: status,
      });
    } catch (error: any) {
      console.error("Erro ao verificar status:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async desconectar(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;

      const resultado = await whatsappService.desconectar(tenantId);

      res.json({
        success: true,
        data: resultado,
      });
    } catch (error: any) {
      console.error("Erro ao desconectar:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // ============================================================================
  // TEMPLATES
  // ============================================================================

  async buscarTemplates(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;

      const templates = await whatsappService.buscarTemplates(tenantId);

      res.json({
        success: true,
        data: templates,
      });
    } catch (error: any) {
      console.error("Erro ao buscar templates:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async atualizarTemplates(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;
      const templates = req.body;

      const resultado = await whatsappService.atualizarTemplates(
        tenantId,
        templates
      );

      res.json({
        success: true,
        data: resultado,
      });
    } catch (error: any) {
      console.error("Erro ao atualizar templates:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // ============================================================================
  // ENVIO DE MENSAGENS
  // ============================================================================

  async enviarConfirmacao(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;
      const { agendamentoId } = req.body;

      const resultado = await whatsappService.enviarConfirmacao(
        tenantId,
        agendamentoId
      );

      res.json({
        success: true,
        data: resultado,
      });
    } catch (error: any) {
      console.error("Erro ao enviar confirmação:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async enviarConfirmacaoEmLote(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;
      const { agendamentoIds } = req.body;

      const resultado = await whatsappService.enviarConfirmacaoEmLote(
        tenantId,
        agendamentoIds
      );

      res.json({
        success: true,
        data: resultado,
      });
    } catch (error: any) {
      console.error("Erro ao enviar confirmações em lote:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // ============================================================================
  // ESTATÍSTICAS E HISTÓRICO
  // ============================================================================

  async buscarEstatisticas(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;

      const stats = await whatsappService.buscarEstatisticas(tenantId);

      res.json({
        success: true,
        data: stats,
      });
    } catch (error: any) {
      console.error("Erro ao buscar estatísticas:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async buscarHistorico(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;
      const { dataInicio, dataFim, agendamentoId } = req.query;

      const historico = await whatsappService.buscarHistoricoMensagens(
        tenantId,
        dataInicio ? new Date(dataInicio as string) : undefined,
        dataFim ? new Date(dataFim as string) : undefined,
        agendamentoId as string | undefined
      );

      res.json({
        success: true,
        data: historico,
      });
    } catch (error: any) {
      console.error("Erro ao buscar histórico:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // ============================================================================
  // WEBHOOK
  // ============================================================================

  async handleWebhook(req: AuthenticatedRequest, res: Response) {
    await webhookHandler.handleWebhook(req, res);
  }

  // ============================================================================
  // CONFIGURAÇÃO
  // ============================================================================

  async buscarConfiguracao(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;
      const { whatsappModel } = require("./whatsapp.model");

      const config = await whatsappModel.findConfigByTenantId(tenantId);

      if (!config) {
        return res.json({
          success: true,
          data: null,
        });
      }

      // Não retornar dados sensíveis
      const configSafe = {
        id: config.id,
        status: config.status,
        phoneNumber: config.phoneNumber,
        profileName: config.profileName,
        totalContacts: config.totalContacts,
        totalChats: config.totalChats,
        mensagensEnviadas: config.mensagensEnviadas,
        mensagensRecebidas: config.mensagensRecebidas,
        horasAntecedencia: config.horasAntecedencia,
        enviarLinkAnamnese: config.enviarLinkAnamnese,
        formularioId: config.formularioId,
        ativo: config.ativo,
        createdAt: config.createdAt,
        updatedAt: config.updatedAt,
      };

      res.json({
        success: true,
        data: configSafe,
      });
    } catch (error: any) {
      console.error("Erro ao buscar configuração:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async ativarDesativar(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;
      const { ativo } = req.body;
      const { whatsappModel } = require("./whatsapp.model");

      const config = await whatsappModel.updateConfig(tenantId, { ativo });

      res.json({
        success: true,
        data: {
          ativo: config.ativo,
          message: ativo
            ? "WhatsApp ativado com sucesso"
            : "WhatsApp desativado com sucesso",
        },
      });
    } catch (error: any) {
      console.error("Erro ao ativar/desativar:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

export const whatsappController = new WhatsAppController();
