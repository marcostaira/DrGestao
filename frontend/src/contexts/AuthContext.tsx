"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { User, Tenant, LoginCredentials } from "@/types";
import * as authService from "@/services/authService";
import { MinhasAutorizacoesResponse } from "@/types/autorizacao.types";
import { AutorizacaoService } from "@/services/autorizacaoService";

interface AuthContextType {
  user: User | null;
  tenant: Tenant | null;
  permissoes: MinhasAutorizacoesResponse | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  temPermissao: (
    modulo: string,
    tipo: "visualizar" | "criarAlterar" | "cancelar"
  ) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [permissoes, setPermissoes] =
    useState<MinhasAutorizacoesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Carregar dados do localStorage ao montar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedTenant = localStorage.getItem("tenant");
    const token = localStorage.getItem("token");

    if (storedUser && storedTenant && token) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setTenant(JSON.parse(storedTenant));

      // Carregar permissões
      fetchPermissions();
    }

    setLoading(false);
  }, []);

  // Função para carregar permissões
  const fetchPermissions = async () => {
    try {
      const userPermissions = await AutorizacaoService.getMinhasAutorizacoes();
      setPermissoes(userPermissions);
    } catch (error) {
      console.error("Erro ao carregar permissões:", error);
    }
  };

  // Login
  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);

      localStorage.setItem("token", response.token);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("tenant", JSON.stringify(response.tenant));

      setUser(response.user);
      setTenant(response.tenant);

      // Carregar permissões após login
      await fetchPermissions();

      router.push("/dashboard");
    } catch (error) {
      throw error;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("tenant");

    setUser(null);
    setTenant(null);
    setPermissoes(null);

    router.push("/login");
  };

  // Verificar se é admin
  const isAdmin = user?.tipo === "ADMIN";

  // Função helper para verificar permissão
  const temPermissao = (
    modulo: string,
    tipo: "visualizar" | "criarAlterar" | "cancelar"
  ): boolean => {
    return AutorizacaoService.temPermissao(permissoes, modulo, tipo);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        tenant,
        permissoes,
        loading,
        login,
        logout,
        isAdmin,
        temPermissao,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
