// frontend/src/components/whatsapp/WhatsAppTemplates.tsx

import React, { useState, useEffect } from "react";
import { WhatsAppTemplates as TemplatesType } from "../../types/whatsapp.types";

interface WhatsAppTemplatesProps {
  templates: TemplatesType | null;
  onSave: (templates: Partial<TemplatesType>) => void;
  loading: boolean;
}

export const WhatsAppTemplates: React.FC<WhatsAppTemplatesProps> = ({
  templates,
  onSave,
  loading,
}) => {
  const [formData, setFormData] = useState<TemplatesType>({
    templateConfirmacao: "",
    templateConfirmado: "",
    templateReagendar: "",
    templateOpcaoInvalida: "",
    horasAntecedencia: 24,
    enviarLinkAnamnese: false,
    formularioId: undefined,
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (templates) {
      setFormData(templates);
    }
  }, [templates]);

  const handleChange = (field: keyof TemplatesType, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (templates) {
      setFormData(templates);
    }
    setIsEditing(false);
  };

  const placeholders = [
    { key: "{nome}", description: "Nome do paciente" },
    { key: "{data}", description: "Data do agendamento" },
    { key: "{hora}", description: "Hora do agendamento" },
    { key: "{profissional}", description: "Nome do profissional" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span>📝</span>
          Templates de Mensagens
        </h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            ✏️ Editar
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Placeholders Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="font-semibold text-blue-800 mb-2">
            🔤 Placeholders disponíveis:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {placeholders.map((placeholder) => (
              <div key={placeholder.key} className="text-sm">
                <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono">
                  {placeholder.key}
                </code>
                <p className="text-xs text-blue-700 mt-1">
                  {placeholder.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Template de Confirmação */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            📤 Mensagem de Confirmação (enviada ao paciente)
          </label>
          <textarea
            value={formData.templateConfirmacao}
            onChange={(e) =>
              handleChange("templateConfirmacao", e.target.value)
            }
            disabled={!isEditing}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Olá {nome}! Você tem consulta marcada para {data} às {hora}..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Esta mensagem será enviada ao paciente para confirmar o agendamento
          </p>
        </div>

        {/* Template Confirmado */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ✅ Mensagem quando o paciente confirma (responde 1)
          </label>
          <textarea
            value={formData.templateConfirmado}
            onChange={(e) => handleChange("templateConfirmado", e.target.value)}
            disabled={!isEditing}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="✅ Consulta confirmada! Nos vemos em {data} às {hora}."
          />
        </div>

        {/* Template Reagendar */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            📅 Mensagem quando o paciente quer reagendar (responde 2)
          </label>
          <textarea
            value={formData.templateReagendar}
            onChange={(e) => handleChange("templateReagendar", e.target.value)}
            disabled={!isEditing}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="📅 Vamos reagendar sua consulta. Em breve entraremos em contato."
          />
        </div>

        {/* Template Opção Inválida */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ❌ Mensagem para resposta inválida
          </label>
          <textarea
            value={formData.templateOpcaoInvalida}
            onChange={(e) =>
              handleChange("templateOpcaoInvalida", e.target.value)
            }
            disabled={!isEditing}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="❌ Resposta não reconhecida. Digite: 1 - Para confirmar, 2 - Para reagendar"
          />
        </div>

        {/* Horas de Antecedência */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ⏰ Enviar confirmação com quantas horas de antecedência?
          </label>
          <input
            type="number"
            min="1"
            max="168"
            value={formData.horasAntecedencia}
            onChange={(e) =>
              handleChange("horasAntecedencia", parseInt(e.target.value))
            }
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-1">
            Máximo: 168 horas (7 dias)
          </p>
        </div>

        {/* Link Anamnese */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <input
            type="checkbox"
            id="enviarLinkAnamnese"
            checked={formData.enviarLinkAnamnese}
            onChange={(e) =>
              handleChange("enviarLinkAnamnese", e.target.checked)
            }
            disabled={!isEditing}
            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed"
          />
          <label
            htmlFor="enviarLinkAnamnese"
            className="text-sm font-medium text-gray-700 cursor-pointer"
          >
            📋 Enviar link da anamnese junto com a confirmação
          </label>
        </div>

        {/* Botões de Ação */}
        {isEditing && (
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Salvando..." : "💾 Salvar Templates"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ❌ Cancelar
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
