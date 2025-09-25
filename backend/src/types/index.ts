import { Request } from "express";
import { TipoUsuario, StatusAgendamento, TipoLog } from "@prisma/client";

// ============================================================================
// BASE TYPES
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// ============================================================================
// AUTH TYPES
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
}

export interface JWTPayload {
  userId: string;
  tenantId: string;
  email: string;
  nome: string;
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
// PACIENTE TYPES
// ============================================================================

export interface CreatePacienteData {
  nome: string;
  telefone: string;
  email?: string;
  observacoes?: string;
  profissionalId?: string;
}

export interface UpdatePacienteData {
  nome?: string;
  telefone?: string;
  email?: string;
  observacoes?: string;
  profissionalId?: string;
}

export interface PacienteFilters extends PaginationParams {
  profissionalId?: string;
  telefone?: string;
}

// ============================================================================
// PROFISSIONAL TYPES
// ============================================================================

export interface CreateProfissionalData {
  nome: string;
  especialidade?: string;
  observacoes?: string;
}

export interface UpdateProfissionalData {
  nome?: string;
  especialidade?: string;
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
    diasSemana?: number[]; // Para recorrência semanal
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

export interface AtendimentoFilters extends PaginationParams {
  profissionalId?: string;
  pacienteId?: string;
  dataInicio?: Date | string;
  dataFim?: Date | string;
}

// ============================================================================
// WHATSAPP TYPES
// ============================================================================

export interface UpdateWhatsAppConfigData {
  templateConfirmacao?: string;
  templateSim?: string;
  templateNao?: string;
  templateOpcoesInvalidas?: string;
  horasAntecedencia?: number;
  ativo?: boolean;
}

export interface WhatsAppMessage {
  to: string;
  message: string;
}

export interface WhatsAppWebhook {
  from: string;
  message: string;
  messageId?: string;
  timestamp?: string;
}

export interface ConfirmationJob {
  agendamentoId: string;
  pacienteNome: string;
  pacienteTelefone: string;
  dataHora: Date;
  template: string;
}

// ============================================================================
// GOOGLE CALENDAR TYPES
// ============================================================================

export interface GoogleCalendarEvent {
  id?: string;
  summary: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone?: string;
  };
  end: {
    dateTime: string;
    timeZone?: string;
  };
  attendees?: {
    email: string;
    displayName?: string;
  }[];
}

// ============================================================================
// LOG TYPES
// ============================================================================

export interface CreateLogData {
  tipo: TipoLog;
  descricao: string;
  usuarioId?: string;
  metadata?: any;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

// ============================================================================
// VALIDATION TYPES
// ============================================================================

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface ValidationResult {
  isValid: boolean;
  errors?: ValidationError[];
  data?: any;
}

// ============================================================================
// DATABASE TYPES
// ============================================================================

export interface DatabaseConfig {
  url: string;
  maxConnections?: number;
  connectionTimeout?: number;
}

// ============================================================================
// EXPORT ENUMS - LOCAL DEFINITION (SAFE APPROACH)
// ============================================================================

// Definindo enums localmente para garantir compatibilidade
export enum TipoUsuario {
  ADMIN = "ADMIN",
  SECRETARIA = "SECRETARIA",
}

export enum StatusAgendamento {
  MARCADO = "MARCADO",
  CONFIRMADO = "CONFIRMADO",
  COMPARECEU = "COMPARECEU",
  FALTOU = "FALTOU",
  CANCELADO = "CANCELADO",
}

export enum TipoLog {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  AGENDAMENTO_CRIADO = "AGENDAMENTO_CRIADO",
  AGENDAMENTO_ATUALIZADO = "AGENDAMENTO_ATUALIZADO",
  AGENDAMENTO_CANCELADO = "AGENDAMENTO_CANCELADO",
  CONFIRMACAO_ENVIADA = "CONFIRMACAO_ENVIADA",
  CONFIRMACAO_RECEBIDA = "CONFIRMACAO_RECEBIDA",
  SYNC_GOOGLE_CALENDAR = "SYNC_GOOGLE_CALENDAR",
  ERROR = "ERROR",
}
