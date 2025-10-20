// backend/src/types/index.ts

import { Request } from "express";
import {
  Atendimento,
  AtendimentoProcedimento,
  StatusAgendamento,
  TipoUsuario,
} from "../../generated/prisma";

// Importar tipos do Prisma Client GERADO (não do @prisma/client)
export { TipoUsuario, StatusAgendamento } from "../../generated/prisma";

// Se TipoLog não existir no schema, defina aqui
export enum TipoLog {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  ERROR = "ERROR",
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

export class AppError extends Error {
  constructor(
    public override message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
}

// ============================================================================
// REQUEST EXTENSIONS
// ============================================================================

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    tenantId: string;
    email: string;
    nome: string;
    tipo: TipoUsuario;
  };
  tenant?: {
    id: string;
    nome: string;
    plano: string;
    ativo: boolean;
  };
  tenantStats?: {
    pacientes: number;
    profissionais: number;
    procedimentos: number;
    agendamentos: number;
    atendimentos: number;
  };
}

// ============================================================================
// JWT & AUTH TYPES
// ============================================================================

export interface JWTPayload {
  userId: string;
  tenantId: string;
  email: string;
  tipo: TipoUsuario;
  iat?: number;
  exp?: number;
}

export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    tenantId: string;
    nome: string;
    email: string;
    tipo: TipoUsuario;
  };
  tenant: {
    id: string;
    nome: string;
    plano: string;
  };
}

// ============================================================================
// TENANT TYPES
// ============================================================================

export interface CreateTenantData {
  nome: string;
  plano?: string;
  adminUser: {
    nome: string;
    email: string;
    senha: string;
  };
}

export interface UpdateTenantData {
  nome?: string;
  plano?: string;
  ativo?: boolean;
}

// ============================================================================
// USER TYPES
// ============================================================================

export interface CreateUserData {
  nome: string;
  email: string;
  senha: string;
  tipo?: TipoUsuario;
}

