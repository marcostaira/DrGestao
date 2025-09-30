import { useState, useEffect, useCallback } from "react";
import {
  Agendamento,
  StatusAgendamento,
  getAgendamentos,
  createAgendamento,
  updateAgendamento,
  deleteAgendamento,
  updateStatus,
} from "@/services/agendamentoService";
import { getProfissionais, Profissional } from "@/services/profissionalService";
import { getPacientes, Paciente } from "@/services/pacienteService";
import { getProcedimentos, Procedimento } from "@/services/procedimentoService";

export type ViewMode = "day" | "week" | "month";

export interface AgendaFilters {
  profissionalId?: string;
  status?: StatusAgendamento;
}

function getStartOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}

function getEndOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() + (6 - day);
  return new Date(d.setDate(diff));
}

export const useAgenda = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [procedimentos, setProcedimentos] = useState<Procedimento[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAgendamentos, setIsLoadingAgendamentos] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [filters, setFilters] = useState<AgendaFilters>({});

  const clearMessages = useCallback(() => {
    setError("");
    setSuccess("");
  }, []);

  const showError = useCallback((message: string, duration = 3000) => {
    setError(message);
    setTimeout(() => setError(""), duration);
  }, []);

  const showSuccess = useCallback((message: string, duration = 3000) => {
    setSuccess(message);
    setTimeout(() => setSuccess(""), duration);
  }, []);

  const loadAgendamentos = useCallback(async () => {
    try {
      setIsLoadingAgendamentos(true);
      let startDate: Date;
      let endDate: Date;

      if (viewMode === "day") {
        startDate = new Date(currentDate);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(currentDate);
        endDate.setHours(23, 59, 59, 999);
      } else if (viewMode === "week") {
        startDate = getStartOfWeek(currentDate);
        endDate = getEndOfWeek(currentDate);
      } else {
        startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        endDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0,
          23,
          59,
          59
        );
      }

      const queryFilters = {
        dataInicio: startDate.toISOString(),
        dataFim: endDate.toISOString(),
        profissionalId: filters.profissionalId,
        status: filters.status,
      };

      const data = await getAgendamentos(queryFilters);
      setAgendamentos(data);
    } catch (err: any) {
      showError(err.response?.data?.error || "Erro ao carregar agendamentos");
    } finally {
      setIsLoadingAgendamentos(false);
    }
  }, [currentDate, viewMode, filters, showError]);

  const loadInitialData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [profissionaisData, pacientesData, procedimentosData] =
        await Promise.all([
          getProfissionais(),
          getPacientes(),
          getProcedimentos(),
        ]);

      setProfissionais(profissionaisData.filter((p) => p.ativo));
      setPacientes(pacientesData);
      setProcedimentos(procedimentosData);
    } catch (err: any) {
      showError(err.response?.data?.error || "Erro ao carregar dados");
    } finally {
      setIsLoading(false);
    }
  }, [showError]);

  const handleCreateAgendamento = useCallback(
    async (data: any) => {
      try {
        await createAgendamento(data);
        showSuccess("Agendamento criado com sucesso!");
        await loadAgendamentos();
        return true;
      } catch (err: any) {
        showError(err.response?.data?.error || "Erro ao criar agendamento");
        return false;
      }
    },
    [loadAgendamentos, showSuccess, showError]
  );

  const handleUpdateAgendamento = useCallback(
    async (id: string, data: any) => {
      try {
        await updateAgendamento(id, data);
        showSuccess("Agendamento atualizado com sucesso!");
        await loadAgendamentos();
        return true;
      } catch (err: any) {
        showError(err.response?.data?.error || "Erro ao atualizar agendamento");
        return false;
      }
    },
    [loadAgendamentos, showSuccess, showError]
  );

  const handleDeleteAgendamento = useCallback(
    async (id: string) => {
      try {
        await deleteAgendamento(id);
        showSuccess("Agendamento excluído com sucesso!");
        await loadAgendamentos();
        return true;
      } catch (err: any) {
        showError(err.response?.data?.error || "Erro ao excluir agendamento");
        return false;
      }
    },
    [loadAgendamentos, showSuccess, showError]
  );

  const handleUpdateStatus = useCallback(
    async (id: string, status: StatusAgendamento) => {
      try {
        await updateStatus(id, status);
        showSuccess("Status atualizado!", 2000);
        await loadAgendamentos();
        return true;
      } catch (err: any) {
        showError(err.response?.data?.error || "Erro ao atualizar status");
        return false;
      }
    },
    [loadAgendamentos, showSuccess, showError]
  );

  // Carrega dados iniciais apenas uma vez
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Carrega agendamentos quando os dados iniciais estão prontos
  useEffect(() => {
    if (!isLoading) {
      loadAgendamentos();
    }
  }, [isLoading, currentDate, viewMode, filters, loadAgendamentos]);

  return {
    // Data
    agendamentos,
    profissionais,
    pacientes,
    procedimentos,

    // State
    isLoading: isLoading || isLoadingAgendamentos,
    error,
    success,
    currentDate,
    viewMode,
    filters,

    // Actions
    setCurrentDate,
    setViewMode,
    setFilters,
    clearMessages,
    handleCreateAgendamento,
    handleUpdateAgendamento,
    handleDeleteAgendamento,
    handleUpdateStatus,
    loadAgendamentos,
  };
};
