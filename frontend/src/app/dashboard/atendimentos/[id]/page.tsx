// frontend/src/app/dashboard/atendimentos/[id]/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import api from "@/lib/api";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { AtendimentoHeader } from "@/components/atendimentos/detalhes/AtendimentoHeader";
import { AtendimentoInfo } from "@/components/atendimentos/detalhes/AtendimentoInfo";
import { AtendimentoAnotacoes } from "@/components/atendimentos/detalhes/AtendimentoAnotacoes";
import { AtendimentoProcedimentos } from "@/components/atendimentos/detalhes/AtendimentoProcedimentos";
import { AtendimentoProcedimentosPlano } from "@/components/atendimentos/detalhes/AtendimentoProcedimentosPlano";
import { AtendimentoProntuario } from "@/components/atendimentos/detalhes/AtendimentoProntuario";
import { AtendimentoSidebar } from "@/components/atendimentos/detalhes/AtendimentoSidebar";

interface AtendimentoDetalhado {
  id: string;
  tipo: "AVULSO" | "AVALIACAO" | "PLANO_TRATAMENTO";
  statusAprovacao?: "PENDENTE" | "APROVADO" | "REPROVADO";
  anotacoes?: string;
  procedimentosRealizados: string[];
  createdAt: string;
  agendamento: {
    id: string;
    dataHora: string;
    paciente: {
      id: string;
      nome: string;
      telefone: string;
      email?: string;
    };
    profissional: {
      id: string;
      nome: string;
      especialidade?: string;
    };
    procedimento?: {
      id: string;
      nome: string;
      valor?: number;
    };
  };
  procedimentosPlano?: Array<{
    id: string;
    ordem: number;
    progresso: "NAO_INICIADO" | "EM_ANDAMENTO" | "CONCLUIDO";
    percentualProgresso?: number;
    observacoes?: string;
    valorPraticado?: number;
    procedimento: {
      id: string;
      nome: string;
      duracaoMinutos: number;
      valor?: number;
      temStatus: boolean;
    };
    agendamento?: {
      id: string;
      dataHora: string;
      status: string;
    };
  }>;
  prontuario?: Array<{
    id: string;
    tipo: string;
    createdAt: string;
    dataHoraAtendimento: string;
    anotacoes?: string;
    procedimentosRealizados: string[];
    procedimentosPlano: Array<{
      id: string;
      ordem: number;
      progresso: string;
      percentualProgresso?: number;
      procedimento: {
        nome: string;
      };
    }>;
  }>;
}

