import { prisma } from "../../../config/database";
import {
  CreateProfissionalData,
  UpdateProfissionalData,
  AppError,
} from "../../../types";

// ============================================================================
// PROFISSIONAL SERVICE
// ============================================================================

export class ProfissionalService {
  // ==========================================================================
  // CREATE PROFISSIONAL
  // ==========================================================================

  static async create(tenantId: string, data: CreateProfissionalData) {
    // Verificar limite de profissionais ativos para o plano
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      include: {
        plano: true,
      },
    });

    if (!tenant) {
      throw new AppError("Tenant não encontrado", 404);
    }

    // Contar profissionais ativos
    const profissionaisAtivos = await prisma.profissional.count({
      where: { tenantId, ativo: true },
    });

    // Verificar limite do plano
    if (profissionaisAtivos >= tenant.plano.profissionaisAtivos) {
      throw new AppError(
        `Limite de ${tenant.plano.profissionaisAtivos} profissional(is) ativo(s) atingido para o plano ${tenant.plano.nome}.`,
        403
      );
    }

    // Se já existe um profissional ativo no plano básico, desativar
    if (tenant.plano.slug === "basico" && profissionaisAtivos > 0) {
      await prisma.profissional.updateMany({
        where: { tenantId, ativo: true },
        data: { ativo: false },
      });
    }

    // Criar profissional
    const profissional = await prisma.profissional.create({
      data: {
        tenantId,
        nome: data.nome.trim(),
        especialidade: data.especialidade?.trim() || null,
        cor: data.cor || "#3B82F6",
        observacoes: data.observacoes?.trim() || null,
        ativo: true,
      },
    });

    return profissional;
  }

  // ==========================================================================
  // GET PROFISSIONAL BY ID
  // ==========================================================================

  static async getById(tenantId: string, profissionalId: string) {
    const profissional = await prisma.profissional.findFirst({
      where: { id: profissionalId, tenantId },
      include: {
        pacientes: {
          select: {
            id: true,
            nome: true,
            telefone: true,
          },
          take: 10,
          orderBy: { nome: "asc" },
        },
        agendamentos: {
          select: {
            id: true,
            dataHora: true,
            status: true,
            paciente: {
              select: {
                nome: true,
              },
            },
          },
          take: 5,
          orderBy: { dataHora: "desc" },
        },
      },
    });

    if (!profissional) {
      throw new AppError("Profissional não encontrado", 404);
    }

    return profissional;
  }

  // ==========================================================================
  // LIST PROFISSIONAIS
  // ==========================================================================

  static async list(tenantId: string) {
    const profissionais = await prisma.profissional.findMany({
      where: { tenantId },
      include: {
        _count: {
          select: {
            pacientes: true,
            agendamentos: true,
          },
        },
      },
      orderBy: [{ ativo: "desc" }, { nome: "asc" }],
    });

    return profissionais;
  }

  // ==========================================================================
  // UPDATE PROFISSIONAL
  // ==========================================================================

  static async update(
    tenantId: string,
    profissionalId: string,
    data: UpdateProfissionalData
  ) {
    // Verificar se profissional existe
    const existingProfissional = await prisma.profissional.findFirst({
      where: { id: profissionalId, tenantId },
    });

    if (!existingProfissional) {
      throw new AppError("Profissional não encontrado", 404);
    }

    // Se está ativando um profissional no plano básico, desativar outros
    if (data.ativo === true) {
      const tenant = await prisma.tenant.findUnique({
        where: { id: tenantId },
        include: {
          plano: true,
        },
      });

      if (tenant?.plano.slug === "basico") {
        await prisma.profissional.updateMany({
          where: {
            tenantId,
            ativo: true,
            id: { not: profissionalId },
          },
          data: { ativo: false },
        });
      }
    }

    // Preparar dados para atualização
    const updateData: any = {};

    if (data.nome) updateData.nome = data.nome.trim();
    if (data.especialidade !== undefined) {
      updateData.especialidade = data.especialidade
        ? data.especialidade.trim()
        : null;
    }
    if (data.cor !== undefined) {
      updateData.cor = data.cor;
    }
    if (data.observacoes !== undefined) {
      updateData.observacoes = data.observacoes
        ? data.observacoes.trim()
        : null;
    }
    if (data.ativo !== undefined) {
      updateData.ativo = data.ativo;
    }

    // Atualizar profissional
    const profissional = await prisma.profissional.update({
      where: { id: profissionalId },
      data: updateData,
    });

    return profissional;
  }

  // ==========================================================================
  // DELETE PROFISSIONAL
  // ==========================================================================

  static async delete(tenantId: string, profissionalId: string) {
    // Verificar se profissional existe
    const existingProfissional = await prisma.profissional.findFirst({
      where: { id: profissionalId, tenantId },
    });

    if (!existingProfissional) {
      throw new AppError("Profissional não encontrado", 404);
    }

    // Verificar se tem pacientes vinculados
    const pacientesCount = await prisma.paciente.count({
      where: { profissionalId, tenantId },
    });

    if (pacientesCount > 0) {
      throw new AppError(
        "Não é possível excluir profissional com pacientes vinculados. Desative-o ao invés de excluir.",
        400
      );
    }

    // Verificar se tem agendamentos
    const agendamentosCount = await prisma.agendamento.count({
      where: { profissionalId, tenantId },
    });

    if (agendamentosCount > 0) {
      throw new AppError(
        "Não é possível excluir profissional com agendamentos. Desative-o ao invés de excluir.",
        400
      );
    }

    // Excluir profissional
    await prisma.profissional.delete({
      where: { id: profissionalId },
    });
  }

  // ==========================================================================
  // GET ACTIVE PROFISSIONAL (Para plano básico)
  // ==========================================================================

  static async getActive(tenantId: string) {
    const profissional = await prisma.profissional.findFirst({
      where: { tenantId, ativo: true },
      include: {
        _count: {
          select: {
            pacientes: true,
            agendamentos: true,
          },
        },
      },
    });

    return profissional;
  }
}
