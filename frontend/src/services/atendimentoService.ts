// frontend/src/services/atendimentoService.ts

import api from "@/lib/api";
import {
  Atendimento,
  CreateAtendimentoData,
  UpdateAtendimentoData,
  AtendimentoFilters,
  AprovarAvaliacaoData,
  ReprovarAvaliacaoData,
  UpdateProgressoProcedimentoData,
  ProcedimentoPlano,
  AprovarAvaliacaoResponse,
  StatusAtendimento,
  StatusAprovacao,
  ProgressoProcedimento,
} from "@/types/atendimento.types";

// Exportar os tipos/enums para uso em outros arquivos
export {
  StatusAtendimento,
  StatusAprovacao,
  ProgressoProcedimento,
  type Atendimento,
  type ProcedimentoPlano,
  type CreateAtendimentoData,
  type UpdateAtendimentoData,
  type AtendimentoFilters,
};

// ============================================================================
// CRUD BÁSICO
// ============================================================================

export async function getAtendimentos(
  filters?: AtendimentoFilters
): Promise<Atendimento[]> {
  const params = new URLSearchParams();

  if (filters?.pacienteId) params.append("pacienteId", filters.pacienteId);
  if (filters?.profissionalId)
    params.append("profissionalId", filters.profissionalId);
  if (filters?.tipo) params.append("tipo", filters.tipo);
  if (filters?.statusAprovacao)
    params.append("statusAprovacao", filters.statusAprovacao);
  if (filters?.dataInicio) params.append("dataInicio", filters.dataInicio);
  if (filters?.dataFim) params.append("dataFim", filters.dataFim);
  if (filters?.incluirCancelados)
    params.append("incluirCancelados", String(filters.incluirCancelados));

  const response = await api.get(`/atendimentos?${params.toString()}`);
  return response.data.data || [];
}

