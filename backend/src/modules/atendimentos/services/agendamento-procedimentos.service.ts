/* eslint-disable @typescript-eslint/no-explicit-any */
// backend/src/modules/atendimentos/services/agendamento-procedimentos.service.ts

import { StatusAprovacao, StatusAtendimento } from "generated/prisma";
import { prisma } from "../../../config/database";

import { AppError } from "@/middleware/errorHandler";

interface AgendarProcedimentoData {
  atendimentoProcedimentoId: string;
  profissionalId: string;
  dataHora: Date;
}

interface AgendarProcedimentosData {
  avaliacaoId: string;
  procedimentos: AgendarProcedimentoData[];
}

interface AgendamentosProcedimentosResponse {
  agendamentos: Array<{
    id: string;
    procedimento: string;
    profissional: string;
    dataHora: string;
    duracaoMinutos: number;
  }>;
  totalAgendados: number;
  erros?: Array<{
    procedimento: string;
    erro: string;
  }>;
}

export class AgendamentoProcedimentosService {
  // =========================================================================
  // LISTAR PROCEDIMENTOS DA AVALIAÇÃO APROVADA
  // =========================================================================

  static async listarProcedimentosAgendar(
    tenantId: string,
    avaliacaoId: string
  ) {
    // Buscar avaliação aprovada
    const avaliacao = await prisma.atendimento.findFirst({
      where: {
        id: avaliacaoId,
        tenantId,
        tipo: StatusAtendimento.AVALIACAO,
        statusAprovacao: StatusAprovacao.APROVADO,
      },
      include: {
        paciente: {
          select: {
            id: true,
            nome: true,
            telefone: true,
            email: true,
          },
        },
        procedimentosPlano: {
          include: {
            procedimento: {
              select: {
                id: true,
                nome: true,
                duracaoMinutos: true,
                valor: true,
              },
            },
          },
          orderBy: {
            ordem: "asc",
          },
        },
      },
    });

    if (!avaliacao) {
      throw new AppError(
        "Avaliação aprovada não encontrada ou não está aprovada",
        404
      );
    }

    // Buscar agendamentos já criados para esses procedimentos
    const agendamentosExistentes = await prisma.agendamento.findMany({
      where: {
        tenantId,
        atendimentoProcedimentos: {
          some: {
            atendimentoId: avaliacaoId,
          },
        },
      },
      select: {
        id: true,
        atendimentoProcedimentos: {
          select: {
            id: true,
          },
        },
      },
    });

    const agendamentosProcedimentoIds = agendamentosExistentes.flatMap((a) =>
      a.atendimentoProcedimentos.map((ap) => ap.id)
    );

    // Filtrar procedimentos que ainda não foram agendados
    const procedimentosParaAgendar = avaliacao.procedimentosPlano.filter(
      (pp) => !agendamentosProcedimentoIds.includes(pp.id)
    );

    return {
      avaliacaoId: avaliacao.id,
      paciente: avaliacao.paciente,
      totalProcedimentos: avaliacao.procedimentosPlano.length,
      procedimentosJaAgendados: agendamentosExistentes.length,
      procedimentosParaAgendar: procedimentosParaAgendar.map((pp) => ({
        atendimentoProcedimentoId: pp.id,
        procedimentoId: pp.procedimentoId,
        procedimentoNome: pp.procedimento.nome,
        duracaoMinutos: pp.procedimento.duracaoMinutos,
        valor: pp.procedimento.valor,
        ordem: pp.ordem,
        observacoes: pp.observacoes,
      })),
    };
  }

  // =========================================================================
  // AGENDAR MÚLTIPLOS PROCEDIMENTOS DA AVALIAÇÃO
  // =========================================================================

