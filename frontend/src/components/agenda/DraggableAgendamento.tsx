import React from "react";
import { Agendamento, StatusAgendamento } from "@/services/agendamentoService";

interface DraggableAgendamentoProps {
  agendamento: Agendamento;
  onClick: (e?: React.MouseEvent) => void;
  onDragStart: (e: React.DragEvent, agendamento: Agendamento) => void;
  onDragEnd: (e: React.DragEvent) => void;
  isDragging: boolean;
  showTime?: boolean;
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
}: DraggableAgendamentoProps) {
  const profissionalCor = agendamento.profissional?.cor || "#3B82F6";
  const statusCor = getStatusBorderColor(agendamento.status);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, agendamento)}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className="p-1.5 rounded text-xs cursor-grab active:cursor-grabbing hover:shadow-lg transition-all draggable-item mx-1"
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
  );
}
