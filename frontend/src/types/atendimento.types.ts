// frontend/src/types/atendimento.ts

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

export interface ProcedimentoRealizado {
  procedimentoId: string;
  nome: string;
  valor?: number;
}

export interface ProcedimentoPlano {
  id: string;
  procedimentoId: string;
  ordem: number;
  progresso: ProgressoProcedimento;
  agendamentoId?: string;
  observacoes?: string;
  valorPraticado?: number;
  concluidoEm?: string;
  procedimento: {
    id: string;
    nome: string;
    valor?: number;
    duracaoMinutos: number;
  };
  agendamento?: {
    id: string;
    dataHora: string;
    profissional: {
      id: string;
      nome: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface Atendimento {
  id: string;
  tenantId: string;
  agendamentoId: string;
  pacienteId: string;
  profissionalId: string;
  procedimentoId?: string;

  // Tipo e Status
  tipo: StatusAtendimento;
  statusAprovacao?: StatusAprovacao;

  // Anotações
  anotacoes?: string;
  procedimentosRealizados: ProcedimentoRealizado[];

  // Aprovação/Reprovação
  aprovadoEm?: string;
  aprovadoPor?: string;
  reprovadoEm?: string;
  reprovadoMotivo?: string;

  // Relacionamento entre Avaliação e Plano
  avaliacaoId?: string;
  planoTratamentoId?: string;

  // Cancelamento
  cancelado: boolean;
  canceladoEm?: string;

  // Relações - ATUALIZADO
  agendamento: {
    id: string;
    dataHora: string;
    paciente?: {
      // ADICIONADO
      id: string;
      nome: string;
      telefone?: string;
    };
    profissional?: {
      // ADICIONADO
      id: string;
      nome: string;
    };
    procedimento?: {
      // ADICIONADO
      nome: string;
    };
  };
  paciente?: {
    // Tornar opcional
    id: string;
    nome: string;
    telefone: string;
  };
  profissional?: {
    // Tornar opcional
    id: string;
    nome: string;
  };
  procedimento?: {
    id: string;
    nome: string;
  };

  // Procedimentos do Plano/Avaliação
  procedimentosPlano?: ProcedimentoPlano[];

  // Avaliação relacionada (se for plano)
  avaliacao?: {
    id: string;
    tipo: StatusAtendimento;
    statusAprovacao?: StatusAprovacao;
    procedimentosPlano?: ProcedimentoPlano[];
    createdAt?: string;
    updatedAt?: string;
  };

  // Planos gerados (se for avaliação)
  planosGerados?: Atendimento[];

  createdAt: string;
  updatedAt: string;
}

export interface CreateProcedimentoPlanoData {
  procedimentoId: string;
  ordem: number;
  observacoes?: string;
  valorPraticado?: number;
}

export interface CreateAtendimentoData {
  agendamentoId: string;
  tipo?: StatusAtendimento;
  anotacoes?: string;
  procedimentosRealizados?: ProcedimentoRealizado[];
  procedimentosPlano?: CreateProcedimentoPlanoData[];
}

export interface UpdateAtendimentoData {
  anotacoes?: string;
  procedimentosRealizados?: ProcedimentoRealizado[];
  procedimentosPlano?: CreateProcedimentoPlanoData[];
}

export interface AprovarAvaliacaoData {
  aprovadoPor: string;
}

export interface ReprovarAvaliacaoData {
  motivo: string;
}

export interface UpdateProgressoProcedimentoData {
  progresso: ProgressoProcedimento;
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

export interface AprovarAvaliacaoResponse {
  avaliacao: Atendimento;
  planoTratamento: Atendimento;
}
