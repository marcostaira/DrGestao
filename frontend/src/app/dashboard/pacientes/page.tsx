"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Paciente,
  getPacientes,
  deletePaciente,
  deletePacientesEmLote,
} from "@/services/pacienteService";
import { getProfissionais, Profissional } from "@/services/profissionalService";
import { calcularIdade } from "@/services/cepService";
import { usePermissoes } from "@/hooks/usePermissoes";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Modulo } from "@/types/autorizacao.types";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Modal from "@/components/ui/Modal";
import Alert from "@/components/ui/Alert";

export default function PacientesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const successParam = searchParams?.get("success");
  const { pacientes: permissoesPacientes } = usePermissoes();

  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfissional, setSelectedProfissional] = useState("");

  // Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingPaciente, setDeletingPaciente] = useState<Paciente | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Seleção múltipla
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (successParam === "cadastrado") {
      setSuccess("Paciente cadastrado com sucesso!");
      setTimeout(() => setSuccess(""), 3000);
      router.replace("/dashboard/pacientes");
    } else if (successParam === "atualizado") {
      setSuccess("Paciente atualizado com sucesso!");
      setTimeout(() => setSuccess(""), 3000);
      router.replace("/dashboard/pacientes");
    }
  }, [successParam, router]);

  useEffect(() => {
    loadPacientes();
  }, [searchTerm, selectedProfissional]);

  const loadData = async () => {
    try {
      setIsLoading(true);

      // Carregar pacientes (você tem permissão)
      const pacientesData = await getPacientes();
      setPacientes(pacientesData);

      // Tentar carregar profissionais (pode falhar se não tiver permissão)
      if (permissoesPacientes.visualizar) {
        try {
          const profissionaisData = await getProfissionais();
          setProfissionais(profissionaisData);
        } catch (profErr: any) {
          // Silenciosamente ignora se não tiver permissão
          console.log("Sem permissão para carregar profissionais");
          setProfissionais([]);
        }
      }
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError("Você não tem permissão para visualizar pacientes");
      } else {
        setError(err.response?.data?.error || "Erro ao carregar dados");
      }
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
      // Apenas mostra erro se for 403 em pacientes
      if (err.response?.status === 403) {
        setError("Você não tem permissão para visualizar pacientes");
      }
      // Ignora outros erros silenciosamente
    }
  };

  const handleDelete = async () => {
    if (!deletingPaciente) return;

    setIsSubmitting(true);
    try {
      await deletePaciente(deletingPaciente.id);
      setSuccess("Paciente excluído com sucesso!");
      setIsDeleteModalOpen(false);
      setDeletingPaciente(null);
      await loadPacientes();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError("Você não tem permissão para excluir pacientes");
      } else {
        setError(err.response?.data?.error || "Erro ao excluir paciente");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBatchDelete = async () => {
    if (selectedIds.length === 0) return;

    if (!confirm(`Deseja excluir ${selectedIds.length} paciente(s)?`)) return;

    try {
      await deletePacientesEmLote(selectedIds);
      setSuccess(`${selectedIds.length} paciente(s) excluído(s) com sucesso!`);
      setSelectedIds([]);
      await loadPacientes();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError("Você não tem permissão para excluir pacientes");
      } else {
        setError(err.response?.data?.error || "Erro ao excluir pacientes");
      }
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === pacientes.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(pacientes.map((p) => p.id));
    }
  };

  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(
        7
      )}`;
    }
    return phone;
  };

  const columns = [
    // Checkbox de seleção - só aparece se tiver permissão para excluir
    ...(permissoesPacientes.criarAlterar
      ? [
          {
            key: "select",
            header: (
              <input
                type="checkbox"
                checked={
                  selectedIds.length === pacientes.length &&
                  pacientes.length > 0
                }
                onChange={toggleSelectAll}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
            ),
            render: (pac: Paciente) => (
              <input
                type="checkbox"
                checked={selectedIds.includes(pac.id)}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleSelect(pac.id);
                }}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
            ),
          },
        ]
      : []),
    {
      key: "nome",
      header: "Nome",
      render: (pac: Paciente) => (
        <div>
          <div className="font-medium">{pac.nome}</div>
          {pac.menorIdade && (
            <span className="text-xs text-orange-600">Menor de idade</span>
          )}
        </div>
      ),
    },
    {
      key: "idade",
      header: "Idade",
      render: (pac: Paciente) =>
        pac.dataNascimento ? `${calcularIdade(pac.dataNascimento)} anos` : "-",
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
    // Coluna de ações - só aparece se tiver permissão
    ...(permissoesPacientes.criarAlterar
      ? [
          {
            key: "actions",
            header: "Ações",
            render: (pac: Paciente) => (
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() =>
                    router.push(`/dashboard/pacientes/${pacienteId}/anamnese`)
                  }
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <DocumentTextIcon className="h-5 w-5 mr-2 text-gray-500" />
                  Anamneses
                </button>
                <button
                  onClick={() =>
                    router.push(`/dashboard/pacientes/${pac.id}/editar`)
                  }
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
        ]
      : []),
  ];

  return (
    <ProtectedRoute modulo={Modulo.PACIENTES} tipo="visualizar">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pacientes</h1>
            <p className="text-gray-600 mt-1">
              Gerencie o cadastro de pacientes
            </p>
          </div>

          {/* Botão de novo paciente - só aparece se tiver permissão */}
          {permissoesPacientes.criarAlterar && (
            <Button onClick={() => router.push("/dashboard/pacientes/novo")}>
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
          )}
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

        {/* Filtros */}
        <Card>
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar paciente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <select
              value={selectedProfissional}
              onChange={(e) => setSelectedProfissional(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Todos os profissionais</option>
              {profissionais.map((prof) => (
                <option key={prof.id} value={prof.id}>
                  {prof.nome}
                </option>
              ))}
            </select>

            {/* Botão de excluir em lote - só aparece se tiver permissão e itens selecionados */}
            {permissoesPacientes.criarAlterar && selectedIds.length > 0 && (
              <Button variant="danger" onClick={handleBatchDelete}>
                Excluir Selecionados ({selectedIds.length})
              </Button>
            )}
          </div>
        </Card>

        {/* Tabela */}
        <Card>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <Table
              data={pacientes}
              columns={columns}
              onRowClick={
                permissoesPacientes.criarAlterar
                  ? (paciente) => {
                      router.push(`/dashboard/pacientes/${paciente.id}/editar`);
                    }
                  : undefined
              }
              emptyMessage="Nenhum paciente cadastrado"
            />
          )}
        </Card>

        {/* Modal Confirmar Exclusão - só renderiza se tiver permissão */}
        {permissoesPacientes.criarAlterar && (
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
              <p className="text-gray-600">
                Tem certeza que deseja excluir o paciente{" "}
                <strong>{deletingPaciente?.nome}</strong>? Esta ação não pode
                ser desfeita.
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
        )}
      </div>
    </ProtectedRoute>
  );
}
