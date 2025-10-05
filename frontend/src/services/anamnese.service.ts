import api from "@/lib/api";
import { Anamnese, RespostaAnamnese } from "@/types/anamnese.types";

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
};

export default anamneseService;
