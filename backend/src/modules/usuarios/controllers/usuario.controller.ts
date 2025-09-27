import { Response } from "express";
import { UsuarioService } from "../services/usuario.service";
import { AuthenticatedRequest, ApiResponse } from "../../../types";

// ============================================================================
// USUARIO CONTROLLER
// ============================================================================

export class UsuarioController {
  // ==========================================================================
  // CREATE
  // ==========================================================================

  static async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const usuario = await UsuarioService.create(tenantId, req.body);

      const response: ApiResponse = {
        success: true,
        data: usuario,
        message: "Usuário criado com sucesso",
      };

      res.status(201).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao criar usuário",
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

      const usuario = await UsuarioService.getById(tenantId, id);

      const response: ApiResponse = {
        success: true,
        data: usuario,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao buscar usuário",
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
      const { page, limit, tipo, ativo } = req.query;

      const result = await UsuarioService.list(tenantId, {
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        tipo: tipo as string,
        ativo: ativo === "true" ? true : ativo === "false" ? false : undefined,
      });

      const response: ApiResponse = {
        success: true,
        data: result.usuarios,
        meta: result.meta,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao listar usuários",
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

      const usuario = await UsuarioService.update(tenantId, id, req.body);

      const response: ApiResponse = {
        success: true,
        data: usuario,
        message: "Usuário atualizado com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao atualizar usuário",
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

      await UsuarioService.delete(tenantId, id);

      const response: ApiResponse = {
        success: true,
        message: "Usuário desativado com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao desativar usuário",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // CHANGE PASSWORD
  // ==========================================================================

  static async changePassword(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const usuarioId = req.user!.id;
      const { senhaAtual, novaSenha } = req.body;

      await UsuarioService.changePassword(usuarioId, senhaAtual, novaSenha);

      const response: ApiResponse = {
        success: true,
        message: "Senha alterada com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao alterar senha",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // RESET PASSWORD (Admin)
  // ==========================================================================

  static async resetPassword(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { usuarioId, novaSenha } = req.body;

      await UsuarioService.resetPassword(tenantId, usuarioId, novaSenha);

      const response: ApiResponse = {
        success: true,
        message: "Senha resetada com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao resetar senha",
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
      const stats = await UsuarioService.getStatistics(tenantId);

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
  // TOGGLE STATUS
  // ==========================================================================

  static async toggleStatus(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { id } = req.params;

      const usuario = await UsuarioService.toggleStatus(tenantId, id);

      const response: ApiResponse = {
        success: true,
        data: usuario,
        message: usuario.ativo
          ? "Usuário ativado com sucesso"
          : "Usuário desativado com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao alterar status do usuário",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }
}
