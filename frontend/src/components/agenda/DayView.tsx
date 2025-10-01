import React from "react";
import { Agendamento } from "@/services/agendamentoService";
import { DroppableTimeSlot } from "./DroppableTimeSlot";
import {
  generateTimeSlots,
  getAgendamentosStartingInSlot,
} from "@/utils/agendaUtils";

interface DayViewProps {
  currentDate: Date;
  agendamentos: Agendamento[];
  onAddAgendamento: (date: Date, hour: number, minute: number) => void;
  onAgendamentoClick: (agendamento: Agendamento) => void;
  dragHandlers: {
    draggedAgendamento: Agendamento | null;
    handleDragStart: (e: React.DragEvent, agendamento: Agendamento) => void;
    handleDragEnd: (e: React.DragEvent) => void;
    handleDragOver: (
      e: React.DragEvent,
      day: Date,
      hour: number,
      minute: number
    ) => void;
    handleDragLeave: (e: React.DragEvent) => void;
    handleDrop: (
      e: React.DragEvent,
      day: Date,
      hour: number,
      minute: number
    ) => void;
    isSlotHighlighted: (day: Date, hour: number, minute: number) => boolean;
    canDropInSlot: (day: Date, hour: number, minute: number) => boolean;
  };
  selectedIds?: string[];
  onSelectAgendamento?: (id: string) => void;
}

export const DayView: React.FC<DayViewProps> = ({
  currentDate,
  agendamentos,
  onAddAgendamento,
  onAgendamentoClick,
  dragHandlers,
}) => {
  const timeSlots = generateTimeSlots();

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="max-h-[600px] overflow-y-auto">
        {timeSlots.map((slot) => {
          const slotAgendamentos = getAgendamentosStartingInSlot(
            agendamentos,
            currentDate,
            slot.hour,
            slot.minute
          );

          return (
            <div
              key={`${slot.hour}-${slot.minute}`}
              className="flex border-b border-gray-100"
            >
              <div className="w-16 p-2 text-xs text-gray-600 font-medium bg-gray-50 border-r">
                {slot.label}
              </div>
              <div className="flex-1">
                <DroppableTimeSlot
                  day={currentDate}
                  hour={slot.hour}
                  minute={slot.minute}
                  agendamentos={slotAgendamentos}
                  allAgendamentos={agendamentos}
                  onAddClick={() => {
                    // Criar data local sem conversão UTC
                    const newDate = new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      currentDate.getDate(),
                      slot.hour,
                      slot.minute,
                      0,
                      0
                    );
                    onAddAgendamento(newDate, slot.hour, slot.minute);
                  }}
                  onAgendamentoClick={onAgendamentoClick}
                  onDragStart={dragHandlers.handleDragStart}
                  onDragEnd={dragHandlers.handleDragEnd}
                  onDragOver={dragHandlers.handleDragOver}
                  onDragLeave={dragHandlers.handleDragLeave}
                  onDrop={dragHandlers.handleDrop}
                  isHighlighted={dragHandlers.isSlotHighlighted(
                    currentDate,
                    slot.hour,
                    slot.minute
                  )}
                  canDrop={dragHandlers.canDropInSlot(
                    currentDate,
                    slot.hour,
                    slot.minute
                  )}
                  draggedAgendamento={dragHandlers.draggedAgendamento}
                  showTimeInCards={false}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
