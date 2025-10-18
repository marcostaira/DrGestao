/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
// backend/src/modules/atendimentos/controllers/agendamento-procedimentos.controller.ts

import { Response } from "express";
import { AgendamentoProcedimentosService } from "../services/agendamento-procedimentos.service";
import { AuthenticatedRequest, ApiResponse } from "../../../types";

export class AgendamentoProcedimentosController {
  // =========================================================================
  // LISTAR PROCEDIMENTOS PARA AGENDAR
  // =========================================================================

  static async listarProcedimentosParaAgendar(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { avaliacaoId } = req.params;

      const resultado =
        await AgendamentoProcedimentosService.listarProcedimentosAgendar(
          tenantId,
          avaliacaoId
        );

      const response: ApiResponse = {
        success: true,
        data: resultado,
        message: "Procedimentos listados com sucesso",
      };
      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao listar procedimentos",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // =========================================================================
  // AGENDAR MÚLTIPLOS PROCEDIMENTOS
  // =========================================================================

  static async agendarProcedimentos(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const resultado =
        await AgendamentoProcedimentosService.agendarProcedimentos(
          tenantId,
          req.body
        );

      const response: ApiResponse = {
        success: true,
        data: resultado,
        message: `${resultado.totalAgendados} procedimento(s) agendado(s) com sucesso`,
      };
      res.status(201).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao agendar procedimentos",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // =========================================================================
  // AGENDAR PROCEDIMENTO INDIVIDUAL
  // =========================================================================

  static async agendarProcedimentoIndividual(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { atendimentoProcedimentoId } = req.params;
      const { profissionalId, dataHora } = req.body;

      const resultado =
        await AgendamentoProcedimentosService.agendarProcedimentoIndividual(
          tenantId,
          atendimentoProcedimentoId,
          profissionalId,
          dataHora
        );

      const response: ApiResponse = {
        success: true,
        data: resultado,
        message: "Procedimento agendado com sucesso",
      };
      res.status(201).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao agendar procedimento",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // =========================================================================
  // VERIFICAR DISPONIBILIDADE
  // =========================================================================

  static async verificarDisponibilidade(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { profissionalId, dataHora, duracaoMinutos } = req.query;

      const resultado =
        await AgendamentoProcedimentosService.verificarDisponibilidade(
          tenantId,
          profissionalId as string,
          new Date(dataHora as string),
          parseInt(duracaoMinutos as string)
        );

      const response: ApiResponse = {
        success: true,
        data: resultado,
      };
      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao verificar disponibilidade",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }
}
