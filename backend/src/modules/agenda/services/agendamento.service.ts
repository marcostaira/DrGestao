import { prisma } from "../../../config/database";
import {
  CreateAgendamentoData,
  UpdateAgendamentoData,
  AppError,
} from "../../../types";
import { randomUUID } from "crypto";

// ============================================================================
// AGENDAMENTO SERVICE
// ============================================================================

export class AgendamentoService {
  // ==========================================================================
  // CREATE AGENDAMENTO
  // ==========================================================================

  static async create(
    tenantId: string,
    data: CreateAgendamentoData,
    recorrenciaId?: string
  ) {
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

    const dataHora = new Date(data.dataHora);
    const dataHoraFim = new Date(
      dataHora.getTime() + procedimento.duracaoMinutos * 60000
    );

    if (dataHoraFim <= dataHora) {
      throw new AppError(
        "Data/hora de término deve ser posterior à data/hora de início",
        400
      );
    }

    // Verificar conflitos de horário
    const conflito = await prisma.agendamento.findFirst({
      where: {
        tenantId,
        profissionalId: data.profissionalId,
        status: { notIn: ["CANCELADO"] },
        dataHoraFim: { gt: prisma.agendamento.fields.dataHora },
        OR: [
          {
            AND: [
              { dataHora: { lte: dataHora } },
              { dataHoraFim: { gt: dataHora } },
            ],
          },
          {
            AND: [
              { dataHora: { lt: dataHoraFim } },
              { dataHoraFim: { gte: dataHoraFim } },
            ],
          },
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
      throw new AppError(
        "Já existe um agendamento neste horário para este profissional",
        400
      );
    }

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
        recorrenciaId: recorrenciaId || null,
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
            cor: true,
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

    const { tipo, dataFim, diasSemana } = data.recorrencia;
    const agendamentos: any[] = [];
    const dataInicial = new Date(data.dataHora);
    const dataFinal = new Date(dataFim);

    // Gerar ID único para esta recorrência
    const recorrenciaId = randomUUID();

    console.log("=== CREATE BATCH ===");
    console.log("Recorrência ID:", recorrenciaId);
    console.log("Data inicial:", dataInicial.toISOString());
    console.log("Data final:", dataFinal.toISOString());
    console.log("Tipo:", tipo);
    console.log("Dias da semana:", diasSemana);

    let dataAtual = new Date(dataInicial);
    let contador = 0;
    const MAX_AGENDAMENTOS = 365;

    while (dataAtual <= dataFinal && contador < MAX_AGENDAMENTOS) {
      let deveCriar = true;

      // Para recorrência semanal, verificar se o dia da semana está na lista
      if (tipo === "SEMANAL" && diasSemana && diasSemana.length > 0) {
        const diaSemana = dataAtual.getDay();
        deveCriar = diasSemana.includes(diaSemana);
      }

      if (deveCriar) {
        try {
          console.log(
            `Tentando criar agendamento para:`,
            dataAtual.toISOString()
          );

          const agendamento = await this.create(
            tenantId,
            {
              ...data,
              dataHora: dataAtual.toISOString(),
              recorrencia: undefined,
            },
            recorrenciaId
          );

          agendamentos.push(agendamento);
          console.log(`✅ Agendamento criado com sucesso`);
        } catch (error: any) {
          console.log(`❌ Erro ao criar agendamento:`, error.message);
          // Continuar mesmo com erro (pode ser conflito de horário)
        }
      }

      // CORREÇÃO: Incrementar data conforme o tipo de recorrência
      if (tipo === "DIARIA") {
        dataAtual.setDate(dataAtual.getDate() + 1);
      } else if (tipo === "SEMANAL") {
        // Para semanal, avançar para o próximo dia válido
        dataAtual.setDate(dataAtual.getDate() + 1);

        // Se temos dias específicos da semana, pular até o próximo dia válido
        if (diasSemana && diasSemana.length > 0) {
          let tentativas = 0;
          while (
            !diasSemana.includes(dataAtual.getDay()) &&
            dataAtual <= dataFinal &&
            tentativas < 7
          ) {
            dataAtual.setDate(dataAtual.getDate() + 1);
            tentativas++;
          }
        }
      } else if (tipo === "MENSAL") {
        dataAtual.setMonth(dataAtual.getMonth() + 1);
      }

      contador++;

      // Log de debug para detectar loops
      if (contador % 10 === 0) {
        console.log(
          `Progresso: ${contador} iterações, ${agendamentos.length} agendamentos criados`
        );
      }
    }

    console.log(`Total de agendamentos criados: ${agendamentos.length}`);
    console.log("====================");

    if (agendamentos.length === 0) {
      throw new AppError(
        "Nenhum agendamento foi criado. Verifique os parâmetros de recorrência.",
        400
      );
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
            cor: true,
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

    if (data.procedimentoId !== undefined) {
      if (data.procedimentoId) {
        const procedimento = await prisma.procedimento.findFirst({
          where: { id: data.procedimentoId, tenantId },
        });
        if (!procedimento) {
          throw new AppError("Procedimento não encontrado", 404);
        }
        updateData.procedimentoId = data.procedimentoId;

        const dataHora = data.dataHora
          ? new Date(data.dataHora)
          : existingAgendamento.dataHora;
        updateData.dataHoraFim = new Date(
          dataHora.getTime() + procedimento.duracaoMinutos * 60000
        );
      } else {
        updateData.procedimentoId = null;
      }
    }

    if (data.dataHora) {
      updateData.dataHora = new Date(data.dataHora);

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
    });

    return agendamento;
  }

  // ==========================================================================
  // UPDATE RECORRENCIA
  // ==========================================================================

  static async updateRecorrencia(
    tenantId: string,
    recorrenciaId: string,
    data: UpdateAgendamentoData
  ) {
    const updateData: any = {};

    if (data.profissionalId) {
      const profissional = await prisma.profissional.findFirst({
        where: { id: data.profissionalId, tenantId, ativo: true },
      });
      if (!profissional) {
        throw new AppError("Profissional não encontrado ou inativo", 404);
      }
      updateData.profissionalId = data.profissionalId;
    }

    if (data.procedimentoId !== undefined) {
      if (data.procedimentoId) {
        const procedimento = await prisma.procedimento.findFirst({
          where: { id: data.procedimentoId, tenantId },
        });
        if (!procedimento) {
          throw new AppError("Procedimento não encontrado", 404);
        }
      }
      updateData.procedimentoId = data.procedimentoId;
    }

    if (data.status) {
      updateData.status = data.status;
    }

    if (data.observacoes !== undefined) {
      updateData.observacoes = data.observacoes
        ? data.observacoes.trim()
        : null;
    }

    const result = await prisma.agendamento.updateMany({
      where: {
        tenantId,
        recorrenciaId,
      },
      data: updateData,
    });

    return { updated: result.count };
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

  static async delete(tenantId: string, id: string) {
    const agendamento = await prisma.agendamento.findFirst({
      where: { id, tenantId },
      include: {
        atendimento: true,
      },
    });

    if (!agendamento) {
      throw new AppError("Agendamento não encontrado", 404);
    }

    // VALIDAÇÃO: Não permitir exclusão se existe atendimento
    if (agendamento.atendimento) {
      throw new AppError(
        "Não é possível excluir este agendamento pois já existe um atendimento registrado",
        400
      );
    }

    await prisma.agendamento.delete({
      where: { id },
    });

    return { message: "Agendamento excluído com sucesso" };
  }

  // ==========================================================================
  // DELETE RECORRENCIA
  // ==========================================================================

  static async deleteRecorrencia(tenantId: string, recorrenciaId: string) {
    // Buscar todos os agendamentos da recorrência
    const agendamentos = await prisma.agendamento.findMany({
      where: {
        tenantId,
        recorrenciaId,
      },
      include: {
        atendimento: true,
      },
    });

    if (agendamentos.length === 0) {
      throw new AppError(
        "Nenhum agendamento encontrado para esta recorrência",
        404
      );
    }

    // Separar os que podem e não podem ser excluídos
    const comAtendimento = agendamentos.filter((ag) => ag.atendimento !== null);
    const semAtendimento = agendamentos.filter((ag) => ag.atendimento === null);

    if (comAtendimento.length > 0) {
      throw new AppError(
        `${comAtendimento.length} agendamento(s) da recorrência possui(em) atendimento realizado e não podem ser excluídos. Apenas ${semAtendimento.length} agendamento(s) sem atendimento podem ser excluídos.`,
        400
      );
    }

    // Excluir apenas os sem atendimento
    const result = await prisma.agendamento.deleteMany({
      where: {
        tenantId,
        recorrenciaId,
        atendimento: null,
      },
    });

    return { deleted: result.count };
  }
  // ==========================================================================
  // DELETE BATCH
  // ==========================================================================

  static async deleteBatch(tenantId: string, ids: string[]) {
    // Buscar todos os agendamentos com atendimentos
    const agendamentos = await prisma.agendamento.findMany({
      where: {
        tenantId,
        id: { in: ids },
      },
      include: {
        atendimento: true,
      },
    });

    // Separar os que podem e não podem ser excluídos
    const comAtendimento = agendamentos.filter((ag) => ag.atendimento !== null);
    const semAtendimento = agendamentos.filter((ag) => ag.atendimento === null);

    if (comAtendimento.length > 0) {
      throw new AppError(
        `${comAtendimento.length} agendamento(s) possui(em) atendimento registrado e não pode(m) ser excluído(s). Apenas ${semAtendimento.length} agendamento(s) sem atendimento podem ser excluídos.`,
        400
      );
    }

    // Excluir apenas os sem atendimento
    const result = await prisma.agendamento.deleteMany({
      where: {
        tenantId,
        id: { in: semAtendimento.map((ag) => ag.id) },
      },
    });

    return { deleted: result.count };
  }

  // ==========================================================================
  // COUNT RECORRENCIA
  // ==========================================================================

  static async countRecorrencia(tenantId: string, recorrenciaId: string) {
    const count = await prisma.agendamento.count({
      where: {
        tenantId,
        recorrenciaId,
      },
    });

    return count;
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
            cor: true,
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
    });

    return agendamentoAtualizado;
  }
}
