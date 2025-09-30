import React from "react";
import { Agendamento, StatusAgendamento } from "@/services/agendamentoService";
import Card from "@/components/ui/Card";
import {
  getMonthDays,
  getAgendamentosForDay,
  formatTime,
} from "@/utils/agendaUtils";

interface MonthViewProps {
  currentDate: Date;
  agendamentos: Agendamento[];
  onAgendamentoClick: (agendamento: Agendamento) => void;
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
              className={`bg-white p-2 min-h-[100px] ${
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
                {dayAgendamentos.slice(0, 3).map((ag, index) => (
                  <div
                    key={ag.id}
                    onClick={() => onAgendamentoClick(ag)}
                    className="text-[10px] p-1.5 rounded cursor-pointer truncate border-l-2 font-medium hover:shadow-md transition-shadow relative"
                    style={{
                      backgroundColor: ag.profissional?.cor || "#3B82F6",
                      borderLeftColor: getStatusBorderColor(ag.status),
                      color: "#ffffff",
                      textShadow: "0 1px 2px rgba(0, 0, 0, 0.6)",
                      marginLeft: index > 0 ? `${index * 4}px` : "0", // Empilha visualmente
                    }}
                  >
                    <div className="truncate">
                      {formatTime(ag.dataHora)}{" "}
                      {ag.paciente?.nome || "Bloqueio"}
                    </div>
                  </div>
                ))}

                {dayAgendamentos.length > 3 && (
                  <div className="text-[10px] text-gray-500 pl-1 font-medium">
                    +{dayAgendamentos.length - 3} mais
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legenda de Status */}
      <div className="mt-4 pt-4 border-t flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-6">
          <span className="font-medium text-gray-700">Borda = Status:</span>
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded border-l-2"
              style={{ borderLeftColor: "#F59E0B" }}
            />
            <span>Marcado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded border-l-2"
              style={{ borderLeftColor: "#10B981" }}
            />
            <span>Confirmado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded border-l-2"
              style={{ borderLeftColor: "#3B82F6" }}
            />
            <span>Compareceu</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded border-l-2"
              style={{ borderLeftColor: "#EF4444" }}
            />
            <span>Faltou</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded border-l-2"
              style={{ borderLeftColor: "#6B7280" }}
            />
            <span>Cancelado</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
