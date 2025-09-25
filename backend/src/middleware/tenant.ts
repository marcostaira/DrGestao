/* eslint-disable no-case-declarations */
import { Response, NextFunction } from "express";
import { AuthenticatedRequest, AppError } from "../types";
import { prisma } from "../config/database";

// ============================================================================
// TENANT VALIDATION MIDDLEWARE
// ============================================================================

export const validateTenant = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user || !req.tenant) {
      throw new AppError("Informações de tenant não disponíveis", 401);
    }

    // Verificar se o tenant ainda está ativo
    const tenant = await prisma.tenant.findUnique({
      where: { id: req.tenant.id },
    });

    if (!tenant) {
      throw new AppError("Tenant não encontrado", 404);
    }

    if (!tenant.ativo) {
      throw new AppError("Tenant inativo", 403);
    }

    // Atualizar dados do tenant na requisição se houver mudanças
    req.tenant = {
      id: tenant.id,
      nome: tenant.nome,
      plano: tenant.plano,
      ativo: tenant.ativo,
    };

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
        error: "Erro de validação do tenant",
      });
    }
  }
};

// ============================================================================
// TENANT ISOLATION MIDDLEWARE
// ============================================================================

export const ensureTenantIsolation = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: "Usuário não autenticado",
    });
    return;
  }

  // Adicionar tenantId automaticamente aos parâmetros da query se não existir
  if (!req.query.tenantId && req.user.tenantId) {
    req.query.tenantId = req.user.tenantId;
  }

  // Adicionar tenantId ao body se não existir
  if (
    req.body &&
    typeof req.body === "object" &&
    !req.body.tenantId &&
    req.user.tenantId
  ) {
    req.body.tenantId = req.user.tenantId;
  }

  next();
};

// ============================================================================
// VALIDATE RESOURCE OWNERSHIP
// ============================================================================

export const validateResourceOwnership = (
  resourceType:
    | "paciente"
    | "profissional"
    | "procedimento"
    | "agendamento"
    | "atendimento"
) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.user) {
        throw new AppError("Usuário não autenticado", 401);
      }

      const resourceId = req.params.id;
      if (!resourceId) {
        throw new AppError("ID do recurso requerido", 400);
      }

      let resource;

      switch (resourceType) {
        case "paciente":
          resource = await prisma.paciente.findUnique({
            where: { id: resourceId },
            select: { tenantId: true },
          });
          break;

        case "profissional":
          resource = await prisma.profissional.findUnique({
            where: { id: resourceId },
            select: { tenantId: true },
          });
          break;

        case "procedimento":
          resource = await prisma.procedimento.findUnique({
            where: { id: resourceId },
            select: { tenantId: true },
          });
          break;

        case "agendamento":
          resource = await prisma.agendamento.findUnique({
            where: { id: resourceId },
            select: { tenantId: true },
          });
          break;

        case "atendimento":
          resource = await prisma.atendimento.findUnique({
            where: { id: resourceId },
            select: { tenantId: true },
          });
          break;

        default:
          throw new AppError("Tipo de recurso inválido", 400);
      }

      if (!resource) {
        throw new AppError(`${resourceType} não encontrado`, 404);
      }

      if (resource.tenantId !== req.user.tenantId) {
        throw new AppError("Acesso negado a este recurso", 403);
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
          error: "Erro de validação de propriedade do recurso",
        });
      }
    }
  };
};

// ============================================================================
// PLAN RESTRICTIONS MIDDLEWARE
// ============================================================================

