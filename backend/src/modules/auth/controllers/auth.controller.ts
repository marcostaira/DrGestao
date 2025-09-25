import { Response } from "express";
import { AuthService } from "../services/auth.service";
import { AuthenticatedRequest, ApiResponse } from "../../../types";

// ============================================================================
// AUTH CONTROLLER
// ============================================================================

export class AuthController {
  // ==========================================================================
  // LOGIN
  // ==========================================================================

  static async login(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { email, senha } = req.body;
      const result = await AuthService.login({ email, senha });

      const response: ApiResponse = {
        success: true,
        data: result, // result JÁ TEM: token, refreshToken, user, tenant
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao fazer login",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // REGISTER TENANT
  // ==========================================================================

  static async registerTenant(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantData = req.body;
      const result = await AuthService.registerTenant(tenantData);

      const response: ApiResponse = {
        success: true,
        data: result, // result JÁ TEM: token, refreshToken, user, tenant
        message: "Tenant registrado com sucesso",
      };

      res.status(201).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao registrar tenant",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // REFRESH TOKEN
  // ==========================================================================

  static async refreshToken(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const userId = req.user!.id;
      const tenantId = req.user!.tenantId;

      const tokens = await AuthService.generateNewTokens(userId, tenantId);

      const response: ApiResponse = {
        success: true,
        data: tokens,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao renovar token",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // GET PROFILE
  // ==========================================================================

  static async getProfile(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const response: ApiResponse = {
        success: true,
        data: {
          user: req.user,
          tenant: req.tenant,
        },
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao buscar perfil",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // UPDATE PROFILE
  // ==========================================================================

  static async updateProfile(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const userId = req.user!.id;
      const { nome, email } = req.body;

      await AuthService.updateProfile(userId, { nome, email });

      const response: ApiResponse = {
        success: true,
        message: "Perfil atualizado com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao atualizar perfil",
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
      const userId = req.user!.id;
      const { senhaAtual, novaSenha } = req.body;

      await AuthService.changePassword(userId, senhaAtual, novaSenha);

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
  // LOGOUT
  // ==========================================================================

  static async logout(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const tenantId = req.user!.tenantId;

      await AuthService.logout(userId, tenantId);

      const response: ApiResponse = {
        success: true,
        message: "Logout realizado com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao fazer logout",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // VALIDATE TOKEN
  // ==========================================================================

  static async validateToken(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const response: ApiResponse = {
        success: true,
        data: {
          valid: true,
          user: req.user,
        },
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Token inválido",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // CREATE USER (Admin only)
  // ==========================================================================

  static async createUser(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const userData = req.body;

      const result = await AuthService.createUser(tenantId, userData);

      const response: ApiResponse = {
        success: true,
        data: result,
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
  // LIST USERS (Admin only)
  // ==========================================================================

  static async listUsers(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { page = 1, limit = 10 } = req.query;

      const result = await AuthService.getUsers(tenantId, {
        page: Number(page),
        limit: Number(limit),
      });

      const response: ApiResponse = {
        success: true,
        data: result.data,
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
  // RESET PASSWORD (Admin only)
  // ==========================================================================

  static async resetPassword(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const adminUserId = req.user!.id;
      const { usuarioId, novaSenha } = req.body;

      await AuthService.resetPassword(adminUserId, usuarioId, novaSenha);

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
  // DEACTIVATE USER (Admin only)
  // ==========================================================================

  static async deactivateUser(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const adminUserId = req.user!.id;
      const targetUserId = req.params.id;

      await AuthService.deactivateUser(adminUserId, targetUserId);

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
}
