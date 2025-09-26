import { Response } from "express";
import { TenantService } from "../services/tenant.service";
import { AuthenticatedRequest, ApiResponse } from "../../../types";

// ============================================================================
// TENANT CONTROLLER
// ============================================================================

export class TenantController {
  // ==========================================================================
  // GET CURRENT TENANT
  // ==========================================================================

  static async getCurrent(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const tenant = await TenantService.getById(tenantId);

      const response: ApiResponse = {
        success: true,
        data: tenant,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao buscar tenant",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // UPDATE TENANT
  // ==========================================================================

  static async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const tenant = await TenantService.update(tenantId, req.body);

      const response: ApiResponse = {
        success: true,
        data: tenant,
        message: "Tenant atualizado com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao atualizar tenant",
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
      const stats = await TenantService.getStatistics(tenantId);

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

  // ==========================================================================
  // GET PLAN LIMITS
  // ==========================================================================

  static async getPlanLimits(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const limits = await TenantService.getPlanLimits(tenantId);

      const response: ApiResponse = {
        success: true,
        data: limits,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao buscar limites do plano",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }
}
