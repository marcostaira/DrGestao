"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Atendimento,
  ProcedimentoRealizado,
  CreateAtendimentoData,
  UpdateAtendimentoData,
  getAtendimentos,
  getAtendimentoById,
  getAtendimentoByAgendamentoId,
  createAtendimento,
  updateAtendimento,
  deleteAtendimento,
} from "@/services/atendimentoService";
import {
  getAgendamentos,
  Agendamento,
  StatusAgendamento,
  updateStatus,
} from "@/services/agendamentoService";
import { getProfissionais, Profissional } from "@/services/profissionalService";
import { getPacientes, Paciente } from "@/services/pacienteService";
import { getProcedimentos, Procedimento } from "@/services/procedimentoService";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import Alert from "@/components/ui/Alert";

export default function AtendimentosPage() {
  const searchParams = useSearchParams();
  const agendamentoIdFromUrl = searchParams.get("agendamentoId");

  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [procedimentos, setProcedimentos] = useState<Procedimento[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Filtros
  const [selectedProfissional, setSelectedProfissional] = useState("");
  const [selectedPaciente, setSelectedPaciente] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [editingAtendimento, setEditingAtendimento] =
    useState<Atendimento | null>(null);
  const [selectedAtendimento, setSelectedAtendimento] =
    useState<Atendimento | null>(null);
  const [deletingAtendimento, setDeletingAtendimento] =
    useState<Atendimento | null>(null);
  const [changingStatusAgendamento, setChangingStatusAgendamento] =
    useState<Agendamento | null>(null);
  const [newStatus, setNewStatus] = useState<StatusAgendamento | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [formData, setFormData] = useState<CreateAtendimentoData>({
    agendamentoId: "",
    anotacoes: "",
    procedimentosRealizados: [],
  });

  // Procedimentos realizados
  const [selectedProcedimentos, setSelectedProcedimentos] = useState<string[]>(
    []
  );

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (agendamentoIdFromUrl && agendamentos.length > 0) {
      checkAndOpenAtendimento(agendamentoIdFromUrl);
    }
  }, [agendamentoIdFromUrl, agendamentos]);

  useEffect(() => {
    loadAtendimentos();
  }, [selectedProfissional, selectedPaciente, dataInicio, dataFim]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [
        atendimentosData,
        agendamentosData,
        profissionaisData,
        pacientesData,
        procedimentosData,
      ] = await Promise.all([
        getAtendimentos(),
        getAgendamentos(),
        getProfissionais(),
        getPacientes(),
        getProcedimentos(),
      ]);

      setAtendimentos(atendimentosData);
      setAgendamentos(agendamentosData);
      setProfissionais(profissionaisData);
      setPacientes(pacientesData);
      setProcedimentos(procedimentosData);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao carregar dados");
    } finally {
      setIsLoading(false);
    }
  };

  const checkAndOpenAtendimento = async (agendamentoId: string) => {
    try {
      const existingAtendimento = await getAtendimentoByAgendamentoId(
        agendamentoId
      );

      if (existingAtendimento) {
        setSelectedAtendimento(existingAtendimento);
        setIsDetailModalOpen(true);
      } else {
        const agendamento = agendamentos.find((ag) => ag.id === agendamentoId);
        if (agendamento) {
          handleOpenModal(undefined, agendamento);
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao verificar atendimento");
    }
  };

  const loadAtendimentos = async () => {
    try {
      const filters = {
        profissionalId: selectedProfissional || undefined,
        pacienteId: selectedPaciente || undefined,
        dataInicio: dataInicio || undefined,
        dataFim: dataFim || undefined,
      };

      const data = await getAtendimentos(filters);
      setAtendimentos(data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao carregar atendimentos");
    }
  };

  const getNextStatus = (
    currentStatus: StatusAgendamento
  ): StatusAgendamento | null => {
    const statusFlow: Record<StatusAgendamento, StatusAgendamento | null> = {
      [StatusAgendamento.MARCADO]: StatusAgendamento.CONFIRMADO,
      [StatusAgendamento.CONFIRMADO]: StatusAgendamento.COMPARECEU,
      [StatusAgendamento.COMPARECEU]: null,
      [StatusAgendamento.FALTOU]: null,
      [StatusAgendamento.CANCELADO]: null,
    };
    return statusFlow[currentStatus];
  };

  const getNextStatusLabel = (currentStatus: StatusAgendamento): string => {
    const nextStatus = getNextStatus(currentStatus);
    if (!nextStatus) return "";

    const labels: Record<StatusAgendamento, string> = {
      [StatusAgendamento.MARCADO]: "",
      [StatusAgendamento.CONFIRMADO]: "Confirmar",
      [StatusAgendamento.COMPARECEU]: "Compareceu",
      [StatusAgendamento.FALTOU]: "",
      [StatusAgendamento.CANCELADO]: "",
    };
    return labels[nextStatus] || "";
  };

  const getStatusDisplayName = (status: StatusAgendamento): string => {
    const names: Record<StatusAgendamento, string> = {
      [StatusAgendamento.MARCADO]: "Marcado",
      [StatusAgendamento.CONFIRMADO]: "Confirmado",
      [StatusAgendamento.COMPARECEU]: "Compareceu",
      [StatusAgendamento.FALTOU]: "Faltou",
      [StatusAgendamento.CANCELADO]: "Cancelado",
    };
    return names[status];
  };

  const handleToggleStatus = async (
    agendamentoId: string,
    currentStatus: StatusAgendamento
  ) => {
    const nextStatus = getNextStatus(currentStatus);
    if (!nextStatus) return;

    try {
      await updateStatus(agendamentoId, nextStatus);
      setSuccess(`Status atualizado para ${nextStatus}!`);
      await loadData();
      setTimeout(() => setSuccess(""), 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao atualizar status");
    }
  };

  const handleOpenStatusModal = (
    agendamento: Agendamento,
    status: StatusAgendamento
  ) => {
    setChangingStatusAgendamento(agendamento);
    setNewStatus(status);
    setIsStatusModalOpen(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!changingStatusAgendamento || !newStatus) return;

    setIsSubmitting(true);
    try {
      await updateStatus(changingStatusAgendamento.id, newStatus);
      setSuccess(`Status atualizado para ${getStatusDisplayName(newStatus)}!`);
      setIsStatusModalOpen(false);
      setChangingStatusAgendamento(null);
      setNewStatus(null);
      await loadData();
      setTimeout(() => setSuccess(""), 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao atualizar status");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadgeVariant = (status: StatusAgendamento) => {
    const variants: Record<
      StatusAgendamento,
      "warning" | "success" | "info" | "danger" | "default"
    > = {
      [StatusAgendamento.MARCADO]: "warning",
      [StatusAgendamento.CONFIRMADO]: "success",
      [StatusAgendamento.COMPARECEU]: "info",
      [StatusAgendamento.FALTOU]: "danger",
      [StatusAgendamento.CANCELADO]: "default",
    };
    return variants[status];
  };

  const agendamentosSemAtendimento = agendamentos.filter(
    (ag) =>
      !atendimentos.some((at) => at.agendamentoId === ag.id) &&
      ag.status === StatusAgendamento.COMPARECEU
  );

  const agendamentosHoje = agendamentos
    .filter((ag) => {
      const agDate = new Date(ag.dataHora);
      const today = new Date();
      return (
        agDate.getDate() === today.getDate() &&
        agDate.getMonth() === today.getMonth() &&
        agDate.getFullYear() === today.getFullYear()
      );
    })
    .sort(
      (a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime()
    );

  const handleOpenModal = (
    atendimento?: Atendimento,
    agendamento?: Agendamento
  ) => {
    if (atendimento) {
      setEditingAtendimento(atendimento);
      setFormData({
        agendamentoId: atendimento.agendamentoId,
        anotacoes: atendimento.anotacoes || "",
        procedimentosRealizados: atendimento.procedimentosRealizados,
      });
      setSelectedProcedimentos(
        atendimento.procedimentosRealizados.map((p) => p.procedimentoId)
      );
    } else if (agendamento) {
      setEditingAtendimento(null);
      setFormData({
        agendamentoId: agendamento.id,
        anotacoes: "",
        procedimentosRealizados: agendamento.procedimento
          ? [
              {
                procedimentoId: agendamento.procedimento.id,
                nome: agendamento.procedimento.nome,
              },
            ]
          : [],
      });
      setSelectedProcedimentos(
        agendamento.procedimento ? [agendamento.procedimento.id] : []
      );
    } else {
      setEditingAtendimento(null);
      setFormData({
        agendamentoId: "",
        anotacoes: "",
        procedimentosRealizados: [],
      });
      setSelectedProcedimentos([]);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAtendimento(null);
    setSelectedProcedimentos([]);
  };

  const handleToggleProcedimento = (procedimentoId: string) => {
    if (selectedProcedimentos.includes(procedimentoId)) {
      setSelectedProcedimentos(
        selectedProcedimentos.filter((id) => id !== procedimentoId)
      );
    } else {
      setSelectedProcedimentos([...selectedProcedimentos, procedimentoId]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const procedimentosRealizados: ProcedimentoRealizado[] =
        selectedProcedimentos.map((id) => {
          const proc = procedimentos.find((p) => p.id === id);
          return {
            procedimentoId: id,
            nome: proc?.nome || "",
            valor: proc?.valor,
          };
        });

      const data = {
        ...formData,
        anotacoes: formData.anotacoes || undefined,
        procedimentosRealizados,
      };

      if (editingAtendimento) {
        await updateAtendimento(editingAtendimento.id, data);
        setSuccess("Atendimento atualizado com sucesso!");
      } else {
        await createAtendimento(data);
        setSuccess("Atendimento registrado com sucesso!");
      }

      handleCloseModal();
      await loadAtendimentos();
      await loadData();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao salvar atendimento");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingAtendimento) return;

    setIsSubmitting(true);
    try {
      await deleteAtendimento(deletingAtendimento.id);
      setSuccess("Atendimento excluído com sucesso!");
      setIsDeleteModalOpen(false);
      setDeletingAtendimento(null);
      await loadAtendimentos();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao excluir atendimento");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const columns = [
    {
      key: "dataHora",
      header: "Data/Hora",
      render: (atend: Atendimento) =>
        formatDateTime(atend.agendamento.dataHora),
    },
    {
      key: "paciente",
      header: "Paciente",
      render: (atend: Atendimento) => atend.paciente.nome,
    },
    {
      key: "profissional",
      header: "Profissional",
      render: (atend: Atendimento) => atend.profissional.nome,
    },
    {
      key: "procedimentos",
      header: "Procedimentos",
      render: (atend: Atendimento) => (
        <div className="flex flex-wrap gap-1">
          {atend.procedimentosRealizados.slice(0, 2).map((proc, idx) => (
            <Badge key={idx} variant="info" size="sm">
              {proc.nome}
            </Badge>
          ))}
          {atend.procedimentosRealizados.length > 2 && (
            <Badge variant="default" size="sm">
              +{atend.procedimentosRealizados.length - 2}
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Ações",
      render: (atend: Atendimento) => (
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => {
              setSelectedAtendimento(atend);
              setIsDetailModalOpen(true);
            }}
            className="text-primary-600 hover:text-primary-800"
            title="Ver detalhes"
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>

          <button
            onClick={() => handleOpenModal(atend)}
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
              setDeletingAtendimento(atend);
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
          <h1 className="text-2xl font-bold text-secondary-900">
            Atendimentos
          </h1>
          <p className="text-secondary-600 mt-1">
            Registre e gerencie os atendimentos realizados
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
          Novo Atendimento
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

      {/* Agendamentos do Dia */}
      <Card title="Agendamentos de Hoje">
        {agendamentosHoje.length === 0 ? (
          <p className="text-center text-secondary-500 py-4">
            Nenhum agendamento para hoje
          </p>
        ) : (
          <div className="space-y-3">
            {agendamentosHoje.map((ag) => {
              const hasAtendimento = atendimentos.some(
                (at) => at.agendamentoId === ag.id
              );

              return (
                <div
                  key={ag.id}
                  className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg hover:border-primary-500 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-medium text-secondary-900">
                        {new Date(ag.dataHora).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span className="text-secondary-600">•</span>
                      <span className="font-medium text-secondary-900">
                        {ag.paciente?.nome || "Bloqueio"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-secondary-500">
                      <span>{ag.profissional.nome}</span>
                      {ag.procedimento && (
                        <>
                          <span>•</span>
                          <span>{ag.procedimento.nome}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3">
                      <Badge variant={getStatusBadgeVariant(ag.status)}>
                        {ag.status}
                      </Badge>

                      {getNextStatus(ag.status) && !hasAtendimento && (
                        <Button
                          size="sm"
                          onClick={() => handleToggleStatus(ag.id, ag.status)}
                          className="gap-1"
                        >
                          {getNextStatusLabel(ag.status)}
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Button>
                      )}

                      {/* Botões de Cancelar e Faltou */}
                      {!hasAtendimento &&
                        ag.status !== StatusAgendamento.CANCELADO &&
                        ag.status !== StatusAgendamento.FALTOU && (
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleOpenStatusModal(
                                  ag,
                                  StatusAgendamento.FALTOU
                                )
                              }
                              className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 border border-red-300 rounded transition-colors"
                              title="Marcar como Faltou"
                            >
                              Faltou
                            </button>
                            <button
                              onClick={() =>
                                handleOpenStatusModal(
                                  ag,
                                  StatusAgendamento.CANCELADO
                                )
                              }
                              className="px-2 py-1 text-xs text-secondary-600 hover:bg-secondary-100 border border-secondary-300 rounded transition-colors"
                              title="Cancelar agendamento"
                            >
                              Cancelar
                            </button>
                          </div>
                        )}
                    </div>

                    {hasAtendimento ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          const atendimento = atendimentos.find(
                            (at) => at.agendamentoId === ag.id
                          );
                          if (atendimento) {
                            setSelectedAtendimento(atendimento);
                            setIsDetailModalOpen(true);
                          }
                        }}
                      >
                        Ver Atendimento
                      </Button>
                    ) : ag.status === StatusAgendamento.COMPARECEU ? (
                      <Button
                        size="sm"
                        onClick={() => handleOpenModal(undefined, ag)}
                      >
                        Registrar Atendimento
                      </Button>
                    ) : ag.status === StatusAgendamento.FALTOU ? (
                      <span className="text-sm text-red-600 font-medium">
                        Não compareceu
                      </span>
                    ) : ag.status === StatusAgendamento.CANCELADO ? (
                      <span className="text-sm text-secondary-400">
                        Cancelado
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Agendamentos Pendentes de Atendimento */}
      {agendamentosSemAtendimento.length > 0 && (
        <Card title="Outros Agendamentos Pendentes de Atendimento">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agendamentosSemAtendimento.slice(0, 6).map((ag) => (
              <div
                key={ag.id}
                className="p-4 border border-secondary-200 rounded-lg hover:border-primary-500 transition-colors cursor-pointer"
                onClick={() => handleOpenModal(undefined, ag)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-secondary-900">
                      {ag.paciente?.nome}
                    </p>
                    <p className="text-sm text-secondary-600">
                      {formatDateTime(ag.dataHora)}
                    </p>
                  </div>
                  <Badge variant="warning" size="sm">
                    Pendente
                  </Badge>
                </div>
                {ag.procedimento && (
                  <p className="text-sm text-secondary-500">
                    {ag.procedimento.nome}
                  </p>
                )}
              </div>
            ))}
          </div>
          {agendamentosSemAtendimento.length > 6 && (
            <p className="mt-4 text-sm text-secondary-500 text-center">
              E mais {agendamentosSemAtendimento.length - 6} agendamento(s)
              pendente(s)
            </p>
          )}
        </Card>
      )}

      {/* Filtros */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Profissional
            </label>
            <select
              value={selectedProfissional}
              onChange={(e) => setSelectedProfissional(e.target.value)}
              className="block w-full px-3 py-2 border border-secondary-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Todos</option>
              {profissionais.map((prof) => (
                <option key={prof.id} value={prof.id}>
                  {prof.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Paciente
            </label>
            <select
              value={selectedPaciente}
              onChange={(e) => setSelectedPaciente(e.target.value)}
              className="block w-full px-3 py-2 border border-secondary-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Todos</option>
              {pacientes.map((pac) => (
                <option key={pac.id} value={pac.id}>
                  {pac.nome}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Data Início"
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />

          <Input
            label="Data Fim"
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </div>
      </Card>

      {/* Tabela de Atendimentos */}
      <Card>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <Table
            data={atendimentos}
            columns={columns}
            onRowClick={(atendimento) => {
              setSelectedAtendimento(atendimento);
              setIsDetailModalOpen(true);
            }}
            emptyMessage="Nenhum atendimento registrado"
          />
        )}
      </Card>

      {/* Modal Criar/Editar Atendimento */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingAtendimento ? "Editar Atendimento" : "Novo Atendimento"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Agendamento <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.agendamentoId}
              onChange={(e) =>
                setFormData({ ...formData, agendamentoId: e.target.value })
              }
              className="block w-full px-3 py-2 border border-secondary-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
              disabled={!!editingAtendimento}
            >
              <option value="">Selecione um agendamento</option>
              {agendamentosSemAtendimento.map((ag) => (
                <option key={ag.id} value={ag.id}>
                  {ag.paciente?.nome} - {formatDateTime(ag.dataHora)}
                </option>
              ))}
              {editingAtendimento && (
                <option value={editingAtendimento.agendamentoId}>
                  {editingAtendimento.paciente.nome} -{" "}
                  {formatDateTime(editingAtendimento.agendamento.dataHora)}
                </option>
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Procedimentos Realizados
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto border border-secondary-200 rounded-lg p-3">
              {procedimentos.map((proc) => (
                <label
                  key={proc.id}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-secondary-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedProcedimentos.includes(proc.id)}
                    onChange={() => handleToggleProcedimento(proc.id)}
                    className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-secondary-900">
                      {proc.nome}
                    </span>
                    <div className="text-xs text-secondary-500">
                      {proc.duracaoMinutos}min
                      {proc.valor && ` - R$ ${Number(proc.valor).toFixed(2)}`}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Anotações
            </label>
            <textarea
              value={formData.anotacoes}
              onChange={(e) =>
                setFormData({ ...formData, anotacoes: e.target.value })
              }
              rows={6}
              className="block w-full px-3 py-2 border border-secondary-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Registre observações, diagnósticos, prescrições, etc..."
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
              {editingAtendimento ? "Atualizar" : "Registrar"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Detalhes do Atendimento */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedAtendimento(null);
        }}
        title="Detalhes do Atendimento"
        size="lg"
      >
        {selectedAtendimento && (
          <div className="space-y-4">
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsDetailModalOpen(false);
                  handleOpenModal(selectedAtendimento);
                }}
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
            </div>

            <div className="space-y-3 py-4 border-t border-b border-secondary-200">
              <div>
                <span className="text-sm text-secondary-600">Data e Hora:</span>
                <p className="font-medium">
                  {formatDateTime(selectedAtendimento.agendamento.dataHora)}
                </p>
              </div>

              <div>
                <span className="text-sm text-secondary-600">Paciente:</span>
                <p className="font-medium">
                  {selectedAtendimento.paciente.nome}
                </p>
                <p className="text-sm text-secondary-500">
                  {selectedAtendimento.paciente.telefone}
                </p>
              </div>

              <div>
                <span className="text-sm text-secondary-600">
                  Profissional:
                </span>
                <p className="font-medium">
                  {selectedAtendimento.profissional.nome}
                </p>
              </div>

              <div>
                <span className="text-sm text-secondary-600">
                  Procedimentos Realizados:
                </span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedAtendimento.procedimentosRealizados.map(
                    (proc, idx) => (
                      <Badge key={idx} variant="info">
                        {proc.nome}
                        {proc.valor && ` - R$ ${Number(proc.valor).toFixed(2)}`}
                      </Badge>
                    )
                  )}
                </div>
              </div>

              {selectedAtendimento.anotacoes && (
                <div>
                  <span className="text-sm text-secondary-600">Anotações:</span>
                  <div className="mt-2 p-4 bg-secondary-50 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">
                      {selectedAtendimento.anotacoes}
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-2 text-xs text-secondary-500">
                <p>
                  Registrado em:{" "}
                  {new Date(selectedAtendimento.createdAt).toLocaleString(
                    "pt-BR"
                  )}
                </p>
                {selectedAtendimento.updatedAt !==
                  selectedAtendimento.createdAt && (
                  <p>
                    Atualizado em:{" "}
                    {new Date(selectedAtendimento.updatedAt).toLocaleString(
                      "pt-BR"
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Confirmar Mudança de Status */}
      <Modal
        isOpen={isStatusModalOpen}
        onClose={() => {
          setIsStatusModalOpen(false);
          setChangingStatusAgendamento(null);
          setNewStatus(null);
        }}
        title="Confirmar Alteração de Status"
        size="sm"
      >
        {changingStatusAgendamento && newStatus && (
          <div className="space-y-4">
            <div className="p-4 bg-secondary-50 rounded-lg">
              <p className="text-sm text-secondary-600 mb-1">Paciente:</p>
              <p className="font-medium">
                {changingStatusAgendamento.paciente?.nome || "Bloqueio"}
              </p>
              <p className="text-sm text-secondary-600 mt-2">Horário:</p>
              <p className="font-medium">
                {new Date(changingStatusAgendamento.dataHora).toLocaleString(
                  "pt-BR",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </p>
            </div>

            <p className="text-secondary-600">
              {newStatus === StatusAgendamento.FALTOU && (
                <>
                  Confirma que o paciente <strong>não compareceu</strong> ao
                  atendimento?
                </>
              )}
              {newStatus === StatusAgendamento.CANCELADO && (
                <>
                  Confirma o <strong>cancelamento</strong> deste agendamento?
                </>
              )}
            </p>

            <div className="flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => {
                  setIsStatusModalOpen(false);
                  setChangingStatusAgendamento(null);
                  setNewStatus(null);
                }}
                disabled={isSubmitting}
              >
                Não, manter como está
              </Button>
              <Button
                variant={
                  newStatus === StatusAgendamento.FALTOU
                    ? "danger"
                    : newStatus === StatusAgendamento.CANCELADO
                    ? "secondary"
                    : "primary"
                }
                onClick={handleConfirmStatusChange}
                isLoading={isSubmitting}
              >
                {newStatus === StatusAgendamento.FALTOU &&
                  "Sim, marcar como Faltou"}
                {newStatus === StatusAgendamento.CANCELADO &&
                  "Sim, cancelar agendamento"}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Confirmar Exclusão */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingAtendimento(null);
        }}
        title="Confirmar Exclusão"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-secondary-600">
            Tem certeza que deseja excluir este atendimento? Esta ação não pode
            ser desfeita.
          </p>

          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeletingAtendimento(null);
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
