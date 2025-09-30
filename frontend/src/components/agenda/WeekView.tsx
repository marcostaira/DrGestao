import React from "react";
import { Agendamento } from "@/services/agendamentoService";
import { DroppableTimeSlot } from "./DroppableTimeSlot";
import {
  generateTimeSlots,
  getWeekDays,
  getAgendamentosStartingInSlot,
} from "@/utils/agendaUtils";

interface WeekViewProps {
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
}

export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  agendamentos,
  onAddAgendamento,
  onAgendamentoClick,
  dragHandlers,
}) => {
  const weekDays = getWeekDays(currentDate);
  const timeSlots = generateTimeSlots();

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      {/* Header - sem alterações */}
      <div className="grid grid-cols-8 border-b bg-gray-50 sticky top-0 z-10">
        <div className="p-1.5 text-[10px] font-medium text-gray-600 border-r">
          Horário
        </div>
        {weekDays.map((day) => {
          const isToday = day.toDateString() === new Date().toDateString();
          return (
            <div
              key={day.toISOString()}
              className={`p-1.5 text-center border-r ${
                isToday ? "bg-blue-50" : ""
              }`}
            >
              <div className="text-[9px] text-gray-500 uppercase leading-tight">
                {day.toLocaleDateString("pt-BR", { weekday: "short" })}
              </div>
              <div
                className={`text-sm font-bold leading-tight ${
                  isToday ? "text-blue-600" : "text-gray-900"
                }`}
              >
                {day.getDate()}
              </div>
              <div className="text-[9px] text-gray-500 leading-tight">
                {day.toLocaleDateString("pt-BR", { month: "short" })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid de horários */}
      <div className="max-h-[600px] overflow-y-auto">
        {timeSlots.map((slot) => (
          <div
            key={`${slot.hour}-${slot.minute}`}
            className="grid grid-cols-8 border-b border-gray-50"
          >
            <div className="p-1.5 text-[10px] font-medium text-gray-600 bg-gray-50 border-r flex items-start">
              {slot.label}
            </div>

            {weekDays.map((day) => {
              const slotAgendamentos = getAgendamentosStartingInSlot(
                agendamentos,
                day,
                slot.hour,
                slot.minute
              );

              return (
                <DroppableTimeSlot
                  key={`${day.toISOString()}-${slot.hour}-${slot.minute}`}
                  day={day}
                  hour={slot.hour}
                  minute={slot.minute}
                  agendamentos={slotAgendamentos}
                  allAgendamentos={agendamentos}
                  onAddClick={() => {
                    // Criar data local sem conversão UTC
                    const newDate = new Date(
                      day.getFullYear(),
                      day.getMonth(),
                      day.getDate(),
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
                    day,
                    slot.hour,
                    slot.minute
                  )}
                  canDrop={dragHandlers.canDropInSlot(
                    day,
                    slot.hour,
                    slot.minute
                  )}
                  draggedAgendamento={dragHandlers.draggedAgendamento}
                  showTimeInCards={false}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
