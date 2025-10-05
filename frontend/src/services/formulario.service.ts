import api from "@/lib/api";
import { Formulario, CampoFormulario } from "@/types/anamnese.types";

export const formularioService = {
  // Criar formulário
  async create(data: {
    nome: string;
    descricao?: string;
    profissionalId?: string;
    campos: CampoFormulario[];
  }): Promise<Formulario> {
    const response = await api.post("/formularios", data);
    return response.data.data;
  },

  // Listar formulários
  async list(filters?: {
    profissionalId?: string;
    ativo?: boolean;
    busca?: string;
  }): Promise<Formulario[]> {
    const params = new URLSearchParams();
    if (filters?.profissionalId)
      params.append("profissionalId", filters.profissionalId);
    if (filters?.ativo !== undefined)
      params.append("ativo", String(filters.ativo));
    if (filters?.busca) params.append("busca", filters.busca);

    const response = await api.get(`/formularios?${params.toString()}`);
    return response.data.data;
  },

  // Buscar por ID
  async getById(id: string): Promise<Formulario> {
    const response = await api.get(`/formularios/${id}`);
    return response.data.data;
  },

  // Atualizar
  async update(
    id: string,
    data: {
      nome?: string;
      descricao?: string;
      profissionalId?: string;
      campos?: CampoFormulario[];
      ativo?: boolean;
    }
  ): Promise<Formulario> {
    const response = await api.put(`/formularios/${id}`, data);
    return response.data.data;
  },

  // Deletar
  async delete(id: string): Promise<void> {
    await api.delete(`/formularios/${id}`);
  },

  // Duplicar
  async duplicate(id: string, novoNome?: string): Promise<Formulario> {
    const response = await api.post(`/formularios/${id}/duplicate`, {
      novoNome,
    });
    return response.data.data;
  },
};

export default formularioService;
