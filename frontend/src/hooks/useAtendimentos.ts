import { useState, useEffect, useCallback } from "react";
import {
  Atendimento,
  getAtendimentos,
  createAtendimento,
  updateAtendimento,
  deleteAtendimento,
} from "@/services/atendimentoService";
import {
  Agendamento,
  StatusAgendamento,
  getAgendamentos,
  updateStatus,
} from "@/services/agendamentoService";
import { Profissional, getProfissionais } from "@/services/profissionalService";
import { Paciente, getPacientes } from "@/services/pacienteService";
import { Procedimento, getProcedimentos } from "@/services/procedimentoService";

export const useAtendimentos = () => {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [procedimentos, setProcedimentos] = useState<Procedimento[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Navegação por dia
  const [currentDate, setCurrentDate] = useState(new Date());

  // Filtros
  const [selectedProfissional, setSelectedProfissional] = useState("");
  const [selectedPaciente, setSelectedPaciente] = useState("");
  const [agendamentosCancelados, setAgendamentosCancelados] = useState<
    Agendamento[]
  >([]);

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

  const loadInitialData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [profissionaisData, pacientesData, procedimentosData] =
        await Promise.all([
          getProfissionais(),
          getPacientes(),
          getProcedimentos(),
        ]);

      setProfissionais(profissionaisData);
      setPacientes(pacientesData);
      setProcedimentos(procedimentosData);
    } catch (err: any) {
      showError(err.response?.data?.error || "Erro ao carregar dados");
    } finally {
      setIsLoading(false);
    }
  }, [showError]);

  const loadAtendimentosDoDia = useCallback(async () => {
    try {
      const startOfDay = new Date(currentDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(currentDate);
      endOfDay.setHours(23, 59, 59, 999);

      const [atendimentosData, agendamentosData] = await Promise.all([
        getAtendimentos({
          profissionalId: selectedProfissional || undefined,
          pacienteId: selectedPaciente || undefined,
          dataInicio: startOfDay.toISOString(),
          dataFim: endOfDay.toISOString(),
        }),
        getAgendamentos({
          dataInicio: startOfDay.toISOString(),
          dataFim: endOfDay.toISOString(),
          profissionalId: selectedProfissional || undefined,
        }),
      ]);

      setAtendimentos(atendimentosData);
      setAgendamentos(agendamentosData);
    } catch (err: any) {
      showError(err.response?.data?.error || "Erro ao carregar atendimentos");
    }
  }, [currentDate, selectedProfissional, selectedPaciente, showError]);

  const handleCreateAtendimento = useCallback(
    async (data: any) => {
      try {
        await createAtendimento(data);
        showSuccess("Atendimento registrado com sucesso!");
        await loadAtendimentosDoDia();
        return true;
      } catch (err: any) {
        showError(err.response?.data?.error || "Erro ao criar atendimento");
        return false;
      }
    },
    [loadAtendimentosDoDia, showSuccess, showError]
  );

  const handleUpdateAtendimento = useCallback(
    async (id: string, data: any) => {
      try {
        await updateAtendimento(id, data);
        showSuccess("Atendimento atualizado com sucesso!");
        await loadAtendimentosDoDia();
        return true;
      } catch (err: any) {
        showError(err.response?.data?.error || "Erro ao atualizar atendimento");
        return false;
      }
    },
    [loadAtendimentosDoDia, showSuccess, showError]
  );

  const handleDeleteAtendimento = useCallback(
    async (id: string) => {
      try {
        await deleteAtendimento(id);
        showSuccess("Atendimento excluído com sucesso!");
        await loadAtendimentosDoDia();
        return true;
      } catch (err: any) {
        showError(err.response?.data?.error || "Erro ao excluir atendimento");
        return false;
      }
    },
    [loadAtendimentosDoDia, showSuccess, showError]
  );

  const handleUpdateStatus = useCallback(
    async (agendamentoId: string, status: StatusAgendamento) => {
      try {
        await updateStatus(agendamentoId, status);
        showSuccess("Status atualizado!", 2000);
        await loadAtendimentosDoDia();
        return true;
      } catch (err: any) {
        showError(err.response?.data?.error || "Erro ao atualizar status");
        return false;
      }
    },
    [loadAtendimentosDoDia, showSuccess, showError]
  );

  // Navegação por dia
  const previousDay = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  }, [currentDate]);

  const nextDay = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  }, [currentDate]);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  useEffect(() => {
    if (!isLoading) {
      loadAtendimentosDoDia();
    }
  }, [isLoading, currentDate, selectedProfissional, selectedPaciente]);

  const loadAgendamentosCancelados = useCallback(async () => {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      sevenDaysAgo.setHours(0, 0, 0, 0);

      const today = new Date();
      today.setHours(23, 59, 59, 999);

      const cancelados = await getAgendamentos({
        dataInicio: sevenDaysAgo.toISOString(),
        dataFim: today.toISOString(),
        status: StatusAgendamento.CANCELADO,
      });

      setAgendamentosCancelados(cancelados);
    } catch (err: any) {
      console.error("Erro ao carregar cancelados:", err);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      loadAtendimentosDoDia();
      loadAgendamentosCancelados();
    }
  }, [isLoading, currentDate, selectedProfissional, selectedPaciente]);

  return {
    // Data
    atendimentos,
    agendamentos,
    profissionais,
    pacientes,
    procedimentos,

    // State
    isLoading,
    error,
    success,
    currentDate,
    selectedProfissional,
    selectedPaciente,
    agendamentosCancelados,
    // Actions
    setSelectedProfissional,
    setSelectedPaciente,
    clearMessages,
    handleCreateAtendimento,
    handleUpdateAtendimento,
    handleDeleteAtendimento,
    handleUpdateStatus,
    loadAtendimentosDoDia,

    // Navegação
    previousDay,
    nextDay,
    goToToday,
  };
};
