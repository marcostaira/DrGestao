// backend/src/modules/atendimentos/services/link-aprovacao.service.ts

import { prisma } from "../../../config/database";
import { AppError } from "../../../types";
import { randomBytes } from "crypto";
import { StatusAprovacao } from "../../../../generated/prisma";

export class LinkAprovacaoService {
  // Gerar token único
  private static generateToken(): string {
    return randomBytes(32).toString("hex");
  }

  // Criar link de aprovação
  static async createLink(data: {
    tenantId: string;
    avaliacaoId: string;
    expiresInDays?: number;
  }) {
    // Validar avaliação
    const avaliacao = await prisma.atendimento.findFirst({
      where: {
        id: data.avaliacaoId,
        tenantId: data.tenantId,
        tipo: "AVALIACAO",
      },
      include: {
        agendamento: {
          include: {
            paciente: true,
          },
        },
      },
    });

    if (!avaliacao) {
      throw new AppError("Avaliação não encontrada", 404);
    }

    if (!avaliacao.agendamento.pacienteId) {
      throw new AppError("Avaliação sem paciente vinculado", 400);
    }

    // Gerar token
    const token = this.generateToken();

    // Calcular data de expiração (padrão: 7 dias)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (data.expiresInDays || 7));

    // Criar link
    const link = await prisma.linkAprovacaoAvaliacao.create({
      data: {
        tenantId: data.tenantId,
        avaliacaoId: data.avaliacaoId,
        token,
        expiresAt,
      },
      include: {
        avaliacao: {
          include: {
            agendamento: {
              include: {
                paciente: true,
              },
            },
          },
        },
      },
    });

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const linkCompleto = `${frontendUrl}/aprovacao/${token}`;

    return {
      ...link,
      url: linkCompleto,
    };
  }

  // Validar token
  static async validarToken(token: string) {
    const link = await prisma.linkAprovacaoAvaliacao.findUnique({
      where: { token },
      include: {
        avaliacao: {
          include: {
            agendamento: {
              include: {
                paciente: true,
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
          },
        },
      },
    });

    if (!link) {
      throw new AppError("Link inválido", 404);
    }

    if (new Date() > link.expiresAt) {
      throw new AppError("Link expirado", 400);
    }

    if (link.utilizado) {
      throw new AppError("Link já foi utilizado", 400);
    }

    if (link.avaliacao.statusAprovacao !== StatusAprovacao.PENDENTE) {
      throw new AppError("Esta avaliação já foi processada", 400);
    }

    return {
      avaliacao: link.avaliacao,
      paciente: link.avaliacao.agendamento.paciente,
      expiresAt: link.expiresAt,
    };
  }

  // Aprovar avaliação
  static async aprovarAvaliacao(token: string, aprovadoPor: string) {
    // Validar token
    const link = await prisma.linkAprovacaoAvaliacao.findUnique({
      where: { token },
      include: {
        avaliacao: {
          include: {
            agendamento: {
              include: {
                paciente: true,
              },
            },
            procedimentosPlano: {
              include: {
                procedimento: true,
              },
            },
          },
        },
      },
    });

    if (!link) {
      throw new AppError("Link inválido", 404);
    }

    if (new Date() > link.expiresAt) {
      throw new AppError("Link expirado", 400);
    }

    if (link.utilizado) {
      throw new AppError("Link já foi utilizado", 400);
    }

    if (link.avaliacao.statusAprovacao !== StatusAprovacao.PENDENTE) {
      throw new AppError("Esta avaliação já foi processada", 400);
    }

    // Usar transação para garantir consistência
    const resultado = await prisma.$transaction(async (tx) => {
      // Marcar link como utilizado
      await tx.linkAprovacaoAvaliacao.update({
        where: { id: link.id },
        data: {
          utilizado: true,
          utilizadoEm: new Date(),
        },
      });

      // Atualizar status da avaliação para APROVADA
      const avaliacaoAtualizada = await tx.atendimento.update({
        where: { id: link.avaliacaoId },
        data: {
          statusAprovacao: StatusAprovacao.APROVADO,
          aprovadoPor,
          aprovadoEm: new Date(),
        },
      });

      // CORRIGIDO: Pegar o primeiro procedimento do plano para o agendamento
      const primeiroProcedimentoId =
        link.avaliacao.procedimentosPlano[0]?.procedimentoId ||
        link.avaliacao.procedimentoId;

      if (!primeiroProcedimentoId) {
        throw new AppError(
          "Nenhum procedimento encontrado para criar o agendamento",
          400
        );
      }

      // Criar um novo agendamento para o plano de tratamento
      const dataAgendamento = new Date();
      dataAgendamento.setDate(dataAgendamento.getDate() + 1); // Amanhã
      dataAgendamento.setHours(9, 0, 0, 0); // 9h da manhã

      const novoAgendamento = await tx.agendamento.create({
        data: {
          tenantId: link.tenantId,
          pacienteId: link.avaliacao.pacienteId!,
          profissionalId: link.avaliacao.profissionalId,
          procedimentoId: primeiroProcedimentoId, // USAR O PROCEDIMENTO VÁLIDO
          dataHora: dataAgendamento,
          dataHoraFim: new Date(dataAgendamento.getTime() + 30 * 60000), // +30min
          status: "MARCADO",
          observacoes: `Agendamento criado automaticamente para plano de tratamento (Avaliação: ${link.avaliacaoId})`,
        },
      });

      // Criar um novo atendimento do tipo PLANO_TRATAMENTO
      const plano = await tx.atendimento.create({
        data: {
          tenantId: link.tenantId,
          agendamentoId: novoAgendamento.id,
          pacienteId: link.avaliacao.pacienteId!,
          profissionalId: link.avaliacao.profissionalId,
          procedimentoId: primeiroProcedimentoId, // USAR O PROCEDIMENTO VÁLIDO
          tipo: "PLANO_TRATAMENTO",
          anotacoes: `Plano de tratamento criado a partir da avaliação ${link.avaliacaoId}. Aprovado por: ${aprovadoPor}`,
        },
      });

      // Criar os procedimentos do plano separadamente
      const procedimentosPlano = await Promise.all(
        link.avaliacao.procedimentosPlano.map((proc: any) =>
          tx.atendimentoProcedimento.create({
            data: {
              tenantId: link.tenantId,
              atendimentoId: plano.id,
              procedimentoId: proc.procedimentoId,
              ordem: proc.ordem,
              observacoes: proc.observacoes,
              valorPraticado: proc.valorPraticado,
            },
            include: {
              procedimento: true,
            },
          })
        )
      );

      // Buscar o plano completo com os procedimentos
      const planoCompleto = await tx.atendimento.findUnique({
        where: { id: plano.id },
        include: {
          procedimentosPlano: {
            include: {
              procedimento: true,
            },
          },
        },
      });

      return { avaliacao: avaliacaoAtualizada, plano: planoCompleto };
    });

    return resultado;
  }
}
