// ============================================================================
// USER & AUTH TYPES
// ============================================================================

export enum TipoUsuario {
  ADMIN = "ADMIN",
  SECRETARIA = "SECRETARIA",
}

export interface User {
  id: string;
  tenantId: string;
  nome: string;
  email: string;
  tipo: TipoUsuario;
}

export interface Tenant {
  id: string;
  nome: string;
  plano: string;
  ativo: boolean;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
  tenant: Tenant;
}

export interface LoginCredentials {
  email: string;
  senha: string;
}

// ============================================================================
// USUARIO CRUD TYPES
// ============================================================================

export interface Usuario {
  id: string;
  tenantId: string;
  nome: string;
  email: string;
  tipo: TipoUsuario;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUsuarioData {
  nome: string;
  email: string;
  senha: string;
  tipo: TipoUsuario;
}

export interface UpdateUsuarioData {
  nome?: string;
  email?: string;
  senha?: string;
  tipo?: TipoUsuario;
  ativo?: boolean;
}

// ============================================================================
// TENANT UPDATE TYPES
// ============================================================================

export interface UpdateTenantData {
  nome?: string;
  plano?: string;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: PaginationMeta;
}
