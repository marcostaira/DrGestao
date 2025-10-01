import React from "react";
import { Agendamento, StatusAgendamento } from "@/services/agendamentoService";

interface DraggableAgendamentoProps {
  agendamento: Agendamento;
  onClick: (e?: React.MouseEvent) => void;
  onDragStart: (e: React.DragEvent, agendamento: Agendamento) => void;
  onDragEnd: (e: React.DragEvent) => void;
  isDragging: boolean;
  showTime?: boolean;
  isSelected?: boolean;
  onSelect?: (e: React.MouseEvent) => void;
}

const getStatusBorderColor = (status: StatusAgendamento): string => {
  const colors = {
    [StatusAgendamento.MARCADO]: "#F59E0B",
    [StatusAgendamento.CONFIRMADO]: "#10B981",
    [StatusAgendamento.COMPARECEU]: "#3B82F6",
    [StatusAgendamento.FALTOU]: "#EF4444",
    [StatusAgendamento.CANCELADO]: "#6B7280",
  };
  return colors[status] || "#6B7280";
};

export function DraggableAgendamento({
  agendamento,
  onClick,
  onDragStart,
  onDragEnd,
  isDragging,
  showTime = true,
  isSelected = false,
  onSelect,
}: DraggableAgendamentoProps) {
  const profissionalCor = agendamento.profissional?.cor || "#3B82F6";
  const statusCor = getStatusBorderColor(agendamento.status);

  return (
    <div className="relative group">
      {/* Checkbox de seleção */}
      {onSelect && (
        <div
          className="absolute -top-1.5 -left-1.5 z-50 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onSelect(e);
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onDragStart={(e) => e.preventDefault()}
        >
          <label className="flex items-center justify-center w-5 h-5 bg-white rounded border-2 border-gray-300 shadow-md cursor-pointer hover:border-primary-500 transition-colors">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => {}} // Controlled pelo onClick do label
              className="sr-only" // Esconde o checkbox nativo
            />
            {isSelected && (
              <svg
                className="w-3 h-3 text-primary-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </label>
        </div>
      )}

      {/* Card do agendamento */}
      <div
        draggable
        onDragStart={(e) => onDragStart(e, agendamento)}
        onDragEnd={onDragEnd}
        onClick={(e) => {
          e.stopPropagation();
          onClick(e);
        }}
        className={`
          p-1.5 rounded text-xs cursor-grab active:cursor-grabbing 
          hover:shadow-lg transition-all draggable-item mx-1
          ${isSelected ? "ring-2 ring-primary-500 ring-offset-1" : ""}
        `}
        style={{
          backgroundColor: profissionalCor,
          borderLeft: `4px solid ${statusCor}`,
          color: "#ffffff",
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.6)",
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        {showTime && (
          <div className="font-semibold text-[10px] mb-0.5 opacity-95">
            {new Date(agendamento.dataHora).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        )}
        <div className="font-medium truncate leading-tight">
          {agendamento.paciente?.nome || "Bloqueio"}
        </div>
        {agendamento.procedimento && (
          <div className="opacity-90 truncate text-[10px] leading-tight mt-0.5">
            {agendamento.procedimento.nome}
          </div>
        )}
      </div>
    </div>
  );
}