export interface UpdateUserData {
  nome?: string;
  email?: string;
  senha?: string;
  tipo?: TipoUsuario;
  ativo?: boolean;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: PaginationMeta;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ============================================================================
// DATABASE CONFIG
// ============================================================================

export interface DatabaseConfig {
  url: string;
  maxConnections: number;
  connectionTimeout: number;
}

// ============================================================================
// PACIENTE TYPES
// ============================================================================

export interface CreatePacienteData {
  nome: string;
  cpf?: string;
  dataNascimento?: Date;
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

export interface UpdatePacienteData {
  nome?: string;
  cpf?: string;
  dataNascimento?: Date;
  telefone?: string;
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

export interface PacienteFilters extends PaginationParams {
  profissionalId?: string;
  telefone?: string;
  search?: string;
}

// ============================================================================
// PROFISSIONAL TYPES
// ============================================================================

export interface CreateProfissionalData {
  nome: string;
  especialidade?: string;
  cor?: string;
  observacoes?: string;
}

export interface UpdateProfissionalData {
  nome?: string;
  especialidade?: string;
  cor?: string;
  observacoes?: string;
  ativo?: boolean;
}

// ============================================================================
// PROCEDIMENTO TYPES
// ============================================================================

export interface CreateProcedimentoData {
  nome: string;
  valor?: number;
  duracaoMinutos: number;
  temStatus?: boolean;
}

export interface UpdateProcedimentoData {
  nome?: string;
  valor?: number;
  duracaoMinutos?: number;
  temStatus?: boolean;
}

// ============================================================================
// AGENDAMENTO TYPES
// ============================================================================
export interface RecorrenciaData {
  tipo: "DIARIA" | "SEMANAL" | "MENSAL";
  dataFim: string;
  quantidade: number;
  diasSemana?: number[];
}

export interface CreateAgendamentoData {
  pacienteId?: string;
  profissionalId: string;
  procedimentoId: string;
  dataHora: Date | string;
  observacoes?: string;
  recorrencia?: RecorrenciaData;
}

export interface UpdateAgendamentoData {
  pacienteId?: string;
  profissionalId?: string;
  procedimentoId?: string;
  dataHora?: Date | string;
  status?: StatusAgendamento;
  observacoes?: string;
}

export interface AgendamentoFilters extends PaginationParams {
  profissionalId?: string;
  pacienteId?: string;
  status?: StatusAgendamento;
  dataInicio?: Date | string;
  dataFim?: Date | string;
}

export interface BatchAgendamentoOperation {
  ids: string[];
  operation: "UPDATE" | "DELETE";
  data?: UpdateAgendamentoData;
}

export interface ConflictCheckData {
  profissionalId: string;
  dataHora: Date | string;
  duracaoMinutos: number;
  excludeId?: string;
}

// ============================================================================
// ATENDIMENTO ENUMS
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
// ATENDIMENTO TYPES
// ============================================================================

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
  procedimentosRealizados?: {
    procedimentoId: string;
    observacao?: string;
  }[];
  procedimentosPlano?: CreateProcedimentoPlanoData[];
}

export interface UpdateAtendimentoData {
  anotacoes?: string;
  procedimentosRealizados?: {
    procedimentoId: string;
    observacao?: string;
  }[];
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
  concluidoEm?: Date | string;
}

// ============================================================================
// WHATSAPP TYPES
// ============================================================================

export interface WhatsAppMessage {
  to: string;
  message: string;
}

export interface WhatsAppWebhook {
  from: string;
  message: string;
  timestamp: string;
}

export interface WhatsAppConfig {
  tenantId: string;
  templateConfirmacao: string;
  templateSim: string;
  templateNao: string;
  templateOpcoesInvalidas: string;
  horasAntecedencia: number;
  ativo: boolean;
}

// ============================================================================
// AUTHORIZATION TYPES
// ============================================================================

export enum Modulo {
  PACIENTES = "PACIENTES",
  PROFISSIONAIS = "PROFISSIONAIS",
  PROCEDIMENTOS = "PROCEDIMENTOS",
  AGENDA = "AGENDA",
  ATENDIMENTOS = "ATENDIMENTOS",
  WHATSAPP = "WHATSAPP",
  USUARIOS = "USUARIOS",
  RELATORIOS = "RELATORIOS",
}

export interface Permissao {
  visualizar: boolean;
  criarAlterar: boolean;
  cancelar: boolean;
}

export interface AutorizacaoData {
  modulo: Modulo;
  visualizar: boolean;
  criarAlterar: boolean;
  cancelar: boolean;
}

export interface AutorizacoesUsuario {
  [key: string]: Permissao;
}

export interface CreateAutorizacoesData {
  usuarioId: string;
  autorizacoes: AutorizacaoData[];
}

export interface UpdateAutorizacoesData {
  autorizacoes: AutorizacaoData[];
}

// Extender AuthenticatedRequest para incluir permissões
declare module "./index" {
  interface AuthenticatedRequest {
    permissoes?: AutorizacoesUsuario;
  }
}

// ============================================================================
// FORMULÁRIO TYPES
// ============================================================================

export enum TipoCampoFormulario {
  TEXTO = "TEXTO",
  TEXTO_LONGO = "TEXTO_LONGO",
  NUMERO = "NUMERO",
  DATA = "DATA",
  SELECAO = "SELECAO",
  MULTIPLA_ESCOLHA = "MULTIPLA_ESCOLHA",
  RADIO = "RADIO",
  CHECKBOX = "CHECKBOX",
  EMAIL = "EMAIL",
  TELEFONE = "TELEFONE",
  SIM_NAO = "SIM_NAO",
}

export interface CampoFormulario {
  id: string;
  label: string;
  tipo: TipoCampoFormulario;
  obrigatorio: boolean;
  ordem: number;
  opcoes?: string[];
  placeholder?: string;
  valorPadrao?: any;
  validacao?: {
    min?: number;
    max?: number;
    regex?: string;
    mensagem?: string;
  };
}

export interface CreateFormularioData {
  nome: string;
  descricao?: string;
  profissionalId?: string;
  campos: CampoFormulario[];
  ativo?: boolean;
}

export interface UpdateFormularioData {
  nome?: string;
  descricao?: string;
  profissionalId?: string;
  campos?: CampoFormulario[];
  ativo?: boolean;
}

// ============================================================================
// ANAMNESE TYPES
// ============================================================================

export interface RespostaAnamnese {
  [campoId: string]: any;
}

export interface CreateAnamneseData {
  pacienteId: string;
  formularioId: string;
  atendimentoId?: string;
  respostas: RespostaAnamnese;
  observacoes?: string;
}

export interface UpdateAnamneseData {
  respostas?: RespostaAnamnese;
  observacoes?: string;
}

export interface AnamneseComFormulario {
  id: string;
  pacienteId: string;
  formularioId: string;
  atendimentoId?: string;
  respostas: RespostaAnamnese;
  observacoes?: string;
  createdAt: Date;
  updatedAt: Date;
  formulario: {
    id: string;
    nome: string;
    descricao?: string;
    campos: CampoFormulario[];
  };
  paciente: {
    id: string;
    nome: string;
  };
}

// ============================================================================
// DETALHAMENTO DE ATENDIMENTO
// ============================================================================

export interface RegistroAtendimentoData {
  anotacoes?: string;
  procedimentosRealizados?: {
    procedimentoId: string;
    observacao?: string;
  }[];
  procedimentosPlano?: {
    id?: string; // Se já existe
    procedimentoId: string;
    ordem: number;
    progresso?: ProgressoProcedimento;
    observacoes?: string;
    valorPraticado?: number;
  }[];
}

// ============================================================================
// ATENDIMENTO DETALHADO TYPES
// ============================================================================

export interface AtendimentoDetalhado {
  id: string;
  tenantId: string;
  agendamentoId: string;
  pacienteId: string;
  profissionalId: string;
  procedimentoId?: string;
  tipo: StatusAtendimento;
  statusAprovacao?: StatusAprovacao;
  anotacoes?: string;
  procedimentosRealizados: any[];
  aprovadoEm?: Date;
  aprovadoPor?: string;
  reprovadoEm?: Date;
  reprovadoMotivo?: string;
  avaliacaoId?: string;
  planoTratamentoId?: string;
  cancelado: boolean;
  canceladoEm?: Date;
  createdAt: Date;
  updatedAt: Date;

