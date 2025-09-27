"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Paciente,
  CreatePacienteData,
  UpdatePacienteData,
  getPacientes,
  createPaciente,
  updatePaciente,
  deletePaciente,
  deletePacientesEmLote,
} from "@/services/pacienteService";
import { getProfissionais, Profissional } from "@/services/profissionalService";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Alert from "@/components/ui/Alert";

export default function PacientesPage() {
  const router = useRouter();

  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfissional, setSelectedProfissional] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingPaciente, setEditingPaciente] = useState<Paciente | null>(null);
  const [deletingPaciente, setDeletingPaciente] = useState<Paciente | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Seleção múltipla
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Form states
  const [formData, setFormData] = useState<CreatePacienteData>({
    nome: "",
    telefone: "",
    email: "",
    observacoes: "",
    profissionalId: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadPacientes();
  }, [searchTerm, selectedProfissional]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [pacientesData, profissionaisData] = await Promise.all([
        getPacientes(),
        getProfissionais(),
      ]);
      setPacientes(pacientesData);
      setProfissionais(profissionaisData);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao carregar dados");
    } finally {
      setIsLoading(false);
    }
  };

  const loadPacientes = async () => {
    try {
      const data = await getPacientes({
        search: searchTerm,
        profissionalId: selectedProfissional || undefined,
      });
      setPacientes(data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao carregar pacientes");
    }
  };

  const handleOpenModal = (paciente?: Paciente) => {
    if (paciente) {
      setEditingPaciente(paciente);
      setFormData({
        nome: paciente.nome,
        telefone: formatPhone(paciente.telefone),
        email: paciente.email || "",
        observacoes: paciente.observacoes || "",
        profissionalId: paciente.profissionalId || "",
      });
    } else {
      setEditingPaciente(null);
      setFormData({
        nome: "",
        telefone: "",
        email: "",
        observacoes: "",
        profissionalId: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPaciente(null);
    setFormData({
      nome: "",
      telefone: "",
      email: "",
      observacoes: "",
      profissionalId: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Validar email
    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("E-mail inválido");
        setIsSubmitting(false);
        return;
      }
    }

    // Validar telefone
    const cleanPhone = formData.telefone.replace(/\D/g, "");
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      setError("Telefone deve ter 10 ou 11 dígitos");
      setIsSubmitting(false);
      return;
    }

    try {
      const data = {
        ...formData,
        telefone: cleanPhone,
        email: formData.email || undefined,
        observacoes: formData.observacoes || undefined,
        profissionalId: formData.profissionalId || undefined,
      };

      if (editingPaciente) {
        await updatePaciente(editingPaciente.id, data);
        setSuccess("Paciente atualizado com sucesso!");
      } else {
        await createPaciente(data);
        setSuccess("Paciente criado com sucesso!");
      }

      handleCloseModal();
      loadPacientes();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao salvar paciente");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (value: string) => {
    // Remove tudo que não é dígito
    const cleaned = value.replace(/\D/g, "");

    // Aplica máscara
    let formatted = cleaned;

    if (cleaned.length <= 10) {
      // (11) 1234-5678
      formatted = cleaned.replace(
        /(\d{2})(\d{4})(\d{0,4})/,
        (match, p1, p2, p3) => {
          if (p3) return `(${p1}) ${p2}-${p3}`;
          if (p2) return `(${p1}) ${p2}`;
          if (p1) return `(${p1}`;
          return match;
        }
      );
    } else {
      // (11) 91234-5678
      formatted = cleaned.replace(
        /(\d{2})(\d{5})(\d{0,4})/,
        (match, p1, p2, p3) => {
          if (p3) return `(${p1}) ${p2}-${p3}`;
          if (p2) return `(${p1}) ${p2}`;
          if (p1) return `(${p1}`;
          return match;
        }
      );
    }

    setFormData({ ...formData, telefone: formatted });
  };

  const handleDelete = async () => {
    if (!deletingPaciente) return;

    setIsSubmitting(true);
    try {
      await deletePaciente(deletingPaciente.id);
      setSuccess("Paciente excluído com sucesso!");
      setIsDeleteModalOpen(false);
      setDeletingPaciente(null);
      loadPacientes();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao excluir paciente");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEmLote = async () => {
    if (selectedIds.length === 0) return;

    setIsSubmitting(true);
    try {
      await deletePacientesEmLote(selectedIds);
      setSuccess(`${selectedIds.length} paciente(s) excluído(s) com sucesso!`);
      setSelectedIds([]);
      loadPacientes();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao excluir pacientes");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === pacientes.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(pacientes.map((p) => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
    return phone;
  };

  const columns = [
    {
      key: "select",
      header: (
        <input
          type="checkbox"
          checked={
            selectedIds.length === pacientes.length && pacientes.length > 0
          }
          onChange={toggleSelectAll}
          className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
        />
      ),
      render: (pac: Paciente) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(pac.id)}
          onChange={() => toggleSelect(pac.id)}
          className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
        />
      ),
    },
    {
      key: "nome",
      header: "Nome",
    },
    {
      key: "telefone",
      header: "Telefone",
      render: (pac: Paciente) => formatPhone(pac.telefone),
    },
    {
      key: "email",
      header: "E-mail",
      render: (pac: Paciente) => pac.email || "-",
    },
    {
      key: "profissional",
      header: "Profissional",
      render: (pac: Paciente) => pac.profissional?.nome || "-",
    },
    {
      key: "actions",
      header: "Ações",
      render: (pac: Paciente) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleOpenModal(pac)}
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
            onClick={() => {
              setDeletingPaciente(pac);
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Pacientes</h1>
          <p className="text-secondary-600 mt-1">
            Gerencie os pacientes cadastrados
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
          Novo Paciente
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

      {/* Filtros e Ações em Lote */}
      <Card>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Buscar por nome ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="min-w-[200px]">
            <select
              value={selectedProfissional}
              onChange={(e) => setSelectedProfissional(e.target.value)}
              className="block w-full px-3 py-2 border border-secondary-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Todos os profissionais</option>
              {profissionais.map((prof) => (
                <option key={prof.id} value={prof.id}>
                  {prof.nome}
                </option>
              ))}
            </select>
          </div>

          {selectedIds.length > 0 && (
            <Button
              variant="danger"
              onClick={handleDeleteEmLote}
              disabled={isSubmitting}
            >
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Excluir Selecionados ({selectedIds.length})
            </Button>
          )}
        </div>
      </Card>

      <Card>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <Table data={pacientes} columns={columns} />
        )}
      </Card>

      {/* Modal Criar/Editar */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingPaciente ? "Editar Paciente" : "Novo Paciente"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome Completo"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            required
          />

          <Input
            label="Telefone"
            type="tel"
            value={formData.telefone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder="(11) 98765-4321"
            maxLength={15}
            required
          />

          <Input
            label="E-mail (opcional)"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="paciente@email.com"
          />

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Profissional Responsável
            </label>
            <select
              value={formData.profissionalId}
              onChange={(e) =>
                setFormData({ ...formData, profissionalId: e.target.value })
              }
              className="block w-full px-3 py-2 border border-secondary-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Nenhum</option>
              {profissionais.map((prof) => (
                <option key={prof.id} value={prof.id}>
                  {prof.nome}
                </option>
              ))}
            </select>
          </div>

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
              placeholder="Informações adicionais..."
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
              {editingPaciente ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Confirmar Exclusão */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingPaciente(null);
        }}
        title="Confirmar Exclusão"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-secondary-600">
            Tem certeza que deseja excluir o paciente{" "}
            <strong>{deletingPaciente?.nome}</strong>? Esta ação não pode ser
            desfeita.
          </p>

          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeletingPaciente(null);
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
