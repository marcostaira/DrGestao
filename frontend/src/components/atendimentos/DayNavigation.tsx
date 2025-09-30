import React from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Profissional } from "@/services/profissionalService";
import { Paciente } from "@/services/pacienteService";

interface DayNavigationProps {
  currentDate: Date;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
  profissionais: Profissional[];
  pacientes: Paciente[];
  selectedProfissional: string;
  selectedPaciente: string;
  onProfissionalChange: (id: string) => void;
  onPacienteChange: (id: string) => void;
}

const formatDateLabel = (date: Date): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);

  if (compareDate.getTime() === today.getTime()) {
    return "Hoje";
  }

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (compareDate.getTime() === yesterday.getTime()) {
    return "Ontem";
  }

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (compareDate.getTime() === tomorrow.getTime()) {
    return "Amanhã";
  }

  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const DayNavigation: React.FC<DayNavigationProps> = ({
  currentDate,
  onPreviousDay,
  onNextDay,
  onToday,
  profissionais,
  pacientes,
  selectedProfissional,
  selectedPaciente,
  onProfissionalChange,
  onPacienteChange,
}) => {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="sm" onClick={onPreviousDay}>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Button>

          <div className="text-center min-w-[280px]">
            <div className="text-lg font-bold text-gray-900 capitalize">
              {formatDateLabel(currentDate)}
            </div>
            <div className="text-sm text-gray-600">
              {currentDate.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </div>
          </div>

          <Button variant="secondary" size="sm" onClick={onNextDay}>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>

          <Button variant="ghost" size="sm" onClick={onToday}>
            Hoje
          </Button>
        </div>

        <div className="flex gap-4">
          <select
            value={selectedProfissional}
            onChange={(e) => onProfissionalChange(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Todos os profissionais</option>
            {profissionais.map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.nome}
              </option>
            ))}
          </select>

          <select
            value={selectedPaciente}
            onChange={(e) => onPacienteChange(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Todos os pacientes</option>
            {pacientes.map((pac) => (
              <option key={pac.id} value={pac.id}>
                {pac.nome}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Card>
  );
};
