// frontend/src/components/atendimentos/detalhes/AtendimentoProntuario.tsx

"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

interface HistoricoAtendimento {
  id: string;
  tipo: string;
  dataHoraAtendimento: string;
  anotacoes?: string;
  procedimentosPlano: Array<{
    id: string;
    procedimento: {
      nome: string;
    };
  }>;
}

interface AtendimentoProntuarioProps {
  prontuario: HistoricoAtendimento[];
}

const formatDateTime = (date: string) => {
  return new Date(date).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusBadge = (tipo: string) => {
  const badges: Record<string, { color: string; label: string }> = {
    AVULSO: { color: "blue", label: "Avulso" },
    AVALIACAO: { color: "yellow", label: "Avaliação" },
    PLANO_TRATAMENTO: { color: "green", label: "Plano de Tratamento" },
  };
  return badges[tipo] || { color: "gray", label: tipo };
};

export function AtendimentoProntuario({
  prontuario,
}: AtendimentoProntuarioProps) {
  return (
    <Card>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Histórico de Atendimentos (Prontuário)
        </h2>
        <div className="space-y-4">
          {prontuario.map((hist) => {
            const statusHist = getStatusBadge(hist.tipo);
            return (
              <div
                key={hist.id}
                className="border-l-4 border-blue-500 pl-4 py-2"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={statusHist.color as any}>
                      {statusHist.label}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {formatDateTime(hist.dataHoraAtendimento)}
                    </span>
                  </div>
                </div>

                {hist.anotacoes && (
                  <p className="text-sm text-gray-700 mb-2">{hist.anotacoes}</p>
                )}

                {hist.procedimentosPlano &&
                  hist.procedimentosPlano.length > 0 && (
                    <div className="text-sm text-gray-600">
                      <strong>Procedimentos:</strong>
                      <ul className="list-disc list-inside ml-2">
                        {hist.procedimentosPlano.map((p) => (
                          <li key={p.id}>{p.procedimento.nome}</li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
