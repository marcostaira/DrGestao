import React from "react";
import { Agendamento } from "@/services/agendamentoService";
import { DraggableAgendamento } from "./DraggableAgendamento";

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

export function DroppableTimeSlot({
  day,
  hour,
  minute,
  agendamentos,
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
  showTimeInCards = true,
}: DroppableTimeSlotProps) {
  const isOccupied = agendamentos.length > 0;

  return (
    <div
      className={`
        relative min-h-[60px] border-r border-gray-100 transition-colors time-slot
        ${!isOccupied ? "cursor-pointer hover:bg-gray-50" : "bg-gray-50/30"}
        ${
          isHighlighted && !isOccupied
            ? canDrop
              ? "bg-blue-50 border-blue-300 border-2 border-dashed"
              : "bg-red-50 border-red-300 border-2 border-dashed"
            : ""
        }
      `}
      onClick={!isOccupied ? onAddClick : undefined}
      onDragOver={(e) => onDragOver(e, day, hour, minute)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, day, hour, minute)}
      title={isOccupied ? "Ocupado" : "Clique para adicionar agendamento"}
    >
      {/* Renderiza agendamentos empilhados */}
      {agendamentos.map((ag, index) => (
        <div
          key={ag.id}
          style={{
            position: "absolute",
            top: 0,
            left: `${index * 8}px`, // Empilha deslocando 8px para direita
            right: 0,
            zIndex: 10 + index, // Cada um fica acima do anterior
          }}
        >
          <DraggableAgendamento
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
        </div>
      ))}

      {/* Contador quando há múltiplos */}
      {agendamentos.length > 1 && (
        <div
          className="absolute bottom-1 right-1 bg-gray-800 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold z-50"
          style={{ pointerEvents: "none" }}
        >
          {agendamentos.length}
        </div>
      )}

      {/* Preview durante drag */}
      {isHighlighted && draggedAgendamento && !isOccupied && (
        <div
          className={`absolute top-0 left-0 right-0 mx-1 p-1.5 rounded border-2 border-dashed transition-all pointer-events-none text-xs z-50 font-medium ${
            canDrop ? "border-blue-400" : "border-red-400"
          }`}
          style={{
            backgroundColor: canDrop
              ? `${draggedAgendamento.profissional?.cor || "#3B82F6"}dd`
              : "#fee2e2",
            color: canDrop ? "#ffffff" : "#991b1b",
            textShadow: canDrop ? "0 1px 2px rgba(0, 0, 0, 0.5)" : "none",
          }}
        >
          <div className="font-medium truncate leading-tight">
            {draggedAgendamento.paciente?.nome || "Bloqueio"}
          </div>
          {draggedAgendamento.procedimento && (
            <div
              className="truncate text-[10px] leading-tight"
              style={{ opacity: 0.9 }}
            >
              {draggedAgendamento.procedimento.nome}
            </div>
          )}
          <div className="text-[10px] mt-0.5 font-semibold">
            {canDrop ? "✓ Mover para cá" : "✗ Horário indisponível"}
          </div>
        </div>
      )}
    </div>
  );
}
