import { Request } from "express";
import { StatusAgendamento, TipoUsuario } from "../generated/prisma";

// Importar tipos do Prisma Client GERADO (não do @prisma/client)
export { TipoUsuario, StatusAgendamento } from "../generated/prisma";

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
}

export interface UpdateProcedimentoData {
  nome?: string;
  valor?: number;
  duracaoMinutos?: number;
}

// ============================================================================
// AGENDAMENTO TYPES
// ============================================================================

export interface CreateAgendamentoData {
  pacienteId?: string;
  profissionalId: string;
  procedimentoId: string;
  dataHora: Date | string;
  observacoes?: string;
  recorrencia?: {
    tipo: "DIARIO" | "SEMANAL" | "MENSAL";
    quantidade: number;
    diasSemana?: number[];
  };
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
// ATENDIMENTO TYPES
// ============================================================================

export interface CreateAtendimentoData {
  agendamentoId: string;
  anotacoes?: string;
  procedimentosRealizados?: {
    id: string;
    nome: string;
    valor?: number;
    observacoes?: string;
  }[];
}

export interface UpdateAtendimentoData {
  anotacoes?: string;
  procedimentosRealizados?: {
    id: string;
    nome: string;
    valor?: number;
    observacoes?: string;
  }[];
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
