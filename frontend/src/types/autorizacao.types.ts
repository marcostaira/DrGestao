// ============================================================================
// TYPES - AUTORIZAÇÕES
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

export interface Autorizacao {
  id: string;
  usuarioId: string;
  modulo: Modulo;
  visualizar: boolean;
  criarAlterar: boolean;
  cancelar: boolean; 
  createdAt: string;
  updatedAt: string;
}

export interface AutorizacoesUsuario {
  [key: string]: Permissao;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: "ADMIN" | "SECRETARIA";
  ativo: boolean;
  createdAt: string;
  autorizacoes?: Autorizacao[];
}

export interface UsuarioComAutorizacoes extends Usuario {
  autorizacoes: Autorizacao[];
}

export interface UpdateAutorizacoesPayload {
  autorizacoes: {
    modulo: Modulo;
    visualizar: boolean;
    criarAlterar: boolean;
    cancelar: boolean; 
  }[];
}

export interface MinhasAutorizacoesResponse {
  usuarioId: string;
  tipo: "ADMIN" | "SECRETARIA";
  autorizacoes: AutorizacoesUsuario;
}

// Labels para exibição
export const MODULO_LABELS: Record<Modulo, string> = {
  [Modulo.PACIENTES]: "Pacientes",
  [Modulo.PROFISSIONAIS]: "Profissionais",
  [Modulo.PROCEDIMENTOS]: "Procedimentos",
  [Modulo.AGENDA]: "Agenda",
  [Modulo.ATENDIMENTOS]: "Atendimentos",
  [Modulo.WHATSAPP]: "WhatsApp",
  [Modulo.USUARIOS]: "Usuários",
  [Modulo.RELATORIOS]: "Relatórios",
};

// Ícones para cada módulo
export const MODULO_ICONS: Record<Modulo, string> = {
  [Modulo.PACIENTES]: "👥",
  [Modulo.PROFISSIONAIS]: "👨‍⚕️",
  [Modulo.PROCEDIMENTOS]: "📋",
  [Modulo.AGENDA]: "📅",
  [Modulo.ATENDIMENTOS]: "🏥",
  [Modulo.WHATSAPP]: "💬",
  [Modulo.USUARIOS]: "👤",
  [Modulo.RELATORIOS]: "📊",
};

// Cores para cada módulo
export const MODULO_COLORS: Record<Modulo, string> = {
  [Modulo.PACIENTES]: "blue",
  [Modulo.PROFISSIONAIS]: "green",
  [Modulo.PROCEDIMENTOS]: "purple",
  [Modulo.AGENDA]: "orange",
  [Modulo.ATENDIMENTOS]: "pink",
  [Modulo.WHATSAPP]: "emerald",
  [Modulo.USUARIOS]: "indigo",
  [Modulo.RELATORIOS]: "cyan",
};