export default function AtendimentoDetalhePage() {
  const params = useParams();
  const router = useRouter();
  const atendimentoId = params?.id as string;

  // Verificar modo
  const isCreating = atendimentoId?.startsWith("novo-");
  const agendamentoIdFromUrl = isCreating
    ? atendimentoId.replace("novo-", "")
    : null;

  // Estados
  const [atendimento, setAtendimento] = useState<AtendimentoDetalhado | null>(
    null
  );
  const [agendamento, setAgendamento] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(isCreating);
  const [editedAnotacoes, setEditedAnotacoes] = useState("");
  const [editedProcedimentos, setEditedProcedimentos] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isCreating && agendamentoIdFromUrl) {
      loadAgendamento(agendamentoIdFromUrl);
    } else if (atendimentoId) {
      loadAtendimento();
    }
  }, [atendimentoId, isCreating, agendamentoIdFromUrl]);

  // Carregar agendamento (modo criação)
  const loadAgendamento = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(`/agendamentos/${id}`);
      setAgendamento(response.data.data);
      setIsEditing(true);
    } catch (error: any) {
      setError(error.response?.data?.error || "Erro ao carregar agendamento");
      toast.error(
        error.response?.data?.error || "Erro ao carregar agendamento"
      );
    } finally {
      setLoading(false);
    }
  };

  // Carregar atendimento (modo visualização/edição)
  const loadAtendimento = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(
        `/atendimentos/${atendimentoId}/detalhado`
      );
      const data = response.data.data;

      setAtendimento(data);
      setEditedAnotacoes(data.anotacoes || "");
      setEditedProcedimentos(data.procedimentosRealizados || []);
    } catch (error: any) {
      setError(error.response?.data?.error || "Erro ao carregar atendimento");
      toast.error(
        error.response?.data?.error || "Erro ao carregar atendimento"
      );
    } finally {
      setLoading(false);
    }
  };

  // Criar atendimento
  const handleCreateAtendimento = async () => {
    try {
      setSaving(true);

      const response = await api.post("/atendimentos", {
        agendamentoId: agendamentoIdFromUrl,
        anotacoes: editedAnotacoes,
        procedimentosRealizados: editedProcedimentos,
      });

      toast.success("Atendimento criado com sucesso!");
      router.replace(`/dashboard/atendimentos/${response.data.data.id}`);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erro ao criar atendimento");
    } finally {
      setSaving(false);
    }
  };

  // Salvar edição
  const handleSaveEdit = async () => {
    try {
      setSaving(true);

      await api.put(`/atendimentos/${atendimentoId}`, {
        anotacoes: editedAnotacoes,
        procedimentosRealizados: editedProcedimentos,
      });

      toast.success("Atendimento atualizado com sucesso!");
      setIsEditing(false);
      await loadAtendimento();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erro ao salvar atendimento");
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    if (isCreating) {
      router.back();
    } else {
      setIsEditing(false);
      setEditedAnotacoes(atendimento?.anotacoes || "");
      setEditedProcedimentos(atendimento?.procedimentosRealizados || []);
    }
  };

  // ✅ ADICIONAR FUNÇÃO PARA ATUALIZAR PERCENTUAL
  const handleUpdatePercentual = async (
    procedimentoPlanoId: string,
    percentual: number
  ) => {
    try {
      setSaving(true);

      // Chamar API para atualizar o percentual
      await api.put(`/procedimentos-plano/${procedimentoPlanoId}/percentual`, {
        percentual,
      });

      toast.success("Progresso atualizado com sucesso!");

      // Recarregar dados do atendimento
      await loadAtendimento();
    } catch (error: any) {
      console.error("Erro ao atualizar progresso:", error);
      toast.error(error.response?.data?.error || "Erro ao atualizar progresso");
    } finally {
      setSaving(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">
          {isCreating
            ? "Carregando agendamento..."
            : "Carregando atendimento..."}
        </p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen px-4">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {isCreating
              ? "Erro ao carregar agendamento"
              : "Erro ao carregar atendimento"}
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <Button variant="secondary" onClick={() => router.back()}>
              Voltar
            </Button>
            <Button
              onClick={
                isCreating
                  ? () => loadAgendamento(agendamentoIdFromUrl!)
                  : loadAtendimento
              }
            >
              Tentar Novamente
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Not found
  if (!isCreating && !atendimento) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">
            Atendimento não encontrado
          </p>
          <Button variant="secondary" onClick={() => router.back()}>
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  // Dados para os componentes
  const dataSource = isCreating ? agendamento : atendimento?.agendamento;

  if (!dataSource) return null;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <AtendimentoHeader
        isCreating={isCreating}
        isEditing={isEditing}
        saving={saving}
        tipo={atendimento?.tipo}
        statusAprovacao={atendimento?.statusAprovacao}
        atendimentoId={atendimentoId}
        onBack={() => router.back()}
        onEdit={!isCreating ? () => setIsEditing(true) : undefined}
        onSave={isCreating ? handleCreateAtendimento : handleSaveEdit}
        onCancel={handleCancelEdit}
        onViewAnamnese={() =>
          router.push(`/dashboard/atendimentos/${atendimentoId}/anamnese`)
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informações do Agendamento */}
          <AtendimentoInfo
            paciente={{
              nome: dataSource.paciente?.nome || "",
              telefone: dataSource.paciente?.telefone || "",
              email: dataSource.paciente?.email,
            }}
            profissional={{
              nome: dataSource.profissional?.nome || "",
              especialidade: dataSource.profissional?.especialidade,
            }}
            dataHora={dataSource.dataHora}
            procedimento={
              dataSource.procedimento
                ? {
                    nome: dataSource.procedimento.nome,
                    valor: dataSource.procedimento.valor,
                  }
                : undefined
            }
          />

          {/* Anotações */}
          <AtendimentoAnotacoes
            isEditing={isEditing}
            anotacoes={editedAnotacoes}
            onAnotacoesChange={setEditedAnotacoes}
          />

          {/* Procedimentos Realizados */}
          <AtendimentoProcedimentos
            isEditing={isEditing}
            procedimentos={editedProcedimentos}
            onProcedimentosChange={setEditedProcedimentos}
          />

          {/* Procedimentos do Plano (só no modo visualização) */}
          {!isCreating &&
            atendimento?.procedimentosPlano &&
            atendimento.procedimentosPlano.length > 0 && (
              <AtendimentoProcedimentosPlano
                procedimentos={atendimento.procedimentosPlano}
                onUpdatePercentual={handleUpdatePercentual}
                isEditing={isEditing}
              />
            )}

          {/* Prontuário (só no modo visualização) */}
          {!isCreating &&
            atendimento?.prontuario &&
            atendimento.prontuario.length > 0 && (
              <AtendimentoProntuario prontuario={atendimento.prontuario} />
            )}
        </div>

        {/* Sidebar */}
        <AtendimentoSidebar
          isCreating={isCreating}
          isEditing={isEditing}
          atendimentoId={!isCreating ? atendimentoId : undefined}
          createdAt={atendimento?.createdAt}
          onViewAnamnese={
            !isCreating
              ? () =>
                  router.push(
                    `/dashboard/atendimentos/${atendimentoId}/anamnese`
                  )
              : undefined
          }
          onEdit={
            !isCreating && !isEditing ? () => setIsEditing(true) : undefined
          }
        />
      </div>
    </div>
  );
}