export async function getAtendimentoById(id: string): Promise<Atendimento> {
  const response = await api.get(`/atendimentos/${id}`);
  return response.data.data;
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

// ============================================================================
// AVALIAÇÃO E PLANO DE TRATAMENTO
// ============================================================================

/**
 * Aprovar uma avaliação e criar automaticamente o plano de tratamento
 */
export async function aprovarAvaliacao(
  avaliacaoId: string,
  data: AprovarAvaliacaoData
): Promise<AprovarAvaliacaoResponse> {
  const response = await api.post(`/atendimentos/${avaliacaoId}/aprovar`, data);
  return response.data.data;
}

/**
 * Reprovar uma avaliação
 */
export async function reprovarAvaliacao(
  avaliacaoId: string,
  data: ReprovarAvaliacaoData
): Promise<Atendimento> {
  const response = await api.post(
    `/atendimentos/${avaliacaoId}/reprovar`,
    data
  );
  return response.data.data;
}

/**
 * Buscar planos de tratamento de um paciente
 */
export async function getPlanosTratamentoPorPaciente(
  pacienteId: string
): Promise<Atendimento[]> {
  const response = await api.get(
    `/atendimentos/paciente/${pacienteId}/plano-tratamento`
  );
  return response.data.data || [];
}

/**
 * Buscar procedimentos de um plano/avaliação
 */
export async function getProcedimentosPlano(
  atendimentoId: string
): Promise<ProcedimentoPlano[]> {
  const response = await api.get(
    `/atendimentos/${atendimentoId}/procedimentos`
  );
  return response.data.data || [];
}

/**
 * Atualizar progresso de um procedimento do plano
 */
export async function updateProgressoProcedimento(
  procedimentoPlanoId: string,
  data: UpdateProgressoProcedimentoData
): Promise<ProcedimentoPlano> {
  const response = await api.patch(
    `/atendimentos/procedimento/${procedimentoPlanoId}/progresso`,
    data
  );
  return response.data.data;
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Verificar se um atendimento é uma avaliação
 */
export function isAvaliacao(atendimento: Atendimento): boolean {
  return atendimento.tipo === StatusAtendimento.AVALIACAO;
}

/**
 * Verificar se um atendimento é um plano de tratamento
 */
export function isPlanoTratamento(atendimento: Atendimento): boolean {
  return atendimento.tipo === StatusAtendimento.PLANO_TRATAMENTO;
}

/**
 * Verificar se uma avaliação está pendente de aprovação
 */
export function isAvaliacaoPendente(atendimento: Atendimento): boolean {
  return (
    isAvaliacao(atendimento) &&
    atendimento.statusAprovacao === StatusAprovacao.PENDENTE
  );
}

/**
 * Verificar se uma avaliação foi aprovada
 */
export function isAvaliacaoAprovada(atendimento: Atendimento): boolean {
  return (
    isAvaliacao(atendimento) &&
    atendimento.statusAprovacao === StatusAprovacao.APROVADO
  );
}

/**
 * Verificar se uma avaliação foi reprovada
 */
export function isAvaliacaoReprovada(atendimento: Atendimento): boolean {
  return (
    isAvaliacao(atendimento) &&
    atendimento.statusAprovacao === StatusAprovacao.REPROVADO
  );
}

/**
 * Obter label de status de atendimento
 */
export function getStatusAtendimentoLabel(tipo: StatusAtendimento): string {
  const labels = {
    [StatusAtendimento.AVULSO]: "Atendimento Avulso",
    [StatusAtendimento.AVALIACAO]: "Avaliação",
    [StatusAtendimento.PLANO_TRATAMENTO]: "Plano de Tratamento",
  };
  return labels[tipo];
}

/**
 * Obter label de status de aprovação
 */
export function getStatusAprovacaoLabel(
  status: StatusAprovacao | undefined
): string {
  if (!status) return "-";
  const labels = {
    [StatusAprovacao.PENDENTE]: "Pendente",
    [StatusAprovacao.APROVADO]: "Aprovado",
    [StatusAprovacao.REPROVADO]: "Reprovado",
  };
  return labels[status];
}

/**
 * Obter label de progresso de procedimento
 */
export function getProgressoProcedimentoLabel(
  progresso: ProgressoProcedimento
): string {
  const labels = {
    [ProgressoProcedimento.NAO_INICIADO]: "Não Iniciado",
    [ProgressoProcedimento.EM_ANDAMENTO]: "Em Andamento",
    [ProgressoProcedimento.CONCLUIDO]: "Concluído",
  };
  return labels[progresso];
}

/**
 * Obter cor do badge de status de aprovação
 */
export function getStatusAprovacaoColor(
  status: StatusAprovacao | undefined
): string {
  if (!status) return "gray";
  const colors = {
    [StatusAprovacao.PENDENTE]: "yellow",
    [StatusAprovacao.APROVADO]: "green",
    [StatusAprovacao.REPROVADO]: "red",
  };
  return colors[status];
}

/**
 * Obter cor do badge de progresso
 */
export function getProgressoProcedimentoColor(
  progresso: ProgressoProcedimento
): string {
  const colors = {
    [ProgressoProcedimento.NAO_INICIADO]: "gray",
    [ProgressoProcedimento.EM_ANDAMENTO]: "blue",
    [ProgressoProcedimento.CONCLUIDO]: "green",
  };
  return colors[progresso];
}

/**
 * Calcular porcentagem de conclusão do plano
 */
export function calcularProgressoPlano(
  procedimentos: ProcedimentoPlano[]
): number {
  if (procedimentos.length === 0) return 0;

  const concluidos = procedimentos.filter(
    (p) => p.progresso === ProgressoProcedimento.CONCLUIDO
  ).length;

  return Math.round((concluidos / procedimentos.length) * 100);
}

/**
 * Calcular valor total do plano
 */
export function calcularValorTotalPlano(
  procedimentos: ProcedimentoPlano[]
): number {
  return procedimentos.reduce((total, proc) => {
    const valor = proc.valorPraticado || proc.procedimento.valor || 0;
    return total + Number(valor);
  }, 0);
}
