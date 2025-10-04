import { prisma } from "../../../config/database";
import {
  CreateAtendimentoData,
  UpdateAtendimentoData,
  AppError,
} from "../../../types";

// ============================================================================
// ATENDIMENTO SERVICE
// ============================================================================

export class AtendimentoService {
  // ==========================================================================
  // CREATE ATENDIMENTO
  // ==========================================================================

  static async create(tenantId: string, data: CreateAtendimentoData) {
    // Verificar se agendamento existe
    const agendamento = await prisma.agendamento.findFirst({
      where: { id: data.agendamentoId, tenantId },
      include: {
        paciente: true,
        profissional: true,
        procedimento: true,
      },
    });

    if (!agendamento) {
      throw new AppError("Agendamento não encontrado", 404);
    }

    if (!agendamento.pacienteId) {
      throw new AppError(
        "Não é possível criar atendimento para bloqueio de horário",
        400
      );
    }

    // Verificar se já existe atendimento para este agendamento
    const atendimentoExistente = await prisma.atendimento.findFirst({
      where: { agendamentoId: data.agendamentoId, tenantId },
    });

    if (atendimentoExistente) {
      throw new AppError("Já existe um atendimento para este agendamento", 400);
    }

    // Criar atendimento
    const atendimento = await prisma.atendimento.create({
      data: {
        tenantId,
        agendamentoId: data.agendamentoId,
        pacienteId: agendamento.pacienteId,
        profissionalId: agendamento.profissionalId,
        procedimentoId: agendamento.procedimentoId,
        anotacoes: data.anotacoes?.trim() || null,
        procedimentosRealizados: data.procedimentosRealizados || [],
      },
      include: {
        agendamento: {
          select: {
            id: true,
            dataHora: true,
          },
        },
        paciente: {
          select: {
            id: true,
            nome: true,
            telefone: true,
          },
        },
        profissional: {
          select: {
            id: true,
            nome: true,
          },
        },
        procedimento: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });

    // Atualizar status do agendamento para COMPARECEU
    await prisma.agendamento.update({
      where: { id: data.agendamentoId },
      data: { status: "COMPARECEU" },
    });

    return atendimento;
  }

  // Adicionar este método após o método create

  static async cancel(tenantId: string, id: string) {
    const atendimento = await prisma.atendimento.findFirst({
      where: { id, tenantId },
      include: {
        agendamento: true,
      },
    });

    if (!atendimento) {
      throw new AppError("Atendimento não encontrado", 404);
    }

    // Marcar atendimento como cancelado
    const atendimentoCancelado = await prisma.atendimento.update({
      where: { id },
      data: {
        cancelado: true,
        canceladoEm: new Date(),
      },
    });

    // Atualizar status do agendamento para CANCELADO
    await prisma.agendamento.update({
      where: { id: atendimento.agendamentoId },
      data: { status: "CANCELADO" },
    });

    return atendimentoCancelado;
  }

  // Remover ou comentar os métodos update e delete
  // ==========================================================================
  // GET ATENDIMENTO BY ID
  // ==========================================================================

  static async getById(tenantId: string, atendimentoId: string) {
    const atendimento = await prisma.atendimento.findFirst({
      where: { id: atendimentoId, tenantId },
      include: {
        agendamento: {
          include: {
            paciente: {
              select: {
                id: true,
                nome: true,
                telefone: true,
                email: true,
              },
            },
            profissional: {
              select: {
                id: true,
                nome: true,
                especialidade: true,
              },
            },
            procedimento: {
              select: {
                id: true,
                nome: true,
                valor: true,
                duracaoMinutos: true,
              },
            },
          },
        },
      },
    });

    if (!atendimento) {
      throw new AppError("Atendimento não encontrado", 404);
    }

    return atendimento;
  }

  // ==========================================================================
  // LIST ATENDIMENTOS
  // ==========================================================================

  static async list(
    tenantId: string,
    filters: {
      page?: number;
      limit?: number;
      pacienteId?: string;
      profissionalId?: string;
      dataInicio?: Date;
      dataFim?: Date;
    } = {}
  ) {
    const {
      page = 1,
      limit = 20,
      pacienteId,
      profissionalId,
      dataInicio,
      dataFim,
    } = filters;

    const skip = (page - 1) * limit;

    const where: any = { tenantId };

    if (pacienteId || profissionalId || dataInicio || dataFim) {
      where.agendamento = {};

      if (pacienteId) {
        where.agendamento.pacienteId = pacienteId;
      }

      if (profissionalId) {
        where.agendamento.profissionalId = profissionalId;
      }

      if (dataInicio || dataFim) {
        where.agendamento.dataHora = {};

        if (dataInicio) {
          where.agendamento.dataHora.gte = dataInicio;
        }

        if (dataFim) {
          where.agendamento.dataHora.lte = dataFim;
        }
      }
    }

    const [atendimentos, total] = await Promise.all([
      prisma.atendimento.findMany({
        where,
        include: {
          agendamento: {
            include: {
              paciente: {
                select: {
                  id: true,
                  nome: true,
                },
              },
              profissional: {
                select: {
                  id: true,
                  nome: true,
                },
              },
              procedimento: {
                select: {
                  nome: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.atendimento.count({ where }),
    ]);

    return {
      atendimentos,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // ==========================================================================
  // UPDATE ATENDIMENTO
  // ==========================================================================

  static async update(
    tenantId: string,
    atendimentoId: string,
    data: UpdateAtendimentoData
  ) {
    const existingAtendimento = await prisma.atendimento.findFirst({
      where: { id: atendimentoId, tenantId },
    });

    if (!existingAtendimento) {
      throw new AppError("Atendimento não encontrado", 404);
    }

    const updateData: any = {};

    if (data.anotacoes !== undefined) {
      updateData.anotacoes = data.anotacoes ? data.anotacoes.trim() : null;
    }

    if (data.procedimentosRealizados !== undefined) {
      updateData.procedimentosRealizados = data.procedimentosRealizados;
    }

    const atendimento = await prisma.atendimento.update({
      where: { id: atendimentoId },
      data: updateData,
      include: {
        agendamento: {
          include: {
            paciente: {
              select: {
                id: true,
                nome: true,
              },
            },
            profissional: {
              select: {
                id: true,
                nome: true,
              },
            },
          },
        },
      },
    });

    return atendimento;
  }

  // ==========================================================================
  // DELETE ATENDIMENTO
  // ==========================================================================

  static async delete(tenantId: string, atendimentoId: string) {
    const existingAtendimento = await prisma.atendimento.findFirst({
      where: { id: atendimentoId, tenantId },
      include: {
        agendamento: true,
      },
    });

    if (!existingAtendimento) {
      throw new AppError("Atendimento não encontrado", 404);
    }

    // Reverter status do agendamento
    await prisma.agendamento.update({
      where: { id: existingAtendimento.agendamentoId },
      data: { status: "CONFIRMADO" },
    });

    await prisma.atendimento.delete({
      where: { id: atendimentoId },
    });
  }

  // ==========================================================================
  // GET BY PACIENTE
  // ==========================================================================

  static async getByPaciente(tenantId: string, pacienteId: string) {
    const atendimentos = await prisma.atendimento.findMany({
      where: {
        tenantId,
        agendamento: {
          pacienteId,
        },
      },
      include: {
        agendamento: {
          include: {
            profissional: {
              select: {
                nome: true,
              },
            },
            procedimento: {
              select: {
                nome: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return atendimentos;
  }

  // ==========================================================================
  // TOGGLE STATUS DO AGENDAMENTO (via atendimento)
  // ==========================================================================

  static async toggleStatusAgendamento(
    tenantId: string,
    atendimentoId: string
  ) {
    const atendimento = await prisma.atendimento.findFirst({
      where: { id: atendimentoId, tenantId },
      include: {
        agendamento: true,
      },
    });

    if (!atendimento) {
      throw new AppError("Atendimento não encontrado", 404);
    }

    const statusAtual = atendimento.agendamento.status;
    let novoStatus: string;

    // Toggle entre COMPARECEU e MARCADO
    if (statusAtual === "COMPARECEU") {
      novoStatus = "MARCADO";
    } else {
      novoStatus = "COMPARECEU";
    }

    await prisma.agendamento.update({
      where: { id: atendimento.agendamentoId },
      data: { status: novoStatus as any },
    });

    const atendimentoAtualizado = await prisma.atendimento.findFirst({
      where: { id: atendimentoId, tenantId },
      include: {
        agendamento: {
          include: {
            paciente: {
              select: {
                id: true,
                nome: true,
              },
            },
            profissional: {
              select: {
                id: true,
                nome: true,
              },
            },
          },
        },
      },
    });

    return atendimentoAtualizado;
  }

  static async getByAgendamento(tenantId: string, agendamentoId: string) {
    const atendimento = await prisma.atendimento.findFirst({
      where: { agendamentoId, tenantId },
      include: {
        agendamento: {
          select: {
            id: true,
            dataHora: true,
          },
        },
        paciente: {
          select: {
            id: true,
            nome: true,
            telefone: true,
          },
        },
        profissional: {
          select: {
            id: true,
            nome: true,
          },
        },
        procedimento: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });

    return atendimento;
  }
}