  // Relações expandidas
  agendamento: {
    id: string;
    dataHora: Date;
    dataHoraFim: Date;
    status: string;
    observacoes?: string;
    paciente: {
      id: string;
      nome: string;
      telefone: string;
      email?: string;
      dataNascimento?: Date;
    } | null;
    profissional: {
      id: string;
      nome: string;
      especialidade?: string;
      cor: string;
    };
    procedimento?: {
      id: string;
      nome: string;
      duracaoMinutos: number;
      valor?: number;
    };
  };

  // Procedimentos do plano (se for AVALIACAO ou PLANO_TRATAMENTO)
  procedimentosPlano?: ProcedimentoPlanoDetalhado[];

  // Prontuário do paciente (histórico de atendimentos)
  prontuario?: ProntuarioAtendimento[];

  // Se for plano de tratamento, trazer a avaliação origem
  avaliacaoOrigem?: {
    id: string;
    createdAt: Date;
    anotacoes?: string;
    statusAprovacao?: StatusAprovacao;
  };
}

export interface ProcedimentoPlanoDetalhado {
  id: string;
  procedimentoId: string;
  ordem: number;
  progresso: ProgressoProcedimento;
  percentualProgresso?: number; // NOVO: 0-100
  agendamentoId?: string;
  observacoes?: string;
  valorPraticado?: number;
  concluidoEm?: Date;
  createdAt: Date;
  updatedAt: Date;

  procedimento: {
    id: string;
    nome: string;
    duracaoMinutos: number;
    valor?: number;
    temStatus: boolean; // NOVO
  };

  agendamento?: {
    id: string;
    dataHora: Date;
    status: string;
  };
}

export interface ProntuarioAtendimento {
  id: string;
  tipo: StatusAtendimento;
  createdAt: Date;
  anotacoes?: string;
  procedimentosRealizados: any[];
  statusAprovacao?: StatusAprovacao;

  procedimentosPlano?: {
    id: string;
    ordem: number;
    progresso: ProgressoProcedimento;
    percentualProgresso?: number;
    procedimento: {
      nome: string;
    };
  }[];
}

export interface UpdateProgressoProcedimentoDataV2 {
  progresso: ProgressoProcedimento;
  percentualProgresso?: number; // NOVO: 0-100
  agendamentoId?: string;
  observacoes?: string;
  concluidoEm?: Date | string;
}
