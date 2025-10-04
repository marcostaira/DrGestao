"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Modulo } from "@/types/autorizacao.types";

interface PermissionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  modulo: Modulo;
  tipo: "visualizar" | "criarAlterar" | "cancelar";
  children: React.ReactNode;
}

export function PermissionButton({
  modulo,
  tipo,
  children,
  ...props
}: PermissionButtonProps) {
  const { temPermissao } = useAuth();

  const hasPermission = temPermissao(modulo, tipo);

  if (!hasPermission) {
    return null;
  }

  return <button {...props}>{children}</button>;
}
