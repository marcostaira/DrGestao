// frontend/src/types/atendimento.types.ts

// ============================================================================
// ENUMS
// ============================================================================

export enum StatusAtendimento {
  AVULSO = "AVULSO",
  AVALIACAO = "AVALIACAO",
  PLANO_TRATAMENTO = "PLANO_TRATAMENTO",
}

export enum StatusAprovacao {
  PENDENTE = "PENDENTE",
  APROVADO = "APROVADO",
  REPROVADO = "REPROVADO",
}

export enum ProgressoProcedimento {
  NAO_INICIADO = "NAO_INICIADO",
  EM_ANDAMENTO = "EM_ANDAMENTO",
  CONCLUIDO = "CONCLUIDO",
}

// ============================================================================
// INTERFACES BÁSICAS
// ============================================================================

export interface Procedimento {
  id: string;
  nome: string;
  valor?: number;
  duracaoMinutos: number;
  temStatus: boolean;
}

export interface Paciente {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  dataNascimento?: string;
}

export interface Profissional {
  id: string;
  nome: string;
  especialidade?: string;
  cor: string;
}

export interface Agendamento {
  id: string;
  dataHora: string;
  dataHoraFim: string;
  status: string;
  observacoes?: string;
  paciente?: Paciente | null;
  profissional: Profissional;
  procedimento?: Procedimento;
}

// ============================================================================
// ATENDIMENTO DETALHADO
// ============================================================================

export interface ProcedimentoPlanoDetalhado {
  id: string;
  procedimentoId: string;
  ordem: number;
  progresso: ProgressoProcedimento;
  percentualProgresso?: number | null;
  agendamentoId?: string | null;
  observacoes?: string | null;
  valorPraticado?: number | null;
  concluidoEm?: string | null;
  createdAt: string;
  updatedAt: string;

  procedimento: {
    id: string;
    nome: string;
    duracaoMinutos: number;
    valor?: number | null;
    temStatus: boolean;
  };

  agendamento?: {
    id: string;
    dataHora: string;
    status: string;
  } | null;
}

export interface ProntuarioAtendimento {
  id: string;
  tipo: StatusAtendimento;
  createdAt: string;
  dataHoraAtendimento: string;
  anotacoes?: string | null;
  procedimentosRealizados: any[];
  statusAprovacao?: StatusAprovacao | null;

  procedimentosPlano?: {
    id: string;
    ordem: number;
    progresso: ProgressoProcedimento;
    percentualProgresso?: number | null;
    procedimento: {
      nome: string;
    };
  }[];
}

export interface AvaliacaoOrigem {
  id: string;
  createdAt: string;
  anotacoes?: string | null;
  statusAprovacao?: StatusAprovacao | null;
}

export interface AtendimentoDetalhado {
  id: string;
  tenantId: string;
  agendamentoId: string;
  pacienteId: string;
  profissionalId: string;
  procedimentoId?: string | null;
  tipo: StatusAtendimento;
  statusAprovacao?: StatusAprovacao | null;
  anotacoes?: string | null;
  procedimentosRealizados: any[];
  aprovadoEm?: string | null;
  aprovadoPor?: string | null;
  reprovadoEm?: string | null;
  reprovadoMotivo?: string | null;
  avaliacaoId?: string | null;
  planoTratamentoId?: string | null;
  cancelado: boolean;
  canceladoEm?: string | null;
  createdAt: string;
  updatedAt: string;

  // Relações expandidas
  agendamento: Agendamento;
  procedimento?: Procedimento | null;

  // Procedimentos do plano (se for AVALIACAO ou PLANO_TRATAMENTO)
  procedimentosPlano?: ProcedimentoPlanoDetalhado[];

  // Prontuário do paciente (histórico de atendimentos)
  prontuario?: ProntuarioAtendimento[];

  // Se for plano de tratamento, trazer a avaliação origem
  avaliacaoOrigem?: AvaliacaoOrigem | null;
}

