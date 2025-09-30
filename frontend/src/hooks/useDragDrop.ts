import { useState, useCallback } from "react";
import { Agendamento } from "@/services/agendamentoService";
import { canMoveToSlot } from "@/utils/agendaUtils";

interface DragSlot {
  day: Date;
  hour: number;
  minute: number;
}

export const useDragAndDrop = (
  agendamentos: Agendamento[],
  onDrop: (
    agendamento: Agendamento,
    targetDate: Date,
    hour: number,
    minute: number
  ) => Promise<void>
) => {
  const [draggedAgendamento, setDraggedAgendamento] =
    useState<Agendamento | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOverSlot, setDragOverSlot] = useState<DragSlot | null>(null);

  const handleDragStart = useCallback(
    (e: React.DragEvent, agendamento: Agendamento) => {
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
    (e: React.DragEvent, day: Date, hour: number, minute: number) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      setDragOverSlot({ day, hour, minute });
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

  const handleDrop = useCallback(
    async (
      e: React.DragEvent,
      targetDay: Date,
      hour: number,
      minute: number
    ) => {
      e.preventDefault();
      setDragOverSlot(null);

      if (!draggedAgendamento) return;

      // Criar data local sem conversão UTC
      const newDateTime = new Date(
        targetDay.getFullYear(),
        targetDay.getMonth(),
        targetDay.getDate(),
        hour,
        minute,
        0,
        0
      );

      const originalDateTime = new Date(draggedAgendamento.dataHora);
      if (newDateTime.getTime() === originalDateTime.getTime()) {
        setDraggedAgendamento(null);
        setIsDragging(false);
        return;
      }

      await onDrop(draggedAgendamento, targetDay, hour, minute);
      setDraggedAgendamento(null);
      setIsDragging(false);
    },
    [draggedAgendamento, onDrop]
  );

  const isSlotHighlighted = useCallback(
    (day: Date, hour: number, minute: number): boolean => {
      return (
        dragOverSlot?.day.getTime() === day.getTime() &&
        dragOverSlot?.hour === hour &&
        dragOverSlot?.minute === minute
      );
    },
    [dragOverSlot]
  );

  const canDropInSlot = useCallback(
    (day: Date, hour: number, minute: number): boolean => {
      if (!draggedAgendamento) return false;
      return canMoveToSlot(day, hour, minute, draggedAgendamento, agendamentos);
    },
    [draggedAgendamento, agendamentos]
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
