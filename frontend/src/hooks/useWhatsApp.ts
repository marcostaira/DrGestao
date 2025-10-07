// frontend/src/hooks/useWhatsApp.ts

import { useState, useEffect, useCallback, useRef } from "react";
import { whatsappService } from "../services/whatsapp.service";
import {
  WhatsAppConfig,
  WhatsAppStats,
  WhatsAppTemplates,
} from "../types/whatsapp.types";
import { toast } from "react-hot-toast";

export const useWhatsApp = () => {
  const [config, setConfig] = useState<WhatsAppConfig | null>(null);
  const [stats, setStats] = useState<WhatsAppStats | null>(null);
  const [templates, setTemplates] = useState<WhatsAppTemplates | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Refs para os intervalos
  const statusIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const qrIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasCheckedInitialStatus = useRef(false);

  // Limpar intervalos
  const clearIntervals = useCallback(() => {
    if (statusIntervalRef.current) {
      clearInterval(statusIntervalRef.current);
      statusIntervalRef.current = null;
    }
    if (qrIntervalRef.current) {
      clearInterval(qrIntervalRef.current);
      qrIntervalRef.current = null;
    }
  }, []);

  // Verificar status
  const verificarStatus = useCallback(async () => {
    try {
      console.log("🔍 Chamando verificarStatus...");
      const data = await whatsappService.verificarStatus();

      console.log("📊 Status verificado:", data);

      if (data.status === "CONNECTED") {
        console.log("✅ WhatsApp conectado! Fechando modal...");
        setQrCode(null);
        clearIntervals();

        // Atualizar config e stats
        await fetchConfig();
        await fetchStats();

        // Só mostrar toast se não for a verificação inicial
        if (hasCheckedInitialStatus.current) {
          toast.success("WhatsApp conectado com sucesso! 🎉");
        }
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Erro ao verificar status:", error);
      return false;
    }
  }, [clearIntervals]);

  // Buscar estatísticas
  const fetchStats = useCallback(async () => {
    try {
      const data = await whatsappService.buscarEstatisticas();
      setStats(data);
    } catch (error: any) {
      console.error("Erro ao buscar estatísticas:", error);
    }
  }, []);

  // Buscar configuração
  const fetchConfig = useCallback(async () => {
    try {
      console.log("📥 Buscando configuração...");
      const data = await whatsappService.buscarConfiguracao();
      console.log("📋 Config recebida:", data);
      setConfig(data);

      // Se status for CONNECTED, garantir que o modal está fechado
      if (data?.status === "CONNECTED") {
        setQrCode(null);
        clearIntervals();
      }
      // Se status for CONNECTING e ainda não verificou o status inicial, verificar
      else if (
        data?.status === "CONNECTING" &&
        !hasCheckedInitialStatus.current
      ) {
        console.log(
          "🔄 Status CONNECTING detectado, verificando status real..."
        );
        setTimeout(async () => {
          await verificarStatus();
          hasCheckedInitialStatus.current = true;
        }, 500);
      } else {
        clearIntervals();
      }
    } catch (error: any) {
      console.error("Erro ao buscar configuração:", error);
    }
  }, [clearIntervals, verificarStatus]);

  // Polling de status (verifica a cada 3 segundos)
  const startStatusPolling = useCallback(() => {
    console.log("🔄 Iniciando polling de status...");

    if (statusIntervalRef.current) {
      clearInterval(statusIntervalRef.current);
    }

    statusIntervalRef.current = setInterval(async () => {
      console.log("🔍 Verificando status (polling)...");
      const connected = await verificarStatus();
      if (connected && statusIntervalRef.current) {
        console.log("✅ Conectado! Parando polling...");
        clearInterval(statusIntervalRef.current);
        statusIntervalRef.current = null;
      }
    }, 3000);

    setTimeout(() => {
      if (statusIntervalRef.current) {
        console.log("⏰ Timeout do polling atingido");
        clearInterval(statusIntervalRef.current);
        statusIntervalRef.current = null;
      }
    }, 120000);
  }, [verificarStatus]);

  // Refresh do QR Code a cada 30 segundos
  const startQRCodeRefresh = useCallback((instanceName: string) => {
    console.log("🔄 Iniciando refresh de QR Code...");

    if (qrIntervalRef.current) {
      clearInterval(qrIntervalRef.current);
    }

    qrIntervalRef.current = setInterval(async () => {
      try {
        console.log("🔄 Atualizando QR Code...");
        const response = await whatsappService.buscarNovoQRCode(instanceName);
        if (response.qrCode) {
          setQrCode(response.qrCode);
          console.log("✅ QR Code atualizado");
        }
      } catch (error) {
        console.error("Erro ao atualizar QR Code:", error);
        if (qrIntervalRef.current) {
          clearInterval(qrIntervalRef.current);
          qrIntervalRef.current = null;
        }
      }
    }, 30000);

    setTimeout(() => {
      if (qrIntervalRef.current) {
        console.log("⏰ Timeout do QR refresh atingido");
        clearInterval(qrIntervalRef.current);
        qrIntervalRef.current = null;
      }
    }, 120000);
  }, []);

  // Inicializar conexão
  const inicializarConexao = useCallback(async () => {
    setLoading(true);
    try {
      const response = await whatsappService.inicializarConexao();

      if (response.alreadyConnected) {
        toast.success("WhatsApp já está conectado!");
        await fetchConfig();
        await fetchStats();
      } else if (response.qrCode && response.instanceName) {
        setQrCode(response.qrCode);
        toast.success("QR Code gerado! Escaneie com seu WhatsApp");
        startStatusPolling();
        startQRCodeRefresh(response.instanceName);
      }
    } catch (error: any) {
      console.error("Erro ao inicializar:", error);
      toast.error(error.response?.data?.error || "Erro ao inicializar conexão");
    } finally {
      setLoading(false);
    }
  }, [fetchConfig, fetchStats, startStatusPolling, startQRCodeRefresh]);

  // Cancelar QR Code
  const cancelarQRCode = useCallback(() => {
    console.log("❌ Cancelando QR Code...");
    setQrCode(null);
    clearIntervals();
  }, [clearIntervals]);

  // Buscar templates
  const fetchTemplates = useCallback(async () => {
    try {
      const data = await whatsappService.buscarTemplates();
      setTemplates(data);
    } catch (error: any) {
      console.error("Erro ao buscar templates:", error);
    }
  }, []);

  // Desconectar
  const desconectar = useCallback(async () => {
    setLoading(true);
    try {
      await whatsappService.desconectar();
      setQrCode(null);
      clearIntervals();
      await fetchConfig();
      await fetchStats();
      toast.success("WhatsApp desconectado");
    } catch (error: any) {
      console.error("Erro ao desconectar:", error);
      toast.error(error.response?.data?.error || "Erro ao desconectar");
    } finally {
      setLoading(false);
    }
  }, [fetchConfig, fetchStats, clearIntervals]);

  // Atualizar templates
  const atualizarTemplates = useCallback(
    async (newTemplates: Partial<WhatsAppTemplates>) => {
      setLoading(true);
      try {
        await whatsappService.atualizarTemplates(newTemplates);
        await fetchTemplates();
        toast.success("Templates atualizados com sucesso!");
      } catch (error: any) {
        console.error("Erro ao atualizar templates:", error);
        toast.error(
          error.response?.data?.error || "Erro ao atualizar templates"
        );
      } finally {
        setLoading(false);
      }
    },
    [fetchTemplates]
  );

  // Enviar confirmação
  const enviarConfirmacao = useCallback(
    async (agendamentoId: string) => {
      try {
        await whatsappService.enviarConfirmacao(agendamentoId);
        await fetchStats();
        toast.success("Confirmação enviada para a fila!");
      } catch (error: any) {
        console.error("Erro ao enviar confirmação:", error);
        toast.error(
          error.response?.data?.error || "Erro ao enviar confirmação"
        );
        throw error;
      }
    },
    [fetchStats]
  );

  // Enviar confirmação em lote
  const enviarConfirmacaoEmLote = useCallback(
    async (agendamentoIds: string[]) => {
      try {
        const result = await whatsappService.enviarConfirmacaoEmLote(
          agendamentoIds
        );
        await fetchStats();
        toast.success(
          `${result.enviados} confirmações enviadas! ${result.erros} erros.`
        );
        return result;
      } catch (error: any) {
        console.error("Erro ao enviar confirmações:", error);
        toast.error(
          error.response?.data?.error || "Erro ao enviar confirmações"
        );
        throw error;
      }
    },
    [fetchStats]
  );

  // Ativar/Desativar
  const toggleAtivo = useCallback(
    async (ativo: boolean) => {
      setLoading(true);
      try {
        await whatsappService.ativarDesativar(ativo);
        await fetchConfig();
        toast.success(ativo ? "WhatsApp ativado" : "WhatsApp desativado");
      } catch (error: any) {
        console.error("Erro ao ativar/desativar:", error);
        toast.error(error.response?.data?.error || "Erro ao ativar/desativar");
      } finally {
        setLoading(false);
      }
    },
    [fetchConfig]
  );

  // Refresh geral
  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([fetchConfig(), fetchStats(), fetchTemplates()]);
    } finally {
      setRefreshing(false);
    }
  }, [fetchConfig, fetchStats, fetchTemplates]);

  // Carregar dados iniciais
  useEffect(() => {
    const loadInitialData = async () => {
      console.log("🚀 Carregando dados iniciais...");

      // Buscar config primeiro
      await fetchConfig();
      await fetchStats();
      await fetchTemplates();

      // Após buscar config, verificar o status real se não estiver DISCONNECTED
      if (!hasCheckedInitialStatus.current) {
        console.log("🔍 Verificando status inicial...");
        await verificarStatus();
        hasCheckedInitialStatus.current = true;
      }
    };

    loadInitialData();

    return () => {
      clearIntervals();
    };
  }, []); // Array vazio para executar apenas uma vez

  return {
    config,
    stats,
    templates,
    qrCode,
    loading,
    refreshing,
    inicializarConexao,
    verificarStatus,
    desconectar,
    atualizarTemplates,
    enviarConfirmacao,
    enviarConfirmacaoEmLote,
    toggleAtivo,
    refresh,
    cancelarQRCode,
  };
};
