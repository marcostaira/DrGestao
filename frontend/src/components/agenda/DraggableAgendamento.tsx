import React from "react";
import { Agendamento, StatusAgendamento } from "@/services/agendamentoService";
import { getStatusColor, calculateCardHeight } from "@/utils/agendaUtils";

interface DraggableAgendamentoProps {
  agendamento: Agendamento;
  onClick: (e?: React.MouseEvent) => void;
  onDragStart: (e: React.DragEvent, agendamento: Agendamento) => void;
  onDragEnd: (e: React.DragEvent) => void;
  isDragging?: boolean;
  showTime?: boolean;
}

export const DraggableAgendamento: React.FC<DraggableAgendamentoProps> = ({
  agendamento,
  onClick,
  onDragStart,
  onDragEnd,
  isDragging = false,
  showTime = false,
}) => {
  const canDrag = agendamento.status !== StatusAgendamento.CANCELADO;
  const duracaoMinutos = agendamento.procedimento?.duracaoMinutos || 30;
  const altura = calculateCardHeight(duracaoMinutos);

  return (
    <div
      draggable={canDrag}
      onDragStart={(e) => canDrag && onDragStart(e, agendamento)}
      onDragEnd={onDragEnd}
      onClick={onClick}
      style={{
        height: `${altura - 2}px`,
        minHeight: `${altura - 2}px`,
        zIndex: isDragging ? 1000 : 10,
      }}
      className={`
        absolute top-0 left-0 right-0 mx-1
        p-1.5 rounded border cursor-pointer hover:shadow-md transition-all duration-200 text-xs
        flex flex-col justify-start
        ${getStatusColor(agendamento.status)}
        ${canDrag ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"}
        ${isDragging ? "opacity-50 transform rotate-2" : ""}
      `}
      title={canDrag ? "Clique e arraste para mover" : "Agendamento cancelado"}
    >
      <div className="font-medium truncate leading-tight">
        {agendamento.paciente?.nome || "Bloqueio"}
      </div>
      {agendamento.procedimento && (
        <div className="opacity-75 truncate text-[10px] leading-tight mt-0.5">
          {agendamento.procedimento.nome}
        </div>
      )}
      {duracaoMinutos > 30 && (
        <div className="text-[9px] opacity-60 mt-1">{duracaoMinutos}min</div>
      )}
    </div>
  );
};
