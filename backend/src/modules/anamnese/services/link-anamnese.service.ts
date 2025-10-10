// backend/src/modules/anamnese/link-anamnese.service.ts

import { AppError } from "@/middleware/errorHandler";
import { prisma } from "../../../config/database";
import crypto from "crypto";

export class LinkAnamneseService {
  // Gerar token criptografado
  private static generateToken(): string {
    return crypto.randomBytes(32).toString("hex");
  }

  // Criar link de anamnese
  static async createLink(data: {
    tenantId: string;
    pacienteId: string;
    formularioId: string;
    agendamentoId?: string;
    expiresInDays?: number;
  }) {
    // Validar paciente
    const paciente = await prisma.paciente.findFirst({
      where: {
        id: data.pacienteId,
        tenantId: data.tenantId,
      },
    });

    if (!paciente) {
      throw new AppError("Paciente não encontrado", 404);
    }

    // Validar formulário
    const formulario = await prisma.formulario.findFirst({
      where: {
        id: data.formularioId,
        tenantId: data.tenantId,
        ativo: true,
      },
    });

    if (!formulario) {
      throw new AppError("Formulário não encontrado ou inativo", 404);
    }

    // Gerar token único
    const token = this.generateToken();

    // Calcular data de expiração
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (data.expiresInDays || 30));

    // Criar link
    const link = await prisma.linkAnamnese.create({
      data: {
        tenantId: data.tenantId,
        pacienteId: data.pacienteId,
        formularioId: data.formularioId,
        agendamentoId: data.agendamentoId,
        token,
        expiresAt,
      },
      include: {
        paciente: {
          select: {
            id: true,
            nome: true,
            telefone: true,
          },
        },
        formulario: {
          select: {
            id: true,
            nome: true,
            descricao: true,
          },
        },
      },
    });

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const linkCompleto = `${frontendUrl}/anamnese/${token}`;

    return {
      ...link,
      url: linkCompleto,
    };
  }

  // Validar token
  static async validateToken(token: string) {
    const link = await prisma.linkAnamnese.findUnique({
      where: { token },
      include: {
        paciente: {
          select: {
            id: true,
            nome: true,
          },
        },
        formulario: {
          select: {
            id: true,
            nome: true,
            descricao: true,
            campos: true,
          },
        },
        anamnese: true,
      },
    });

    if (!link) {
      throw new AppError("Link inválido", 404);
    }

    if (link.preenchido) {
      throw new AppError("Formulário já foi preenchido", 400);
    }

    if (new Date() > link.expiresAt) {
      throw new AppError("Link expirado", 400);
    }

    return link;
  }

  // Salvar resposta via link
  static async saveResposta(
    token: string,
    respostas: any,
    observacoes?: string
  ) {
    // Validar token
    const link = await this.validateToken(token);

    // Criar anamnese usando o serviço existente
    const { AnamneseService } = await import("./anamnese.service");

    const anamnese = await AnamneseService.create(link.tenantId, {
      pacienteId: link.pacienteId,
      formularioId: link.formularioId,
      atendimentoId: undefined,
      respostas,
      observacoes,
    });

    // Marcar link como preenchido
    await prisma.linkAnamnese.update({
      where: { id: link.id },
      data: {
        preenchido: true,
        preenchidoEm: new Date(),
        anamneseId: anamnese.id,
      },
    });

    return anamnese;
  }

  // Listar links de um paciente
  static async listByPaciente(tenantId: string, pacienteId: string) {
    return await prisma.linkAnamnese.findMany({
      where: {
        tenantId,
        pacienteId,
      },
      include: {
        formulario: {
          select: {
            id: true,
            nome: true,
          },
        },
        agendamento: {
          select: {
            id: true,
            dataHora: true,
          },
        },
        anamnese: {
          select: {
            id: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // Enviar link via WhatsApp
  static async sendViaWhatsApp(data: {
    tenantId: string;
    pacienteId: string;
    formularioId: string;
    agendamentoId?: string;
  }) {
    // Criar link
    const link = await this.createLink(data);

    // Buscar config do WhatsApp
    const whatsappConfig = await prisma.whatsAppConfig.findUnique({
      where: { tenantId: data.tenantId },
    });

    if (!whatsappConfig || whatsappConfig.status !== "CONNECTED") {
      throw new AppError("WhatsApp não está conectado", 400);
    }

    // Formatar telefone
    let telefone = link.paciente.telefone.replace(/\D/g, "");
    if (!telefone.startsWith("55")) {
      telefone = "55" + telefone;
    }
    const numeroFormatado = `${telefone}@s.whatsapp.net`;

    // Montar mensagem
    const mensagem = `Olá ${
      link.paciente.nome
    }! 👋\n\n📋 Para agilizar seu atendimento, por favor preencha sua anamnese:\n\n🔗 ${
      link.url
    }\n\n✅ O preenchimento leva apenas alguns minutos.\n⏰ Link válido até ${link.expiresAt.toLocaleDateString(
      "pt-BR"
    )}.`;

    // Enviar via Evolution API
    const { evolutionService } = await import(
      "../../../config/evolution.config"
    );

    await evolutionService.sendTextMessage(whatsappConfig.instanceName!, {
      number: numeroFormatado,
      text: mensagem,
    });

    // Incrementar contador
    await prisma.whatsAppConfig.update({
      where: { tenantId: data.tenantId },
      data: {
        mensagensEnviadas: {
          increment: 1,
        },
      },
    });

    return {
      success: true,
      message: "Link enviado com sucesso via WhatsApp",
      link: link.url,
    };
  }
}
