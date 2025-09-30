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

    // Verificar se o tenant ainda está ativo (incluindo plano)
    const tenant = await prisma.tenant.findUnique({
      where: { id: req.tenant.id },
      include: {
        plano: true,
      },
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
      plano: tenant.plano.nome,
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

    const subdomain = host.split(".")[0];

    if (!host.includes("localhost") && !host.match(/^\d+\.\d+\.\d+\.\d+/)) {
      const tenant = await prisma.tenant.findFirst({
        where: {
          nome: {
            equals: subdomain,
            mode: "insensitive",
          },
          ativo: true,
        },
        include: {
          plano: true,
        },
      });

      if (!tenant) {
        throw new AppError("Tenant não encontrado para este subdomínio", 404);
      }

      if (!req.tenant) {
        req.tenant = {
          id: tenant.id,
          nome: tenant.nome,
          plano: tenant.plano.nome,
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
        await prisma.logSistema.create({
          data: {
            tenantId: req.tenant.id,
            usuarioId: req.user.id,
            tipo: "LOGIN" as any,
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
      console.error("Erro ao registrar atividade do tenant:", error);
      next();
    }
  };
};
