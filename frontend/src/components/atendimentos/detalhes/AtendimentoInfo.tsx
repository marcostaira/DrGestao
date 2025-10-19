// frontend/src/components/atendimentos/detalhes/AtendimentoInfo.tsx

"use client";

import {
  UserIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import Card from "@/components/ui/Card";

interface AtendimentoInfoProps {
  paciente: {
    nome: string;
    telefone: string;
    email?: string;
  };
  profissional: {
    nome: string;
    especialidade?: string;
  };
  dataHora: string;
  procedimento?: {
    nome: string;
    valor?: number;
  };
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

const formatCurrency = (value: any) => {
  if (!value) return "0,00";
  return Number(value).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export function AtendimentoInfo({
  paciente,
  profissional,
  dataHora,
  procedimento,
}: AtendimentoInfoProps) {
  return (
    <Card>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Informações do Paciente
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <UserIcon className="h-4 w-4 mr-1" />
              Paciente
            </div>
            <p className="font-medium text-gray-900">{paciente.nome}</p>
            <p className="text-sm text-gray-600">{paciente.telefone}</p>
            {paciente.email && (
              <p className="text-sm text-gray-600">{paciente.email}</p>
            )}
          </div>

          <div>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <UserIcon className="h-4 w-4 mr-1" />
              Profissional
            </div>
            <p className="font-medium text-gray-900">{profissional.nome}</p>
            {profissional.especialidade && (
              <p className="text-sm text-gray-600">
                {profissional.especialidade}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <CalendarIcon className="h-4 w-4 mr-1" />
              Data/Hora
            </div>
            <p className="font-medium text-gray-900">
              {formatDateTime(dataHora)}
            </p>
          </div>

          {procedimento && (
            <div>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <ClipboardDocumentListIcon className="h-4 w-4 mr-1" />
                Procedimento
              </div>
              <p className="font-medium text-gray-900">{procedimento.nome}</p>
              {procedimento.valor && (
                <p className="text-sm text-gray-600">
                  R$ {formatCurrency(procedimento.valor)}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
