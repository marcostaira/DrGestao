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
  recorrenciaId?: string;
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

// ============================================================================
// BATCH OPERATIONS
// ============================================================================

export interface RecorrenciaData {
  tipo: "DIARIA" | "SEMANAL" | "MENSAL";
  dataFim: string;
  diasSemana?: number[]; // 0=Domingo, 1=Segunda, etc
}

export interface CreateBatchAgendamentoData extends CreateAgendamentoData {
  recorrencia?: RecorrenciaData;
}

export interface BatchUpdateData {
  profissionalId?: string;
  procedimentoId?: string;
  status?: StatusAgendamento;
  observacoes?: string;
}

export async function createBatchAgendamento(
  data: CreateBatchAgendamentoData
): Promise<Agendamento[]> {
  const response = await api.post("/agendamentos", data);
  return response.data.data;
}

export async function batchUpdateAgendamentos(
  ids: string[],
  data: BatchUpdateData
): Promise<{ updated: number }> {
  const response = await api.put("/agendamentos/batch", { ids, data });
  return response.data.data;
}

export async function batchDeleteAgendamentos(
  ids: string[]
): Promise<{ deleted: number }> {
  const response = await api.delete("/agendamentos/batch", { data: { ids } });
  return response.data.data;
}

// Adicionar ao final do arquivo existente

export async function updateRecorrencia(
  recorrenciaId: string,
  data: UpdateAgendamentoData
): Promise<{ updated: number }> {
  const response = await api.put(
    `/agendamentos/recorrencia/${recorrenciaId}`,
    data
  );
  return response.data.data;
}

export async function deleteRecorrencia(
  recorrenciaId: string
): Promise<{ deleted: number }> {
  const response = await api.delete(
    `/agendamentos/recorrencia/${recorrenciaId}`
  );
  return response.data.data;
}

export async function countRecorrencia(recorrenciaId: string): Promise<number> {
  const response = await api.get(
    `/agendamentos/recorrencia/${recorrenciaId}/count`
  );
  return response.data.data.count;
}
