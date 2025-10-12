// frontend/src/components/atendimentos/CriarAvaliacaoModal.tsx

"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { toast } from "react-hot-toast";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import api from "@/lib/api";

interface CriarAvaliacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  paciente: {
    id: string;
    nome: string;
  };
}

interface ProcedimentoSelecionado {
  procedimentoId: string;
  ordem: number;
  observacoes?: string;
  valorPraticado?: number;
}

interface Procedimento {
  id: string;
  nome: string;
  valor: string | number;
}

interface Profissional {
  id: string;
  nome: string;
  ativo: boolean;
}

export function CriarAvaliacaoModal({
  isOpen,
  onClose,
  onSuccess,
  paciente,
}: CriarAvaliacaoModalProps) {
  const [loading, setLoading] = useState(false);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [procedimentos, setProcedimentos] = useState<Procedimento[]>([]);
  const [profissionalId, setProfissionalId] = useState("");
  const [anotacoes, setAnotacoes] = useState("");
  const [procedimentosSelecionados, setProcedimentosSelecionados] = useState<
    ProcedimentoSelecionado[]
  >([]);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    try {
      const [profissionaisRes, procedimentosRes] = await Promise.all([
        api.get("/profissionais"),
        api.get("/procedimentos"),
      ]);

      setProfissionais(profissionaisRes.data.data || []);
      setProcedimentos(procedimentosRes.data.data || []);

      // Selecionar profissional ativo automaticamente se houver apenas um
      const profissionalAtivo = profissionaisRes.data.data?.find(
        (p: Profissional) => p.ativo
      );
      if (profissionalAtivo) {
        setProfissionalId(profissionalAtivo.id);
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      toast.error("Erro ao carregar profissionais e procedimentos");
    }
  };

  const handleAddProcedimento = () => {
    setProcedimentosSelecionados([
      ...procedimentosSelecionados,
      {
        procedimentoId: "",
        ordem: procedimentosSelecionados.length + 1,
        observacoes: "",
        valorPraticado: undefined,
      },
    ]);
  };

  const handleRemoveProcedimento = (index: number) => {
    const novosProc = procedimentosSelecionados.filter((_, i) => i !== index);
    // Reordenar
    const reordenados = novosProc.map((proc, i) => ({
      ...proc,
      ordem: i + 1,
    }));
    setProcedimentosSelecionados(reordenados);
  };

  const handleProcedimentoChange = (
    index: number,
    field: keyof ProcedimentoSelecionado,
    value: string | number | undefined
  ) => {
    const novosProc = [...procedimentosSelecionados];
    novosProc[index] = {
      ...novosProc[index],
      [field]: value,
    };

    // Se mudou o procedimento, atualizar o valor praticado com o valor padrão
    if (field === "procedimentoId" && typeof value === "string") {
      const proc = procedimentos.find((p) => p.id === value);
      if (proc && !novosProc[index].valorPraticado) {
        novosProc[index].valorPraticado = Number(proc.valor);
      }
    }

    setProcedimentosSelecionados(novosProc);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profissionalId) {
      toast.error("Selecione um profissional");
      return;
    }

    if (procedimentosSelecionados.length === 0) {
      toast.error("Adicione pelo menos um procedimento à avaliação");
      return;
    }

    const procedimentosInvalidos = procedimentosSelecionados.some(
      (p) => !p.procedimentoId
    );
    if (procedimentosInvalidos) {
      toast.error("Preencha todos os procedimentos selecionados");
      return;
    }

    try {
      setLoading(true);

      // CORRIGIDO: Criar data/hora futura para evitar conflito
      const dataHoraAgendamento = new Date();
      // Adicionar alguns minutos aleatórios para evitar conflito
      dataHoraAgendamento.setMinutes(
        dataHoraAgendamento.getMinutes() + Math.floor(Math.random() * 5) + 1
      );

      const agendamentoData = {
        profissionalId,
        procedimentoId: procedimentosSelecionados[0].procedimentoId,
        dataHora: dataHoraAgendamento.toISOString(),
        pacienteId: paciente.id,
        observacoes: "Agendamento automático para avaliação",
      };

      console.log("📅 Criando agendamento:", agendamentoData);

      const agendamentoRes = await api.post("/agendamentos", agendamentoData);
      const agendamentoId = agendamentoRes.data.data.id;

      console.log("✅ Agendamento criado:", agendamentoId);

      // Criar atendimento de avaliação
      const atendimentoData = {
        agendamentoId,
        tipo: "AVALIACAO",
        anotacoes: anotacoes.trim() || undefined,
        procedimentosPlano: procedimentosSelecionados.map((proc) => ({
          procedimentoId: proc.procedimentoId,
          ordem: proc.ordem,
          observacoes: proc.observacoes?.trim() || undefined,
          valorPraticado: proc.valorPraticado,
        })),
      };

      console.log("📋 Criando atendimento:", atendimentoData);

      await api.post("/atendimentos", atendimentoData);

      console.log("✅ Avaliação criada com sucesso!");

      toast.success("Avaliação criada com sucesso!");
      handleClose();
      onSuccess();
    } catch (error: any) {
      console.error("❌ Erro ao criar avaliação:", error);
      console.error("📄 Detalhes do erro:", error.response?.data);

      if (
        error.response?.data?.details &&
        Array.isArray(error.response.data.details)
      ) {
        const validationErrors = error.response.data.details
          .map((d: any) => d.message || d)
          .join(", ");
        toast.error(`Erro: ${validationErrors}`);
      } else {
        const errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Erro ao criar avaliação";
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    setProfissionalId("");
    setAnotacoes("");
    setProcedimentosSelecionados([]);
    onClose();
  };

  const calcularValorTotal = (): number => {
    return procedimentosSelecionados.reduce(
      (total: number, proc: ProcedimentoSelecionado) => {
        if (!proc.procedimentoId) return total;

        if (proc.valorPraticado) {
          return total + Number(proc.valorPraticado);
        }

        const procedimento = procedimentos.find(
          (p: Procedimento) => p.id === proc.procedimentoId
        );
        return total + (procedimento ? Number(procedimento.valor) : 0);
      },
      0
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Nova Avaliação"
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Info do Paciente */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-1">Paciente</h3>
          <p className="text-lg font-medium text-blue-900">{paciente.nome}</p>
        </div>

        {/* Profissional */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profissional Responsável <span className="text-red-500">*</span>
          </label>
          <select
            value={profissionalId}
            onChange={(e) => setProfissionalId(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Selecione o profissional</option>
            {profissionais.map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.nome} {prof.ativo && "(Ativo)"}
              </option>
            ))}
          </select>
        </div>

        {/* Anotações */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Anotações da Avaliação
          </label>
          <textarea
            value={anotacoes}
            onChange={(e) => setAnotacoes(e.target.value)}
            rows={3}
            placeholder="Observações sobre a avaliação..."
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Procedimentos Propostos */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Procedimentos Propostos <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={handleAddProcedimento}
              className="inline-flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Adicionar
            </button>
          </div>

          {procedimentosSelecionados.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-500 text-sm">
                Nenhum procedimento adicionado
              </p>
              <button
                type="button"
                onClick={handleAddProcedimento}
                className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Clique para adicionar o primeiro procedimento
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {procedimentosSelecionados.map(
                (proc: ProcedimentoSelecionado, index: number) => (
                  <div
                    key={index}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mt-1">
                        {proc.ordem}
                      </span>

                      <div className="flex-1 space-y-3">
                        {/* Procedimento */}
                        <div>
                          <select
                            value={proc.procedimentoId}
                            onChange={(e) =>
                              handleProcedimentoChange(
                                index,
                                "procedimentoId",
                                e.target.value
                              )
                            }
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                          >
                            <option value="">Selecione o procedimento</option>
                            {procedimentos.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.nome} - R$ {Number(p.valor).toFixed(2)}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {/* Valor Praticado */}
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">
                              Valor Praticado
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              value={proc.valorPraticado || ""}
                              onChange={(e) =>
                                handleProcedimentoChange(
                                  index,
                                  "valorPraticado",
                                  e.target.value
                                    ? Number(e.target.value)
                                    : undefined
                                )
                              }
                              placeholder="R$ 0,00"
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                            />
                          </div>

                          {/* Observações */}
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">
                              Observações
                            </label>
                            <input
                              type="text"
                              value={proc.observacoes || ""}
                              onChange={(e) =>
                                handleProcedimentoChange(
                                  index,
                                  "observacoes",
                                  e.target.value
                                )
                              }
                              placeholder="Ex: 3 sessões"
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Botão Remover */}
                      <button
                        type="button"
                        onClick={() => handleRemoveProcedimento(index)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Remover procedimento"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Valor Total */}
        {procedimentosSelecionados.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-green-900">
                Valor Total Proposto:
              </span>
              <span className="text-2xl font-bold text-green-900">
                R$ {calcularValorTotal().toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={loading}
            disabled={
              loading ||
              !profissionalId ||
              procedimentosSelecionados.length === 0
            }
          >
            Criar Avaliação
          </Button>
        </div>
      </form>
    </Modal>
  );
}