// ============================================================================
// ATENDIMENTO (VERSÃO SIMPLIFICADA)
// ============================================================================

export interface Atendimento {
  id: string;
  tenantId: string;
  agendamentoId: string;
  pacienteId: string;
  profissionalId: string;
  procedimentoId?: string | null;
  tipo: StatusAtendimento;
  statusAprovacao?: StatusAprovacao | null;
  anotacoes?: string | null;
  procedimentosRealizados: any[];
  aprovadoEm?: string | null;
  aprovadoPor?: string | null;
  reprovadoEm?: string | null;
  reprovadoMotivo?: string | null;
  avaliacaoId?: string | null;
  planoTratamentoId?: string | null;
  cancelado: boolean;
  canceladoEm?: string | null;
  createdAt: string;
  updatedAt: string;

  // Relações
  agendamento?: Agendamento;
  paciente?: Paciente;
  profissional?: Profissional;
  procedimento?: Procedimento | null;
  procedimentosPlano?: ProcedimentoPlanoDetalhado[];

  // ADICIONAR ESTAS LINHAS:
  avaliacao?: {
    id: string;
    tipo: StatusAtendimento;
    statusAprovacao?: StatusAprovacao | null;
    createdAt: string;
    procedimentosPlano?: ProcedimentoPlanoDetalhado[];
  } | null;

  planosGerados?: Atendimento[];
}
// ============================================================================
// DTOs - DATA TRANSFER OBJECTS
// ============================================================================

export interface CreateAtendimentoData {
  agendamentoId: string;
  tipo?: StatusAtendimento;
  anotacoes?: string;
  procedimentosRealizados?: {
    procedimentoId: string;
    observacao?: string;
  }[];
  procedimentosPlano?: {
    procedimentoId: string;
    ordem: number;
    observacoes?: string;
    valorPraticado?: number;
  }[];
}

export interface UpdateAtendimentoData {
  anotacoes?: string;
  procedimentosRealizados?: {
    procedimentoId: string;
    observacao?: string;
  }[];
  procedimentosPlano?: {
    id?: string;
    procedimentoId: string;
    ordem: number;
    progresso?: ProgressoProcedimento;
    observacoes?: string;
    valorPraticado?: number;
  }[];
}

export interface AprovarAvaliacaoData {
  aprovadoPor: string;
}

export interface ReprovarAvaliacaoData {
  motivo: string;
}

export interface UpdateProgressoProcedimentoData {
  progresso: ProgressoProcedimento;
  percentualProgresso?: number;
  agendamentoId?: string;
  observacoes?: string;
  concluidoEm?: string;
}

export interface AtendimentoFilters {
  pacienteId?: string;
  profissionalId?: string;
  tipo?: StatusAtendimento;
  statusAprovacao?: StatusAprovacao;
  dataInicio?: string;
  dataFim?: string;
  incluirCancelados?: boolean;
}

// ============================================================================
// RESPONSE TYPES
// ============================================================================

export interface AprovarAvaliacaoResponse {
  avaliacao: Atendimento;
  planoTratamento: Atendimento;
}

export interface LinkAprovacaoData {
  id: string;
  token: string;
  link: string;
  expiresAt: string;
}

export interface StatusLinkAprovacao {
  linkValido: boolean;
  link?: string;
  expiresAt?: string;
  enviadoWhatsApp?: boolean;
  enviadoEm?: string | null;
}

// ============================================================================
// FORM DATA TYPES
// ============================================================================

export interface AtendimentoFormData {
  agendamentoId: string;
  tipo: StatusAtendimento;
  anotacoes: string;
  procedimentosRealizados: {
    procedimentoId: string;
    observacao: string;
  }[];
}

export interface AvaliacaoFormData {
  agendamentoId: string;
  anotacoes: string;
  procedimentosPlano: {
    procedimentoId: string;
    ordem: number;
    observacoes: string;
    valorPraticado: number;
  }[];
}

