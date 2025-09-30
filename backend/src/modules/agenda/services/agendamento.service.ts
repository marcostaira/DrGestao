import { prisma } from "../../../config/database";
import {
  CreateAgendamentoData,
  UpdateAgendamentoData,
  AppError,
} from "../../../types";

// ============================================================================
// AGENDAMENTO SERVICE
// ============================================================================

export class AgendamentoService {
  // ==========================================================================
  // CREATE AGENDAMENTO
  // ==========================================================================

  static async create(tenantId: string, data: CreateAgendamentoData) {
    // Verificar se profissional existe e está ativo
    const profissional = await prisma.profissional.findFirst({
      where: { id: data.profissionalId, tenantId, ativo: true },
    });

    if (!profissional) {
      throw new AppError("Profissional não encontrado ou inativo", 404);
    }

    // Verificar se procedimento existe
    const procedimento = await prisma.procedimento.findFirst({
      where: { id: data.procedimentoId, tenantId },
    });

    if (!procedimento) {
      throw new AppError("Procedimento não encontrado", 404);
    }

    // Se pacienteId fornecido, verificar se existe
    if (data.pacienteId) {
      const paciente = await prisma.paciente.findFirst({
        where: { id: data.pacienteId, tenantId },
      });

      if (!paciente) {
        throw new AppError("Paciente não encontrado", 404);
      }
    }

    // Converter string para Date (sem conversão de timezone)
    // A string vem como "2025-09-30T12:00" e deve ser interpretada como horário local
    const dataHora = new Date(data.dataHora);

    // Calcular horário de término baseado na duração
    const dataHoraFim = new Date(
      dataHora.getTime() + procedimento.duracaoMinutos * 60000
    );

    // VALIDAÇÃO: Garantir que dataHoraFim é maior que dataHora
    if (dataHoraFim <= dataHora) {
      throw new AppError(
        "Data/hora de término deve ser posterior à data/hora de início",
        400
      );
    }

    console.log("=".repeat(80));
    console.log("DEBUG BACKEND - Criando agendamento:");
    console.log("- dataHora string recebida:", data.dataHora);
    console.log("- dataHora convertida:", dataHora.toISOString());
    console.log("- dataHoraFim calculada:", dataHoraFim.toISOString());
    console.log("- duração (minutos):", procedimento.duracaoMinutos);

    // Verificar conflitos de horário para o profissional
    // Apenas agendamentos não cancelados E com datas válidas
    const conflito = await prisma.agendamento.findFirst({
      where: {
        tenantId,
        profissionalId: data.profissionalId,
        status: { notIn: ["CANCELADO"] },
        dataHoraFim: { gt: prisma.agendamento.fields.dataHora }, // dataHoraFim deve ser maior que dataHora
        OR: [
          // Novo agendamento inicia durante um agendamento existente
          {
            AND: [
              { dataHora: { lte: dataHora } },
              { dataHoraFim: { gt: dataHora } },
            ],
          },
          // Novo agendamento termina durante um agendamento existente
          {
            AND: [
              { dataHora: { lt: dataHoraFim } },
              { dataHoraFim: { gte: dataHoraFim } },
            ],
          },
          // Novo agendamento engloba um agendamento existente
          {
            AND: [
              { dataHora: { gte: dataHora } },
              { dataHoraFim: { lte: dataHoraFim } },
            ],
          },
        ],
      },
    });

    if (conflito) {
      console.log("❌ CONFLITO ENCONTRADO:");
      console.log("- Agendamento conflitante:", {
        id: conflito.id,
        dataHora: conflito.dataHora.toISOString(),
        dataHoraFim: conflito.dataHoraFim.toISOString(),
      });
      console.log("=".repeat(80));

      throw new AppError(
        "Já existe um agendamento neste horário para este profissional",
        400
      );
    }

    console.log("✅ Nenhum conflito encontrado. Criando agendamento...");
    console.log("=".repeat(80));

    // Criar agendamento
    const agendamento = await prisma.agendamento.create({
      data: {
        tenantId,
        pacienteId: data.pacienteId || null,
        profissionalId: data.profissionalId,
        procedimentoId: data.procedimentoId,
        dataHora,
        dataHoraFim,
        status: "MARCADO",
        observacoes: data.observacoes?.trim() || null,
      },
      include: {
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
    });

    return agendamento;
  }

  // ==========================================================================
  // CREATE BATCH AGENDAMENTOS (Recorrência)
  // ==========================================================================

  static async createBatch(tenantId: string, data: CreateAgendamentoData) {
    if (!data.recorrencia) {
      throw new AppError("Dados de recorrência não fornecidos", 400);
    }

    const { tipo, quantidade, diasSemana } = data.recorrencia;
    const agendamentos: any[] = [];
    const dataInicial = new Date(data.dataHora);

    for (let i = 0; i < quantidade; i++) {
      let novaData = new Date(dataInicial);

      if (tipo === "DIARIO") {
        novaData.setDate(dataInicial.getDate() + i);
      } else if (tipo === "SEMANAL") {
        novaData.setDate(dataInicial.getDate() + i * 7);
      } else if (tipo === "MENSAL") {
        novaData.setMonth(dataInicial.getMonth() + i);
      }

      // Se tem dias da semana específicos (para semanal)
      if (tipo === "SEMANAL" && diasSemana && diasSemana.length > 0) {
        const diaSemana = novaData.getDay();
        if (!diasSemana.includes(diaSemana)) {
          continue;
        }
      }

      try {
        const agendamento = await this.create(tenantId, {
          ...data,
          dataHora: novaData.toISOString(),
        });
        agendamentos.push(agendamento);
      } catch (error) {
        console.log(`Erro ao criar agendamento ${i + 1}:`, error);
      }
    }

    return agendamentos;
  }

  // ==========================================================================
  // GET AGENDAMENTO BY ID
  // ==========================================================================

  static async getById(tenantId: string, agendamentoId: string) {
    const agendamento = await prisma.agendamento.findFirst({
      where: { id: agendamentoId, tenantId },
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
        atendimento: {
          select: {
            id: true,
            anotacoes: true,
            createdAt: true,
          },
        },
      },
    });

    if (!agendamento) {
      throw new AppError("Agendamento não encontrado", 404);
    }

    return agendamento;
  }

