// frontend/src/app/dashboard/anamnese/[token]/page.tsx

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  anamneseService,
  ValidateTokenResponse,
} from "@/services/anamnese.service";
import toast from "react-hot-toast";

// Definir interface local para CampoFormulario
interface CampoFormulario {
  id: string;
  tipo: string;
  label: string;
  obrigatorio: boolean;
  opcoes?: string[];
  placeholder?: string;
  validacao?: {
    min?: number;
    max?: number;
    regex?: string;
    mensagem?: string;
  };
}

export default function AnamnesePublicPage() {
  const params = useParams();
  const token = params?.token as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [link, setLink] = useState<ValidateTokenResponse | null>(null);
  const [respostas, setRespostas] = useState<Record<string, any>>({});
  const [observacoes, setObservacoes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (token) {
      loadLink();
    }
  }, [token]);

  const loadLink = async () => {
    try {
      setLoading(true);
      const data = await anamneseService.validateToken(token);
      setLink(data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || "Link inválido ou expirado");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (campoId: string, value: any) => {
    setRespostas((prev) => ({
      ...prev,
      [campoId]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos obrigatórios
    const camposObrigatorios =
      link?.formulario.campos.filter((c: CampoFormulario) => c.obrigatorio) ||
      [];
    for (const campo of camposObrigatorios) {
      if (!respostas[campo.id] || respostas[campo.id] === "") {
        toast.error(`Por favor, preencha o campo: ${campo.label}`);
        return;
      }
    }

    setSubmitting(true);
    try {
      await anamneseService.saveResposta(token, {
        respostas,
        observacoes,
      });

      setSuccess(true);
      toast.success("Anamnese enviada com sucesso!");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Erro ao enviar anamnese");
    } finally {
      setSubmitting(false);
    }
  };

  const renderCampo = (campo: CampoFormulario) => {
    const value = respostas[campo.id] || "";

    switch (campo.tipo) {
      case "TEXTO":
      case "EMAIL":
      case "TELEFONE":
        return (
          <input
            type={
              campo.tipo === "EMAIL"
                ? "email"
                : campo.tipo === "TELEFONE"
                ? "tel"
                : "text"
            }
            value={value}
            onChange={(e) => handleChange(campo.id, e.target.value)}
            placeholder={campo.placeholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required={campo.obrigatorio}
          />
        );

      case "TEXTAREA":
        return (
          <textarea
            value={value}
            onChange={(e) => handleChange(campo.id, e.target.value)}
            placeholder={campo.placeholder}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required={campo.obrigatorio}
          />
        );

      case "NUMERO":
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleChange(campo.id, e.target.value)}
            placeholder={campo.placeholder}
            min={campo.validacao?.min}
            max={campo.validacao?.max}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required={campo.obrigatorio}
          />
        );

      case "DATA":
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => handleChange(campo.id, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required={campo.obrigatorio}
          />
        );

      case "SELECAO":
        return (
          <select
            value={value}
            onChange={(e) => handleChange(campo.id, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required={campo.obrigatorio}
          >
            <option value="">Selecione...</option>
            {campo.opcoes?.map((opcao: string) => (
              <option key={opcao} value={opcao}>
                {opcao}
              </option>
            ))}
          </select>
        );

      case "RADIO":
        return (
          <div className="space-y-2">
            {campo.opcoes?.map((opcao: string) => (
              <label
                key={opcao}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name={campo.id}
                  value={opcao}
                  checked={value === opcao}
                  onChange={(e) => handleChange(campo.id, e.target.value)}
                  className="w-4 h-4 text-blue-600"
                  required={campo.obrigatorio}
                />
                <span>{opcao}</span>
              </label>
            ))}
          </div>
        );

      case "MULTIPLA_ESCOLHA":
        return (
          <div className="space-y-2">
            {campo.opcoes?.map((opcao: string) => (
              <label
                key={opcao}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={opcao}
                  checked={(value || []).includes(opcao)}
                  onChange={(e) => {
                    const currentValue = value || [];
                    if (e.target.checked) {
                      handleChange(campo.id, [...currentValue, opcao]);
                    } else {
                      handleChange(
                        campo.id,
                        currentValue.filter((v: string) => v !== opcao)
                      );
                    }
                  }}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span>{opcao}</span>
              </label>
            ))}
          </div>
        );

      case "SIM_NAO":
        return (
          <div className="flex gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={campo.id}
                checked={value === true}
                onChange={() => handleChange(campo.id, true)}
                className="w-4 h-4 text-blue-600"
                required={campo.obrigatorio}
              />
              <span>Sim</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={campo.id}
                checked={value === false}
                onChange={() => handleChange(campo.id, false)}
                className="w-4 h-4 text-blue-600"
                required={campo.obrigatorio}
              />
              <span>Não</span>
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando formulário...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Ops!</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => (window.location.href = "/")}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voltar para o início
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">✅</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Anamnese Enviada!
          </h1>
          <p className="text-gray-600 mb-6">
            Obrigado por preencher sua anamnese,{" "}
            <strong>{link?.paciente.nome}</strong>!
            <br />
            Suas informações foram salvas com sucesso.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <p>📋 Suas respostas já estão disponíveis para o profissional.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📋</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {link?.formulario.nome}
            </h1>
            {link?.formulario.descricao && (
              <p className="text-gray-600 mb-4">{link.formulario.descricao}</p>
            )}
            <p className="text-sm text-gray-500">
              Paciente: <strong>{link?.paciente.nome}</strong>
            </p>
          </div>
        </div>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="space-y-6">
            {link?.formulario.campos.map((campo: CampoFormulario) => (
              <div key={campo.id}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {campo.label}
                  {campo.obrigatorio && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
                {renderCampo(campo)}
              </div>
            ))}

            {/* Observações */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Observações Adicionais (Opcional)
              </label>
              <textarea
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Adicione qualquer informação adicional que considere importante..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Botão de envio */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <span>✅</span>
                  Enviar Anamnese
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            * Campos obrigatórios
          </p>
        </form>
      </div>
    </div>
  );
}
