// frontend/src/components/atendimentos/ProntuarioList.tsx

"use client";

import { useRouter } from "next/navigation";
import { ProntuarioAtendimento } from "@/types/atendimento.types";
import Badge from "@/components/ui/Badge";
import {
  StatusAtendimento,
  StatusAprovacao,
} from "@/services/atendimentoService";
import { ClockIcon } from "@heroicons/react/24/outline";

interface ProntuarioListProps {
  prontuario: ProntuarioAtendimento[];
}

export function ProntuarioList({ prontuario }: ProntuarioListProps) {
  const router = useRouter();

  const getStatusBadge = (tipo: StatusAtendimento) => {
    const variants: Record<StatusAtendimento, any> = {
      [StatusAtendimento.AVULSO]: { variant: "info", label: "Avulso" },
      [StatusAtendimento.AVALIACAO]: { variant: "warning", label: "Avaliação" },
      [StatusAtendimento.PLANO_TRATAMENTO]: {
        variant: "success",
        label: "Plano",
      },
    };
    return variants[tipo];
  };

  return (
    <div className="space-y-3">
      {prontuario.map((item) => {
        const statusInfo = getStatusBadge(item.tipo);

        return (
          <div
            key={item.id}
            onClick={() => router.push(`/dashboard/atendimentos/${item.id}`)}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge variant={statusInfo.variant} size="sm">
                  {statusInfo.label}
                </Badge>
                {item.statusAprovacao && (
                  <Badge
                    variant={
                      item.statusAprovacao === StatusAprovacao.APROVADO
                        ? "success"
                        : item.statusAprovacao === StatusAprovacao.REPROVADO
                        ? "danger"
                        : "warning"
                    }
                    size="sm"
                  >
                    {item.statusAprovacao}
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <ClockIcon className="h-4 w-4 mr-1" />
                {new Date(item.createdAt).toLocaleDateString("pt-BR")}
              </div>
            </div>

            {item.anotacoes && (
              <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                {item.anotacoes}
              </p>
            )}

            {item.procedimentosPlano && item.procedimentosPlano.length > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-600 mb-1">Procedimentos:</p>
                <div className="space-y-1">
                  {item.procedimentosPlano.slice(0, 3).map((proc: any) => (
                    <div
                      key={proc.id}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-gray-700">
                        {proc.procedimento.nome}
                      </span>
                      <Badge
                        variant={
                          proc.progresso === "CONCLUIDO"
                            ? "success"
                            : proc.progresso === "EM_ANDAMENTO"
                            ? "warning"
                            : "default"
                        }
                        size="sm"
                      >
                        {proc.progresso === "CONCLUIDO"
                          ? "Concluído"
                          : proc.progresso === "EM_ANDAMENTO"
                          ? "Em Andamento"
                          : "Não Iniciado"}
                        {proc.percentualProgresso !== null &&
                          proc.percentualProgresso !== undefined && (
                            <span className="ml-1">
                              ({proc.percentualProgresso}%)
                            </span>
                          )}
                      </Badge>
                    </div>
                  ))}
                  {item.procedimentosPlano.length > 3 && (
                    <p className="text-xs text-gray-500 italic">
                      +{item.procedimentosPlano.length - 3} procedimento(s)
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