  // ==========================================================================
  // LIST AGENDAMENTOS
  // ==========================================================================

  static async list(
    tenantId: string,
    filters: {
      page?: number;
      limit?: number;
      dataInicio?: Date;
      dataFim?: Date;
      pacienteId?: string;
      profissionalId?: string;
      status?: string;
    } = {}
  ) {
    const {
      page = 1,
      limit = 50,
      dataInicio,
      dataFim,
      pacienteId,
      profissionalId,
      status,
    } = filters;

    const skip = (page - 1) * limit;
    const where: any = { tenantId };

    if (dataInicio || dataFim) {
      where.dataHora = {};
      if (dataInicio) where.dataHora.gte = dataInicio;
      if (dataFim) where.dataHora.lte = dataFim;
    }

    if (pacienteId) where.pacienteId = pacienteId;
    if (profissionalId) where.profissionalId = profissionalId;
    if (status) where.status = status;

    const [agendamentos, total] = await Promise.all([
      prisma.agendamento.findMany({
        where,
        include: {
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
              cor: true,
            },
          },
          procedimento: {
            select: {
              id: true,
              nome: true,
              duracaoMinutos: true,
            },
          },
        },
        orderBy: { dataHora: "asc" },
        skip,
        take: limit,
      }),
      prisma.agendamento.count({ where }),
    ]);

    return {
      agendamentos,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // ==========================================================================
  // UPDATE AGENDAMENTO
  // ==========================================================================

  static async update(
    tenantId: string,
    agendamentoId: string,
    data: UpdateAgendamentoData
  ) {
    const existingAgendamento = await prisma.agendamento.findFirst({
      where: { id: agendamentoId, tenantId },
      include: {
        procedimento: true,
      },
    });

    if (!existingAgendamento) {
      throw new AppError("Agendamento não encontrado", 404);
    }

    const updateData: any = {};

    if (data.pacienteId !== undefined) {
      if (data.pacienteId) {
        const paciente = await prisma.paciente.findFirst({
          where: { id: data.pacienteId, tenantId },
        });
        if (!paciente) {
          throw new AppError("Paciente não encontrado", 404);
        }
      }
      updateData.pacienteId = data.pacienteId;
    }

    if (data.profissionalId) {
      const profissional = await prisma.profissional.findFirst({
        where: { id: data.profissionalId, tenantId, ativo: true },
      });
      if (!profissional) {
        throw new AppError("Profissional não encontrado ou inativo", 404);
      }
      updateData.profissionalId = data.profissionalId;
    }

    if (data.procedimentoId) {
      const procedimento = await prisma.procedimento.findFirst({
        where: { id: data.procedimentoId, tenantId },
      });
      if (!procedimento) {
        throw new AppError("Procedimento não encontrado", 404);
      }
      updateData.procedimentoId = data.procedimentoId;

      // Recalcular horário de término
      const dataHora = data.dataHora
        ? new Date(data.dataHora)
        : existingAgendamento.dataHora;
      updateData.dataHoraFim = new Date(
        dataHora.getTime() + procedimento.duracaoMinutos * 60000
      );
    }

    if (data.dataHora) {
      updateData.dataHora = new Date(data.dataHora);

      // Recalcular dataHoraFim se não foi recalculado pelo procedimento
      if (!updateData.dataHoraFim) {
        const duracaoMinutos =
          existingAgendamento.procedimento?.duracaoMinutos || 30;
        updateData.dataHoraFim = new Date(
          updateData.dataHora.getTime() + duracaoMinutos * 60000
        );
      }
    }

    if (data.status) {
      updateData.status = data.status;
    }

    if (data.observacoes !== undefined) {
      updateData.observacoes = data.observacoes
        ? data.observacoes.trim()
        : null;
    }

    const agendamento = await prisma.agendamento.update({
      where: { id: agendamentoId },
      data: updateData,
      include: {
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
            duracaoMinutos: true,
          },
        },
      },
    });

    return agendamento;
  }

  // ==========================================================================
  // UPDATE BATCH
  // ==========================================================================

  static async updateBatch(
    tenantId: string,
    ids: string[],
    data: UpdateAgendamentoData
  ) {
    const updateData: any = {};

    if (data.status) updateData.status = data.status;
    if (data.observacoes !== undefined) {
      updateData.observacoes = data.observacoes;
    }

    const result = await prisma.agendamento.updateMany({
      where: {
        id: { in: ids },
        tenantId,
      },
      data: updateData,
    });

    return { updated: result.count };
  }

  // ==========================================================================
  // DELETE AGENDAMENTO
  // ==========================================================================

  static async delete(tenantId: string, agendamentoId: string) {
    const existingAgendamento = await prisma.agendamento.findFirst({
      where: { id: agendamentoId, tenantId },
      include: {
        atendimento: true,
      },
    });

    if (!existingAgendamento) {
      throw new AppError("Agendamento não encontrado", 404);
    }

    if (existingAgendamento.atendimento) {
      throw new AppError(
        "Não é possível excluir agendamento com atendimento realizado",
        400
      );
    }

    await prisma.agendamento.delete({
      where: { id: agendamentoId },
    });
  }

  // ==========================================================================
  // DELETE BATCH
  // ==========================================================================

  static async deleteBatch(tenantId: string, ids: string[]) {
    // Verificar se algum tem atendimento
    const comAtendimento = await prisma.agendamento.count({
      where: {
        id: { in: ids },
        tenantId,
        atendimento: { isNot: null },
      },
    });

    if (comAtendimento > 0) {
      throw new AppError(
        `${comAtendimento} agendamento(s) possui(em) atendimento e não podem ser excluídos`,
        400
      );
    }

    const result = await prisma.agendamento.deleteMany({
      where: {
        id: { in: ids },
        tenantId,
      },
    });

    return { deleted: result.count };
  }

  // ==========================================================================
  // GET CALENDAR VIEW
  // ==========================================================================

  static async getCalendarView(
    tenantId: string,
    dataInicio: Date,
    dataFim: Date,
    profissionalId?: string
  ) {
    const where: any = {
      tenantId,
      dataHora: {
        gte: dataInicio,
        lte: dataFim,
      },
    };

    if (profissionalId) {
      where.profissionalId = profissionalId;
    }

    const agendamentos = await prisma.agendamento.findMany({
      where,
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
            duracaoMinutos: true,
          },
        },
      },
      orderBy: { dataHora: "asc" },
    });

    return agendamentos;
  }

  // ==========================================================================
  // UPDATE STATUS
  // ==========================================================================

  static async updateStatus(
    tenantId: string,
    agendamentoId: string,
    status: string
  ) {
    const agendamento = await prisma.agendamento.findFirst({
      where: { id: agendamentoId, tenantId },
    });

    if (!agendamento) {
      throw new AppError("Agendamento não encontrado", 404);
    }

    // Validar se o status é válido
    const validStatuses = [
      "MARCADO",
      "CONFIRMADO",
      "COMPARECEU",
      "FALTOU",
      "CANCELADO",
    ];
    if (!validStatuses.includes(status)) {
      throw new AppError("Status inválido", 400);
    }

    // Verificar se o agendamento pode ter o status alterado
    if (agendamento.status === "CANCELADO" && status !== "MARCADO") {
      throw new AppError(
        "Agendamentos cancelados só podem voltar para MARCADO",
        400
      );
    }

    const agendamentoAtualizado = await prisma.agendamento.update({
      where: { id: agendamentoId },
      data: { status: status as any },
      include: {
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
            duracaoMinutos: true,
          },
        },
      },
    });

    return agendamentoAtualizado;
  }
}
