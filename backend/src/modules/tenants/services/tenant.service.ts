import { prisma } from "../../../config/database";
import { UpdateTenantData, AppError } from "../../../types";

// ============================================================================
// TENANT SERVICE
// ============================================================================

export class TenantService {
  // ==========================================================================
  // GET TENANT BY ID
  // ==========================================================================

  static async getById(tenantId: string) {
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      include: {
        plano: true,
        usuarios: {
          select: {
            id: true,
            nome: true,
            email: true,
            tipo: true,
            ativo: true,
          },
        },
        _count: {
          select: {
            usuarios: true,
            pacientes: true,
            profissionais: true,
            procedimentos: true,
            agendamentos: true,
            atendimentos: true,
          },
        },
      },
    });

    if (!tenant) {
      throw new AppError("Tenant não encontrado", 404);
    }

    return tenant;
  }

  // ==========================================================================
  // UPDATE TENANT
  // ==========================================================================

  static async update(tenantId: string, data: UpdateTenantData) {
    const existingTenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
    });

    if (!existingTenant) {
      throw new AppError("Tenant não encontrado", 404);
    }

    // Verificar nome duplicado (se alterado)
    if (data.nome && data.nome !== existingTenant.nome) {
      const tenantComNome = await prisma.tenant.findFirst({
        where: {
          nome: {
            equals: data.nome.trim(),
            mode: "insensitive",
          },
          id: { not: tenantId },
        },
      });

      if (tenantComNome) {
        throw new AppError("Já existe um tenant com este nome", 400);
      }
    }

    const updateData: any = {};

    if (data.nome) updateData.nome = data.nome.trim();
    if (data.plano) {
      // Se está mudando de plano, buscar o ID do novo plano
      const novoPlano = await prisma.plano.findFirst({
        where: { slug: data.plano },
      });
      
      if (!novoPlano) {
        throw new AppError("Plano não encontrado", 404);
      }
      
      updateData.planoId = novoPlano.id;
    }
    if (data.ativo !== undefined) updateData.ativo = data.ativo;

    const tenant = await prisma.tenant.update({
      where: { id: tenantId },
      data: updateData,
      include: {
        plano: true,
      },
    });

    return tenant;
  }

  // ==========================================================================
  // GET TENANT STATISTICS
  // ==========================================================================

  static async getStatistics(tenantId: string) {
    const [
      totalUsuarios,
      usuariosAtivos,
      totalPacientes,
      totalProfissionais,
      profissionaisAtivos,
      totalProcedimentos,
      totalAgendamentos,
      agendamentosMes,
      totalAtendimentos,
    ] = await Promise.all([
      prisma.usuario.count({ where: { tenantId } }),
      prisma.usuario.count({ where: { tenantId, ativo: true } }),
      prisma.paciente.count({ where: { tenantId } }),
      prisma.profissional.count({ where: { tenantId } }),
      prisma.profissional.count({ where: { tenantId, ativo: true } }),
      prisma.procedimento.count({ where: { tenantId } }),
      prisma.agendamento.count({ where: { tenantId } }),
      prisma.agendamento.count({
        where: {
          tenantId,
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),
      prisma.atendimento.count({ where: { tenantId } }),
    ]);

    return {
      usuarios: {
        total: totalUsuarios,
        ativos: usuariosAtivos,
      },
      pacientes: totalPacientes,
      profissionais: {
        total: totalProfissionais,
        ativos: profissionaisAtivos,
      },
      procedimentos: totalProcedimentos,
      agendamentos: {
        total: totalAgendamentos,
        mesAtual: agendamentosMes,
      },
      atendimentos: totalAtendimentos,
    };
  }

  // ==========================================================================
  // GET PLAN LIMITS
  // ==========================================================================

  static async getPlanLimits(tenantId: string) {
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      include: {
        plano: true,
      },
    });

    if (!tenant) {
      throw new AppError("Tenant não encontrado", 404);
    }

    const [profissionaisAtivos, usuariosAtivos, agendamentosMes] =
      await Promise.all([
        prisma.profissional.count({
          where: { tenantId, ativo: true },
        }),
        prisma.usuario.count({
          where: { tenantId, ativo: true },
        }),
        prisma.agendamento.count({
          where: {
            tenantId,
            createdAt: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            },
          },
        }),
      ]);

    return {
      plano: {
        nome: tenant.plano.nome,
        slug: tenant.plano.slug,
      },
      limits: {
        profissionais: tenant.plano.profissionaisAtivos,
        usuarios: tenant.plano.usuarios,
        agendamentos_mensais: tenant.plano.agendamentosMes,
      },
      usage: {
        profissionais: profissionaisAtivos,
        usuarios: usuariosAtivos,
        agendamentos_mensais: agendamentosMes,
      },
      available: {
        profissionais:
          tenant.plano.profissionaisAtivos === 999999
            ? "Ilimitado"
            : tenant.plano.profissionaisAtivos - profissionaisAtivos,
        usuarios:
          tenant.plano.usuarios === 999999
            ? "Ilimitado"
            : tenant.plano.usuarios - usuariosAtivos,
        agendamentos_mensais:
          tenant.plano.agendamentosMes === 999999
            ? "Ilimitado"
            : tenant.plano.agendamentosMes - agendamentosMes,
      },
      percentual: {
        profissionais: Math.round(
          (profissionaisAtivos / tenant.plano.profissionaisAtivos) * 100
        ),
        usuarios: Math.round((usuariosAtivos / tenant.plano.usuarios) * 100),
        agendamentos_mensais: Math.round(
          (agendamentosMes / tenant.plano.agendamentosMes) * 100
        ),
      },
    };
  }
}