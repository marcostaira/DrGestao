// backend/src/modules/whatsapp/whatsapp.model.ts

import { prisma } from '../../config/database';


export interface CreateWhatsAppConfigData {
  tenantId: string;
  instanceName?: string;
  templateConfirmacao?: string;
  templateConfirmado?: string;
  templateReagendar?: string;
  templateOpcaoInvalida?: string;
  horasAntecedencia?: number;
  enviarLinkAnamnese?: boolean;
  formularioId?: string | null;
}

export interface UpdateWhatsAppConfigData {
  instanceName?: string | null;
  instanceToken?: string | null;
  qrCode?: string | null;
  status?: string;
  phoneNumber?: string | null;
  profileName?: string | null;
  totalContacts?: number;
  totalChats?: number; 
  mensagensEnviadas?: number;
  mensagensRecebidas?: number;
  templateConfirmacao?: string;
  templateConfirmado?: string;
  templateReagendar?: string;
  templateOpcaoInvalida?: string;
  horasAntecedencia?: number;
  enviarLinkAnamnese?: boolean;
  formularioId?: string | null;
  ativo?: boolean;
}

export interface CreateWhatsAppMensagemData {
  tenantId: string;
  configId: string;
  agendamentoId?: string;
  pacienteId: string;
  telefone: string;
  mensagem: string;
  tipo: string;
}

export interface UpdateWhatsAppMensagemData {
  status?: string;
  respostaRecebida?: string;
  respostaEm?: Date;
  tentativas?: number;
  erroMensagem?: string;
  enviadaEm?: Date;
}

export class WhatsAppModel {
  // ============================================================================
  // CONFIG
  // ============================================================================

  async createConfig(data: CreateWhatsAppConfigData) {
    return prisma.whatsAppConfig.create({
      data,
      include: {
        formulario: true,
      },
    });
  }

  async findConfigByTenantId(tenantId: string) {
    return prisma.whatsAppConfig.findUnique({
      where: { tenantId },
      include: {
        formulario: true,
      },
    });
  }

  async updateConfig(tenantId: string, data: UpdateWhatsAppConfigData) {
    return prisma.whatsAppConfig.update({
      where: { tenantId },
      data,
      include: {
        formulario: true,
      },
    });
  }

  async incrementMensagensEnviadas(tenantId: string) {
    return prisma.whatsAppConfig.update({
      where: { tenantId },
      data: {
        mensagensEnviadas: {
          increment: 1,
        },
      },
    });
  }

  async incrementMensagensRecebidas(tenantId: string) {
    return prisma.whatsAppConfig.update({
      where: { tenantId },
      data: {
        mensagensRecebidas: {
          increment: 1,
        },
      },
    });
  }

  // ============================================================================
  // MENSAGENS
  // ============================================================================

  async createMensagem(data: CreateWhatsAppMensagemData) {
    return prisma.whatsAppMensagem.create({
      data: {
        ...data,
        status: "PENDENTE",
      },
      include: {
        paciente: true,
        agendamento: true,
      },
    });
  }

  async findMensagemById(id: string) {
    return prisma.whatsAppMensagem.findUnique({
      where: { id },
      include: {
        paciente: true,
        agendamento: true,
        config: true,
      },
    });
  }

  async findMensagensPendentes(tenantId: string) {
    return prisma.whatsAppMensagem.findMany({
      where: {
        tenantId,
        status: "PENDENTE",
      },
      include: {
        paciente: true,
        agendamento: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  async findMensagemByTelefoneRecente(
    tenantId: string,
    telefone: string,
    horas: number = 24
  ) {
    const dataLimite = new Date();
    dataLimite.setHours(dataLimite.getHours() - horas);

    return prisma.whatsAppMensagem.findFirst({
      where: {
        tenantId,
        telefone,
        tipo: "CONFIRMACAO",
        enviadaEm: {
          gte: dataLimite,
        },
      },
      include: {
        agendamento: true,
        paciente: true,
      },
      orderBy: {
        enviadaEm: "desc",
      },
    });
  }

  async updateMensagem(id: string, data: UpdateWhatsAppMensagemData) {
    return prisma.whatsAppMensagem.update({
      where: { id },
      data,
    });
  }

  async findMensagensByAgendamento(agendamentoId: string) {
    return prisma.whatsAppMensagem.findMany({
      where: { agendamentoId },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findMensagensByPeriodo(
    tenantId: string,
    dataInicio: Date,
    dataFim: Date
  ) {
    return prisma.whatsAppMensagem.findMany({
      where: {
        tenantId,
        createdAt: {
          gte: dataInicio,
          lte: dataFim,
        },
      },
      include: {
        paciente: true,
        agendamento: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getEstatisticas(tenantId: string) {
    const config = await this.findConfigByTenantId(tenantId);

    const mensagensHoje = await prisma.whatsAppMensagem.count({
      where: {
        tenantId,
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    });

    const mensagensRespondidas = await prisma.whatsAppMensagem.count({
      where: {
        tenantId,
        status: "RESPONDIDA",
      },
    });

    const mensagensErro = await prisma.whatsAppMensagem.count({
      where: {
        tenantId,
        status: "ERRO",
      },
    });

    return {
      totalEnviadas: config?.mensagensEnviadas || 0,
      totalRecebidas: config?.mensagensRecebidas || 0,
      mensagensHoje,
      mensagensRespondidas,
      mensagensErro,
      totalContatos: config?.totalContacts || 0,
      totalChats: config?.totalChats || 0,
    };
  }
}

export const whatsappModel = new WhatsAppModel();
