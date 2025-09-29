import { useState, useCallback } from "react";
import { Agendamento, updateAgendamento } from "@/services/agendamentoService";

interface DragDropSlot {
  day: Date;
  hour: number;
}

interface UseDragDropProps {
  agendamentos: Agendamento[];
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  onUpdate: () => Promise<void>;
}

export const useDragDrop = ({
  agendamentos,
  onSuccess,
  onError,
  onUpdate,
}: UseDragDropProps) => {
  const [draggedAgendamento, setDraggedAgendamento] =
    useState<Agendamento | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOverSlot, setDragOverSlot] = useState<DragDropSlot | null>(null);

  const handleDragStart = useCallback(
    (e: React.DragEvent, agendamento: Agendamento) => {
      // Verificar se o agendamento pode ser movido
      if (agendamento.status === "CANCELADO") {
        e.preventDefault();
        onError("Agendamentos cancelados não podem ser movidos");
        return;
      }

      setDraggedAgendamento(agendamento);
      setIsDragging(true);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", agendamento.id);

      // Adicionar classe CSS para feedback visual
      e.currentTarget.classList.add("dragging");
    },
    [onError]
  );

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    setDraggedAgendamento(null);
    setIsDragging(false);
    setDragOverSlot(null);
    e.currentTarget.classList.remove("dragging");
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
    // Verificar se o mouse realmente saiu do elemento
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

        // Verificar sobreposição
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
        // Calcular nova data/hora
        const newDateTime = new Date(targetDay);
        newDateTime.setHours(targetHour, 0, 0, 0);

        // Verificar se é a mesma data/hora
        const originalDateTime = new Date(draggedAgendamento.dataHora);
        if (newDateTime.getTime() === originalDateTime.getTime()) {
          return;
        }

        // Verificar se é horário comercial
        const hour = newDateTime.getHours();
        if (hour < 7 || hour >= 20) {
          onError("Agendamentos só podem ser marcados entre 07:00 e 19:00");
          return;
        }

        // Verificar se não é no passado
        if (newDateTime < new Date()) {
          onError("Não é possível agendar para datas/horários passados");
          return;
        }

        // Verificar conflitos
        if (checkTimeConflict(newDateTime, draggedAgendamento, agendamentos)) {
          onError(
            "Já existe um agendamento neste horário para este profissional"
          );
          return;
        }

        // Atualizar agendamento
        await updateAgendamento(draggedAgendamento.id, {
          dataHora: newDateTime.toISOString(),
        });

        onSuccess(
          `Agendamento de ${
            draggedAgendamento.paciente?.nome || "Bloqueio"
          } movido para ${newDateTime.toLocaleDateString(
            "pt-BR"
          )} às ${newDateTime.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}`
        );
        await onUpdate();
      } catch (err: any) {
        onError(err.response?.data?.error || "Erro ao mover agendamento");
      } finally {
        setDraggedAgendamento(null);
        setIsDragging(false);
      }
    },
    [
      draggedAgendamento,
      agendamentos,
      checkTimeConflict,
      onSuccess,
      onError,
      onUpdate,
    ]
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

      // Verificar horário comercial
      if (hour < 7 || hour >= 20) return false;

      // Verificar se não é no passado
      if (targetDateTime < new Date()) return false;

      // Verificar conflitos
      return !checkTimeConflict(
        targetDateTime,
        draggedAgendamento,
        agendamentos
      );
    },
    [draggedAgendamento, agendamentos, checkTimeConflict]
  );

  return {
    draggedAgendamento,
    isDragging,
    dragOverSlot,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    isSlotHighlighted,
    canDropInSlot,
  };
};
