import React from "react";
import { Agendamento, StatusAgendamento } from "@/services/agendamentoService";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

interface AgendamentosCanceladosProps {
  agendamentos: Agendamento[];
}

export const AgendamentosCancelados: React.FC<AgendamentosCanceladosProps> = ({
  agendamentos,
}) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const agendamentosCancelados = agendamentos
    .filter((ag) => {
      const agDate = new Date(ag.dataHora);
      return (
        ag.status === StatusAgendamento.CANCELADO && agDate >= sevenDaysAgo
      );
    })
    .sort(
      (a, b) => new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime()
    );

  if (agendamentosCancelados.length === 0) {
    return null;
  }

  return (
    <Card title="Agendamentos Cancelados (Últimos 7 dias)">
      <div className="space-y-3">
        {agendamentosCancelados.map((agendamento) => (
          <div
            key={agendamento.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div
              key={agendamento.id}
              className="flex items-center justify-between p-3 rounded-lg border border-l-4 bg-gray-50"
              style={{
                borderLeftColor: agendamento.profissional.cor,
              }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: agendamento.profissional.cor }}
                  />
                  <span className="font-medium text-gray-900">
                    {agendamento.paciente?.nome || "Sem paciente"}
                  </span>
                  <Badge variant="default">Cancelado</Badge>
                </div>

                <p className="ml-5 text-sm text-gray-600">
                  {new Date(agendamento.dataHora).toLocaleDateString("pt-BR")}{" "}
                  às{" "}
                  {new Date(agendamento.dataHora).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                {agendamento.procedimento && (
                  <p className="ml-5 text-sm text-gray-500">
                    {agendamento.procedimento.nome}
                  </p>
                )}

                {agendamento.observacoes && (
                  <p className="ml-5 text-sm text-gray-500 italic mt-1">
                    {agendamento.observacoes}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {agendamento.profissional.nome}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