// ============================================================================
// HELPER TYPES
// ============================================================================

export type StatusAtendimentoLabel = {
  [key in StatusAtendimento]: string;
};

export type StatusAprovacaoLabel = {
  [key in StatusAprovacao]: string;
};

export type ProgressoProcedimentoLabel = {
  [key in ProgressoProcedimento]: string;
};

// Labels para exibição
export const STATUS_ATENDIMENTO_LABELS: StatusAtendimentoLabel = {
  [StatusAtendimento.AVULSO]: "Atendimento Avulso",
  [StatusAtendimento.AVALIACAO]: "Avaliação",
  [StatusAtendimento.PLANO_TRATAMENTO]: "Plano de Tratamento",
};

export const STATUS_APROVACAO_LABELS: StatusAprovacaoLabel = {
  [StatusAprovacao.PENDENTE]: "Pendente de Aprovação",
  [StatusAprovacao.APROVADO]: "Aprovado",
  [StatusAprovacao.REPROVADO]: "Reprovado",
};

export const PROGRESSO_PROCEDIMENTO_LABELS: ProgressoProcedimentoLabel = {
  [ProgressoProcedimento.NAO_INICIADO]: "Não Iniciado",
  [ProgressoProcedimento.EM_ANDAMENTO]: "Em Andamento",
  [ProgressoProcedimento.CONCLUIDO]: "Concluído",
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export const getStatusAtendimentoBadgeVariant = (
  status: StatusAtendimento
): "info" | "warning" | "success" => {
  const variants: Record<StatusAtendimento, "info" | "warning" | "success"> = {
    [StatusAtendimento.AVULSO]: "info",
    [StatusAtendimento.AVALIACAO]: "warning",
    [StatusAtendimento.PLANO_TRATAMENTO]: "success",
  };
  return variants[status];
};

export const getStatusAprovacaoBadgeVariant = (
  status: StatusAprovacao
): "warning" | "success" | "danger" => {
  const variants: Record<StatusAprovacao, "warning" | "success" | "danger"> = {
    [StatusAprovacao.PENDENTE]: "warning",
    [StatusAprovacao.APROVADO]: "success",
    [StatusAprovacao.REPROVADO]: "danger",
  };
  return variants[status];
};

export const getProgressoProcedimentoBadgeVariant = (
  progresso: ProgressoProcedimento
): "default" | "warning" | "success" => {
  const variants: Record<
    ProgressoProcedimento,
    "default" | "warning" | "success"
  > = {
    [ProgressoProcedimento.NAO_INICIADO]: "default",
    [ProgressoProcedimento.EM_ANDAMENTO]: "warning",
    [ProgressoProcedimento.CONCLUIDO]: "success",
  };
  return variants[progresso];
};

export const calcularValorTotalPlano = (
  procedimentos: ProcedimentoPlanoDetalhado[]
): number => {
  return procedimentos.reduce((total, proc) => {
    const valor = proc.valorPraticado || proc.procedimento.valor || 0;
    return total + Number(valor);
  }, 0);
};

export const calcularProgressoPlano = (
  procedimentos: ProcedimentoPlanoDetalhado[]
): number => {
  if (procedimentos.length === 0) return 0;

  const totalProgresso = procedimentos.reduce((total, proc) => {
    return total + (proc.percentualProgresso || 0);
  }, 0);

  return Math.round(totalProgresso / procedimentos.length);
};

export const contarProcedimentosPorStatus = (
  procedimentos: ProcedimentoPlanoDetalhado[]
) => {
  return {
    naoIniciados: procedimentos.filter(
      (p) => p.progresso === ProgressoProcedimento.NAO_INICIADO
    ).length,
    emAndamento: procedimentos.filter(
      (p) => p.progresso === ProgressoProcedimento.EM_ANDAMENTO
    ).length,
    concluidos: procedimentos.filter(
      (p) => p.progresso === ProgressoProcedimento.CONCLUIDO
    ).length,
  };
};
