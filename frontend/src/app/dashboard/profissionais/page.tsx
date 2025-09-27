"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import {
  Profissional,
  CreateProfissionalData,
  UpdateProfissionalData,
  getProfissionais,
  createProfissional,
  updateProfissional,
  deleteProfissional,
  ativarProfissional,
} from "@/services/profissionalService";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import Alert from "@/components/ui/Alert";

export default function ProfissionaisPage() {
  const { isAdmin } = useAuth();
  const router = useRouter();

  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProfissional, setEditingProfissional] =
    useState<Profissional | null>(null);
  const [deletingProfissional, setDeletingProfissional] =
    useState<Profissional | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [formData, setFormData] = useState<CreateProfissionalData>({
    nome: "",
    especialidade: "",
    observacoes: "",
  });

  useEffect(() => {
    if (!isAdmin) {
      router.push("/dashboard");
      return;
    }
    loadProfissionais();
  }, [isAdmin, router]);

  const loadProfissionais = async () => {
    try {
      setIsLoading(true);
      const data = await getProfissionais();
      setProfissionais(data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao carregar profissionais");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (profissional?: Profissional) => {
    if (profissional) {
      setEditingProfissional(profissional);
      setFormData({
        nome: profissional.nome,
        especialidade: profissional.especialidade || "",
        observacoes: profissional.observacoes || "",
      });
    } else {
      setEditingProfissional(null);
      setFormData({
        nome: "",
        especialidade: "",
        observacoes: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProfissional(null);
    setFormData({
      nome: "",
      especialidade: "",
      observacoes: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (editingProfissional) {
        const updateData: UpdateProfissionalData = {
          nome: formData.nome,
          especialidade: formData.especialidade || undefined,
          observacoes: formData.observacoes || undefined,
        };
        await updateProfissional(editingProfissional.id, updateData);
        setSuccess("Profissional atualizado com sucesso!");
      } else {
        await createProfissional(formData);
        setSuccess("Profissional criado com sucesso!");
      }

      handleCloseModal();
      loadProfissionais();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao salvar profissional");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingProfissional) return;

    setIsSubmitting(true);
    try {
      await deleteProfissional(deletingProfissional.id);
      setSuccess("Profissional excluído com sucesso!");
      setIsDeleteModalOpen(false);
      setDeletingProfissional(null);
      loadProfissionais();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao excluir profissional");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAtivar = async (profissional: Profissional) => {
    try {
      await ativarProfissional(profissional.id);
      setSuccess("Profissional ativado com sucesso!");
      loadProfissionais();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao ativar profissional");
    }
  };

  const columns = [
    {
      key: "nome",
      header: "Nome",
    },
    {
      key: "especialidade",
      header: "Especialidade",
      render: (prof: Profissional) => prof.especialidade || "-",
    },
    {
      key: "ativo",
      header: "Status",
      render: (prof: Profissional) => (
        <Badge variant={prof.ativo ? "success" : "danger"}>
          {prof.ativo ? "Ativo" : "Inativo"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Ações",
      render: (prof: Profissional) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleOpenModal(prof)}
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

          {!prof.ativo && (
            <button
              onClick={() => handleAtivar(prof)}
              className="text-green-600 hover:text-green-800"
              title="Ativar (desativa outros)"
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          )}

          <button
            onClick={() => {
              setDeletingProfissional(prof);
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
          <h1 className="text-2xl font-bold text-secondary-900">
            Profissionais
          </h1>
          <p className="text-secondary-600 mt-1">
            Gerencie os profissionais do sistema (máximo 1 ativo por tenant)
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
          Novo Profissional
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
          <Table data={profissionais} columns={columns} />
        )}
      </Card>

      {/* Modal Criar/Editar */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          editingProfissional ? "Editar Profissional" : "Novo Profissional"
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            required
          />

          <Input
            label="Especialidade"
            value={formData.especialidade}
            onChange={(e) =>
              setFormData({ ...formData, especialidade: e.target.value })
            }
            placeholder="Ex: Dentista, Fisioterapeuta..."
          />

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Observações
            </label>
            <textarea
              value={formData.observacoes}
              onChange={(e) =>
                setFormData({ ...formData, observacoes: e.target.value })
              }
              rows={3}
              className="block w-full px-3 py-2 border border-secondary-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Observações adicionais..."
            />
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
              {editingProfissional ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Confirmar Exclusão */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingProfissional(null);
        }}
        title="Confirmar Exclusão"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-secondary-600">
            Tem certeza que deseja excluir o profissional{" "}
            <strong>{deletingProfissional?.nome}</strong>? Esta ação não pode
            ser desfeita.
          </p>

          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeletingProfissional(null);
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
