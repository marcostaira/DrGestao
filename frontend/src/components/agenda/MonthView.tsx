import React from "react";
import { Agendamento } from "@/services/agendamentoService";
import Card from "@/components/ui/Card";
import {
  getMonthDays,
  getAgendamentosForDay,
  formatTime,
  getStatusColor,
} from "@/utils/agendaUtils";

interface MonthViewProps {
  currentDate: Date;
  agendamentos: Agendamento[];
  onAgendamentoClick: (agendamento: Agendamento) => void;
}

export const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  agendamentos,
  onAgendamentoClick,
}) => {
  const monthDays = getMonthDays(currentDate);

  return (
    <Card>
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
          <div
            key={day}
            className="bg-gray-50 p-2 text-center text-xs font-medium text-gray-600"
          >
            {day}
          </div>
        ))}

        {monthDays.map(({ date, isCurrentMonth }, index) => {
          const dayAgendamentos = getAgendamentosForDay(agendamentos, date);
          const isToday = date.toDateString() === new Date().toDateString();

          return (
            <div
              key={index}
              className={`bg-white p-2 min-h-[90px] ${
                !isCurrentMonth ? "opacity-40" : ""
              } ${isToday ? "ring-2 ring-primary-500" : ""}`}
            >
              <div
                className={`text-sm font-medium mb-1 ${
                  isToday ? "text-primary-600" : "text-gray-900"
                }`}
              >
                {date.getDate()}
              </div>
              <div className="space-y-1">
                {dayAgendamentos.slice(0, 3).map((ag) => (
                  <div
                    key={ag.id}
                    onClick={() => onAgendamentoClick(ag)}
                    className={`text-[10px] p-1 rounded cursor-pointer truncate ${getStatusColor(
                      ag.status
                    )}`}
                  >
                    {formatTime(ag.dataHora)} {ag.paciente?.nome || "Bloqueio"}
                  </div>
                ))}
                {dayAgendamentos.length > 3 && (
                  <div className="text-[10px] text-gray-500">
                    +{dayAgendamentos.length - 3} mais
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
