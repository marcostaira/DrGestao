import { prisma } from "../../../config/database";
import { AppError } from "../../../types";

export class PlanoService {
  // Buscar limites do plano do tenant
  private static async getLimites(tenantId: string) {
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      include: { plano: true },
    });

    if (!tenant) {
      throw new AppError("Tenant não encontrado", 404);
    }

    if (!tenant.plano.ativo) {
      throw new AppError("Plano inativo. Entre em contato com o suporte.", 403);
    }

    return tenant.plano;
  }

  static async verificarLimiteProfissionais(tenantId: string): Promise<void> {
    const plano = await this.getLimites(tenantId);

    const profissionaisAtivos = await prisma.profissional.count({
      where: { tenantId, ativo: true },
    });

    if (profissionaisAtivos >= plano.profissionaisAtivos) {
      throw new AppError(
        `Limite de ${plano.profissionaisAtivos} profissional(is) ativo(s) atingido. Faça upgrade do seu plano.`,
        403
      );
    }
  }

  static async verificarLimiteUsuarios(tenantId: string): Promise<void> {
    const plano = await this.getLimites(tenantId);

    const usuariosAtivos = await prisma.usuario.count({
      where: { tenantId, ativo: true },
    });

    if (usuariosAtivos >= plano.usuarios) {
      throw new AppError(
        `Limite de ${plano.usuarios} usuário(s) atingido. Faça upgrade do seu plano.`,
        403
      );
    }
  }

  static async verificarLimitePacientes(tenantId: string): Promise<void> {
    const plano = await this.getLimites(tenantId);

    const totalPacientes = await prisma.paciente.count({
      where: { tenantId },
    });

    if (totalPacientes >= plano.pacientes) {
      throw new AppError(
        `Limite de ${plano.pacientes} paciente(s) atingido. Faça upgrade do seu plano.`,
        403
      );
    }
  }

  static async verificarLimiteAgendamentosMes(tenantId: string): Promise<void> {
    const plano = await this.getLimites(tenantId);

    const inicioMes = new Date();
    inicioMes.setDate(1);
    inicioMes.setHours(0, 0, 0, 0);

    const fimMes = new Date(inicioMes);
    fimMes.setMonth(fimMes.getMonth() + 1);

    const agendamentosMes = await prisma.agendamento.count({
      where: {
        tenantId,
        createdAt: {
          gte: inicioMes,
          lt: fimMes,
        },
      },
    });

    if (agendamentosMes >= plano.agendamentosMes) {
      throw new AppError(
        `Limite de ${plano.agendamentosMes} agendamento(s) por mês atingido. Faça upgrade do seu plano.`,
        403
      );
    }
  }

  static async verificarFuncionalidadeWhatsApp(
    tenantId: string
  ): Promise<void> {
    const plano = await this.getLimites(tenantId);

    if (!plano.whatsappAtivo) {
      throw new AppError(
        "Funcionalidade WhatsApp não disponível no seu plano. Faça upgrade.",
        403
      );
    }
  }

  static async verificarFuncionalidadeGoogleCalendar(
    tenantId: string
  ): Promise<void> {
    const plano = await this.getLimites(tenantId);

    if (!plano.googleCalendarSync) {
      throw new AppError(
        "Sincronização com Google Calendar não disponível no seu plano. Faça upgrade.",
        403
      );
    }
  }

  static async obterUsoAtual(tenantId: string) {
    const plano = await this.getLimites(tenantId);

    const [profissionaisAtivos, usuariosAtivos, totalPacientes] =
      await Promise.all([
        prisma.profissional.count({ where: { tenantId, ativo: true } }),
        prisma.usuario.count({ where: { tenantId, ativo: true } }),
        prisma.paciente.count({ where: { tenantId } }),
      ]);

    const inicioMes = new Date();
    inicioMes.setDate(1);
    inicioMes.setHours(0, 0, 0, 0);

    const fimMes = new Date(inicioMes);
    fimMes.setMonth(fimMes.getMonth() + 1);

    const agendamentosMes = await prisma.agendamento.count({
      where: {
        tenantId,
        createdAt: { gte: inicioMes, lt: fimMes },
      },
    });

    return {
      plano: {
        nome: plano.nome,
        slug: plano.slug,
      },
      limites: {
        profissionaisAtivos: plano.profissionaisAtivos,
        usuarios: plano.usuarios,
        pacientes: plano.pacientes,
        agendamentosMes: plano.agendamentosMes,
        whatsappAtivo: plano.whatsappAtivo,
        googleCalendarSync: plano.googleCalendarSync,
      },
      uso: {
        profissionaisAtivos,
        usuarios: usuariosAtivos,
        pacientes: totalPacientes,
        agendamentosMes,
      },
      percentuais: {
        profissionaisAtivos: Math.round(
          (profissionaisAtivos / plano.profissionaisAtivos) * 100
        ),
        usuarios: Math.round((usuariosAtivos / plano.usuarios) * 100),
        pacientes: Math.round((totalPacientes / plano.pacientes) * 100),
        agendamentosMes: Math.round(
          (agendamentosMes / plano.agendamentosMes) * 100
        ),
      },
    };
  }
}
