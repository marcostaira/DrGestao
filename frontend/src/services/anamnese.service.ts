// frontend/src/services/anamnese.service.ts

import api from "@/lib/api";
import { Anamnese, RespostaAnamnese } from "@/types/anamnese.types";

export interface LinkAnamnese {
  id: string;
  token: string;
  url: string;
  paciente: {
    id: string;
    nome: string;
    telefone: string;
  };
  formulario: {
    id: string;
    nome: string;
    descricao?: string;
  };
  agendamento?: {
    id: string;
    dataHora: string;
  };
  preenchido: boolean;
  expiresAt: string;
  preenchidoEm?: string;
  createdAt: string;
}

export interface ValidateTokenResponse {
  id: string;
  paciente: {
    id: string;
    nome: string;
  };
  formulario: {
    id: string;
    nome: string;
    descricao?: string;
    campos: any[];
  };
  preenchido: boolean;
  expiresAt: string;
}

export const anamneseService = {
  // Criar anamnese
  async create(data: {
    pacienteId: string;
    formularioId: string;
    atendimentoId?: string;
    respostas: RespostaAnamnese;
    observacoes?: string;
  }): Promise<Anamnese> {
    const response = await api.post("/anamneses", data);
    return response.data.data;
  },

  // Buscar por ID
  async getById(id: string): Promise<Anamnese> {
    const response = await api.get(`/anamneses/${id}`);
    return response.data.data;
  },

  // Listar por paciente
  async listByPaciente(pacienteId: string): Promise<Anamnese[]> {
    const response = await api.get(`/anamneses/paciente/${pacienteId}`);
    return response.data.data;
  },

  // Listar por formulário
  async listByFormulario(formularioId: string): Promise<Anamnese[]> {
    const response = await api.get(`/anamneses/formulario/${formularioId}`);
    return response.data.data;
  },

  // Atualizar
  async update(
    id: string,
    data: {
      respostas?: RespostaAnamnese;
      observacoes?: string;
    }
  ): Promise<Anamnese> {
    const response = await api.put(`/anamneses/${id}`, data);
    return response.data.data;
  },

  // Deletar
  async delete(id: string): Promise<void> {
    await api.delete(`/anamneses/${id}`);
  },

  // ============================================================================
  // MÉTODOS DE LINK DE ANAMNESE
  // ============================================================================

  // Criar link de anamnese
  async createLink(data: {
    pacienteId: string;
    formularioId: string;
    agendamentoId?: string;
    expiresInDays?: number;
  }): Promise<LinkAnamnese> {
    const response = await api.post("/anamnese/link", data);
    return response.data.data;
  },

  // Enviar link via WhatsApp
  async sendViaWhatsApp(data: {
    pacienteId: string;
    formularioId: string;
    agendamentoId?: string;
  }): Promise<{ success: boolean; message: string; link: string }> {
    const response = await api.post("/anamnese/link/whatsapp", data);
    return response.data.data;
  },

  // Validar token (público - sem autenticação)
  async validateToken(token: string): Promise<ValidateTokenResponse> {
    const response = await api.get(`/anamnese/link/${token}`);
    return response.data.data;
  },

  // Salvar resposta via link (público - sem autenticação)
  async saveResposta(
    token: string,
    data: {
      respostas: any;
      observacoes?: string;
    }
  ): Promise<Anamnese> {
    const response = await api.post(`/anamnese/link/${token}/responder`, data);
    return response.data.data;
  },

  // Listar links de um paciente
  async listLinksByPaciente(pacienteId: string): Promise<LinkAnamnese[]> {
    const response = await api.get(`/anamnese/link/paciente/${pacienteId}`);
    return response.data.data;
  },
};

export default anamneseService;
