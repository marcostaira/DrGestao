// backend/src/modules/atendimentos/services/atendimento.service.ts

import { prisma } from "../../../config/database";
import {
  CreateAtendimentoData,
  UpdateAtendimentoData,
  AprovarAvaliacaoData,
  ReprovarAvaliacaoData,
  UpdateProgressoProcedimentoData,
  StatusAtendimento,
  StatusAprovacao,
  ProgressoProcedimento,
  AppError,
} from "../../../types";
import crypto from "crypto";

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

    // Definir tipo padrão se não fornecido
    const tipo = data.tipo || StatusAtendimento.AVULSO;

    // Criar atendimento com procedimentos (se houver)
    const atendimento = await prisma.atendimento.create({
      data: {
        tenantId,
        agendamentoId: data.agendamentoId,
        pacienteId: agendamento.pacienteId,
        profissionalId: agendamento.profissionalId,
        procedimentoId: agendamento.procedimentoId,
        tipo,
        anotacoes: data.anotacoes?.trim() || null,
        procedimentosRealizados: data.procedimentosRealizados || [],
        statusAprovacao:
          tipo === StatusAtendimento.AVALIACAO
            ? StatusAprovacao.PENDENTE
            : null,
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
        procedimentosPlano: {
          include: {
            procedimento: true,
            agendamento: true,
          },
          orderBy: {
            ordem: "asc",
          },
        },
      },
    });

    // Se tiver procedimentos do plano, criar separadamente
    if (data.procedimentosPlano && data.procedimentosPlano.length > 0) {
      await prisma.atendimentoProcedimento.createMany({
        data: data.procedimentosPlano.map((proc) => ({
          tenantId,
          atendimentoId: atendimento.id,
          procedimentoId: proc.procedimentoId,
          ordem: proc.ordem,
          observacoes: proc.observacoes || null,
          valorPraticado: proc.valorPraticado || null,
          progresso: ProgressoProcedimento.NAO_INICIADO,
        })),
      });
    }

    // Atualizar status do agendamento para COMPARECEU
    await prisma.agendamento.update({
      where: { id: data.agendamentoId },
      data: { status: "COMPARECEU" },
    });

    // Buscar atendimento completo com procedimentos
    const atendimentoCompleto = await prisma.atendimento.findUnique({
      where: { id: atendimento.id },
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
        procedimentosPlano: {
          include: {
            procedimento: true,
            agendamento: true,
          },
          orderBy: {
            ordem: "asc",
          },
        },
      },
    });

    return atendimentoCompleto;
  }

  // ==========================================================================
  // CANCEL ATENDIMENTO
  // ==========================================================================

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

    // Se for plano de tratamento, verificar se tem procedimentos em andamento
    if (atendimento.tipo === StatusAtendimento.PLANO_TRATAMENTO) {
      const procedimentosEmAndamento =
        await prisma.atendimentoProcedimento.count({
          where: {
            atendimentoId: id,
            progresso: ProgressoProcedimento.EM_ANDAMENTO,
          },
        });

      if (procedimentosEmAndamento > 0) {
        throw new AppError(
          "Não é possível cancelar um plano de tratamento com procedimentos em andamento",
          400
        );
      }
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
        procedimentosPlano: {
          include: {
            procedimento: true,
            agendamento: {
              include: {
                profissional: true,
              },
            },
          },
          orderBy: {
            ordem: "asc",
          },
        },
        avaliacao: {
          include: {
            procedimentosPlano: {
              include: {
                procedimento: true,
              },
            },
          },
        },
        planosGerados: {
          include: {
            procedimentosPlano: {
              include: {
                procedimento: true,
                agendamento: true,
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
      tipo?: StatusAtendimento;
      statusAprovacao?: StatusAprovacao;
      dataInicio?: Date;
      dataFim?: Date;
    } = {}
  ) {
    const {
      page = 1,
      limit = 20,
      pacienteId,
      profissionalId,
      tipo,
      statusAprovacao,
      dataInicio,
      dataFim,
    } = filters;

    const skip = (page - 1) * limit;

    const where: any = { tenantId, cancelado: false };

    // Filtros do próprio atendimento
    if (tipo) {
      where.tipo = tipo;
    }

    if (statusAprovacao) {
      where.statusAprovacao = statusAprovacao;
    }

    // Filtros do agendamento relacionado
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
          procedimentosPlano: {
            include: {
              procedimento: true,
            },
            orderBy: {
              ordem: "asc",
            },
          },
          avaliacao: {
            select: {
              id: true,
              tipo: true,
              statusAprovacao: true,
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

    // Se for AVALIACAO ou PLANO_TRATAMENTO aprovado, não pode alterar
    if (
      existingAtendimento.tipo !== StatusAtendimento.AVULSO &&
      existingAtendimento.statusAprovacao === StatusAprovacao.APROVADO
    ) {
      throw new AppError(
        "Não é possível alterar avaliações ou planos de tratamento aprovados",
        400
      );
    }

    const updateData: any = {};

    if (data.anotacoes !== undefined) {
      updateData.anotacoes = data.anotacoes ? data.anotacoes.trim() : null;
    }

    if (data.procedimentosRealizados !== undefined) {
      updateData.procedimentosRealizados = data.procedimentosRealizados;
    }

    // Atualizar atendimento
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
        procedimentosPlano: {
          include: {
            procedimento: true,
            agendamento: true,
          },
          orderBy: {
            ordem: "asc",
          },
        },
      },
    });

    // Atualizar procedimentos do plano se fornecido
    if (data.procedimentosPlano && data.procedimentosPlano.length > 0) {
      // Remover procedimentos antigos
      await prisma.atendimentoProcedimento.deleteMany({
        where: { atendimentoId },
      });

      // Criar novos
      await prisma.atendimentoProcedimento.createMany({
        data: data.procedimentosPlano.map((proc) => ({
          tenantId,
          atendimentoId,
          procedimentoId: proc.procedimentoId,
          ordem: proc.ordem,
          observacoes: proc.observacoes || null,
          valorPraticado: proc.valorPraticado || null,
          progresso: ProgressoProcedimento.NAO_INICIADO,
        })),
      });
    }

    // Buscar atendimento completo atualizado
    const atendimentoCompleto = await prisma.atendimento.findUnique({
      where: { id: atendimentoId },
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
        procedimentosPlano: {
          include: {
            procedimento: true,
            agendamento: true,
          },
          orderBy: {
            ordem: "asc",
          },
        },
      },
    });

    return atendimentoCompleto;
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
        cancelado: false,
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
        procedimentosPlano: {
          include: {
            procedimento: true,
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

  // ==========================================================================
  // GET BY AGENDAMENTO
  // ==========================================================================

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
        procedimentosPlano: {
          include: {
            procedimento: {
              select: {
                id: true,
                nome: true,
                valor: true,
                duracaoMinutos: true,
              },
            },
            agendamento: {
              select: {
                id: true,
                dataHora: true,
                profissional: {
                  select: {
                    id: true,
                    nome: true,
                  },
                },
              },
            },
          },
          orderBy: {
            ordem: "asc",
          },
        },
        avaliacao: {
          select: {
            id: true,
            tipo: true,
            statusAprovacao: true,
            createdAt: true,
            procedimentosPlano: {
              include: {
                procedimento: true,
              },
            },
          },
        },
      },
    });

    return atendimento;
  }

  // ==========================================================================
  // APROVAR AVALIAÇÃO
  // ==========================================================================

  static async aprovarAvaliacao(
    tenantId: string,
    avaliacaoId: string,
    data: AprovarAvaliacaoData
  ) {
    // Buscar avaliação
    const avaliacao = await prisma.atendimento.findFirst({
      where: {
        id: avaliacaoId,
        tenantId,
        tipo: StatusAtendimento.AVALIACAO,
      },
      include: {
        procedimentosPlano: {
          include: {
            procedimento: true,
          },
        },
        agendamento: true,
        paciente: true,
        profissional: true,
      },
    });

    if (!avaliacao) {
      throw new AppError("Avaliação não encontrada", 404);
    }

    if (avaliacao.statusAprovacao !== StatusAprovacao.PENDENTE) {
      throw new AppError("Esta avaliação já foi aprovada ou reprovada", 400);
    }

    // Atualizar avaliação
    const avaliacaoAtualizada = await prisma.atendimento.update({
      where: { id: avaliacaoId },
      data: {
        statusAprovacao: StatusAprovacao.APROVADO,
        aprovadoEm: new Date(),
        aprovadoPor: data.aprovadoPor,
      },
    });

    // Criar plano de tratamento
    const planoTratamento = await prisma.atendimento.create({
      data: {
        tenantId,
        agendamentoId: avaliacao.agendamentoId,
        pacienteId: avaliacao.pacienteId,
        profissionalId: avaliacao.profissionalId,
        tipo: StatusAtendimento.PLANO_TRATAMENTO,
        avaliacaoId: avaliacaoId,
        anotacoes: `Plano de tratamento gerado automaticamente a partir da avaliação`,
      },
      include: {
        procedimentosPlano: {
          include: {
            procedimento: true,
          },
        },
      },
    });

    // Copiar procedimentos da avaliação para o plano
    if (avaliacao.procedimentosPlano.length > 0) {
      await prisma.atendimentoProcedimento.createMany({
        data: avaliacao.procedimentosPlano.map((proc) => ({
          tenantId,
          atendimentoId: planoTratamento.id,
          procedimentoId: proc.procedimentoId,
          ordem: proc.ordem,
          observacoes: proc.observacoes,
          valorPraticado: proc.valorPraticado,
          progresso: ProgressoProcedimento.NAO_INICIADO,
        })),
      });
    }

    // Buscar plano completo
    const planoCompleto = await prisma.atendimento.findUnique({
      where: { id: planoTratamento.id },
      include: {
        procedimentosPlano: {
          include: {
            procedimento: true,
          },
          orderBy: {
            ordem: "asc",
          },
        },
      },
    });

    return {
      avaliacao: avaliacaoAtualizada,
      planoTratamento: planoCompleto,
    };
  }

  // ==========================================================================
  // REPROVAR AVALIAÇÃO
  // ==========================================================================

  static async reprovarAvaliacao(
    tenantId: string,
    avaliacaoId: string,
    data: ReprovarAvaliacaoData
  ) {
    // Buscar avaliação
    const avaliacao = await prisma.atendimento.findFirst({
      where: {
        id: avaliacaoId,
        tenantId,
        tipo: StatusAtendimento.AVALIACAO,
      },
    });

    if (!avaliacao) {
      throw new AppError("Avaliação não encontrada", 404);
    }

    if (avaliacao.statusAprovacao !== StatusAprovacao.PENDENTE) {
      throw new AppError("Esta avaliação já foi aprovada ou reprovada", 400);
    }

    // Atualizar avaliação
    const avaliacaoAtualizada = await prisma.atendimento.update({
      where: { id: avaliacaoId },
      data: {
        statusAprovacao: StatusAprovacao.REPROVADO,
        reprovadoEm: new Date(),
        reprovadoMotivo: data.motivo,
      },
      include: {
        procedimentosPlano: {
          include: {
            procedimento: true,
          },
        },
      },
    });

    return avaliacaoAtualizada;
  }

  // ==========================================================================
  // GET PLANO TRATAMENTO BY PACIENTE
  // ==========================================================================

  static async getPlanoTratamentoByPaciente(
    tenantId: string,
    pacienteId: string
  ) {
    const planos = await prisma.atendimento.findMany({
      where: {
        tenantId,
        pacienteId,
        tipo: StatusAtendimento.PLANO_TRATAMENTO,
        cancelado: false,
      },
      include: {
        avaliacao: true,
        procedimentosPlano: {
          include: {
            procedimento: true,
            agendamento: {
              include: {
                profissional: true,
              },
            },
          },
          orderBy: {
            ordem: "asc",
          },
        },
        profissional: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return planos;
  }

  // ==========================================================================
  // UPDATE PROGRESSO PROCEDIMENTO
  // ==========================================================================

  static async updateProgressoProcedimento(
    tenantId: string,
    procedimentoPlanoId: string,
    data: UpdateProgressoProcedimentoData
  ) {
    // Buscar procedimento do plano
    const procedimentoPlano = await prisma.atendimentoProcedimento.findFirst({
      where: {
        id: procedimentoPlanoId,
        atendimento: {
          tenantId,
        },
      },
      include: {
        atendimento: true,
        procedimento: true,
      },
    });

    if (!procedimentoPlano) {
      throw new AppError("Procedimento não encontrado", 404);
    }

    // Validar mudanças de progresso
    const progressoAtual = procedimentoPlano.progresso;
    const novoProgresso = data.progresso;

    // Regras de transição de progresso
    if (progressoAtual === ProgressoProcedimento.CONCLUIDO) {
      throw new AppError(
        "Não é possível alterar um procedimento já concluído",
        400
      );
    }

    // Se está marcando como concluído, definir data
    const updateData: any = {
      progresso: novoProgresso,
      observacoes: data.observacoes || procedimentoPlano.observacoes,
      agendamentoId: data.agendamentoId || procedimentoPlano.agendamentoId,
    };

    if (novoProgresso === ProgressoProcedimento.CONCLUIDO) {
      updateData.concluidoEm = data.concluidoEm || new Date();
    }

    // Atualizar procedimento
    const procedimentoAtualizado = await prisma.atendimentoProcedimento.update({
      where: { id: procedimentoPlanoId },
      data: updateData,
      include: {
        procedimento: true,
        agendamento: true,
        atendimento: {
          include: {
            paciente: true,
            profissional: true,
          },
        },
      },
    });

    return procedimentoAtualizado;
  }

  // ==========================================================================
  // GET PROCEDIMENTOS PLANO BY ATENDIMENTO
  // ==========================================================================

  static async getProcedimentosPlano(tenantId: string, atendimentoId: string) {
    const atendimento = await prisma.atendimento.findFirst({
      where: {
        id: atendimentoId,
        tenantId,
      },
    });

    if (!atendimento) {
      throw new AppError("Atendimento não encontrado", 404);
    }

    const procedimentos = await prisma.atendimentoProcedimento.findMany({
      where: {
        atendimentoId,
      },
      include: {
        procedimento: true,
        agendamento: {
          include: {
            profissional: true,
          },
        },
      },
      orderBy: {
        ordem: "asc",
      },
    });

    return procedimentos;
  }

  // ==========================================================================
  // AGENDAR PROCEDIMENTO DO PLANO
  // ==========================================================================

  static async agendarProcedimentoPlano(
    tenantId: string,
    planoId: string,
    procedimentoPlanoId: string,
    agendamentoId: string
  ) {
    // Verificar se o plano existe
    const plano = await prisma.atendimento.findFirst({
      where: {
        id: planoId,
        tenantId,
        tipo: StatusAtendimento.PLANO_TRATAMENTO,
      },
    });

    if (!plano) {
      throw new AppError("Plano de tratamento não encontrado", 404);
    }

    // Verificar se o procedimento pertence ao plano
    const procedimento = await prisma.atendimentoProcedimento.findFirst({
      where: {
        id: procedimentoPlanoId,
        atendimentoId: planoId,
      },
    });

    if (!procedimento) {
      throw new AppError("Procedimento não encontrado no plano", 404);
    }

    // Verificar se o agendamento existe
    const agendamento = await prisma.agendamento.findFirst({
      where: {
        id: agendamentoId,
        tenantId,
      },
    });

    if (!agendamento) {
      throw new AppError("Agendamento não encontrado", 404);
    }

    // Atualizar procedimento com o agendamento
    const procedimentoAtualizado = await prisma.atendimentoProcedimento.update({
      where: { id: procedimentoPlanoId },
      data: {
        agendamentoId,
        progresso: ProgressoProcedimento.EM_ANDAMENTO,
      },
      include: {
        procedimento: true,
        agendamento: {
          include: {
            profissional: true,
          },
        },
      },
    });

    return procedimentoAtualizado;
  }

  // ==========================================================================
  // GET PROCEDIMENTOS PENDENTES DE AGENDAMENTO
  // ==========================================================================

  static async getProcedimentosPendentes(tenantId: string, planoId: string) {
    const plano = await prisma.atendimento.findFirst({
      where: {
        id: planoId,
        tenantId,
        tipo: StatusAtendimento.PLANO_TRATAMENTO,
      },
    });

    if (!plano) {
      throw new AppError("Plano de tratamento não encontrado", 404);
    }

    const procedimentos = await prisma.atendimentoProcedimento.findMany({
      where: {
        atendimentoId: planoId,
        OR: [
          { agendamentoId: null },
          { progresso: ProgressoProcedimento.NAO_INICIADO },
        ],
      },
      include: {
        procedimento: true,
      },
      orderBy: {
        ordem: "asc",
      },
    });

    return procedimentos;
  }

  // ==========================================================================
  // GERAR LINK DE APROVAÇÃO
  // ==========================================================================

  static async gerarLinkAprovacao(
    tenantId: string,
    avaliacaoId: string,
    expiresInDays: number = 7
  ) {
    const avaliacao = await prisma.atendimento.findFirst({
      where: {
        id: avaliacaoId,
        tenantId,
        tipo: StatusAtendimento.AVALIACAO,
      },
      include: {
        paciente: true,
        procedimentosPlano: {
          include: {
            procedimento: true,
          },
        },
      },
    });

    if (!avaliacao) {
      throw new AppError("Avaliação não encontrada", 404);
    }

    if (avaliacao.statusAprovacao !== StatusAprovacao.PENDENTE) {
      throw new AppError("Esta avaliação já foi aprovada ou reprovada", 400);
    }

    // Gerar token único
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);

    // Criar link de aprovação
    const linkAprovacao = await prisma.linkAprovacaoAvaliacao.create({
      data: {
        tenantId,
        avaliacaoId,
        token,
        expiresAt,
      },
    });

    const baseUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const link = `${baseUrl}/aprovacao/${token}`;

    return {
      id: linkAprovacao.id,
      token,
      link,
      expiresAt,
    };
  }

  // ==========================================================================
  // ENVIAR LINK VIA WHATSAPP
  // ==========================================================================

  static async enviarLinkAprovacaoWhatsApp(
    tenantId: string,
    avaliacaoId: string
  ) {
    const avaliacao = await prisma.atendimento.findFirst({
      where: {
        id: avaliacaoId,
        tenantId,
        tipo: StatusAtendimento.AVALIACAO,
      },
      include: {
        paciente: true,
        procedimentosPlano: {
          include: {
            procedimento: true,
          },
        },
      },
    });

    if (!avaliacao) {
      throw new AppError("Avaliação não encontrada", 404);
    }

    // Buscar ou criar link
    let linkData = await prisma.linkAprovacaoAvaliacao.findFirst({
      where: {
        avaliacaoId,
        expiresAt: {
          gte: new Date(),
        },
      },
    });

    if (!linkData) {
      const result = await this.gerarLinkAprovacao(tenantId, avaliacaoId);
      linkData = await prisma.linkAprovacaoAvaliacao.findUnique({
        where: { id: result.id },
      });
    }

    const baseUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const link = `${baseUrl}/aprovacao/${linkData!.token}`;

    // Calcular valor total
    const valorTotal = avaliacao.procedimentosPlano.reduce((total, proc) => {
      return (
        total + Number(proc.valorPraticado || proc.procedimento?.valor || 0)
      );
    }, 0);

    // Mensagem para WhatsApp
    const mensagem = `Olá ${avaliacao.paciente!.nome}!

Sua avaliação está pronta para aprovação.

📋 *Procedimentos Propostos:*
${avaliacao.procedimentosPlano
  .map(
    (proc, index) =>
      `${index + 1}. ${proc.procedimento?.nome} - R$ ${Number(
        proc.valorPraticado || proc.procedimento?.valor || 0
      ).toFixed(2)}`
  )
  .join("\n")}

💰 *Valor Total: R$ ${valorTotal.toFixed(2)}*

Para aprovar ou recusar, acesse:
${link}

Este link expira em ${new Date(linkData!.expiresAt).toLocaleDateString(
      "pt-BR"
    )}`;

    // TODO: Integrar com WhatsApp API
    console.log("Mensagem WhatsApp:", mensagem);

    return { success: true, mensagem };
  }

  // ==========================================================================
  // VALIDAR TOKEN DE APROVAÇÃO
  // ==========================================================================

  static async validarTokenAprovacao(token: string) {
    const linkAprovacao = await prisma.linkAprovacaoAvaliacao.findUnique({
      where: { token },
      include: {
        avaliacao: {
          include: {
            paciente: true,
            procedimentosPlano: {
              include: {
                procedimento: true,
              },
              orderBy: {
                ordem: "asc",
              },
            },
          },
        },
      },
    });

    if (!linkAprovacao) {
      throw new AppError("Link inválido", 404);
    }

    if (new Date() > linkAprovacao.expiresAt) {
      throw new AppError("Link expirado", 400);
    }

    if (linkAprovacao.utilizado) {
      throw new AppError("Link já foi utilizado", 400);
    }

    if (linkAprovacao.avaliacao.statusAprovacao !== StatusAprovacao.PENDENTE) {
      throw new AppError("Esta avaliação já foi processada", 400);
    }

    return {
      avaliacao: linkAprovacao.avaliacao,
      paciente: linkAprovacao.avaliacao.paciente,
    };
  }

  // ==========================================================================
  // APROVAR VIA LINK
  // ==========================================================================

  static async aprovarViaLink(token: string, aprovadoPor: string) {
    const linkAprovacao = await prisma.linkAprovacaoAvaliacao.findUnique({
      where: { token },
      include: {
        avaliacao: {
          include: {
            procedimentosPlano: {
              include: {
                procedimento: true,
              },
            },
          },
        },
      },
    });

    if (!linkAprovacao) {
      throw new AppError("Link inválido", 404);
    }

    if (new Date() > linkAprovacao.expiresAt) {
      throw new AppError("Link expirado", 400);
    }

    if (linkAprovacao.utilizado) {
      throw new AppError("Link já foi utilizado", 400);
    }

    // Aprovar avaliação
    const result = await this.aprovarAvaliacao(
      linkAprovacao.tenantId,
      linkAprovacao.avaliacaoId,
      { aprovadoPor }
    );

    // Marcar link como utilizado
    await prisma.linkAprovacaoAvaliacao.update({
      where: { id: linkAprovacao.id },
      data: {
        utilizado: true,
        utilizadoEm: new Date(),
      },
    });

    return result;
  }
}
