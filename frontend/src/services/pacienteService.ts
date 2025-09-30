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

export interface Paciente {
  id: string;
  tenantId: string;
  profissionalId?: string;

  // Dados pessoais
  nome: string;
  cpf?: string;
  dataNascimento?: string;

  // Contatos
  telefone: string;
  telefone2?: string;
  email?: string;

  // Endereço
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;

  // Dados médicos
  alergias?: string;

  // Responsável
  menorIdade: boolean;
  responsavelNome?: string;
  responsavelCpf?: string;
  responsavelTelefone?: string;
  responsavelParentesco?: string;

  observacoes?: string;
  profissional?: {
    id: string;
    nome: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreatePacienteData {
  nome: string;
  cpf?: string;
  dataNascimento?: string;
  telefone: string;
  telefone2?: string;
  email?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  alergias?: string;
  menorIdade?: boolean;
  responsavelNome?: string;
  responsavelCpf?: string;
  responsavelTelefone?: string;
  responsavelParentesco?: string;
  profissionalId?: string;
  observacoes?: string;
}

export type UpdatePacienteData = Partial<CreatePacienteData>;

