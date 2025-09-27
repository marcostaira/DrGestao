"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { User, Tenant, AuthResponse, LoginCredentials } from "@/types";
import * as authService from "@/services/authService";

interface AuthContextType {
  user: User | null;
  tenant: Tenant | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedTenant = localStorage.getItem("tenant");
    const token = localStorage.getItem("token");

    if (storedUser && storedTenant && token) {
      setUser(JSON.parse(storedUser));
      setTenant(JSON.parse(storedTenant));
    }

    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);

      localStorage.setItem("token", response.token);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("tenant", JSON.stringify(response.tenant));

      setUser(response.user);
      setTenant(response.tenant);

      router.push("/dashboard");
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("tenant");

    setUser(null);
    setTenant(null);

    router.push("/login");
  };

  const isAdmin = user?.tipo === "ADMIN";

  return (
    <AuthContext.Provider
      value={{ user, tenant, loading, login, logout, isAdmin }}
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
