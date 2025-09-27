import api from "@/lib/api";

export interface Paciente {
  id: string;
  tenantId: string;
  nome: string;
  telefone: string;
  email?: string;
  observacoes?: string;
  profissionalId?: string;
  profissional?: {
    id: string;
    nome: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreatePacienteData {
  nome: string;
  telefone: string;
  email?: string;
  observacoes?: string;
  profissionalId?: string;
}

export interface UpdatePacienteData {
  nome?: string;
  telefone?: string;
  email?: string;
  observacoes?: string;
  profissionalId?: string;
}

export interface PacienteFilters {
  search?: string;
  profissionalId?: string;
  page?: number;
  limit?: number;
}

export async function getPacientes(
  filters?: PacienteFilters
): Promise<Paciente[]> {
  const params = new URLSearchParams();

  if (filters?.search) params.append("search", filters.search);
  if (filters?.profissionalId)
    params.append("profissionalId", filters.profissionalId);
  if (filters?.page) params.append("page", filters.page.toString());
  if (filters?.limit) params.append("limit", filters.limit.toString());

  const response = await api.get(`/pacientes?${params.toString()}`);
  return response.data.data || [];
}

export async function getPacienteById(id: string): Promise<Paciente> {
  const response = await api.get(`/pacientes/${id}`);
  return response.data.data;
}

export async function createPaciente(
  data: CreatePacienteData
): Promise<Paciente> {
  const response = await api.post("/pacientes", data);
  return response.data.data;
}

export async function updatePaciente(
  id: string,
  data: UpdatePacienteData
): Promise<Paciente> {
  const response = await api.put(`/pacientes/${id}`, data);
  return response.data.data;
}

export async function deletePaciente(id: string): Promise<void> {
  await api.delete(`/pacientes/${id}`);
}

export async function deletePacientesEmLote(ids: string[]): Promise<void> {
  await api.post("/pacientes/lote/delete", { ids });
}
