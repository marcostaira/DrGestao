import axios from "axios";
import {
  UsuarioComAutorizacoes,
  UpdateAutorizacoesPayload,
  MinhasAutorizacoesResponse,
} from "../types/autorizacao.types";

// ============================================================================
// AUTORIZACAO SERVICE
// ============================================================================

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Configurar interceptor para adicionar token
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class AutorizacaoService {
  // ==========================================================================
  // BUSCAR MINHAS AUTORIZAÇÕES
  // ==========================================================================

  static async getMinhasAutorizacoes(): Promise<MinhasAutorizacoesResponse> {
    const response = await api.get("/api/autorizacoes/minhas");
    return response.data.data;
  }

  // ==========================================================================
  // LISTAR USUÁRIOS COM AUTORIZAÇÕES (ADMIN)
  // ==========================================================================

  static async listarUsuariosComAutorizacoes(params?: {
    page?: number;
    limit?: number;
    tipo?: "ADMIN" | "SECRETARIA";
    ativo?: boolean;
  }): Promise<{
    usuarios: UsuarioComAutorizacoes[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    const response = await api.get("/api/autorizacoes/usuarios", { params });
    return {
      usuarios: response.data.data,
      meta: response.data.meta,
    };
  }

  // ==========================================================================
  // BUSCAR AUTORIZAÇÕES DE USUÁRIO ESPECÍFICO (ADMIN)
  // ==========================================================================

  static async getAutorizacoesUsuario(usuarioId: string): Promise<{
    usuario: {
      id: string;
      nome: string;
      email: string;
      tipo: "ADMIN" | "SECRETARIA";
    };
    autorizacoes: any[];
  }> {
    const response = await api.get(`/api/autorizacoes/usuarios/${usuarioId}`);
    return response.data.data;
  }

  // ==========================================================================
  // ATUALIZAR AUTORIZAÇÕES (ADMIN)
  // ==========================================================================

  static async atualizarAutorizacoes(
    usuarioId: string,
    payload: UpdateAutorizacoesPayload
  ): Promise<void> {
    await api.put(`/api/autorizacoes/usuarios/${usuarioId}`, payload);
  }

  // ==========================================================================
  // VERIFICAR SE TEM PERMISSÃO
  // ==========================================================================

  static temPermissao(
    autorizacoes: MinhasAutorizacoesResponse | null,
    modulo: string,
    tipo: "visualizar" | "criarAlterar"
  ): boolean {
    if (!autorizacoes) return false;

    // ADMIN sempre tem permissão
    if (autorizacoes.tipo === "ADMIN") return true;

    const permissao = autorizacoes.autorizacoes[modulo];
    return permissao ? permissao[tipo] : false;
  }
}
