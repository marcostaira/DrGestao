import React from "react";
import { Agendamento } from "@/services/agendamentoService";
import { DraggableAgendamento } from "./DraggableAgendamento";
import { isSlotOccupiedByPreviousAgendamento } from "@/utils/agendaUtils";

interface DroppableTimeSlotProps {
  day: Date;
  hour: number;
  minute: number;
  agendamentos: Agendamento[];
  allAgendamentos: Agendamento[];
  onAddClick: () => void;
  onAgendamentoClick: (agendamento: Agendamento) => void;
  onDragStart: (e: React.DragEvent, agendamento: Agendamento) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDragOver: (
    e: React.DragEvent,
    day: Date,
    hour: number,
    minute: number
  ) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, day: Date, hour: number, minute: number) => void;
  isHighlighted: boolean;
  canDrop: boolean;
  draggedAgendamento: Agendamento | null;
  showTimeInCards?: boolean;
}

export const DroppableTimeSlot: React.FC<DroppableTimeSlotProps> = ({
  day,
  hour,
  minute,
  agendamentos,
  allAgendamentos,
  onAddClick,
  onAgendamentoClick,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
  isHighlighted,
  canDrop,
  draggedAgendamento,
  showTimeInCards = false,
}) => {
  const isOccupied = isSlotOccupiedByPreviousAgendamento(
    allAgendamentos,
    day,
    hour,
    minute
  );

  return (
    <div
      onDragOver={(e) => onDragOver(e, day, hour, minute)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, day, hour, minute)}
      onClick={(e) => {
        if (
          !isOccupied &&
          (e.target === e.currentTarget ||
            (e.target as HTMLElement).classList.contains("time-header"))
        ) {
          onAddClick();
        }
      }}
      className={`
        h-[40px] min-h-[40px] p-1 border-b border-gray-100 transition-all duration-200 relative
        ${!isOccupied ? "cursor-pointer hover:bg-gray-50" : "bg-gray-50/30"}
        ${
          isHighlighted && !isOccupied
            ? canDrop
              ? "bg-blue-50 border-blue-300 border-2 border-dashed"
              : "bg-red-50 border-red-300 border-2 border-dashed"
            : ""
        }
      `}
      title={isOccupied ? "Ocupado" : "Clique para adicionar agendamento"}
    >
      {/* Renderiza apenas agendamentos que COMEÇAM neste slot */}
      {!isOccupied &&
        agendamentos.map((ag) => (
          <DraggableAgendamento
            key={ag.id}
            agendamento={ag}
            onClick={(e) => {
              if (e) e.stopPropagation();
              onAgendamentoClick(ag);
            }}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            isDragging={draggedAgendamento?.id === ag.id}
            showTime={showTimeInCards}
          />
        ))}

      {/* Preview durante drag */}
      {isHighlighted && draggedAgendamento && !isOccupied && (
        <div
          className={`absolute top-0 left-0 right-0 mx-1 p-1.5 rounded border-2 border-dashed transition-all pointer-events-none text-xs z-50 ${
            canDrop
              ? "border-blue-400 bg-blue-100 text-blue-800"
              : "border-red-400 bg-red-100 text-red-800"
          }`}
        >
          <div className="font-medium truncate leading-tight">
            {draggedAgendamento.paciente?.nome || "Bloqueio"}
          </div>
          {draggedAgendamento.procedimento && (
            <div className="opacity-75 truncate text-[10px] leading-tight">
              {draggedAgendamento.procedimento.nome}
            </div>
          )}
          <div className="text-[10px] mt-0.5">
            {canDrop ? "✓ Mover para cá" : "✗ Horário indisponível"}
          </div>
        </div>
      )}
    </div>
  );
};
