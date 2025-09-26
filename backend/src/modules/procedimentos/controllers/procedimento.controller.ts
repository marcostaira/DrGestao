import { Response } from "express";
import { ProcedimentoService } from "../services/procedimento.service";
import { AuthenticatedRequest, ApiResponse } from "../../../types";

// ============================================================================
// PROCEDIMENTO CONTROLLER
// ============================================================================

export class ProcedimentoController {
  // ==========================================================================
  // CREATE
  // ==========================================================================

  static async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const procedimento = await ProcedimentoService.create(tenantId, req.body);

      const response: ApiResponse = {
        success: true,
        data: procedimento,
        message: "Procedimento criado com sucesso",
      };

      res.status(201).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao criar procedimento",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // GET BY ID
  // ==========================================================================

  static async getById(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { id } = req.params;

      const procedimento = await ProcedimentoService.getById(tenantId, id);

      const response: ApiResponse = {
        success: true,
        data: procedimento,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao buscar procedimento",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // LIST
  // ==========================================================================

  static async list(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const procedimentos = await ProcedimentoService.list(tenantId);

      const response: ApiResponse = {
        success: true,
        data: procedimentos,
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

  // ==========================================================================
  // UPDATE
  // ==========================================================================

  static async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { id } = req.params;

      const procedimento = await ProcedimentoService.update(
        tenantId,
        id,
        req.body
      );

      const response: ApiResponse = {
        success: true,
        data: procedimento,
        message: "Procedimento atualizado com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao atualizar procedimento",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // DELETE
  // ==========================================================================

  static async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { id } = req.params;

      await ProcedimentoService.delete(tenantId, id);

      const response: ApiResponse = {
        success: true,
        message: "Procedimento excluído com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao excluir procedimento",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // GET STATISTICS
  // ==========================================================================

  static async getStatistics(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const stats = await ProcedimentoService.getStatistics(tenantId);

      const response: ApiResponse = {
        success: true,
        data: stats,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao buscar estatísticas",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }
}
