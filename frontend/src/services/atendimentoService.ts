import api from "@/lib/api";

export interface ProcedimentoRealizado {
  procedimentoId: string;
  nome: string;
  valor?: number;
}

export interface Atendimento {
  id: string;
  tenantId: string;
  agendamentoId: string;
  pacienteId: string;
  profissionalId: string;
  anotacoes?: string;
  procedimentosRealizados: ProcedimentoRealizado[];
  agendamento: {
    id: string;
    dataHora: string;
  };
  paciente: {
    id: string;
    nome: string;
    telefone: string;
  };
  profissional: {
    id: string;
    nome: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateAtendimentoData {
  agendamentoId: string;
  anotacoes?: string;
  procedimentosRealizados?: ProcedimentoRealizado[];
}

export interface UpdateAtendimentoData {
  anotacoes?: string;
  procedimentosRealizados?: ProcedimentoRealizado[];
}

export interface AtendimentoFilters {
  pacienteId?: string;
  profissionalId?: string;
  dataInicio?: string;
  dataFim?: string;
}

export async function getAtendimentos(
  filters?: AtendimentoFilters
): Promise<Atendimento[]> {
  const params = new URLSearchParams();

  if (filters?.pacienteId) params.append("pacienteId", filters.pacienteId);
  if (filters?.profissionalId)
    params.append("profissionalId", filters.profissionalId);
  if (filters?.dataInicio) params.append("dataInicio", filters.dataInicio);
  if (filters?.dataFim) params.append("dataFim", filters.dataFim);

  const response = await api.get(`/atendimentos?${params.toString()}`);
  return response.data.data || [];
}

export async function getAtendimentoById(id: string): Promise<Atendimento> {
  const response = await api.get(`/atendimentos/${id}`);
  return response.data.data;
}

export interface AtendimentoFilters {
  pacienteId?: string;
  profissionalId?: string;
  dataInicio?: string;
  dataFim?: string;
  incluirCancelados?: boolean; // ADICIONAR ESTA LINHA
}

export async function getAtendimentoByAgendamentoId(
  agendamentoId: string
): Promise<Atendimento | null> {
  try {
    const response = await api.get(
      `/atendimentos/agendamento/${agendamentoId}`
    );
    return response.data.data;
  } catch (err: any) {
    if (err.response?.status === 404) return null;
    throw err;
  }
}

export async function createAtendimento(
  data: CreateAtendimentoData
): Promise<Atendimento> {
  const response = await api.post("/atendimentos", data);
  return response.data.data;
}

export async function updateAtendimento(
  id: string,
  data: UpdateAtendimentoData
): Promise<Atendimento> {
  const response = await api.put(`/atendimentos/${id}`, data);
  return response.data.data;
}

export async function deleteAtendimento(id: string): Promise<void> {
  await api.delete(`/atendimentos/${id}`);
}

export async function cancelAtendimento(id: string): Promise<Atendimento> {
  const response = await api.patch(`/atendimentos/${id}/cancel`);
  return response.data.data;
}
