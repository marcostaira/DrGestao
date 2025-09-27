"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { UpdateTenantData } from "@/types";
import * as tenantService from "@/services/tenantService";
import * as authService from "@/services/authService";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Alert from "@/components/ui/Alert";

export default function ConfiguracoesPage() {
  const { isAdmin, tenant } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Tenant form
  const [tenantData, setTenantData] = useState<UpdateTenantData>({
    nome: "",
    plano: "",
  });

  // Password form
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!isAdmin) {
      router.push("/dashboard");
      return;
    }

    if (tenant) {
      setTenantData({
        nome: tenant.nome,
        plano: tenant.plano,
      });
    }
  }, [isAdmin, tenant, router]);

  const handleUpdateTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await tenantService.updateTenant(tenantData);
      setSuccess("Configurações atualizadas com sucesso!");

      // Atualizar dados no localStorage
      const updatedTenant = { ...tenant, ...tenantData };
      localStorage.setItem("tenant", JSON.stringify(updatedTenant));

      setTimeout(() => {
        setSuccess("");
        window.location.reload();
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao atualizar configurações");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("As senhas não conferem");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError("A nova senha deve ter no mínimo 6 caracteres");
      return;
    }

    setIsLoading(true);

    try {
      await authService.changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );

      setSuccess("Senha alterada com sucesso!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao alterar senha");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Configurações</h1>
        <p className="text-secondary-600 mt-1">
          Gerencie as configurações do sistema
        </p>
      </div>

      {error && (
        <Alert type="error" onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert type="success" onClose={() => setSuccess("")}>
          {success}
        </Alert>
      )}

      {/* Configurações do Tenant */}
      <Card title="Informações da Empresa">
        <form onSubmit={handleUpdateTenant} className="space-y-4">
          <Input
            label="Nome da Empresa"
            value={tenantData.nome}
            onChange={(e) =>
              setTenantData({ ...tenantData, nome: e.target.value })
            }
            required
          />

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Plano Atual
            </label>
            <div className="px-3 py-2 bg-secondary-100 border border-secondary-300 rounded-lg">
              <span className="text-secondary-900 font-medium capitalize">
                {tenantData.plano}
              </span>
            </div>
            <p className="mt-1 text-sm text-secondary-500">
              Entre em contato com o suporte para alterar o plano
            </p>
          </div>

          <div className="flex justify-end">
            <Button type="submit" isLoading={isLoading}>
              Salvar Alterações
            </Button>
          </div>
        </form>
      </Card>

      {/* Alterar Senha */}
      <Card title="Alterar Senha">
        <form onSubmit={handleChangePassword} className="space-y-4">
          <Input
            label="Senha Atual"
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                currentPassword: e.target.value,
              })
            }
            required
          />

          <Input
            label="Nova Senha"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, newPassword: e.target.value })
            }
            required
          />

          <Input
            label="Confirmar Nova Senha"
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                confirmPassword: e.target.value,
              })
            }
            required
          />

          <div className="flex justify-end">
            <Button type="submit" isLoading={isLoading}>
              Alterar Senha
            </Button>
          </div>
        </form>
      </Card>

      {/* Informações do Sistema */}
      <Card title="Informações do Sistema">
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-secondary-200">
            <span className="text-secondary-600">Versão:</span>
            <span className="font-medium text-secondary-900">1.0.0</span>
          </div>
          <div className="flex justify-between py-2 border-b border-secondary-200">
            <span className="text-secondary-600">Tenant ID:</span>
            <span className="font-mono text-sm text-secondary-900">
              {tenant?.id}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-secondary-600">Status:</span>
            <span className="font-medium text-green-600">
              {tenant?.ativo ? "Ativo" : "Inativo"}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
