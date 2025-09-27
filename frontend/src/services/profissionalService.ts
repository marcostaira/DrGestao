import api from "@/lib/api";

export interface Profissional {
  id: string;
  tenantId: string;
  nome: string;
  especialidade?: string;
  observacoes?: string;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProfissionalData {
  nome: string;
  especialidade?: string;
  observacoes?: string;
}

export interface UpdateProfissionalData {
  nome?: string;
  especialidade?: string;
  observacoes?: string;
  ativo?: boolean;
}

export async function getProfissionais(): Promise<Profissional[]> {
  const response = await api.get("/profissionais");
  return response.data.data || [];
}

export async function getProfissionalById(id: string): Promise<Profissional> {
  const response = await api.get(`/profissionais/${id}`);
  return response.data.data;
}

export async function createProfissional(
  data: CreateProfissionalData
): Promise<Profissional> {
  const response = await api.post("/profissionais", data);
  return response.data.data;
}

export async function updateProfissional(
  id: string,
  data: UpdateProfissionalData
): Promise<Profissional> {
  const response = await api.put(`/profissionais/${id}`, data);
  return response.data.data;
}

export async function deleteProfissional(id: string): Promise<void> {
  await api.delete(`/profissionais/${id}`);
}

export async function ativarProfissional(id: string): Promise<Profissional> {
  const response = await api.patch(`/profissionais/${id}/ativar`);
  return response.data.data;
}
