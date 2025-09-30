import api from "@/lib/api";

export enum StatusAgendamento {
  MARCADO = "MARCADO",
  CONFIRMADO = "CONFIRMADO",
  COMPARECEU = "COMPARECEU",
  FALTOU = "FALTOU",
  CANCELADO = "CANCELADO",
}

export interface Agendamento {
  id: string;
  tenantId: string;
  pacienteId?: string;
  profissionalId: string;
  procedimentoId?: string;
  dataHora: string;
  status: StatusAgendamento;
  observacoes?: string;
  paciente?: {
    id: string;
    nome: string;
    telefone: string;
  };
  profissional: {
    id: string;
    nome: string;
    cor: string;
  };
  procedimento?: {
    id: string;
    nome: string;
    duracaoMinutos: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateAgendamentoData {
  pacienteId?: string;
  profissionalId: string;
  procedimentoId?: string;
  dataHora: string;
  observacoes?: string;
}

export interface UpdateAgendamentoData {
  pacienteId?: string;
  profissionalId?: string;
  procedimentoId?: string;
  dataHora?: string;
  status?: StatusAgendamento;
  observacoes?: string;
}

export interface AgendamentoFilters {
  dataInicio?: string;
  dataFim?: string;
  profissionalId?: string;
  status?: StatusAgendamento;
}

export async function getAgendamentos(
  filters?: AgendamentoFilters
): Promise<Agendamento[]> {
  const params = new URLSearchParams();

  if (filters?.dataInicio) params.append("dataInicio", filters.dataInicio);
  if (filters?.dataFim) params.append("dataFim", filters.dataFim);
  if (filters?.profissionalId)
    params.append("profissionalId", filters.profissionalId);
  if (filters?.status) params.append("status", filters.status);

  const response = await api.get(`/agendamentos?${params.toString()}`);
  return response.data.data || [];
}

export async function getAgendamentoById(id: string): Promise<Agendamento> {
  const response = await api.get(`/agendamentos/${id}`);
  return response.data.data;
}

export async function createAgendamento(
  data: CreateAgendamentoData
): Promise<Agendamento> {
  const response = await api.post("/agendamentos", data);
  return response.data.data;
}

export async function updateAgendamento(
  id: string,
  data: UpdateAgendamentoData
): Promise<Agendamento> {
  const response = await api.put(`/agendamentos/${id}`, data);
  return response.data.data;
}

export async function deleteAgendamento(id: string): Promise<void> {
  await api.delete(`/agendamentos/${id}`);
}

export async function updateStatus(
  id: string,
  status: StatusAgendamento
): Promise<Agendamento> {
  const response = await api.patch(`/agendamentos/${id}/status`, { status });
  return response.data.data;
}
