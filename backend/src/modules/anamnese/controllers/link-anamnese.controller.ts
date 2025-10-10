// backend/src/modules/anamnese/link-anamnese.controller.ts

import { Request, Response } from "express";
import { LinkAnamneseService } from "../services/link-anamnese.service";
import { AuthenticatedRequest } from "@/types";

export class LinkAnamneseController {
  // Criar link
  static async create(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;
      const { pacienteId, formularioId, agendamentoId, expiresInDays } =
        req.body;

      const link = await LinkAnamneseService.createLink({
        tenantId,
        pacienteId,
        formularioId,
        agendamentoId,
        expiresInDays,
      });

      res.status(201).json({
        success: true,
        data: link,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Validar token (público - sem autenticação)
  static async validateToken(req: Request, res: Response) {
    try {
      const { token } = req.params;

      const link = await LinkAnamneseService.validateToken(token);

      res.json({
        success: true,
        data: link,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Salvar resposta (público - sem autenticação)
  static async saveResposta(req: Request, res: Response) {
    try {
      const { token } = req.params;
      const { respostas, observacoes } = req.body;

      const anamnese = await LinkAnamneseService.saveResposta(
        token,
        respostas,
        observacoes
      );

      res.json({
        success: true,
        message: "Anamnese salva com sucesso!",
        data: anamnese,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Listar links de um paciente
  static async listByPaciente(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;
      const { pacienteId } = req.params;

      const links = await LinkAnamneseService.listByPaciente(
        tenantId,
        pacienteId
      );

      res.json({
        success: true,
        data: links,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Enviar link via WhatsApp
  static async sendViaWhatsApp(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;
      const { pacienteId, formularioId, agendamentoId } = req.body;

      const result = await LinkAnamneseService.sendViaWhatsApp({
        tenantId,
        pacienteId,
        formularioId,
        agendamentoId,
      });

      res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        error: error.message,
      });
    }
  }
}
