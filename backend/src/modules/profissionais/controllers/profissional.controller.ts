import { Response } from "express";
import { ProfissionalService } from "../services/profissional.service";
import { AuthenticatedRequest, ApiResponse } from "../../../types";

// ============================================================================
// PROFISSIONAL CONTROLLER
// ============================================================================

export class ProfissionalController {
  // ==========================================================================
  // CREATE
  // ==========================================================================

  static async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const profissional = await ProfissionalService.create(tenantId, req.body);

      const response: ApiResponse = {
        success: true,
        data: profissional,
        message: "Profissional criado com sucesso",
      };

      res.status(201).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao criar profissional",
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

      const profissional = await ProfissionalService.getById(tenantId, id);

      const response: ApiResponse = {
        success: true,
        data: profissional,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao buscar profissional",
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
      const profissionais = await ProfissionalService.list(tenantId);

      const response: ApiResponse = {
        success: true,
        data: profissionais,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao listar profissionais",
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

      const profissional = await ProfissionalService.update(
        tenantId,
        id,
        req.body
      );

      const response: ApiResponse = {
        success: true,
        data: profissional,
        message: "Profissional atualizado com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao atualizar profissional",
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

      await ProfissionalService.delete(tenantId, id);

      const response: ApiResponse = {
        success: true,
        message: "Profissional excluído com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao excluir profissional",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // GET ACTIVE
  // ==========================================================================

  static async getActive(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const profissional = await ProfissionalService.getActive(tenantId);

      const response: ApiResponse = {
        success: true,
        data: profissional,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao buscar profissional ativo",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }
}
