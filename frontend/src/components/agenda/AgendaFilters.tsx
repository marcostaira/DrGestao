import React from "react";
import { StatusAgendamento } from "@/services/agendamentoService";
import { Profissional } from "@/services/profissionalService";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

type ViewMode = "day" | "week" | "month";

interface AgendaFiltersProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  currentDate: Date;
  periodLabel: string;
  onPreviousPeriod: () => void;
  onNextPeriod: () => void;
  onToday: () => void;
  profissionais: Profissional[];
  selectedProfissional: string;
  onProfissionalChange: (id: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

export const AgendaFilters: React.FC<AgendaFiltersProps> = ({
  viewMode,
  onViewModeChange,
  periodLabel,
  onPreviousPeriod,
  onNextPeriod,
  onToday,
  profissionais,
  selectedProfissional,
  onProfissionalChange,
  selectedStatus,
  onStatusChange,
}) => {
  return (
    <Card>
      <div className="flex flex-wrap gap-4 items-center">
        {/* Seletor de Visualização */}
        <div className="flex items-center gap-2 border-r pr-4">
          <Button
            variant={viewMode === "day" ? "primary" : "secondary"}
            size="sm"
            onClick={() => onViewModeChange("day")}
          >
            Dia
          </Button>
          <Button
            variant={viewMode === "week" ? "primary" : "secondary"}
            size="sm"
            onClick={() => onViewModeChange("week")}
          >
            Semana
          </Button>
          <Button
            variant={viewMode === "month" ? "primary" : "secondary"}
            size="sm"
            onClick={() => onViewModeChange("month")}
          >
            Mês
          </Button>
        </div>

        {/* Navegação de Período */}
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={onPreviousPeriod}>
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
          <span className="text-sm font-medium px-4 min-w-[200px] text-center">
            {periodLabel}
          </span>
          <Button variant="secondary" size="sm" onClick={onNextPeriod}>
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

        {/* Filtros */}
        <div className="flex-1 flex gap-4">
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
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Todos os status</option>
            <option value={StatusAgendamento.MARCADO}>Marcado</option>
            <option value={StatusAgendamento.CONFIRMADO}>Confirmado</option>
            <option value={StatusAgendamento.COMPARECEU}>Compareceu</option>
            <option value={StatusAgendamento.FALTOU}>Faltou</option>
            <option value={StatusAgendamento.CANCELADO}>Cancelado</option>
          </select>
        </div>
      </div>
    </Card>
  );
};