export const checkPlanLimits = (
  feature: "profissionais" | "usuarios" | "agendamentos_mensais"
) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.tenant) {
        throw new AppError("Informações do tenant não disponíveis", 401);
      }

      // Definir limites por plano
      const planLimits = {
        basico: {
          profissionais: 1,
          usuarios: 2,
          agendamentos_mensais: 1000,
        },
        premium: {
          profissionais: 5,
          usuarios: 10,
          agendamentos_mensais: 5000,
        },
        enterprise: {
          profissionais: -1, // Ilimitado
          usuarios: -1, // Ilimitado
          agendamentos_mensais: -1, // Ilimitado
        },
      };

      const currentLimits =
        planLimits[req.tenant.plano as keyof typeof planLimits] ||
        planLimits.basico;
      const limit = currentLimits[feature];

      // Se o limite é -1, é ilimitado
      if (limit === -1) {
        return next();
      }

      let currentCount = 0;

      switch (feature) {
        case "profissionais":
          currentCount = await prisma.profissional.count({
            where: { tenantId: req.tenant.id, ativo: true },
          });
          break;

        case "usuarios":
          currentCount = await prisma.usuario.count({
            where: { tenantId: req.tenant.id, ativo: true },
          });
          break;

        case "agendamentos_mensais":
          const now = new Date();
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          const endOfMonth = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            0,
            23,
            59,
            59
          );

          currentCount = await prisma.agendamento.count({
            where: {
              tenantId: req.tenant.id,
              createdAt: {
                gte: startOfMonth,
                lte: endOfMonth,
              },
            },
          });
          break;
      }

      if (currentCount >= limit) {
        throw new AppError(
          `Limite do plano atingido para ${feature}. Limite atual: ${limit}`,
          402
        );
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
          error: "Erro ao verificar limites do plano",
        });
      }
    }
  };
};

// ============================================================================
// TENANT STATISTICS MIDDLEWARE
// ============================================================================

export const attachTenantStats = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.tenant) {
      return next();
    }

    const stats = await Promise.all([
      prisma.paciente.count({ where: { tenantId: req.tenant.id } }),
      prisma.profissional.count({
        where: { tenantId: req.tenant.id, ativo: true },
      }),
      prisma.procedimento.count({ where: { tenantId: req.tenant.id } }),
      prisma.agendamento.count({ where: { tenantId: req.tenant.id } }),
      prisma.atendimento.count({ where: { tenantId: req.tenant.id } }),
    ]);

    req.tenantStats = {
      pacientes: stats[0],
      profissionais: stats[1],
      procedimentos: stats[2],
      agendamentos: stats[3],
      atendimentos: stats[4],
    };

    next();
  } catch (error) {
    // Não bloquear a requisição se não conseguir obter estatísticas
    console.error("Erro ao obter estatísticas do tenant:", error);
    next();
  }
};

// ============================================================================
// VALIDATE TENANT SUBDOMAIN (se usar subdomínios)
// ============================================================================

export const validateSubdomain = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const host = req.get("host");
    if (!host) {
      return next();
    }

    // Extrair subdomínio se existir
    const subdomain = host.split(".")[0];

    // Se não for localhost ou IP, validar subdomínio
    if (!host.includes("localhost") && !host.match(/^\d+\.\d+\.\d+\.\d+/)) {
      const tenant = await prisma.tenant.findFirst({
        where: {
          nome: {
            equals: subdomain,
            mode: "insensitive",
          },
          ativo: true,
        },
      });

      if (!tenant) {
        throw new AppError("Tenant não encontrado para este subdomínio", 404);
      }

      // Adicionar informações do tenant à requisição se não existir usuário autenticado
      if (!req.tenant) {
        req.tenant = {
          id: tenant.id,
          nome: tenant.nome,
          plano: tenant.plano,
          ativo: tenant.ativo,
        };
      }
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
        error: "Erro de validação de subdomínio",
      });
    }
  }
};

// ============================================================================
// TENANT ACTIVITY LOGGER
// ============================================================================

export const logTenantActivity = (action: string) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (req.user && req.tenant) {
        // Log da atividade (pode ser usado para auditoria)
        await prisma.logSistema.create({
          data: {
            tenantId: req.tenant.id,
            usuarioId: req.user.id,
            tipo: "LOGIN" as any, // Ajustar conforme necessário
            descricao: `${action} - ${req.method} ${req.path}`,
            metadata: {
              ip: req.ip,
              userAgent: req.get("User-Agent"),
              timestamp: new Date().toISOString(),
            },
          },
        });
      }

      next();
    } catch (error) {
      // Não bloquear a requisição se não conseguir fazer log
      console.error("Erro ao registrar atividade do tenant:", error);
      next();
    }
  };
};
