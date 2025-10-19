// frontend/src/components/atendimentos/detalhes/AtendimentoSidebar.tsx

"use client";

import { DocumentTextIcon, PencilIcon } from "@heroicons/react/24/outline";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface AtendimentoSidebarProps {
  isCreating: boolean;
  isEditing: boolean;
  atendimentoId?: string;
  createdAt?: string;
  onViewAnamnese?: () => void;
  onEdit?: () => void;
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

export function AtendimentoSidebar({
  isCreating,
  isEditing,
  atendimentoId,
  createdAt,
  onViewAnamnese,
  onEdit,
}: AtendimentoSidebarProps) {
  if (isCreating) {
    return (
      <Card>
        <div className="p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Dicas</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Registre todas as observações importantes</li>
            <li>• Liste os procedimentos realizados</li>
            <li>• Salve para criar o prontuário</li>
          </ul>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Ações Rápidas */}
      <Card>
        <div className="p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Ações Rápidas
          </h3>
          <div className="space-y-2">
            {onViewAnamnese && (
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={onViewAnamnese}
              >
                <DocumentTextIcon className="h-4 w-4 mr-2" />
                Ver Anamneses
              </Button>
            )}
            {!isEditing && onEdit && (
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={onEdit}
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Editar Atendimento
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Informações Adicionais */}
      {createdAt && atendimentoId && (
        <Card>
          <div className="p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Informações
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-600">Criado em:</span>
                <p className="font-medium text-gray-900">
                  {formatDateTime(createdAt)}
                </p>
              </div>
              <div>
                <span className="text-gray-600">ID:</span>
                <p className="font-mono text-xs text-gray-900">
                  {atendimentoId}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
