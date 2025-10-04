import { useState, useEffect } from 'react';
import { AutorizacaoService } from '../services/autorizacaoService';
import {
  UsuarioComAutorizacoes,
  UpdateAutorizacoesPayload,
  MinhasAutorizacoesResponse
} from '../types/autorizacao.types';

// ============================================================================
// HOOK - AUTORIZAÇÕES
// ============================================================================

export function useAutorizacoes() {
  const [usuarios, setUsuarios] = useState<UsuarioComAutorizacoes[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0
  });

  // ==========================================================================
  // CARREGAR USUÁRIOS
  // ==========================================================================
  
  const carregarUsuarios = async (params?: {
    page?: number;
    limit?: number;
    tipo?: 'ADMIN' | 'SECRETARIA';
    ativo?: boolean;
  }) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await AutorizacaoService.listarUsuariosComAutorizacoes(params);
      
      setUsuarios(data.usuarios);
      setMeta(data.meta);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar usuários');
      console.error('Erro ao carregar usuários:', err);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================================
  // ATUALIZAR AUTORIZAÇÕES
  // ==========================================================================
  
  const atualizarAutorizacoes = async (
    usuarioId: string,
    payload: UpdateAutorizacoesPayload
  ) => {
    try {
      setLoading(true);
      setError(null);
      
      await AutorizacaoService.atualizarAutorizacoes(usuarioId, payload);
      
      // Recarregar a lista
      await carregarUsuarios({ page: meta.page, limit: meta.limit });
      
      return { success: true };
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Erro ao atualizar autorizações';
      setError(errorMsg);
      console.error('Erro ao atualizar autorizações:', err);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================================
  // CARREGAR NA MONTAGEM
  // ==========================================================================
  
  useEffect(() => {
    carregarUsuarios();
  }, []);

  return {
    usuarios,
    loading,
    error,
    meta,
    carregarUsuarios,
    atualizarAutorizacoes
  };
}

// ============================================================================
// HOOK - MINHAS AUTORIZAÇÕES
// ============================================================================

export function useMinhasAutorizacoes() {
  const [autorizacoes, setAutorizacoes] = useState<MinhasAutorizacoesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const carregarAutorizacoes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await AutorizacaoService.getMinhasAutorizacoes();
      setAutorizacoes(data);
      
      // Salvar no localStorage para uso offline
      localStorage.setItem('autorizacoes', JSON.stringify(data));
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar autorizações');
      console.error('Erro ao carregar autorizações:', err);
      
      // Tentar carregar do localStorage
      const cached = localStorage.getItem('autorizacoes');
      if (cached) {
        setAutorizacoes(JSON.parse(cached));
      }
    } finally {
      setLoading(false);
    }
  };

  const temPermissao = (modulo: string, tipo: 'visualizar' | 'criarAlterar'): boolean => {
    return AutorizacaoService.temPermissao(autorizacoes, modulo, tipo);
  };

  useEffect(() => {
    carregarAutorizacoes();
  }, []);

  return {
    autorizacoes,
    loading,
    error,
    carregarAutorizacoes,
    temPermissao
  };
}