// frontend/src/contexts/AuthContext.tsx

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation"; // ✅ Adicionar usePathname
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
  const pathname = usePathname(); // ✅ Adicionar hook para pegar o pathname

  // ✅ NOVO: Verificar se é rota pública
  const isPublicRoute =
    pathname?.startsWith("/aprovacao") ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/anamnese") ||
    pathname === "/";

  // Função para carregar permissões
  const fetchPermissions = async () => {
    // ✅ NOVO: Não carregar permissões em rotas públicas
    if (isPublicRoute) {
      console.log("🌐 Rota pública, pulando carregamento de permissões");
      return;
    }

    try {
      console.log("🔍 Iniciando carregamento de permissões...");

      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("⚠️ Sem token, não é possível carregar permissões");
        return;
      }

      const userPermissions = await AutorizacaoService.getMinhasAutorizacoes();
      console.log("✅ Permissões carregadas com sucesso:", userPermissions);
      setPermissoes(userPermissions);
    } catch (error: any) {
      console.error("❌ Erro ao carregar permissões:", error);
      console.error("Detalhes do erro:", error.response?.data);
    }
  };

  // Carregar dados do localStorage ao montar
  useEffect(() => {
    const initAuth = async () => {
      console.log("🚀 Inicializando Auth...");
      console.log("📍 Pathname atual:", pathname);
      console.log("🌐 É rota pública?", isPublicRoute);

      // ✅ NOVO: Em rotas públicas, apenas setar loading = false
      if (isPublicRoute) {
        console.log("✅ Rota pública detectada, pulando inicialização de auth");
        setLoading(false);
        return;
      }

      const storedUser = localStorage.getItem("user");
      const storedTenant = localStorage.getItem("tenant");
      const token = localStorage.getItem("token");

      console.log("Token existe?", !!token);
      console.log("User existe?", !!storedUser);

      if (storedUser && storedTenant && token) {
        const parsedUser = JSON.parse(storedUser);
        console.log("👤 Usuário carregado:", parsedUser);

        setUser(parsedUser);
        setTenant(JSON.parse(storedTenant));

        // Carregar permissões ANTES de setar loading = false
        await fetchPermissions();
      } else {
        console.log("⚠️ Dados de autenticação incompletos");
      }

      setLoading(false);
      console.log("✅ Auth inicializado");
    };

    initAuth();
  }, [pathname]); // ✅ NOVO: Adicionar pathname como dependência

  // Login
  const login = async (credentials: LoginCredentials) => {
    try {
      console.log("🔑 Fazendo login...");
      const response = await authService.login(credentials);

      localStorage.setItem("token", response.token);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("tenant", JSON.stringify(response.tenant));

      setUser(response.user);
      setTenant(response.tenant);

      console.log("✅ Login realizado, carregando permissões...");

      // Carregar permissões após login
      await fetchPermissions();

      router.push("/dashboard");
    } catch (error) {
      console.error("❌ Erro no login:", error);
      throw error;
    }
  };

  // Logout
  const logout = () => {
    console.log("👋 Fazendo logout...");
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
    if (!user) {
      console.log("❌ Sem usuário logado");
      return false;
    }

    // ADMIN sempre tem todas as permissões
    if (isAdmin) {
      console.log("✅ Admin tem todas as permissões");
      return true;
    }

    // Verificar permissões específicas
    const hasPermission = AutorizacaoService.temPermissao(
      permissoes,
      modulo,
      tipo
    );

    if (!hasPermission) {
      console.log(`❌ Sem permissão: ${modulo}.${tipo}`, { permissoes });
    }

    return hasPermission;
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
