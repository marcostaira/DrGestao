import { Response, NextFunction } from "express";
import { AuthenticatedRequest, AppError, Modulo, TipoUsuario } from "../types";
import { AutorizacaoService } from "../modules/autorizacoes/services/autorizacao.service";

// ============================================================================
// MIDDLEWARE DE AUTORIZAÇÃO GRANULAR
// ============================================================================

/**
 * Middleware para verificar se o usuário tem permissão para acessar um módulo
 * @param modulo - Módulo a ser verificado
 * @param tipo - Tipo de permissão: 'visualizar' ou 'criarAlterar'
 */
export const autorizar = (
  modulo: Modulo,
  tipo: "visualizar" | "criarAlterar"
) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: "Usuário não autenticado",
        });
        return;
      }

      // ADMIN sempre tem todas as permissões
      if (req.user.tipo === TipoUsuario.ADMIN) {
        return next();
      }

      // Buscar permissões do usuário se ainda não foram carregadas
      if (!req.permissoes) {
        req.permissoes = await AutorizacaoService.buscarAutorizacoes(
          req.user.id
        );
      }

      // Verificar se o módulo existe nas permissões
      const permissaoModulo = req.permissoes[modulo];

      if (!permissaoModulo) {
        res.status(403).json({
          success: false,
          error: `Acesso negado ao módulo ${modulo}`,
        });
        return;
      }

      // Verificar o tipo de permissão solicitado
      if (!permissaoModulo[tipo]) {
        const acao = tipo === "visualizar" ? "visualizar" : "criar/alterar";
        res.status(403).json({
          success: false,
          error: `Sem permissão para ${acao} no módulo ${modulo}`,
        });
        return;
      }

      next();
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Erro ao verificar permissões",
        });
      }
    }
  };
};

// ============================================================================
// MIDDLEWARE PARA CARREGAR PERMISSÕES DO USUÁRIO
// ============================================================================

/**
 * Middleware para carregar as permissões do usuário logado
 * e anexá-las ao objeto da requisição
 */
export const carregarPermissoes = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      return next();
    }

    // Buscar permissões do usuário
    req.permissoes = await AutorizacaoService.buscarAutorizacoes(req.user.id);

    next();
  } catch (error) {
    console.error("Erro ao carregar permissões:", error);
    // Não bloqueia a requisição, apenas continua sem permissões
    next();
  }
};

// ============================================================================
// HELPER PARA VERIFICAR PERMISSÃO EM CONTROLLERS
// ============================================================================

/**
 * Função helper para verificar permissão dentro de um controller
 * @param req - Request autenticado
 * @param modulo - Módulo a verificar
 * @param tipo - Tipo de permissão
 * @returns boolean
 */
export const temPermissao = async (
  req: AuthenticatedRequest,
  modulo: Modulo,
  tipo: "visualizar" | "criarAlterar"
): Promise<boolean> => {
  if (!req.user) {
    return false;
  }

  // ADMIN sempre tem permissão
  if (req.user.tipo === TipoUsuario.ADMIN) {
    return true;
  }

  // Carregar permissões se não existirem
  if (!req.permissoes) {
    req.permissoes = await AutorizacaoService.buscarAutorizacoes(req.user.id);
  }

  const permissaoModulo = req.permissoes[modulo];
  return permissaoModulo ? permissaoModulo[tipo] : false;
};
