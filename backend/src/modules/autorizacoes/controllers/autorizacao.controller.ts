import { Response } from "express";
import { AuthenticatedRequest, AppError, TipoUsuario } from "../../../types";
import { AutorizacaoService } from "../services/autorizacao.service";

// ============================================================================
// AUTORIZACAO CONTROLLER
// ============================================================================

export class AutorizacaoController {
  // ==========================================================================
  // BUSCAR AUTORIZAÇÕES DO USUÁRIO LOGADO
  // ==========================================================================

  static async getMinhasAutorizacoes(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError("Usuário não autenticado", 401);
      }

      const autorizacoes = await AutorizacaoService.buscarAutorizacoes(
        req.user.id
      );

      res.json({
        success: true,
        data: {
          usuarioId: req.user.id,
          tipo: req.user.tipo,
          autorizacoes,
        },
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Erro ao buscar autorizações",
        });
      }
    }
  }

  // ==========================================================================
  // BUSCAR AUTORIZAÇÕES DE UM USUÁRIO ESPECÍFICO (ADMIN ONLY)
  // ==========================================================================

  static async getAutorizacoesUsuario(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.user || !req.tenant) {
        throw new AppError("Usuário não autenticado", 401);
      }

      const { usuarioId } = req.params;

      const data = await AutorizacaoService.buscarAutorizacoesDetalhadas(
        req.tenant.id,
        usuarioId
      );

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Erro ao buscar autorizações do usuário",
        });
      }
    }
  }

  // ==========================================================================
  // ATUALIZAR AUTORIZAÇÕES DE UM USUÁRIO (ADMIN ONLY)
  // ==========================================================================

  static async atualizarAutorizacoes(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.user || !req.tenant) {
        throw new AppError("Usuário não autenticado", 401);
      }

      const { usuarioId } = req.params;
      const { autorizacoes } = req.body;

      // Validar que não está tentando modificar as próprias permissões
      if (usuarioId === req.user.id) {
        throw new AppError(
          "Não é possível modificar suas próprias autorizações",
          403
        );
      }

      const data = await AutorizacaoService.atualizarAutorizacoes(
        req.tenant.id,
        usuarioId,
        { autorizacoes }
      );

      res.json({
        success: true,
        message: "Autorizações atualizadas com sucesso",
        data,
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Erro ao atualizar autorizações",
        });
      }
    }
  }

  // ==========================================================================
  // LISTAR USUÁRIOS COM AUTORIZAÇÕES (ADMIN ONLY)
  // ==========================================================================

  static async listarUsuariosComAutorizacoes(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.user || !req.tenant) {
        throw new AppError("Usuário não autenticado", 401);
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const tipo = req.query.tipo as TipoUsuario | undefined;
      const ativo =
        req.query.ativo === "true"
          ? true
          : req.query.ativo === "false"
          ? false
          : undefined;

      const data = await AutorizacaoService.listarUsuariosComAutorizacoes(
        req.tenant.id,
        { page, limit, tipo, ativo }
      );

      res.json({
        success: true,
        data: data.usuarios,
        meta: data.meta,
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Erro ao listar usuários",
        });
      }
    }
  }

  // ==========================================================================
  // CRIAR AUTORIZAÇÕES INICIAIS (Chamado ao criar usuário)
  // ==========================================================================

  static async criarAutorizacoesIniciais(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError("Usuário não autenticado", 401);
      }

      const { usuarioId, tipo } = req.body;

      const autorizacoes = await AutorizacaoService.criarAutorizacoesIniciais(
        usuarioId,
        tipo
      );

      res.json({
        success: true,
        message: "Autorizações criadas com sucesso",
        data: autorizacoes,
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Erro ao criar autorizações",
        });
      }
    }
  }
}
