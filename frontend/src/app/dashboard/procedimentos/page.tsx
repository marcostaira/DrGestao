"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import {
  Procedimento,
  CreateProcedimentoData,
  UpdateProcedimentoData,
  getProcedimentos,
  createProcedimento,
  updateProcedimento,
  deleteProcedimento,
} from "@/services/procedimentoService";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Alert from "@/components/ui/Alert";

export default function ProcedimentosPage() {
  const { isAdmin } = useAuth();
  const router = useRouter();

  const [procedimentos, setProcedimentos] = useState<Procedimento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProcedimento, setEditingProcedimento] =
    useState<Procedimento | null>(null);
  const [deletingProcedimento, setDeletingProcedimento] =
    useState<Procedimento | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [formData, setFormData] = useState<CreateProcedimentoData>({
    nome: "",
    valor: undefined,
    duracaoMinutos: 30,
    temStatus: false, // ✅ NOVO CAMPO
  });

  useEffect(() => {
    if (!isAdmin) {
      router.push("/dashboard");
      return;
    }
    loadProcedimentos();
  }, [isAdmin, router]);

  const loadProcedimentos = async () => {
    try {
      setIsLoading(true);
      const data = await getProcedimentos();
      setProcedimentos(data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao carregar procedimentos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (procedimento?: Procedimento) => {
    if (procedimento) {
      setEditingProcedimento(procedimento);
      setFormData({
        nome: procedimento.nome,
        valor: procedimento.valor,
        duracaoMinutos: procedimento.duracaoMinutos,
        temStatus: procedimento.temStatus || false, // ✅ NOVO CAMPO
      });
    } else {
      setEditingProcedimento(null);
      setFormData({
        nome: "",
        valor: undefined,
        duracaoMinutos: 30,
        temStatus: false, // ✅ NOVO CAMPO
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProcedimento(null);
    setFormData({
      nome: "",
      valor: undefined,
      duracaoMinutos: 30,
      temStatus: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const data = {
        ...formData,
        valor: formData.valor ? Number(formData.valor) : undefined,
        duracaoMinutos: Number(formData.duracaoMinutos),
      };

      if (editingProcedimento) {
        await updateProcedimento(editingProcedimento.id, data);
        setSuccess("Procedimento atualizado com sucesso!");
      } else {
        await createProcedimento(data);
        setSuccess("Procedimento criado com sucesso!");
      }

      handleCloseModal();
      loadProcedimentos();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao salvar procedimento");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingProcedimento) return;

    setIsSubmitting(true);
    try {
      await deleteProcedimento(deletingProcedimento.id);
      setSuccess("Procedimento excluído com sucesso!");
      setIsDeleteModalOpen(false);
      setDeletingProcedimento(null);
      loadProcedimentos();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao excluir procedimento");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (value?: number) => {
    if (!value) return "-";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  const columns = [
    {
      key: "nome",
      header: "Nome",
    },
    {
      key: "valor",
      header: "Valor",
      render: (proc: Procedimento) => formatCurrency(proc.valor),
    },
    {
      key: "duracaoMinutos",
      header: "Duração",
      render: (proc: Procedimento) => formatDuration(proc.duracaoMinutos),
    },
    // ✅ NOVA COLUNA
    {
      key: "temStatus",
      header: "Controle de Progresso",
      render: (proc: Procedimento) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            proc.temStatus
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {proc.temStatus ? "✓ Sim" : "✗ Não"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Ações",
      render: (proc: Procedimento) => (
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => handleOpenModal(proc)}
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
              setDeletingProcedimento(proc);
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
            Procedimentos
          </h1>
          <p className="text-secondary-600 mt-1">
            Gerencie os procedimentos e seus valores
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
          Novo Procedimento
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
            data={procedimentos}
            columns={columns}
            onRowClick={(procedimento) => handleOpenModal(procedimento)}
          />
        )}
      </Card>

      {/* Modal Criar/Editar */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          editingProcedimento ? "Editar Procedimento" : "Novo Procedimento"
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome do Procedimento"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            placeholder="Ex: Limpeza, Consulta..."
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Valor (opcional)"
              type="number"
              step="0.01"
              value={formData.valor || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  valor: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              placeholder="0.00"
            />

            <Input
              label="Duração (minutos)"
              type="number"
              value={formData.duracaoMinutos}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  duracaoMinutos: Number(e.target.value),
                })
              }
              min="5"
              step="5"
              required
            />
          </div>

          {/* ✅ NOVO CAMPO - CONTROLE DE PROGRESSO */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="temStatus"
                  type="checkbox"
                  checked={formData.temStatus}
                  onChange={(e) =>
                    setFormData({ ...formData, temStatus: e.target.checked })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3">
                <label
                  htmlFor="temStatus"
                  className="font-medium text-gray-900 cursor-pointer"
                >
                  Habilitar controle de progresso
                </label>
                <p className="text-sm text-gray-500 mt-1">
                  Permite acompanhar o percentual de conclusão quando este
                  procedimento for adicionado a um plano de tratamento (ex:
                  implantes, ortodontia)
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseModal}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {editingProcedimento ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Confirmar Exclusão */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingProcedimento(null);
        }}
        title="Confirmar Exclusão"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-secondary-600">
            Tem certeza que deseja excluir o procedimento{" "}
            <strong>{deletingProcedimento?.nome}</strong>? Esta ação não pode
            ser desfeita.
          </p>

          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeletingProcedimento(null);
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
