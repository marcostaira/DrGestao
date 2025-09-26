import { prisma } from "../../../config/database";
import {
  CreateProcedimentoData,
  UpdateProcedimentoData,
  AppError,
} from "../../../types";

// ============================================================================
// PROCEDIMENTO SERVICE
// ============================================================================

export class ProcedimentoService {
  // ==========================================================================
  // CREATE PROCEDIMENTO
  // ==========================================================================

  static async create(tenantId: string, data: CreateProcedimentoData) {
    // Verificar se já existe procedimento com mesmo nome
    const existingProcedimento = await prisma.procedimento.findFirst({
      where: {
        tenantId,
        nome: {
          equals: data.nome.trim(),
          mode: "insensitive",
        },
      },
    });

    if (existingProcedimento) {
      throw new AppError("Já existe um procedimento com este nome", 400);
    }

    // Criar procedimento
    const procedimento = await prisma.procedimento.create({
      data: {
        tenantId,
        nome: data.nome.trim(),
        valor: data.valor || null,
        duracaoMinutos: data.duracaoMinutos,
      },
    });

    return procedimento;
  }

  // ==========================================================================
  // GET PROCEDIMENTO BY ID
  // ==========================================================================

  static async getById(tenantId: string, procedimentoId: string) {
    const procedimento = await prisma.procedimento.findFirst({
      where: { id: procedimentoId, tenantId },
      include: {
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
        _count: {
          select: {
            agendamentos: true,
          },
        },
      },
    });

    if (!procedimento) {
      throw new AppError("Procedimento não encontrado", 404);
    }

    return procedimento;
  }

  // ==========================================================================
  // LIST PROCEDIMENTOS
  // ==========================================================================

  static async list(tenantId: string) {
    const procedimentos = await prisma.procedimento.findMany({
      where: { tenantId },
      include: {
        _count: {
          select: {
            agendamentos: true,
          },
        },
      },
      orderBy: { nome: "asc" },
    });

    return procedimentos;
  }

  // ==========================================================================
  // UPDATE PROCEDIMENTO
  // ==========================================================================

  static async update(
    tenantId: string,
    procedimentoId: string,
    data: UpdateProcedimentoData
  ) {
    // Verificar se procedimento existe
    const existingProcedimento = await prisma.procedimento.findFirst({
      where: { id: procedimentoId, tenantId },
    });

    if (!existingProcedimento) {
      throw new AppError("Procedimento não encontrado", 404);
    }

    // Verificar nome duplicado (se alterado)
    if (data.nome && data.nome !== existingProcedimento.nome) {
      const procedimentoComNome = await prisma.procedimento.findFirst({
        where: {
          tenantId,
          nome: {
            equals: data.nome.trim(),
            mode: "insensitive",
          },
          id: { not: procedimentoId },
        },
      });

      if (procedimentoComNome) {
        throw new AppError("Já existe um procedimento com este nome", 400);
      }
    }

    // Preparar dados para atualização
    const updateData: any = {};

    if (data.nome) updateData.nome = data.nome.trim();
    if (data.valor !== undefined) updateData.valor = data.valor;
    if (data.duracaoMinutos) updateData.duracaoMinutos = data.duracaoMinutos;

    // Atualizar procedimento
    const procedimento = await prisma.procedimento.update({
      where: { id: procedimentoId },
      data: updateData,
    });

    return procedimento;
  }

  // ==========================================================================
  // DELETE PROCEDIMENTO
  // ==========================================================================

  static async delete(tenantId: string, procedimentoId: string) {
    // Verificar se procedimento existe
    const existingProcedimento = await prisma.procedimento.findFirst({
      where: { id: procedimentoId, tenantId },
    });

    if (!existingProcedimento) {
      throw new AppError("Procedimento não encontrado", 404);
    }

    // Verificar se tem agendamentos
    const agendamentosCount = await prisma.agendamento.count({
      where: { procedimentoId, tenantId },
    });

    if (agendamentosCount > 0) {
      throw new AppError(
        "Não é possível excluir procedimento com agendamentos vinculados",
        400
      );
    }

    // Excluir procedimento
    await prisma.procedimento.delete({
      where: { id: procedimentoId },
    });
  }

  // ==========================================================================
  // GET STATISTICS
  // ==========================================================================

  static async getStatistics(tenantId: string) {
    const [total, comValor, semValor, maisUsados] = await Promise.all([
      // Total de procedimentos
      prisma.procedimento.count({ where: { tenantId } }),

      // Procedimentos com valor definido
      prisma.procedimento.count({
        where: { tenantId, valor: { not: null } },
      }),

      // Procedimentos sem valor definido
      prisma.procedimento.count({
        where: { tenantId, valor: null },
      }),

      // Procedimentos mais agendados
      prisma.procedimento.findMany({
        where: { tenantId },
        include: {
          _count: {
            select: {
              agendamentos: true,
            },
          },
        },
        orderBy: {
          agendamentos: {
            _count: "desc",
          },
        },
        take: 5,
      }),
    ]);

    return {
      total,
      comValor,
      semValor,
      maisUsados: maisUsados.map((p) => ({
        id: p.id,
        nome: p.nome,
        valor: p.valor,
        duracaoMinutos: p.duracaoMinutos,
        totalAgendamentos: p._count.agendamentos,
      })),
    };
  }
}
