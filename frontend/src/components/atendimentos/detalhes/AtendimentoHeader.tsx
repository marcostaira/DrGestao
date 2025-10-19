// frontend/src/components/atendimentos/detalhes/AtendimentoHeader.tsx

"use client";

import {
  ArrowLeftIcon,
  DocumentTextIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

interface AtendimentoHeaderProps {
  isCreating: boolean;
  isEditing: boolean;
  saving: boolean;
  tipo?: string;
  statusAprovacao?: string;
  atendimentoId: string;
  onBack: () => void;
  onEdit?: () => void;
  onSave: () => void;
  onCancel: () => void;
  onViewAnamnese: () => void;
}

const getStatusBadge = (tipo: string) => {
  const badges: Record<string, { color: string; label: string }> = {
    AVULSO: { color: "blue", label: "Avulso" },
    AVALIACAO: { color: "yellow", label: "Avaliação" },
    PLANO_TRATAMENTO: { color: "green", label: "Plano de Tratamento" },
  };
  return badges[tipo] || { color: "gray", label: tipo };
};

const getAprovacaoBadge = (status?: string) => {
  if (!status) return null;
  const badges: Record<string, { color: string; label: string }> = {
    PENDENTE: { color: "yellow", label: "Pendente" },
    APROVADO: { color: "green", label: "Aprovado" },
    REPROVADO: { color: "red", label: "Reprovado" },
  };
  return badges[status] || { color: "gray", label: status };
};

export function AtendimentoHeader({
  isCreating,
  isEditing,
  saving,
  tipo,
  statusAprovacao,
  atendimentoId,
  onBack,
  onEdit,
  onSave,
  onCancel,
  onViewAnamnese,
}: AtendimentoHeaderProps) {
  const statusInfo = tipo ? getStatusBadge(tipo) : null;
  const aprovacaoInfo = statusAprovacao
    ? getAprovacaoBadge(statusAprovacao)
    : null;

  return (
    <div className="mb-6">
      <button
        onClick={onBack}
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Voltar
      </button>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isCreating ? "Registrar Atendimento" : "Detalhes do Atendimento"}
          </h1>
          {isCreating ? (
            <p className="text-sm text-gray-500 mt-1">
              Preencha as informações do atendimento realizado
            </p>
          ) : (
            <div className="flex items-center gap-2 mt-2">
              {statusInfo && (
                <Badge variant={statusInfo.color as any}>
                  {statusInfo.label}
                </Badge>
              )}
              {aprovacaoInfo && (
                <Badge variant={aprovacaoInfo.color as any}>
                  {aprovacaoInfo.label}
                </Badge>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {isCreating || isEditing ? (
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={onCancel}
                disabled={saving}
              >
                <XMarkIcon className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={onSave}
                disabled={saving}
              >
                <CheckIcon className="h-4 w-4 mr-2" />
                {saving
                  ? "Salvando..."
                  : isCreating
                  ? "Salvar Atendimento"
                  : "Salvar"}
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" size="sm" onClick={onViewAnamnese}>
                <DocumentTextIcon className="h-4 w-4 mr-2" />
                Anamneses
              </Button>
              {onEdit && (
                <Button variant="secondary" size="sm" onClick={onEdit}>
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
