"use client";

import { useState, useEffect, useCallback } from "react";
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

  // Estados para drag and drop
  const [draggedAgendamento, setDraggedAgendamento] =
    useState<Agendamento | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOverSlot, setDragOverSlot] = useState<{
    day: Date;
    hour: number;
  } | null>(null);

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

  // Funções para drag and drop
  const handleDragStart = useCallback(
    (e: React.DragEvent, agendamento: Agendamento) => {
      if (agendamento.status === StatusAgendamento.CANCELADO) {
        e.preventDefault();
        setError("Agendamentos cancelados não podem ser movidos");
        return;
      }

      setDraggedAgendamento(agendamento);
      setIsDragging(true);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", agendamento.id);

      const target = e.currentTarget as HTMLElement;
      target.style.opacity = "0.5";
      target.style.transform = "rotate(2deg)";
    },
    []
  );

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    setDraggedAgendamento(null);
    setIsDragging(false);
    setDragOverSlot(null);

    const target = e.currentTarget as HTMLElement;
    target.style.opacity = "1";
    target.style.transform = "none";
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent, day: Date, hour: number) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      setDragOverSlot({ day, hour });
    },
    []
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverSlot(null);
    }
  }, []);

  const checkTimeConflict = useCallback(
    (
      targetDateTime: Date,
      draggedAg: Agendamento,
      allAgendamentos: Agendamento[]
    ): boolean => {
      const duration = draggedAg.procedimento?.duracaoMinutos || 30;
      const endTime = new Date(targetDateTime.getTime() + duration * 60000);

      return allAgendamentos.some((ag) => {
        if (ag.id === draggedAg.id) return false;
        if (ag.profissionalId !== draggedAg.profissionalId) return false;

        const agDateTime = new Date(ag.dataHora);
        const agDuration = ag.procedimento?.duracaoMinutos || 30;
        const agEndTime = new Date(agDateTime.getTime() + agDuration * 60000);

        return (
          (targetDateTime >= agDateTime && targetDateTime < agEndTime) ||
          (endTime > agDateTime && endTime <= agEndTime) ||
          (targetDateTime <= agDateTime && endTime >= agEndTime)
        );
      });
    },
    []
  );

  const handleDrop = useCallback(
    async (e: React.DragEvent, targetDay: Date, targetHour: number) => {
      e.preventDefault();
      setDragOverSlot(null);

      if (!draggedAgendamento) return;

      try {
        // Criar nova data/hora
        const newDateTime = new Date(targetDay);
        newDateTime.setHours(targetHour, 0, 0, 0);

        // Verificar se é a mesma data/hora
        const originalDateTime = new Date(draggedAgendamento.dataHora);
        if (newDateTime.getTime() === originalDateTime.getTime()) {
          setDraggedAgendamento(null);
          setIsDragging(false);
          return;
        }

        // Validações
        if (targetHour < 7 || targetHour >= 20) {
          setError("Agendamentos só podem ser marcados entre 07:00 e 19:00");
          setDraggedAgendamento(null);
          setIsDragging(false);
          setTimeout(() => setError(""), 3000);
          return;
        }

        if (newDateTime < new Date()) {
          setError("Não é possível agendar para datas/horários passados");
          setDraggedAgendamento(null);
          setIsDragging(false);
          setTimeout(() => setError(""), 3000);
          return;
        }

        if (checkTimeConflict(newDateTime, draggedAgendamento, agendamentos)) {
          setError(
            "Já existe um agendamento neste horário para este profissional"
          );
          setDraggedAgendamento(null);
          setIsDragging(false);
          setTimeout(() => setError(""), 3000);
          return;
        }

        // Atualizar agendamento no backend
        console.log("Atualizando agendamento:", {
          id: draggedAgendamento.id,
          novaDataHora: newDateTime.toISOString(),
          original: draggedAgendamento.dataHora,
        });

        await updateAgendamento(draggedAgendamento.id, {
          dataHora: newDateTime.toISOString(),
        });

        // Feedback de sucesso
        const novaDataFormatada = newDateTime.toLocaleDateString("pt-BR");
        const novoHorarioFormatado = newDateTime.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        setSuccess(
          `Agendamento de ${
            draggedAgendamento.paciente?.nome || "Bloqueio"
          } movido para ${novaDataFormatada} às ${novoHorarioFormatado}`
        );

        // Recarregar agendamentos
        await loadAgendamentos();

        setTimeout(() => setSuccess(""), 4000);
      } catch (err: any) {
        console.error("Erro ao mover agendamento:", err);
        setError(err.response?.data?.error || "Erro ao mover agendamento");
        setTimeout(() => setError(""), 3000);
      } finally {
        setDraggedAgendamento(null);
        setIsDragging(false);
      }
    },
    [draggedAgendamento, agendamentos, checkTimeConflict, loadAgendamentos]
  );

  const isSlotHighlighted = useCallback(
    (day: Date, hour: number): boolean => {
      return (
        dragOverSlot?.day.getTime() === day.getTime() &&
        dragOverSlot?.hour === hour
      );
    },
    [dragOverSlot]
  );

  const canDropInSlot = useCallback(
    (day: Date, hour: number): boolean => {
      if (!draggedAgendamento) return false;

      const targetDateTime = new Date(day);
      targetDateTime.setHours(hour, 0, 0, 0);

      if (hour < 7 || hour >= 20) return false;
      if (targetDateTime < new Date()) return false;

      return !checkTimeConflict(
        targetDateTime,
        draggedAgendamento,
        agendamentos
      );
    },
    [draggedAgendamento, agendamentos, checkTimeConflict]
  );

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

    for (let i = startDay - 1; i >= 0; i--) {
      const day = new Date(year, month, -i);
      days.push({ date: day, isCurrentMonth: false });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

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

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 7; hour < 20; hour++) {
      slots.push(hour);
    }
    return slots;
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
      await loadAgendamentos();

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
      await loadAgendamentos();

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
      await loadAgendamentos();
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

  // Componente de agendamento draggable
  const DraggableAgendamento = ({
    agendamento,
    onClick,
  }: {
    agendamento: Agendamento;
    onClick: (e?: React.MouseEvent) => void;
  }) => (
    <div
      draggable={agendamento.status !== StatusAgendamento.CANCELADO}
      onDragStart={(e) => handleDragStart(e, agendamento)}
      onDragEnd={handleDragEnd}
      onClick={onClick}
      className={`
        p-2 rounded-lg border cursor-pointer hover:shadow-md transition-all duration-200
        ${getStatusColor(agendamento.status)}
        ${
          agendamento.status !== StatusAgendamento.CANCELADO
            ? "cursor-grab active:cursor-grabbing"
            : "cursor-pointer"
        }
        ${
          isDragging && draggedAgendamento?.id === agendamento.id
            ? "opacity-50 transform rotate-2"
            : ""
        }
      `}
      title={
        agendamento.status !== StatusAgendamento.CANCELADO
          ? "Clique e arraste para mover"
          : "Agendamento cancelado"
      }
    >
      <div className="text-xs font-semibold">
        {formatTime(agendamento.dataHora)}
      </div>
      <div className="text-sm font-medium truncate">
        {agendamento.paciente?.nome || "Bloqueio"}
      </div>
      {agendamento.procedimento && (
        <div className="text-xs opacity-75 truncate">
          {agendamento.procedimento.nome}
        </div>
      )}
    </div>
  );

  // Componente de slot de horário que aceita drops
  const DroppableTimeSlot = ({
    day,
    hour,
    agendamentos: slotAgendamentos,
    onAddClick,
  }: {
    day: Date;
    hour: number;
    agendamentos: Agendamento[];
    onAddClick: () => void;
  }) => {
    const isDropTarget = isSlotHighlighted(day, hour);
    const canDrop = canDropInSlot(day, hour);

    return (
      <div
        onDragOver={(e) => handleDragOver(e, day, hour)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, day, hour)}
        onClick={(e) => {
          // Se clicou em área vazia (não em um agendamento), abrir modal
          if (
            e.target === e.currentTarget ||
            (e.target as HTMLElement).classList.contains("time-header")
          ) {
            onAddClick();
          }
        }}
        className={`
          min-h-[80px] p-2 border-b border-gray-100 space-y-1 transition-all duration-200 cursor-pointer
          ${
            isDropTarget
              ? canDrop
                ? "bg-blue-50 border-blue-300 border-2 border-dashed"
                : "bg-red-50 border-red-300 border-2 border-dashed"
              : ""
          }
          hover:bg-gray-50
        `}
        title="Clique para adicionar agendamento"
      >
        <div className="text-xs text-gray-500 font-medium time-header pointer-events-none">
          {hour.toString().padStart(2, "0")}:00
        </div>

        {slotAgendamentos.map((ag) => (
          <DraggableAgendamento
            key={ag.id}
            agendamento={ag}
            onClick={(e) => {
              if (e) e.stopPropagation(); // Impede que o clique no agendamento abra o modal de criação
              setSelectedAgendamento(ag);
              setIsDetailModalOpen(true);
            }}
          />
        ))}

        {/* Preview do agendamento sendo movido */}
        {isDropTarget && draggedAgendamento && (
          <div
            className={`p-2 rounded-lg border-2 border-dashed transition-all pointer-events-none ${
              canDrop
                ? "border-blue-400 bg-blue-100 text-blue-800"
                : "border-red-400 bg-red-100 text-red-800"
            }`}
          >
            <div className="text-xs font-semibold">
              {hour.toString().padStart(2, "0")}:00
            </div>
            <div className="text-sm font-medium truncate">
              {draggedAgendamento.paciente?.nome || "Bloqueio"}
            </div>
            {draggedAgendamento.procedimento && (
              <div className="text-xs opacity-75 truncate">
                {draggedAgendamento.procedimento.nome}
              </div>
            )}
            <div className="text-xs mt-1">
              {canDrop ? "✓ Mover para cá" : "✗ Horário indisponível"}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Visualização semanal com drag and drop
  const WeekViewWithDragDrop = () => {
    const weekDays = getWeekDays();
    const timeSlots = generateTimeSlots();

    return (
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="grid grid-cols-8 border-b bg-gray-50">
          <div className="p-3 text-sm font-medium text-gray-600 border-r">
            Horário
          </div>
          {weekDays.map((day) => {
            const isToday = day.toDateString() === new Date().toDateString();
            return (
              <div
                key={day.toISOString()}
                className={`p-3 text-center border-r ${
                  isToday ? "bg-blue-50" : ""
                }`}
              >
                <div className="text-xs text-gray-500 uppercase">
                  {day.toLocaleDateString("pt-BR", { weekday: "short" })}
                </div>
                <div
                  className={`text-lg font-bold ${
                    isToday ? "text-blue-600" : "text-gray-900"
                  }`}
                >
                  {day.getDate()}
                </div>
                <div className="text-xs text-gray-500">
                  {day.toLocaleDateString("pt-BR", { month: "short" })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-h-[600px] overflow-y-auto">
          {timeSlots.map((hour) => (
            <div
              key={hour}
              className="grid grid-cols-8 border-b border-gray-100"
            >
              <div className="p-3 text-sm font-medium text-gray-600 bg-gray-50 border-r">
                {hour.toString().padStart(2, "0")}:00
              </div>

              {weekDays.map((day) => {
                const slotAgendamentos = agendamentos.filter((ag) => {
                  const agDate = new Date(ag.dataHora);
                  return (
                    agDate.getDate() === day.getDate() &&
                    agDate.getMonth() === day.getMonth() &&
                    agDate.getFullYear() === day.getFullYear() &&
                    agDate.getHours() === hour
                  );
                });

                return (
                  <DroppableTimeSlot
                    key={`${day.toISOString()}-${hour}`}
                    day={day}
                    hour={hour}
                    agendamentos={slotAgendamentos}
                    onAddClick={() => {
                      const newDate = new Date(day);
                      newDate.setHours(hour, 0, 0, 0);
                      handleOpenModal(undefined, newDate);
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const weekDays = getWeekDays();

  return (
    <div className="space-y-6">
      <style jsx>{`
        .dragging {
          opacity: 0.6 !important;
          transform: rotate(2deg) scale(0.95);
          transition: transform 0.2s ease;
          cursor: grabbing !important;
          z-index: 1000;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .drop-target {
          background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.1),
            rgba(147, 197, 253, 0.1)
          ) !important;
          border: 2px dashed rgb(59, 130, 246) !important;
          border-radius: 8px;
          animation: pulse-drop 1.5s infinite;
        }

        .drop-invalid {
          background: linear-gradient(
            135deg,
            rgba(239, 68, 68, 0.1),
            rgba(252, 165, 165, 0.1)
          ) !important;
          border: 2px dashed rgb(239, 68, 68) !important;
          border-radius: 8px;
        }

        @keyframes pulse-drop {
          0%,
          100% {
            border-color: rgb(59, 130, 246);
            background-color: rgba(59, 130, 246, 0.1);
          }
          50% {
            border-color: rgb(147, 197, 253);
            background-color: rgba(59, 130, 246, 0.2);
          }
        }
      `}</style>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Agenda</h1>
          <p className="text-secondary-600 mt-1">
            Gerencie os agendamentos - Arraste para mover horários
          </p>
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
                          <DraggableAgendamento
                            key={ag.id}
                            agendamento={ag}
                            onClick={() => {
                              setSelectedAgendamento(ag);
                              setIsDetailModalOpen(true);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Visualização Semanal com Drag and Drop */}
          {viewMode === "week" && <WeekViewWithDragDrop />}

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
