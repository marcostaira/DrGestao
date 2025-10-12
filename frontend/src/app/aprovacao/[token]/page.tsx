// frontend/src/app/aprovacao/[token]/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import api from "@/lib/api";
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function AprovacaoPublicaPage() {
  const params = useParams();
  const router = useRouter();
  const token = params?.token as string;

  const [loading, setLoading] = useState(true);
  const [validating, setValidating] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [avaliacao, setAvaliacao] = useState<any>(null);
  const [paciente, setPaciente] = useState<any>(null);
  const [expiresAt, setExpiresAt] = useState<string>(""); // NOVO
  const [error, setError] = useState<string>("");
  const [aprovadoPor, setAprovadoPor] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorType, setErrorType] = useState<string>("");

  useEffect(() => {
    if (token) {
      validateToken();
    }
  }, [token]);

  const validateToken = async () => {
    try {
      setValidating(true);
      const response = await api.get(`/atendimentos/link-aprovacao/${token}`);

      setAvaliacao(response.data.data.avaliacao);
      setPaciente(response.data.data.paciente);
      setExpiresAt(response.data.data.expiresAt); // NOVO
      setError("");
    } catch (error: any) {
      console.error("Erro ao validar token:", error);
      setError(
        error.response?.data?.error ||
          "Link inválido ou expirado. Entre em contato com a clínica."
      );
    } finally {
      setValidating(false);
      setLoading(false);
    }
  };

  const handleAprovar = async () => {
    if (!aprovadoPor.trim()) {
      toast.error("Por favor, informe seu nome completo");
      return;
    }

    try {
      setSubmitting(true);

      console.log("📤 Enviando aprovação:", {
        token,
        aprovadoPor: aprovadoPor.trim(),
      });

      const response = await api.post(
        `/atendimentos/link-aprovacao/${token}/aprovar`,
        {
          aprovadoPor: aprovadoPor.trim(),
        }
      );

      console.log("✅ Resposta:", response.data);

      setShowSuccess(true);
      toast.success("Avaliação aprovada com sucesso!");
    } catch (error: any) {
      console.error("❌ Erro ao aprovar:", error);
      console.error("📄 Resposta do erro:", error.response?.data);
      console.error("📄 Status do erro:", error.response?.status);

      const errorMsg =
        error.response?.data?.error || "Erro ao aprovar avaliação";

      if (errorMsg.includes("já foi") || errorMsg.includes("processada")) {
        setErrorType("utilizado");
        setError(errorMsg);
      } else {
        toast.error(errorMsg);
      }
    } finally {
      setSubmitting(false);
    }
  };
  const calcularValorTotal = () => {
    if (!avaliacao?.procedimentosPlano) return 0;

    return avaliacao.procedimentosPlano.reduce((total: number, proc: any) => {
      return (
        total + Number(proc.valorPraticado || proc.procedimento?.valor || 0)
      );
    }, 0);
  };

  // NOVO: Formatar data de expiração
  const formatarDataExpiracao = () => {
    if (!expiresAt) return "";

    const date = new Date(expiresAt);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // NOVO: Verificar se está próximo de expirar (menos de 24h)
  const isProximoDeExpirar = () => {
    if (!expiresAt) return false;

    const now = new Date();
    const expires = new Date(expiresAt);
    const horasRestantes =
      (expires.getTime() - now.getTime()) / (1000 * 60 * 60);

    return horasRestantes < 24 && horasRestantes > 0;
  };

  // Loading state
  if (loading || validating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Validando link...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Link Inválido
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <p className="text-sm text-gray-500">
            Por favor, entre em contato com a clínica para obter um novo link.
          </p>
        </div>
      </div>
    );
  }

  // Success state
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Avaliação Aprovada!
          </h1>
          <p className="text-gray-600 mb-6">
            Seu plano de tratamento foi criado com sucesso.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">
              A clínica entrará em contato em breve para agendar os
              procedimentos.
            </p>
          </div>
          <p className="text-xs text-gray-500">Você pode fechar esta página.</p>
        </div>
      </div>
    );
  }

  const valorTotal = calcularValorTotal();

  // Main approval page
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Aprovação de Avaliação
            </h1>
            <p className="text-gray-600">
              Olá, <strong>{paciente?.nome}</strong>!
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Revise o plano de tratamento proposto e aprove se estiver de
              acordo.
            </p>

            {/* NOVO: Alerta de expiração */}
            {isProximoDeExpirar() && (
              <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-3">
                <div className="flex items-center justify-center gap-2 text-orange-800">
                  <ClockIcon className="h-5 w-5" />
                  <p className="text-sm font-medium">
                    Este link expira em breve!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Procedimentos */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            📋 Procedimentos Propostos
          </h2>

          {avaliacao?.procedimentosPlano?.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Nenhum procedimento foi adicionado à avaliação.
            </p>
          ) : (
            <div className="space-y-3">
              {avaliacao?.procedimentosPlano?.map(
                (proc: any, index: number) => (
                  <div
                    key={proc.id}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold">
                            {index + 1}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {proc.procedimento?.nome || "Procedimento"}
                          </h3>
                        </div>
                        {proc.observacoes && (
                          <p className="text-sm text-gray-600 ml-11">
                            {proc.observacoes}
                          </p>
                        )}
                        {proc.procedimento?.duracaoMinutos && (
                          <div className="flex items-center gap-1 text-xs text-gray-500 ml-11 mt-1">
                            <ClockIcon className="h-4 w-4" />
                            <span>
                              {proc.procedimento.duracaoMinutos} minutos
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          R${" "}
                          {Number(
                            proc.valorPraticado || proc.procedimento?.valor || 0
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}

              {/* Valor Total */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-6 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-700 font-medium">
                      Valor Total do Tratamento
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      {avaliacao?.procedimentosPlano?.length} procedimento(s)
                    </p>
                  </div>
                  <p className="text-4xl font-bold text-green-700">
                    R$ {valorTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Anotações */}
        {avaliacao?.anotacoes && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              📝 Observações do Profissional
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap">
                {avaliacao.anotacoes}
              </p>
            </div>
          </div>
        )}

        {/* Formulário de Aprovação */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            ✍️ Confirmar Aprovação
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={aprovadoPor}
              onChange={(e) => setAprovadoPor(e.target.value)}
              placeholder="Digite seu nome completo"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={submitting}
            />
            <p className="text-xs text-gray-500 mt-2">
              Se você for responsável pelo paciente, informe seu nome e
              parentesco.
              <br />
              Exemplo: "João Silva (pai)" ou "Maria Silva (responsável)"
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Atenção:</strong> Ao aprovar, você confirma que está de
              acordo com os procedimentos propostos e seus valores.
            </p>
          </div>

          <button
            onClick={handleAprovar}
            disabled={submitting || !aprovadoPor.trim()}
            className={`w-full py-4 rounded-lg font-bold text-white text-lg transition-all ${
              submitting || !aprovadoPor.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 active:scale-98"
            }`}
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Aprovando...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <CheckCircleIcon className="h-6 w-6" />
                Aprovar Plano de Tratamento
              </span>
            )}
          </button>

          {/* NOVO: Data de expiração */}
          {expiresAt && (
            <p className="text-xs text-center text-gray-500 mt-4">
              Este link é válido até <strong>{formatarDataExpiracao()}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
