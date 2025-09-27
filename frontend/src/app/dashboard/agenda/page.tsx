"use client";

import { useState, useEffect } from "react";
import {
  Agendamento,
  StatusAgendamento,
  CreateAgendamentoData,
  UpdateAgendamentoData,
  getAgendamentos,
  createAgendamento,
  updateAgendamento,
  deleteAgendamento,
  updateStatus,
} from "@/services/agendamentoService";
import { getProfissionais, Profissional } from "@/services/profissionalService";
import { getPacientes, Paciente } from "@/services/pacienteService";
import { getProcedimentos, Procedimento } from "@/services/procedimentoService";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import Alert from "@/components/ui/Alert";

export default function AgendaPage() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [procedimentos, setProcedimentos] = useState<Procedimento[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Visualização e filtros
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");
  const [selectedProfissional, setSelectedProfissional] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingAgendamento, setEditingAgendamento] =
    useState<Agendamento | null>(null);
  const [deletingAgendamento, setDeletingAgendamento] =
    useState<Agendamento | null>(null);
  const [selectedAgendamento, setSelectedAgendamento] =
    useState<Agendamento | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [formData, setFormData] = useState<CreateAgendamentoData>({
    pacienteId: "",
    profissionalId: "",
    procedimentoId: "",
    dataHora: "",
    observacoes: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadAgendamentos();
  }, [currentDate, selectedProfissional, selectedStatus, viewMode]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [
        agendamentosData,
        profissionaisData,
        pacientesData,
        procedimentosData,
      ] = await Promise.all([
        getAgendamentos(),
        getProfissionais(),
        getPacientes(),
        getProcedimentos(),
      ]);
      setAgendamentos(agendamentosData);
      setProfissionais(profissionaisData.filter((p) => p.ativo));
      setPacientes(pacientesData);
      setProcedimentos(procedimentosData);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao carregar dados");
    } finally {
      setIsLoading(false);
    }
  };

  const loadAgendamentos = async () => {
    try {
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
        // month
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

      const filters = {
        dataInicio: startDate.toISOString(),
        dataFim: endDate.toISOString(),
        profissionalId: selectedProfissional || undefined,
        status: (selectedStatus as StatusAgendamento) || undefined,
      };

      const data = await getAgendamentos(filters);
      setAgendamentos(data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao carregar agendamentos");
    }
  };

  const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  const getEndOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() + (6 - day);
    return new Date(d.setDate(diff));
  };

  const getWeekDays = () => {
    const start = getStartOfWeek(currentDate);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const previousPeriod = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() - 1);
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const nextPeriod = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() + 1);
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const getPeriodLabel = () => {
    if (viewMode === "day") {
      return currentDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } else if (viewMode === "week") {
      const start = getStartOfWeek(currentDate);
      const end = getEndOfWeek(currentDate);
      return `${start.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
      })} - ${end.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}`;
    } else {
      return currentDate.toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
      });
    }
  };

  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];
    const startDay = firstDay.getDay();

    // Dias do mês anterior
    for (let i = startDay - 1; i >= 0; i--) {
      const day = new Date(year, month, -i);
      days.push({ date: day, isCurrentMonth: false });
    }

    // Dias do mês atual
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    // Completar semana final
    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        days.push({
          date: new Date(year, month + 1, i),
          isCurrentMonth: false,
        });
      }
    }

    return days;
  };

  const getHoursForDay = () => {
    const hours = [];
    for (let i = 7; i <= 20; i++) {
      hours.push(i);
    }
    return hours;
  };

  const handleOpenModal = (agendamento?: Agendamento, dateTime?: Date) => {
    if (agendamento) {
      setEditingAgendamento(agendamento);
      setFormData({
        pacienteId: agendamento.pacienteId || "",
        profissionalId: agendamento.profissionalId,
        procedimentoId: agendamento.procedimentoId || "",
        dataHora: new Date(agendamento.dataHora).toISOString().slice(0, 16),
        observacoes: agendamento.observacoes || "",
      });
    } else {
      setEditingAgendamento(null);
      const defaultDateTime = dateTime || new Date();
      setFormData({
        pacienteId: "",
        profissionalId: profissionais[0]?.id || "",
        procedimentoId: "",
        dataHora: defaultDateTime.toISOString().slice(0, 16),
        observacoes: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAgendamento(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const data = {
        ...formData,
        pacienteId: formData.pacienteId || undefined,
        procedimentoId: formData.procedimentoId || undefined,
        observacoes: formData.observacoes || undefined,
      };

      if (editingAgendamento) {
        await updateAgendamento(editingAgendamento.id, data);
        setSuccess("Agendamento atualizado com sucesso!");
      } else {
        await createAgendamento(data);
        setSuccess("Agendamento criado com sucesso!");
      }

      handleCloseModal();
      await loadAgendamentos(); // Aguarda atualização

      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao salvar agendamento");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingAgendamento) return;

    setIsSubmitting(true);
    try {
      await deleteAgendamento(deletingAgendamento.id);
      setSuccess("Agendamento excluído com sucesso!");
      setIsDeleteModalOpen(false);
      setDeletingAgendamento(null);
      await loadAgendamentos(); // Aguarda atualização

      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao excluir agendamento");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: StatusAgendamento) => {
    try {
      await updateStatus(id, status);
      setSuccess("Status atualizado!");
      await loadAgendamentos(); // Aguarda atualização
      if (selectedAgendamento?.id === id) {
        setSelectedAgendamento({ ...selectedAgendamento, status });
      }
      setTimeout(() => setSuccess(""), 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao atualizar status");
    }
  };

  const getStatusColor = (status: StatusAgendamento) => {
    const colors = {
      [StatusAgendamento.MARCADO]:
        "bg-yellow-100 text-yellow-800 border-yellow-300",
      [StatusAgendamento.CONFIRMADO]:
        "bg-green-100 text-green-800 border-green-300",
      [StatusAgendamento.COMPARECEU]:
        "bg-blue-100 text-blue-800 border-blue-300",
      [StatusAgendamento.FALTOU]: "bg-red-100 text-red-800 border-red-300",
      [StatusAgendamento.CANCELADO]:
        "bg-gray-100 text-gray-800 border-gray-300",
    };
    return colors[status] || "";
  };

  const getStatusBadge = (status: StatusAgendamento) => {
    const variants = {
      [StatusAgendamento.MARCADO]: "warning",
      [StatusAgendamento.CONFIRMADO]: "success",
      [StatusAgendamento.COMPARECEU]: "info",
      [StatusAgendamento.FALTOU]: "danger",
      [StatusAgendamento.CANCELADO]: "default",
    };
    return variants[status] as
      | "warning"
      | "success"
      | "info"
      | "danger"
      | "default";
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  };

  const getAgendamentosForDay = (day: Date) => {
    return agendamentos
      .filter((ag) => {
        const agDate = new Date(ag.dataHora);
        return (
          agDate.getDate() === day.getDate() &&
          agDate.getMonth() === day.getMonth() &&
          agDate.getFullYear() === day.getFullYear()
        );
      })
      .sort(
        (a, b) =>
          new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime()
      );
  };

  const weekDays = getWeekDays();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Agenda</h1>
          <p className="text-secondary-600 mt-1">Gerencie os agendamentos</p>
        </div>

        <Button onClick={() => handleOpenModal()}>
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Novo Agendamento
        </Button>
      </div>

      {error && (
        <Alert type="error" onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert type="success" onClose={() => setSuccess("")}>
          {success}
        </Alert>
      )}

      {/* Filtros */}
      <Card>
        <div className="flex flex-wrap gap-4 items-center">
          {/* Seletor de Visualização */}
          <div className="flex items-center gap-2 border-r pr-4">
            <Button
              variant={viewMode === "day" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setViewMode("day")}
            >
              Dia
            </Button>
            <Button
              variant={viewMode === "week" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setViewMode("week")}
            >
              Semana
            </Button>
            <Button
              variant={viewMode === "month" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setViewMode("month")}
            >
              Mês
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={previousPeriod}>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Button>
            <span className="text-sm font-medium px-4">{getPeriodLabel()}</span>
            <Button variant="secondary" size="sm" onClick={nextPeriod}>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Hoje
            </Button>
          </div>

          <div className="flex-1 flex gap-4">
            <select
              value={selectedProfissional}
              onChange={(e) => setSelectedProfissional(e.target.value)}
              className="px-3 py-1.5 text-sm border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Todos os profissionais</option>
              {profissionais.map((prof) => (
                <option key={prof.id} value={prof.id}>
                  {prof.nome}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 text-sm border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Todos os status</option>
              <option value={StatusAgendamento.MARCADO}>Marcado</option>
              <option value={StatusAgendamento.CONFIRMADO}>Confirmado</option>
              <option value={StatusAgendamento.COMPARECEU}>Compareceu</option>
              <option value={StatusAgendamento.FALTOU}>Faltou</option>
              <option value={StatusAgendamento.CANCELADO}>Cancelado</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Visualizações */}
      {isLoading ? (
        <Card>
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        </Card>
      ) : (
        <>
          {/* Visualização Diária */}
          {viewMode === "day" && (
            <Card>
              <div className="space-y-1">
                {getHoursForDay().map((hour) => {
                  const hourAgendamentos = agendamentos.filter((ag) => {
                    const agDate = new Date(ag.dataHora);
                    return agDate.getHours() === hour;
                  });

                  return (
                    <div
                      key={hour}
                      className="flex border-b border-secondary-100"
                    >
                      <div className="w-20 py-2 text-sm text-secondary-600 font-medium">
                        {hour.toString().padStart(2, "0")}:00
                      </div>
                      <div className="flex-1 min-h-[60px] p-2 space-y-1">
                        {hourAgendamentos.map((ag) => (
                          <div
                            key={ag.id}
                            onClick={() => {
                              setSelectedAgendamento(ag);
                              setIsDetailModalOpen(true);
                            }}
                            className={`p-2 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${getStatusColor(
                              ag.status
                            )}`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-xs font-semibold">
                                  {formatTime(ag.dataHora)}
                                </div>
                                <div className="text-sm font-medium">
                                  {ag.paciente?.nome || "Bloqueio"}
                                </div>
                                {ag.procedimento && (
                                  <div className="text-xs opacity-75">
                                    {ag.procedimento.nome}
                                  </div>
                                )}
                              </div>
                              <Badge
                                variant={getStatusBadge(ag.status)}
                                size="sm"
                              >
                                {ag.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Visualização Semanal */}
          {viewMode === "week" && (
            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((day, index) => {
                const dayAgendamentos = getAgendamentosForDay(day);
                const isToday =
                  day.toDateString() === new Date().toDateString();

                return (
                  <Card
                    key={index}
                    className={`min-h-[400px] ${
                      isToday ? "ring-2 ring-primary-500" : ""
                    }`}
                  >
                    <div className="text-center mb-4">
                      <div className="text-xs text-secondary-500 uppercase">
                        {day.toLocaleDateString("pt-BR", { weekday: "short" })}
                      </div>
                      <div
                        className={`text-lg font-bold ${
                          isToday ? "text-primary-600" : "text-secondary-900"
                        }`}
                      >
                        {day.getDate()}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {dayAgendamentos.map((ag) => (
                        <div
                          key={ag.id}
                          onClick={() => {
                            setSelectedAgendamento(ag);
                            setIsDetailModalOpen(true);
                          }}
                          className={`p-2 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${getStatusColor(
                            ag.status
                          )}`}
                        >
                          <div className="text-xs font-semibold">
                            {formatTime(ag.dataHora)}
                          </div>
                          <div className="text-sm font-medium truncate">
                            {ag.paciente?.nome || "Bloqueio"}
                          </div>
                          {ag.procedimento && (
                            <div className="text-xs opacity-75 truncate">
                              {ag.procedimento.nome}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        const newDate = new Date(day);
                        newDate.setHours(9, 0, 0, 0);
                        handleOpenModal(undefined, newDate);
                      }}
                      className="mt-4 w-full py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      + Adicionar
                    </button>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Visualização Mensal */}
          {viewMode === "month" && (
            <Card>
              <div className="grid grid-cols-7 gap-px bg-secondary-200">
                {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(
                  (day) => (
                    <div
                      key={day}
                      className="bg-secondary-50 p-2 text-center text-xs font-medium text-secondary-600"
                    >
                      {day}
                    </div>
                  )
                )}

                {getMonthDays().map(({ date, isCurrentMonth }, index) => {
                  const dayAgendamentos = getAgendamentosForDay(date);
                  const isToday =
                    date.toDateString() === new Date().toDateString();

                  return (
                    <div
                      key={index}
                      className={`bg-white p-2 min-h-[100px] ${
                        !isCurrentMonth ? "opacity-40" : ""
                      } ${isToday ? "ring-2 ring-primary-500" : ""}`}
                    >
                      <div
                        className={`text-sm font-medium mb-1 ${
                          isToday ? "text-primary-600" : "text-secondary-900"
                        }`}
                      >
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayAgendamentos.slice(0, 3).map((ag) => (
                          <div
                            key={ag.id}
                            onClick={() => {
                              setSelectedAgendamento(ag);
                              setIsDetailModalOpen(true);
                            }}
                            className={`text-xs p-1 rounded cursor-pointer truncate ${getStatusColor(
                              ag.status
                            )}`}
                          >
                            {formatTime(ag.dataHora)}{" "}
                            {ag.paciente?.nome || "Bloqueio"}
                          </div>
                        ))}
                        {dayAgendamentos.length > 3 && (
                          <div className="text-xs text-secondary-500">
                            +{dayAgendamentos.length - 3} mais
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </>
      )}

      {/* Modal Criar/Editar Agendamento */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingAgendamento ? "Editar Agendamento" : "Novo Agendamento"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Paciente{" "}
              <span className="text-xs text-secondary-500">
                (opcional para bloqueio)
              </span>
            </label>
            <select
              value={formData.pacienteId}
              onChange={(e) =>
                setFormData({ ...formData, pacienteId: e.target.value })
              }
              className="block w-full px-3 py-2 border border-secondary-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Sem paciente (bloqueio de horário)</option>
              {pacientes.map((pac) => (
                <option key={pac.id} value={pac.id}>
                  {pac.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Profissional <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.profissionalId}
              onChange={(e) =>
                setFormData({ ...formData, profissionalId: e.target.value })
              }
              className="block w-full px-3 py-2 border border-secondary-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            >
              <option value="">Selecione um profissional</option>
              {profissionais.map((prof) => (
                <option key={prof.id} value={prof.id}>
                  {prof.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Procedimento
            </label>
            <select
              value={formData.procedimentoId}
              onChange={(e) =>
                setFormData({ ...formData, procedimentoId: e.target.value })
              }
              className="block w-full px-3 py-2 border border-secondary-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Selecione um procedimento</option>
              {procedimentos.map((proc) => (
                <option key={proc.id} value={proc.id}>
                  {proc.nome} ({proc.duracaoMinutos}min)
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Data e Hora"
            type="datetime-local"
            value={formData.dataHora}
            onChange={(e) =>
              setFormData({ ...formData, dataHora: e.target.value })
            }
            required
          />

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Observações
            </label>
            <textarea
              value={formData.observacoes}
              onChange={(e) =>
                setFormData({ ...formData, observacoes: e.target.value })
              }
              rows={3}
              className="block w-full px-3 py-2 border border-secondary-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Informações adicionais..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseModal}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {editingAgendamento ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Detalhes do Agendamento */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedAgendamento(null);
        }}
        title="Detalhes do Agendamento"
      >
        {selectedAgendamento && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant={getStatusBadge(selectedAgendamento.status)}>
                {selectedAgendamento.status}
              </Badge>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    handleOpenModal(selectedAgendamento);
                  }}
                  className="text-primary-600 hover:text-primary-800"
                  title="Editar"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setDeletingAgendamento(selectedAgendamento);
                    setIsDetailModalOpen(false);
                    setIsDeleteModalOpen(true);
                  }}
                  className="text-red-600 hover:text-red-800"
                  title="Excluir"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-3 py-4 border-t border-b border-secondary-200">
              <div>
                <span className="text-sm text-secondary-600">Data e Hora:</span>
                <p className="font-medium">
                  {new Date(selectedAgendamento.dataHora).toLocaleString(
                    "pt-BR",
                    {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
              </div>

              <div>
                <span className="text-sm text-secondary-600">Paciente:</span>
                <p className="font-medium">
                  {selectedAgendamento.paciente?.nome || "Bloqueio de horário"}
                </p>
                {selectedAgendamento.paciente && (
                  <p className="text-sm text-secondary-500">
                    {selectedAgendamento.paciente.telefone}
                  </p>
                )}
              </div>

              <div>
                <span className="text-sm text-secondary-600">
                  Profissional:
                </span>
                <p className="font-medium">
                  {selectedAgendamento.profissional.nome}
                </p>
              </div>

              {selectedAgendamento.procedimento && (
                <div>
                  <span className="text-sm text-secondary-600">
                    Procedimento:
                  </span>
                  <p className="font-medium">
                    {selectedAgendamento.procedimento.nome} (
                    {selectedAgendamento.procedimento.duracaoMinutos}min)
                  </p>
                </div>
              )}

              {selectedAgendamento.observacoes && (
                <div>
                  <span className="text-sm text-secondary-600">
                    Observações:
                  </span>
                  <p className="text-sm">{selectedAgendamento.observacoes}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Alterar Status:
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.values(StatusAgendamento).map((status) => (
                  <Button
                    key={status}
                    size="sm"
                    variant={
                      selectedAgendamento.status === status
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() =>
                      handleUpdateStatus(selectedAgendamento.id, status)
                    }
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Confirmar Exclusão */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingAgendamento(null);
        }}
        title="Confirmar Exclusão"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-secondary-600">
            Tem certeza que deseja excluir este agendamento? Esta ação não pode
            ser desfeita.
          </p>

          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeletingAgendamento(null);
              }}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              isLoading={isSubmitting}
            >
              Excluir
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
