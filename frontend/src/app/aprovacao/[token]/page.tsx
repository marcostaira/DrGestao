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
  const [expiresAt, setExpiresAt] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [aprovadoPor, setAprovadoPor] = useState("");
  const [motivo, setMotivo] = useState("");
  const [mode, setMode] = useState<"view" | "reprovar">("view");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showReprovarSuccess, setShowReprovarSuccess] = useState(false);

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
      setExpiresAt(response.data.data.expiresAt);
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

      const response = await api.post(
        `/atendimentos/link-aprovacao/${token}/aprovar`,
        {
          aprovadoPor: aprovadoPor.trim(),
        }
      );

      setShowSuccess(true);
      toast.success("Avaliação aprovada com sucesso!");
    } catch (error: any) {
      console.error("❌ Erro ao aprovar:", error);
      toast.error(
        error.response?.data?.error || "Erro ao aprovar. Tente novamente."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleReprovar = async () => {
    if (!motivo.trim()) {
      toast.error("Por favor, informe o motivo da recusa");
      return;
    }

    try {
      setSubmitting(true);

      const response = await api.post(
        `/atendimentos/link-aprovacao/${token}/reprovar`,
        {
          motivo: motivo.trim(),
        }
      );

      setShowReprovarSuccess(true);
      toast.success("Avaliação recusada");
    } catch (error: any) {
      console.error("❌ Erro ao reprovar:", error);
      toast.error(
        error.response?.data?.error || "Erro ao recusar. Tente novamente."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ CORRIGIDO: Usar valorPraticado
  const calcularValorTotal = () => {
    if (!avaliacao?.procedimentosPlano) return 0;
    return avaliacao.procedimentosPlano.reduce((total: number, proc: any) => {
      const valor = proc.valorPraticado || proc.procedimento?.valor || 0;
      return total + Number(valor);
    }, 0);
  };

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const formatarDataExpiracao = () => {
    if (!expiresAt) return "";
    const date = new Date(expiresAt);
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  };

  const isProximoDeExpirar = () => {
    if (!expiresAt) return false;
    const now = new Date();
    const expires = new Date(expiresAt);
    const hoursRemaining =
      (expires.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursRemaining <= 24;
  };

  // Loading state
  if (loading || validating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Validando link...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <XCircleIcon className="h-20 w-20 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Link Inválido
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">
              Entre em contato com a clínica para obter um novo link.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Success state - Aprovação
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

  // Success state - Reprovação
  if (showReprovarSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <ExclamationTriangleIcon className="h-20 w-20 text-orange-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Avaliação Recusada
          </h1>
          <p className="text-gray-600 mb-6">
            Sua resposta foi registrada com sucesso.
          </p>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-orange-800">
              A clínica entrará em contato para discutir outras opções de
              tratamento.
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
              {mode === "reprovar"
                ? "Recusar Avaliação"
                : "Aprovação de Avaliação"}
            </h1>
            <p className="text-gray-600">
              Olá, <strong>{paciente?.nome}</strong>!
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {mode === "reprovar"
                ? "Informe o motivo da recusa do tratamento proposto."
                : "Revise o plano de tratamento proposto e aprove se estiver de acordo."}
            </p>

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

        {/* Procedimentos - Mostrar apenas no modo view */}
        {mode === "view" && (
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
                {avaliacao?.procedimentosPlano?.map((proc: any) => {
                  // ✅ CORRIGIDO: Usar valorPraticado
                  const valorUnitario =
                    proc.valorPraticado || proc.procedimento?.valor || 0;

                  return (
                    <div
                      key={proc.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {proc.procedimento?.nome}
                          </h3>
                          {proc.observacoes && (
                            <p className="text-sm text-gray-500 mt-2 italic">
                              {proc.observacoes}
                            </p>
                          )}
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-sm text-gray-500">Valor</p>
                          <p className="font-bold text-gray-900 text-lg">
                            {formatarValor(Number(valorUnitario))}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Total Geral */}
                <div className="border-t-2 border-blue-200 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      Valor Total do Tratamento:
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      {formatarValor(valorTotal)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Anotações da Avaliação */}
        {mode === "view" && avaliacao?.anotacoes && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              📝 Observações do Profissional
            </h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {avaliacao.anotacoes}
            </p>
          </div>
        )}

        {/* Formulário de Aprovação */}
        {mode === "view" && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              ✅ Confirmar Aprovação
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo (Paciente ou Responsável){" "}
                <span className="text-red-500">*</span>
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
                Exemplo: "João Silva (pai)" ou "Maria Silva (responsável)"
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Atenção:</strong> Ao aprovar, você confirma que está de
                acordo com os procedimentos propostos e seus valores.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAprovar}
                disabled={submitting || !aprovadoPor.trim()}
                className={`flex-1 py-4 rounded-lg font-bold text-white text-lg transition-all ${
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
                    Aprovar Plano
                  </span>
                )}
              </button>

              <button
                onClick={() => setMode("reprovar")}
                disabled={submitting}
                className={`flex-1 py-4 rounded-lg font-bold text-white text-lg transition-all ${
                  submitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 active:scale-98"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <XCircleIcon className="h-6 w-6" />
                  Recusar Plano
                </span>
              </button>
            </div>

            {expiresAt && (
              <p className="text-xs text-center text-gray-500 mt-4">
                Este link é válido até{" "}
                <strong>{formatarDataExpiracao()}</strong>
              </p>
            )}
          </div>
        )}

        {/* Formulário de Reprovação */}
        {mode === "reprovar" && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              ❌ Motivo da Recusa
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Por que você está recusando este tratamento?{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Ex: Não posso arcar com os custos no momento, gostaria de uma segunda opinião, preciso de mais tempo para decidir..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                disabled={submitting}
              />
              <p className="text-xs text-gray-500 mt-2">
                Seu feedback é importante para que a clínica possa entender suas
                necessidades.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800">
                <strong>Atenção:</strong> Ao recusar, a clínica será notificada
                e poderá entrar em contato para discutir outras opções.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setMode("view")}
                disabled={submitting}
                className="flex-1 py-4 rounded-lg font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 text-lg transition-all"
              >
                Voltar
              </button>

              <button
                onClick={handleReprovar}
                disabled={submitting || !motivo.trim()}
                className={`flex-1 py-4 rounded-lg font-bold text-white text-lg transition-all ${
                  submitting || !motivo.trim()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 active:scale-98"
                }`}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <XCircleIcon className="h-6 w-6" />
                    Confirmar Recusa
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
