"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import {
  Usuario,
  CreateUsuarioData,
  UpdateUsuarioData,
  TipoUsuario,
} from "@/types";
import * as userService from "@/services/userService";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import Alert from "@/components/ui/Alert";

export default function UsuariosPage() {
  const { isAdmin } = useAuth();
  const router = useRouter();

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);
  const [deletingUser, setDeletingUser] = useState<Usuario | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [formData, setFormData] = useState<CreateUsuarioData>({
    nome: "",
    email: "",
    senha: "",
    tipo: TipoUsuario.SECRETARIA,
  });

  useEffect(() => {
    if (!isAdmin) {
      router.push("/dashboard");
      return;
    }
    loadUsuarios();
  }, [isAdmin, router]);

  const loadUsuarios = async () => {
    try {
      setIsLoading(true);
      const data = await userService.getUsers();
      setUsuarios(data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao carregar usuários");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (user?: Usuario) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        nome: user.nome,
        email: user.email,
        senha: "",
        tipo: user.tipo,
      });
    } else {
      setEditingUser(null);
      setFormData({
        nome: "",
        email: "",
        senha: "",
        tipo: TipoUsuario.SECRETARIA,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setFormData({
      nome: "",
      email: "",
      senha: "",
      tipo: TipoUsuario.SECRETARIA,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (editingUser) {
        const updateData: UpdateUsuarioData = {
          nome: formData.nome,
          email: formData.email,
          tipo: formData.tipo,
        };
        if (formData.senha) {
          updateData.senha = formData.senha;
        }
        await userService.updateUser(editingUser.id, updateData);
        setSuccess("Usuário atualizado com sucesso!");
      } else {
        await userService.createUser(formData);
        setSuccess("Usuário criado com sucesso!");
      }

      handleCloseModal();
      loadUsuarios();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao salvar usuário");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingUser) return;

    setIsSubmitting(true);
    try {
      await userService.deleteUser(deletingUser.id);
      setSuccess("Usuário excluído com sucesso!");
      setIsDeleteModalOpen(false);
      setDeletingUser(null);
      loadUsuarios();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao excluir usuário");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (user: Usuario) => {
    try {
      await userService.toggleUserStatus(user.id, !user.ativo);
      setSuccess(
        `Usuário ${!user.ativo ? "ativado" : "desativado"} com sucesso!`
      );
      loadUsuarios();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao alterar status");
    }
  };

  const columns = [
    {
      key: "nome",
      header: "Nome",
    },
    {
      key: "email",
      header: "E-mail",
    },
    {
      key: "tipo",
      header: "Tipo",
      render: (user: Usuario) => (
        <Badge
          variant={user.tipo === TipoUsuario.ADMIN ? "success" : "default"}
        >
          {user.tipo === TipoUsuario.ADMIN ? "Administrador" : "Secretária"}
        </Badge>
      ),
    },
    {
      key: "ativo",
      header: "Status",
      render: (user: Usuario) => (
        <Badge variant={user.ativo ? "success" : "danger"}>
          {user.ativo ? "Ativo" : "Inativo"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Ações",
      render: (user: Usuario) => (
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => handleOpenModal(user)}
            className="text-primary-600 hover:text-primary-800"
            title="Editar"
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>

          <button
            onClick={() => handleToggleStatus(user)}
            className={
              user.ativo
                ? "text-yellow-600 hover:text-yellow-800"
                : "text-green-600 hover:text-green-800"
            }
            title={user.ativo ? "Desativar" : "Ativar"}
          >
            {user.ativo ? (
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
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
            ) : (
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </button>

          <button
            onClick={() => {
              setDeletingUser(user);
              setIsDeleteModalOpen(true);
            }}
            className="text-red-600 hover:text-red-800"
            title="Excluir"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Usuários</h1>
          <p className="text-secondary-600 mt-1">
            Gerencie os usuários do sistema
          </p>
        </div>

        <Button onClick={() => handleOpenModal()}>
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Novo Usuário
        </Button>
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

      <Card>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <Table
            data={usuarios}
            columns={columns}
            onRowClick={(usuario) => handleOpenModal(usuario)}
          />
        )}
      </Card>

      {/* Modal Criar/Editar */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingUser ? "Editar Usuário" : "Novo Usuário"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            required
          />

          <Input
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          <Input
            label={
              editingUser ? "Nova Senha (deixe em branco para manter)" : "Senha"
            }
            type="password"
            value={formData.senha}
            onChange={(e) =>
              setFormData({ ...formData, senha: e.target.value })
            }
            required={!editingUser}
          />

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Tipo de Usuário <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.tipo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tipo: e.target.value as TipoUsuario,
                })
              }
              className="block w-full px-3 py-2 border border-secondary-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            >
              <option value={TipoUsuario.SECRETARIA}>Secretária</option>
              <option value={TipoUsuario.ADMIN}>Administrador</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseModal}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {editingUser ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Confirmar Exclusão */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingUser(null);
        }}
        title="Confirmar Exclusão"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-secondary-600">
            Tem certeza que deseja excluir o usuário{" "}
            <strong>{deletingUser?.nome}</strong>? Esta ação não pode ser
            desfeita.
          </p>

          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeletingUser(null);
              }}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              isLoading={isSubmitting}
            >
              Excluir
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
