"use client";

import { useAuth } from "@/contexts/AuthContext";
import Badge from "@/components/ui/Badge";

export default function Header() {
  const { user, tenant, logout } = useAuth();

  return (
    <header className="bg-white border-b border-secondary-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-secondary-900">
            {tenant?.nome}
          </h2>
          <p className="text-sm text-secondary-500">
            Plano:{" "}
            <Badge variant="info" size="sm">
              {tenant?.plano}
            </Badge>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-secondary-900">
              {user?.nome}
            </p>
            <p className="text-xs text-secondary-500">
              <Badge
                variant={user?.tipo === "ADMIN" ? "success" : "default"}
                size="sm"
              >
                {user?.tipo === "ADMIN" ? "Administrador" : "Secretária"}
              </Badge>
            </p>
          </div>

          <button
            onClick={logout}
            className="p-2 text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors"
            title="Sair"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
