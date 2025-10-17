// frontend/src/types/agendamento-procedimentos.types.ts

export interface ProcedimentoParaAgendar {
  atendimentoProcedimentoId: string;
  procedimentoId: string;
  procedimentoNome: string;
  duracaoMinutos: number;
  valor?: number;
  ordem: number;
  observacoes?: string;
}

export interface ProcedimentoPendente {
  atendimentoProcedimentoId: string;
  procedimentoId: string;
  procedimentoNome: string;
  duracaoMinutos: number;
  valor?: number;
  ordem: number;
  observacoes?: string;
}

export interface DisponibilidadeResponse {
  disponivel: boolean;
  conflitos: number;
}

export interface AgendarProcedimentoPayload {
  avaliacaoId: string;
  procedimentos: Array<{
    atendimentoProcedimentoId: string;
    profissionalId: string;
    dataHora: string;
  }>;
}

export interface AgendamentoProcedimentoResponse {
  id: string;
  procedimento: string;
  profissional: string;
  dataHora: string;
  duracaoMinutos: number;
}
