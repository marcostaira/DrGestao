import React from "react";
import { Agendamento } from "@/services/agendamentoService";
import { DraggableAgendamento } from "./DraggableAgendamento";

interface AgendamentoCardProps {
  agendamento: Agendamento;
  onClick: (agendamento: Agendamento) => void;
  onDragStart: (e: React.DragEvent, agendamento: Agendamento) => void;
  onDragEnd: (e: React.DragEvent) => void;
  showTime?: boolean;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

export const AgendamentoCard: React.FC<AgendamentoCardProps> = ({
  agendamento,
  onClick,
  onDragStart,
  onDragEnd,
  showTime = true,
  isSelected = false,
  onSelect,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    onDragStart(e, agendamento);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setIsDragging(false);
    onDragEnd(e);
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect(agendamento.id);
    }
  };

  return (
    <DraggableAgendamento
      agendamento={agendamento}
      onClick={() => onClick(agendamento)}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      isDragging={isDragging}
      showTime={showTime}
      isSelected={isSelected}
      onSelect={onSelect ? handleSelect : undefined}
    />
  );
};
