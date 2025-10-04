"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Modulo } from "@/types/autorizacao.types";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  modulo: Modulo;
  tipo: "visualizar" | "criarAlterar" | "cancelar";
  fallback?: React.ReactNode;
}

export function ProtectedRoute({
  children,
  modulo,
  tipo,
  fallback,
}: ProtectedRouteProps) {
  const { temPermissao, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const hasPermission = temPermissao(modulo, tipo);

  if (!hasPermission) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="flex flex-col items-center justify-center h-64 p-8 text-center">
        <svg
          className="w-16 h-16 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Acesso Negado</h2>
        <p className="text-gray-600 mb-6">
          Você não tem permissão para acessar esta funcionalidade.
        </p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Voltar
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
