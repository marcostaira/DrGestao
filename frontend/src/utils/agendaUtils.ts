import { Agendamento, StatusAgendamento } from "@/services/agendamentoService";

export interface TimeSlot {
  hour: number;
  minute: number;
  label: string;
}

/**
 * Gera slots de tempo:
 * - 30 em 30min no horário comercial (8h-18h)
 * - De hora em hora fora do horário comercial (7h-8h e 18h-20h)
 */
export const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];

  // 7h (hora em hora)
  slots.push({ hour: 7, minute: 0, label: "07:00" });

  // 8h às 18h (30 em 30min)
  for (let hour = 8; hour < 18; hour++) {
    slots.push({
      hour,
      minute: 0,
      label: `${hour.toString().padStart(2, "0")}:00`,
    });
    slots.push({
      hour,
      minute: 30,
      label: `${hour.toString().padStart(2, "0")}:30`,
    });
  }

  // 18h às 20h (hora em hora)
  slots.push({ hour: 18, minute: 0, label: "18:00" });
  slots.push({ hour: 19, minute: 0, label: "19:00" });

  return slots;
};

export const getStartOfWeek = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
};

export const getEndOfWeek = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() + (6 - day);
  return new Date(d.setDate(diff));
};

export const getWeekDays = (currentDate: Date): Date[] => {
  const start = getStartOfWeek(currentDate);
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    days.push(day);
  }
  return days;
};

export const getMonthDays = (currentDate: Date) => {
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

export const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
};

export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getAgendamentosForTimeSlot = (
  agendamentos: Agendamento[],
  day: Date,
  hour: number,
  minute: number
): Agendamento[] => {
  return agendamentos.filter((ag) => {
    const agDate = new Date(ag.dataHora);
    return (
      agDate.getDate() === day.getDate() &&
      agDate.getMonth() === day.getMonth() &&
      agDate.getFullYear() === day.getFullYear() &&
      agDate.getHours() === hour &&
      agDate.getMinutes() === minute
    );
  });
};

export const getAgendamentosForDay = (
  agendamentos: Agendamento[],
  day: Date
): Agendamento[] => {
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
      (a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime()
    );
};

export const getStatusColor = (status: StatusAgendamento): string => {
  const colors = {
    [StatusAgendamento.MARCADO]:
      "bg-yellow-100 text-yellow-800 border-yellow-300",
    [StatusAgendamento.CONFIRMADO]:
      "bg-green-100 text-green-800 border-green-300",
    [StatusAgendamento.COMPARECEU]: "bg-blue-100 text-blue-800 border-blue-300",
    [StatusAgendamento.FALTOU]: "bg-red-100 text-red-800 border-red-300",
    [StatusAgendamento.CANCELADO]: "bg-gray-100 text-gray-800 border-gray-300",
  };
  return colors[status] || "";
};

export const getStatusBadge = (
  status: StatusAgendamento
): "warning" | "success" | "info" | "danger" | "default" => {
  const variants = {
    [StatusAgendamento.MARCADO]: "warning",
    [StatusAgendamento.CONFIRMADO]: "success",
    [StatusAgendamento.COMPARECEU]: "info",
    [StatusAgendamento.FALTOU]: "danger",
    [StatusAgendamento.CANCELADO]: "default",
  } as const;
  return variants[status];
};

export const validateTimeSlot = (hour: number, minute: number): boolean => {
  const totalMinutes = hour * 60 + minute;
  return totalMinutes >= 7 * 60 && totalMinutes < 20 * 60;
};

/**
 * Calcula quantos slots de 30min um agendamento ocupa
 */
export const calculateSlotsOccupied = (duracaoMinutos: number): number => {
  return Math.ceil(duracaoMinutos / 30);
};

/**
 * Calcula a altura em pixels baseada na duração
 * Cada slot de 30min = 40px (min-h do DroppableTimeSlot)
 */
export const calculateCardHeight = (duracaoMinutos: number): number => {
  const slots = calculateSlotsOccupied(duracaoMinutos);
  return slots * 40; // 40px por slot
};

/**
 * Verifica se um agendamento deve aparecer neste slot específico
 * (apenas no primeiro slot que ele ocupa)
 */
export const shouldRenderAgendamentoInSlot = (
  agendamento: Agendamento,
  slotHour: number,
  slotMinute: number
): boolean => {
  const agDate = new Date(agendamento.dataHora);
  return agDate.getHours() === slotHour && agDate.getMinutes() === slotMinute;
};

/**
 * Verifica se um slot está ocupado por um agendamento que começou antes
 */
export const isSlotOccupiedByPreviousAgendamento = (
  agendamentos: Agendamento[],
  day: Date,
  slotHour: number,
  slotMinute: number
): boolean => {
  const slotTime = new Date(day);
  slotTime.setHours(slotHour, slotMinute, 0, 0);

  return agendamentos.some((ag) => {
    const agStart = new Date(ag.dataHora);
    const duration = ag.procedimento?.duracaoMinutos || 30;
    const agEnd = new Date(agStart.getTime() + duration * 60000);

    // Slot está entre o início e fim do agendamento, mas não é o slot inicial
    return (
      slotTime > agStart &&
      slotTime < agEnd &&
      !(agStart.getHours() === slotHour && agStart.getMinutes() === slotMinute)
    );
  });
};

/**
 * Retorna apenas os agendamentos que COMEÇAM neste slot
 */
export const getAgendamentosStartingInSlot = (
  agendamentos: Agendamento[],
  day: Date,
  hour: number,
  minute: number
): Agendamento[] => {
  return agendamentos.filter((ag) => {
    const agDate = new Date(ag.dataHora);
    return (
      agDate.getDate() === day.getDate() &&
      agDate.getMonth() === day.getMonth() &&
      agDate.getFullYear() === day.getFullYear() &&
      agDate.getHours() === hour &&
      agDate.getMinutes() === minute
    );
  });
};

export const checkTimeConflict = (
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

    // Verifica sobreposição de horários
    return (
      (targetDateTime >= agDateTime && targetDateTime < agEndTime) ||
      (endTime > agDateTime && endTime <= agEndTime) ||
      (targetDateTime <= agDateTime && endTime >= agEndTime)
    );
  });
};

export const canMoveToSlot = (
  day: Date,
  hour: number,
  minute: number,
  draggedAgendamento: Agendamento,
  allAgendamentos: Agendamento[]
): boolean => {
  if (!validateTimeSlot(hour, minute)) return false;

  const targetDateTime = new Date(day);
  targetDateTime.setHours(hour, minute, 0, 0);

  if (targetDateTime < new Date()) return false;

  // Verifica se tem espaço suficiente para a duração do agendamento
  const duration = draggedAgendamento.procedimento?.duracaoMinutos || 30;
  const endTime = new Date(targetDateTime.getTime() + duration * 60000);

  // Não pode ultrapassar o horário de fechamento (20h)
  if (endTime.getHours() >= 20 && endTime.getMinutes() > 0) return false;

  return !checkTimeConflict(
    targetDateTime,
    draggedAgendamento,
    allAgendamentos
  );
};