  static async agendarProcedimentos(
    tenantId: string,
    data: AgendarProcedimentosData
  ): Promise<AgendamentosProcedimentosResponse> {
    const { avaliacaoId, procedimentos } = data;

    // Validar avaliação
    const avaliacao = await prisma.atendimento.findFirst({
      where: {
        id: avaliacaoId,
        tenantId,
        tipo: StatusAtendimento.AVALIACAO,
        statusAprovacao: StatusAprovacao.APROVADO,
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
      throw new AppError("Avaliação aprovada não encontrada", 404);
    }

    const agendamentos: Array<{
      id: string;
      procedimento: string;
      profissional: string;
      dataHora: string;
      duracaoMinutos: number;
    }> = [];

    const erros: Array<{
      procedimento: string;
      erro: string;
    }> = [];

    // Agendar cada procedimento
    for (const proc of procedimentos) {
      try {
        // Validar que o procedimento pertence à avaliação
        const procAval = avaliacao.procedimentosPlano.find(
          (pp) => pp.id === proc.atendimentoProcedimentoId
        );

        if (!procAval) {
          erros.push({
            procedimento: proc.atendimentoProcedimentoId,
            erro: "Procedimento não pertence a esta avaliação",
          });
          continue;
        }

        // Validar profissional
        const profissional = await prisma.profissional.findFirst({
          where: {
            id: proc.profissionalId,
            tenantId,
            ativo: true,
          },
        });

        if (!profissional) {
          erros.push({
            procedimento: procAval.procedimento.nome,
            erro: "Profissional não encontrado ou inativo",
          });
          continue;
        }

        // Criar agendamento
        const dataHoraFim = new Date(proc.dataHora);
        dataHoraFim.setMinutes(
          dataHoraFim.getMinutes() + procAval.procedimento.duracaoMinutos
        );

        const agendamento = await prisma.agendamento.create({
          data: {
            tenantId,
            pacienteId: avaliacao.pacienteId,
            profissionalId: proc.profissionalId,
            procedimentoId: procAval.procedimentoId,
            dataHora: new Date(proc.dataHora),
            dataHoraFim,
            status: "MARCADO",
            observacoes: `Agendamento do procedimento: ${
              procAval.procedimento.nome
            }${procAval.observacoes ? ` - ${procAval.observacoes}` : ""}`,
          },
          include: {
            procedimento: true,
            profissional: true,
          },
        });

        // Vincular agendamento ao procedimento do plano
        await prisma.atendimentoProcedimento.update({
          where: { id: proc.atendimentoProcedimentoId },
          data: {
            agendamentoId: agendamento.id,
            progresso: "NAO_INICIADO",
          },
        });

        agendamentos.push({
          id: agendamento.id,
          procedimento: procAval.procedimento.nome,
          profissional: profissional.nome,
          dataHora: agendamento.dataHora.toISOString(),
          duracaoMinutos: procAval.procedimento.duracaoMinutos,
        });
      } catch (error: any) {
        erros.push({
          procedimento: proc.atendimentoProcedimentoId,
          erro: error.message || "Erro ao criar agendamento",
        });
      }
    }

    if (agendamentos.length === 0 && erros.length > 0) {
      throw new AppError(
        `Falha ao agendar procedimentos: ${erros[0].erro}`,
        400
      );
    }

    const response: AgendamentosProcedimentosResponse = {
      agendamentos,
      totalAgendados: agendamentos.length,
    };

    if (erros.length > 0) {
      response.erros = erros;
    }

    return response;
  }

  // =========================================================================
  // AGENDAR PROCEDIMENTO INDIVIDUAL
  // =========================================================================

  static async agendarProcedimentoIndividual(
    tenantId: string,
    atendimentoProcedimentoId: string,
    profissionalId: string,
    dataHora: Date
  ) {
    // Buscar procedimento do plano
    const procPlano = await prisma.atendimentoProcedimento.findFirst({
      where: {
        id: atendimentoProcedimentoId,
        tenantId,
      },
      include: {
        atendimento: {
          include: {
            paciente: true,
          },
        },
        procedimento: true,
      },
    });

    if (!procPlano) {
      throw new AppError("Procedimento não encontrado", 404);
    }

    if (procPlano.agendamentoId) {
      throw new AppError("Este procedimento já possui agendamento", 400);
    }

    // Validar profissional
    const profissional = await prisma.profissional.findFirst({
      where: {
        id: profissionalId,
        tenantId,
        ativo: true,
      },
    });

    if (!profissional) {
      throw new AppError("Profissional não encontrado ou inativo", 404);
    }

    // Criar agendamento
    const dataHoraFim = new Date(dataHora);
    dataHoraFim.setMinutes(
      dataHoraFim.getMinutes() + procPlano.procedimento.duracaoMinutos
    );

    const agendamento = await prisma.agendamento.create({
      data: {
        tenantId,
        pacienteId: procPlano.atendimento.pacienteId,
        profissionalId,
        procedimentoId: procPlano.procedimentoId,
        dataHora: new Date(dataHora),
        dataHoraFim,
        status: "MARCADO",
        observacoes: `Agendamento do procedimento: ${
          procPlano.procedimento.nome
        }${procPlano.observacoes ? ` - ${procPlano.observacoes}` : ""}`,
      },
      include: {
        procedimento: true,
        profissional: true,
        paciente: true,
      },
    });

    // Vincular ao procedimento
    await prisma.atendimentoProcedimento.update({
      where: { id: atendimentoProcedimentoId },
      data: {
        agendamentoId: agendamento.id,
        progresso: "NAO_INICIADO",
      },
    });

    return {
      agendamento: {
        id: agendamento.id,
        paciente: agendamento.paciente?.nome || "Sem paciente",
        procedimento: agendamento.procedimento.nome,
        profissional: agendamento.profissional.nome,
        dataHora: agendamento.dataHora.toISOString(),
        duracaoMinutos: agendamento.procedimento.duracaoMinutos,
      },
    };
  }

  // =========================================================================
  // VERIFICAR DISPONIBILIDADE DE HORÁRIOS
  // =========================================================================

  static async verificarDisponibilidade(
    tenantId: string,
    profissionalId: string,
    dataHora: Date,
    duracaoMinutos: number
  ) {
    const dataHoraFim = new Date(dataHora);
    dataHoraFim.setMinutes(dataHoraFim.getMinutes() + duracaoMinutos);

    // Buscar agendamentos que se sobrepõem
    const agendamentosConflito = await prisma.agendamento.findMany({
      where: {
        tenantId,
        profissionalId,
        status: {
          notIn: ["CANCELADO", "FALTOU"],
        },
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
        ],
      },
    });

    return {
      disponivel: agendamentosConflito.length === 0,
      conflitos: agendamentosConflito.length,
    };
  }
}
