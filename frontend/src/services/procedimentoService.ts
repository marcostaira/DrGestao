import api from "@/lib/api";

export interface Procedimento {
  id: string;
  tenantId: string;
  nome: string;
  valor?: number;
  duracaoMinutos: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProcedimentoData {
  nome: string;
  valor?: number;
  duracaoMinutos: number;
}

export interface UpdateProcedimentoData {
  nome?: string;
  valor?: number;
  duracaoMinutos?: number;
}

export async function getProcedimentos(): Promise<Procedimento[]> {
  const response = await api.get("/procedimentos");
  return response.data.data || [];
}

export async function getProcedimentoById(id: string): Promise<Procedimento> {
  const response = await api.get(`/procedimentos/${id}`);
  return response.data.data;
}

export async function createProcedimento(
  data: CreateProcedimentoData
): Promise<Procedimento> {
  const response = await api.post("/procedimentos", data);
  return response.data.data;
}

export async function updateProcedimento(
  id: string,
  data: UpdateProcedimentoData
): Promise<Procedimento> {
  const response = await api.put(`/procedimentos/${id}`, data);
  return response.data.data;
}

export async function deleteProcedimento(id: string): Promise<void> {
  await api.delete(`/procedimentos/${id}`);
}
