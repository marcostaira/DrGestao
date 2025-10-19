// frontend/src/types/procedimento.types.ts

// ============================================================================
// PROCEDIMENTO TYPES
// ============================================================================

export interface Procedimento {
  id: string;
  tenantId: string;
  nome: string;
  valor?: number | null;
  duracaoMinutos: number;
  temStatus: boolean; // NOVO CAMPO
  createdAt: string;
  updatedAt: string;
}

export interface CreateProcedimentoData {
  nome: string;
  valor?: number;
  duracaoMinutos: number;
  temStatus?: boolean; // NOVO CAMPO
}

export interface UpdateProcedimentoData {
  nome?: string;
  valor?: number;
  duracaoMinutos?: number;
  temStatus?: boolean; // NOVO CAMPO
}

export interface ProcedimentoFilters {
  busca?: string;
  comStatus?: boolean; // Filtrar apenas procedimentos com status
  semStatus?: boolean; // Filtrar apenas procedimentos sem status
}

export interface ProcedimentoStatistics {
  total: number;
  comValor: number;
  semValor: number;
  comStatus: number; // NOVO
  semStatus: number; // NOVO
  duracaoMedia: number;
  valorMedio: number;
}

// ============================================================================
// FORM DATA
// ============================================================================

export interface ProcedimentoFormData {
  nome: string;
  valor: string; // String no form, convertido para number
  duracaoMinutos: string; // String no form, convertido para number
  temStatus: boolean; // NOVO CAMPO
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export const formatarValor = (valor?: number | null): string => {
  if (valor === null || valor === undefined) return "Não informado";
  return `R$ ${valor.toFixed(2)}`;
};

export const formatarDuracao = (minutos: number): string => {
  if (minutos < 60) return `${minutos} min`;
  const horas = Math.floor(minutos / 60);
  const mins = minutos % 60;
  if (mins === 0) return `${horas}h`;
  return `${horas}h${mins}min`;
};

export const calcularValorHora = (
  valor: number,
  duracaoMinutos: number
): number => {
  return (valor / duracaoMinutos) * 60;
};

// ============================================================================
// VALIDATION
// ============================================================================

export const validarProcedimento = (
  data: CreateProcedimentoData | UpdateProcedimentoData
): string[] => {
  const errors: string[] = [];

  if ("nome" in data && data.nome !== undefined) {
    if (!data.nome || data.nome.trim().length < 2) {
      errors.push("Nome deve ter pelo menos 2 caracteres");
    }
    if (data.nome.length > 100) {
      errors.push("Nome deve ter no máximo 100 caracteres");
    }
  }

  if ("valor" in data && data.valor !== undefined && data.valor !== null) {
    if (data.valor < 0) {
      errors.push("Valor não pode ser negativo");
    }
  }

  if ("duracaoMinutos" in data && data.duracaoMinutos !== undefined) {
    if (!data.duracaoMinutos || data.duracaoMinutos < 1) {
      errors.push("Duração deve ser de pelo menos 1 minuto");
    }
    if (data.duracaoMinutos > 1440) {
      // 24 horas
      errors.push("Duração não pode ser superior a 24 horas");
    }
  }

  return errors;
};

// ============================================================================
// CONSTANTS
// ============================================================================

export const DURACOES_PADRAO = [
  { label: "15 minutos", value: 15 },
  { label: "30 minutos", value: 30 },
  { label: "45 minutos", value: 45 },
  { label: "1 hora", value: 60 },
  { label: "1h 30min", value: 90 },
  { label: "2 horas", value: 120 },
  { label: "3 horas", value: 180 },
];

export const CATEGORIAS_PROCEDIMENTO = [
  "Consulta",
  "Exame",
  "Cirurgia",
  "Tratamento",
  "Retorno",
  "Avaliação",
  "Outro",
];
