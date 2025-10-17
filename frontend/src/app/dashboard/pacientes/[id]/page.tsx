// frontend/src/app/dashboard/pacientes/[id]/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPacienteById } from "@/services/pacienteService";
import {
  getAtendimentos,
  aprovarAvaliacao,
  reprovarAvaliacao,
  updateAtendimento,
} from "@/services/atendimentoService";
import anamneseService from "@/services/anamneseService";
import { toast } from "react-hot-toast";
import {
  UserIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  FolderIcon,
  ArrowLeftIcon,
  LinkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { AvaliacaoApprovalModal } from "@/components/atendimentos/AvaliacaoApprovalModal";
import { AvaliacaoFormModal } from "@/components/atendimentos/AvaliacaoFormModal"; // ✅ NOVO
import { LinkAprovacaoModal } from "@/components/atendimentos/LinkAprovacaoModal";
import { CriarAvaliacaoModal } from "@/components/atendimentos/CriarAvaliacaoModal";
import api from "@/lib/api";

type TabType = "dados" | "anamneses" | "avaliacoes" | "prontuario";

export default function PacienteDetalhePage() {
  const params = useParams();
  const router = useRouter();
  const pacienteId = params?.id as string;

  const [activeTab, setActiveTab] = useState<TabType>("dados");
  const [paciente, setPaciente] = useState<any>(null);
  const [anamneses, setAnamneses] = useState<any[]>([]);
  const [atendimentos, setAtendimentos] = useState<any[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<any[]>([]);
  const [planos, setPlanos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pacienteId) {
      loadData();
    }
  }, [pacienteId]);

  const loadData = async () => {
    try {
      setLoading(true);

      const pacienteData = await getPacienteById(pacienteId);
      setPaciente(pacienteData);

      try {
        const anamnesesData = await anamneseService.listByPaciente(pacienteId);
        setAnamneses(anamnesesData);
      } catch (err) {
        console.error("Erro ao buscar anamneses:", err);
        setAnamneses([]);
      }

      const atendimentosData = await getAtendimentos({
        pacienteId,
        incluirCancelados: false,
      });
      setAtendimentos(atendimentosData);

      const avaliacoesData = atendimentosData.filter(
        (a: any) => a.tipo === "AVALIACAO"
      );
      const planosData = atendimentosData.filter(
        (a: any) => a.tipo === "PLANO_TRATAMENTO"
      );

      setAvaliacoes(avaliacoesData);
      setPlanos(planosData);
    } catch (error: any) {
      toast.error("Erro ao carregar dados do paciente");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "dados" as TabType, label: "Dados Gerais", icon: UserIcon },
    {
      id: "anamneses" as TabType,
      label: "Anamneses",
      icon: DocumentTextIcon,
      count: anamneses.length,
    },
    {
      id: "avaliacoes" as TabType,
      label: "Avaliações & Planos",
      icon: ClipboardDocumentListIcon,
      count: avaliacoes.length + planos.length,
    },
    {
      id: "prontuario" as TabType,
      label: "Prontuário",
      icon: FolderIcon,
      count: atendimentos.filter((a: any) => a.tipo === "AVULSO").length,
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!paciente) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">Paciente não encontrado</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Voltar
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {paciente.nome}
            </h1>
            <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
              <span>{paciente.telefone}</span>
              {paciente.email && <span>• {paciente.email}</span>}
              {paciente.cpf && <span>• CPF: {paciente.cpf}</span>}
            </div>
          </div>

          <button
            onClick={() =>
              router.push(`/dashboard/pacientes/${pacienteId}/editar`)
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Editar Dados
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                <Icon
                  className={`
                    -ml-0.5 mr-2 h-5 w-5
                    ${
                      activeTab === tab.id
                        ? "text-blue-500"
                        : "text-gray-400 group-hover:text-gray-500"
                    }
                  `}
                />
                {tab.label}
                {tab.count !== undefined && (
                  <span
                    className={`
                      ml-2 py-0.5 px-2 rounded-full text-xs
                      ${
                        activeTab === tab.id
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-600"
                      }
                    `}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow">
        {activeTab === "dados" && <DadosGeraisTab paciente={paciente} />}

        {activeTab === "anamneses" && (
          <AnamnesesTab
            paciente={paciente}
            anamneses={anamneses}
            onReload={loadData}
          />
        )}

        {activeTab === "avaliacoes" && (
          <AvaliacoesPlanos
            paciente={paciente}
            avaliacoes={avaliacoes}
            planos={planos}
            onReload={loadData}
          />
        )}

        {activeTab === "prontuario" && (
          <ProntuarioTab
            paciente={paciente}
            atendimentos={atendimentos.filter((a: any) => a.tipo === "AVULSO")}
            onReload={loadData}
          />
        )}
      </div>
    </div>
  );
}

// Componente: Dados Gerais
function DadosGeraisTab({ paciente }: { paciente: any }) {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Dados Pessoais
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoField label="Nome Completo" value={paciente.nome} />
          <InfoField label="CPF" value={paciente.cpf} />
          <InfoField
            label="Data de Nascimento"
            value={
              paciente.dataNascimento
                ? new Date(paciente.dataNascimento).toLocaleDateString("pt-BR")
                : null
            }
          />
          <InfoField label="Telefone" value={paciente.telefone} />
          <InfoField label="Telefone 2" value={paciente.telefone2} />
          <InfoField label="E-mail" value={paciente.email} />
        </div>
      </div>

      {(paciente.cep ||
        paciente.logradouro ||
        paciente.cidade ||
        paciente.estado) && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Endereço</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoField label="CEP" value={paciente.cep} />
            <InfoField label="Logradouro" value={paciente.logradouro} />
            <InfoField label="Número" value={paciente.numero} />
            <InfoField label="Complemento" value={paciente.complemento} />
            <InfoField label="Bairro" value={paciente.bairro} />
            <InfoField label="Cidade" value={paciente.cidade} />
            <InfoField label="Estado" value={paciente.estado} />
          </div>
        </div>
      )}

      {paciente.alergias && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Dados Médicos
          </h3>
          <InfoField label="Alergias" value={paciente.alergias} multiline />
        </div>
      )}

      {paciente.menorIdade && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Responsável Legal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoField label="Nome" value={paciente.responsavelNome} />
            <InfoField label="CPF" value={paciente.responsavelCpf} />
            <InfoField label="Telefone" value={paciente.responsavelTelefone} />
            <InfoField
              label="Parentesco"
              value={paciente.responsavelParentesco}
            />
          </div>
        </div>
      )}

      {paciente.observacoes && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Observações
          </h3>
          <InfoField value={paciente.observacoes} multiline />
        </div>
      )}
    </div>
  );
}

function InfoField({
  label,
  value,
  multiline = false,
}: {
  label?: string;
  value?: string | null;
  multiline?: boolean;
}) {
  if (!value) return null;

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      {multiline ? (
        <p className="text-sm text-gray-900 whitespace-pre-wrap bg-gray-50 p-3 rounded-md">
          {value}
        </p>
      ) : (
        <p className="text-sm text-gray-900">{value || "-"}</p>
      )}
    </div>
  );
}

// Componente: Anamneses
function AnamnesesTab({ paciente, anamneses, onReload }: any) {
  const router = useRouter();

  if (anamneses.length === 0) {
    return (
      <div className="p-6 text-center">
        <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          Nenhuma anamnese
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Este paciente ainda não possui anamneses cadastradas.
        </p>
        <div className="mt-6">
          <button
            onClick={() =>
              router.push(`/dashboard/pacientes/${paciente.id}/anamnese/novo`)
            }
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Nova Anamnese
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Anamneses ({anamneses.length})
        </h3>
        <button
          onClick={() =>
            router.push(`/dashboard/pacientes/${paciente.id}/anamnese/novo`)
          }
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Nova Anamnese
        </button>
      </div>

      <div className="space-y-3">
        {anamneses.map((anamnese: any) => (
          <div
            key={anamnese.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() =>
              router.push(
                `/dashboard/pacientes/${paciente.id}/anamnese/${anamnese.id}`
              )
            }
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">
                  {anamnese.formulario.nome}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  Criada em{" "}
                  {new Date(anamnese.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente: Avaliações e Planos
function AvaliacoesPlanos({ paciente, avaliacoes, planos, onReload }: any) {
  const router = useRouter();
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedAvaliacao, setSelectedAvaliacao] = useState<any>(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [avaliacaoParaLink, setAvaliacaoParaLink] = useState<any>(null);
  const [showCriarModal, setShowCriarModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // ✅ NOVO
  const [avaliacaoParaEditar, setAvaliacaoParaEditar] = useState<any>(null); // ✅ NOVO
  const [procedimentos, setProcedimentos] = useState<any[]>([]); // ✅ NOVO

  // ✅ NOVO: Carregar procedimentos
  useEffect(() => {
    const loadProcedimentos = async () => {
      try {
        const response = await api.get("/procedimentos");
        setProcedimentos(response.data.data || []);
      } catch (error) {
        console.error("Erro ao carregar procedimentos:", error);
      }
    };
    loadProcedimentos();
  }, []);

  const handleGerarLink = (avaliacao: any) => {
    setAvaliacaoParaLink(avaliacao);
    setShowLinkModal(true);
  };

  const handleLinkGerado = () => {
    setShowLinkModal(false);
    setAvaliacaoParaLink(null);
  };

  const handleAprovar = (avaliacao: any) => {
    setSelectedAvaliacao(avaliacao);
    setShowApprovalModal(true);
  };

  const handleAprovarConfirm = async (aprovadoPor: string) => {
    try {
      await aprovarAvaliacao(selectedAvaliacao.id, { aprovadoPor });
      toast.success("Avaliação aprovada com sucesso!");
      setShowApprovalModal(false);
      setSelectedAvaliacao(null);
      onReload();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erro ao aprovar avaliação");
    }
  };

  // ✅ NOVO: Handler para editar avaliação
  const handleEditarAvaliacao = () => {
    if (!selectedAvaliacao) return;

    setShowApprovalModal(false);

    setTimeout(() => {
      setAvaliacaoParaEditar(selectedAvaliacao);
      setShowEditModal(true);
    }, 100);
  };

  // ✅ NOVO: Handler para salvar edição
  const handleSalvarEdicao = async (data: {
    anotacoes: string;
    procedimentosPlano: any[];
  }) => {
    if (!avaliacaoParaEditar) return;

    try {
      await updateAtendimento(avaliacaoParaEditar.id, {
        anotacoes: data.anotacoes,
        procedimentosPlano: data.procedimentosPlano,
      });

      toast.success("Avaliação atualizada com sucesso!");
      setShowEditModal(false);
      setAvaliacaoParaEditar(null);
      onReload();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erro ao atualizar avaliação");
      throw error;
    }
  };

  const handleCriarAvaliacao = () => {
    setShowCriarModal(true);
  };

  if (avaliacoes.length === 0 && planos.length === 0) {
    return (
      <>
        <div className="p-6 text-center">
          <ClipboardDocumentListIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Nenhuma avaliação ou plano
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Este paciente ainda não possui avaliações ou planos de tratamento.
          </p>
          <div className="mt-6">
            <button
              onClick={handleCriarAvaliacao}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
              Criar Avaliação
            </button>
          </div>
        </div>

        {showCriarModal && (
          <CriarAvaliacaoModal
            isOpen={showCriarModal}
            onClose={() => setShowCriarModal(false)}
            onSuccess={() => {
              setShowCriarModal(false);
              onReload();
            }}
            paciente={{
              id: paciente.id,
              nome: paciente.nome,
            }}
          />
        )}
      </>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Histórico de Avaliações e Planos
        </h3>
        <button
          onClick={handleCriarAvaliacao}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
          Nova Avaliação
        </button>
      </div>

      {avaliacoes.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Avaliações ({avaliacoes.length})
          </h3>
          <div className="space-y-3">
            {avaliacoes.map((avaliacao: any) => (
              <AvaliacaoCard
                key={avaliacao.id}
                avaliacao={avaliacao}
                onAprovar={handleAprovar}
                onGerarLink={handleGerarLink}
                onEditar={(avaliacao) => {
                  // ✅ NOVO
                  setAvaliacaoParaEditar(avaliacao);
                  setShowEditModal(true);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {planos.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Planos de Tratamento ({planos.length})
          </h3>
          <div className="space-y-3">
            {planos.map((plano: any) => (
              <PlanoTratamentoCard key={plano.id} plano={plano} />
            ))}
          </div>
        </div>
      )}

      {/* Modal de Aprovação */}
      {showApprovalModal && selectedAvaliacao && (
        <AvaliacaoApprovalModal
          isOpen={showApprovalModal}
          onClose={() => {
            setShowApprovalModal(false);
            setSelectedAvaliacao(null);
          }}
          onAprovar={handleAprovarConfirm}
          onReprovar={async (motivo) => {
            try {
              await reprovarAvaliacao(selectedAvaliacao.id, { motivo });
              toast.success("Avaliação reprovada");
              setShowApprovalModal(false);
              setSelectedAvaliacao(null);
              onReload();
            } catch (error: any) {
              toast.error("Erro ao reprovar avaliação");
            }
          }}
          onEditar={handleEditarAvaliacao} // ✅ NOVO
          avaliacao={selectedAvaliacao}
        />
      )}

      {/* ✅ NOVO: Modal de Edição de Avaliação */}
      {showEditModal && avaliacaoParaEditar && (
        <AvaliacaoFormModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setAvaliacaoParaEditar(null);
          }}
          onSubmit={handleSalvarEdicao}
          procedimentos={procedimentos}
          agendamento={avaliacaoParaEditar.agendamento}
          avaliacao={avaliacaoParaEditar}
        />
      )}

      {/* Modal de Link de Aprovação */}
      {showLinkModal && avaliacaoParaLink && (
        <LinkAprovacaoModal
          isOpen={showLinkModal}
          onClose={() => {
            setShowLinkModal(false);
            setAvaliacaoParaLink(null);
            onReload(); // ✅ MOVER O RELOAD PARA CÁ
          }}
          avaliacaoId={avaliacaoParaLink.id}
          pacienteNome={
            avaliacaoParaLink.paciente?.nome ||
            avaliacaoParaLink.agendamento?.paciente?.nome ||
            "Paciente"
          }
          pacienteTelefone={
            avaliacaoParaLink.paciente?.telefone ||
            avaliacaoParaLink.agendamento?.paciente?.telefone ||
            ""
          }
        />
      )}

      {/* Modal de Criar Avaliação */}
      {showCriarModal && (
        <CriarAvaliacaoModal
          isOpen={showCriarModal}
          onClose={() => setShowCriarModal(false)}
          onSuccess={() => {
            setShowCriarModal(false);
            onReload();
          }}
          paciente={{
            id: paciente.id,
            nome: paciente.nome,
          }}
        />
      )}
    </div>
  );
}

function AvaliacaoCard({
  avaliacao,
  onAprovar,
  onGerarLink,
  onEditar,
}: {
  avaliacao: any;
  onAprovar: (avaliacao: any) => void;
  onGerarLink: (avaliacao: any) => void;
  onEditar: (avaliacao: any) => void;
}) {
  const [linkData, setLinkData] = useState<any>(null);
  const [loadingLink, setLoadingLink] = useState(false);
  const [showLinkInfo, setShowLinkInfo] = useState(false);
  const [reenviandoWhatsApp, setReenviandoWhatsApp] = useState(false); // ✅ NOVO

  useEffect(() => {
    if (avaliacao.statusAprovacao === "PENDENTE") {
      checkExistingLink();
    }
  }, [avaliacao.id, avaliacao.statusAprovacao]);

  const checkExistingLink = async () => {
    try {
      setLoadingLink(true);
      const response = await api.get(
        `/atendimentos/${avaliacao.id}/link-aprovacao/status`
      );

      if (response.data.data && response.data.data.linkValido) {
        setLinkData(response.data.data);
      }
    } catch (error) {
      setLinkData(null);
    } finally {
      setLoadingLink(false);
    }
  };

  const handleCopyLink = () => {
    if (linkData?.link) {
      navigator.clipboard.writeText(linkData.link);
      toast.success("Link copiado para a área de transferência!");
    }
  };

  // ✅ NOVO: Handler para reenviar WhatsApp
  const handleReenviarWhatsApp = async () => {
    try {
      setReenviandoWhatsApp(true);
      await api.post(`/atendimentos/${avaliacao.id}/link-aprovacao/whatsapp`);
      toast.success("Link reenviado via WhatsApp com sucesso!");

      // Atualizar data de envio
      await checkExistingLink();
    } catch (error: any) {
      toast.error(
        error.response?.data?.error || "Erro ao reenviar link via WhatsApp"
      );
    } finally {
      setReenviandoWhatsApp(false);
    }
  };

  const formatExpiration = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `Expira em ${diffDays} dia${diffDays > 1 ? "s" : ""}`;
    } else if (diffHours > 0) {
      return `Expira em ${diffHours} hora${diffHours > 1 ? "s" : ""}`;
    } else {
      return "Expira em breve";
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      PENDENTE: { color: "bg-yellow-100 text-yellow-800", label: "Pendente" },
      APROVADO: { color: "bg-green-100 text-green-800", label: "Aprovado" },
      REPROVADO: { color: "bg-red-100 text-red-800", label: "Reprovado" },
    };
    return badges[status as keyof typeof badges] || badges.PENDENTE;
  };

  const statusBadge = getStatusBadge(avaliacao.statusAprovacao || "PENDENTE");

  const valorTotal = avaliacao.procedimentosPlano?.reduce(
    (total: number, proc: any) => {
      return (
        total + Number(proc.valorPraticado || proc.procedimento?.valor || 0)
      );
    },
    0
  );

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-3">
            <h4 className="font-medium text-gray-900">Avaliação</h4>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}
            >
              {statusBadge.label}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Criada em{" "}
            {new Date(avaliacao.createdAt).toLocaleDateString("pt-BR")} às{" "}
            {new Date(avaliacao.createdAt).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {avaliacao.statusAprovacao === "PENDENTE" && (
            <>
              {loadingLink ? (
                <div className="p-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                </div>
              ) : linkData ? (
                <button
                  onClick={() => setShowLinkInfo(!showLinkInfo)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Ver link de aprovação"
                >
                  <LinkIcon className="h-5 w-5" />
                </button>
              ) : (
                <button
                  onClick={() => onGerarLink(avaliacao)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Gerar link de aprovação"
                >
                  <LinkIcon className="h-5 w-5" />
                </button>
              )}

              <button
                onClick={() => onEditar(avaliacao)}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
              >
                Editar
              </button>

              <button
                onClick={() => onAprovar(avaliacao)}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
              >
                Aprovar Agora
              </button>
            </>
          )}
        </div>
      </div>

      {/* ✅ ATUALIZADO: Exibir informações do link quando existir */}
      {showLinkInfo && linkData && (
        <div className="mb-3 bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm font-medium text-green-900">
                Link de Aprovação Ativo
              </p>
              <p className="text-xs text-green-700 mt-1">
                {formatExpiration(linkData.expiresAt)}
              </p>
            </div>
            <button
              onClick={() => setShowLinkInfo(false)}
              className="text-green-600 hover:text-green-800"
            >
              ✕
            </button>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="text"
              value={linkData.link}
              readOnly
              className="flex-1 px-3 py-2 text-sm bg-white border border-green-300 rounded-md"
            />
            <button
              onClick={handleCopyLink}
              className="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 whitespace-nowrap"
            >
              Copiar
            </button>
          </div>

          {/* ✅ NOVO: Info e botão de reenvio WhatsApp */}
          {linkData.enviadoWhatsApp && linkData.enviadoEm && (
            <div className="mt-3 pt-3 border-t border-green-200">
              <div className="flex items-center justify-between">
                <p className="text-xs text-green-700">
                  ✓ Enviado via WhatsApp em{" "}
                  {new Date(linkData.enviadoEm).toLocaleDateString("pt-BR")} às{" "}
                  {new Date(linkData.enviadoEm).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <button
                  onClick={handleReenviarWhatsApp}
                  disabled={reenviandoWhatsApp}
                  className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  {reenviandoWhatsApp ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                      Reenviando...
                    </>
                  ) : (
                    "Reenviar"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {avaliacao.anotacoes && (
        <div className="mb-3 bg-gray-50 rounded p-2">
          <p className="text-sm text-gray-700">{avaliacao.anotacoes}</p>
        </div>
      )}

      {avaliacao.procedimentosPlano &&
        avaliacao.procedimentosPlano.length > 0 && (
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-gray-700">
              Procedimentos Propostos:
            </h5>
            {avaliacao.procedimentosPlano.map((proc: any, index: number) => (
              <div
                key={proc.id}
                className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-500">
                    {index + 1}.
                  </span>
                  <span className="text-gray-900">
                    {proc.procedimento?.nome || "Procedimento"}
                  </span>
                  {proc.observacoes && (
                    <span className="text-gray-500 text-xs">
                      ({proc.observacoes})
                    </span>
                  )}
                </div>
                <span className="font-medium text-gray-900">
                  R${" "}
                  {Number(
                    proc.valorPraticado || proc.procedimento?.valor || 0
                  ).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="font-semibold text-gray-900">Total:</span>
              <span className="font-bold text-green-600 text-lg">
                R$ {valorTotal?.toFixed(2) || "0.00"}
              </span>
            </div>
          </div>
        )}

      {avaliacao.statusAprovacao === "APROVADO" && (
        <div className="mt-3 bg-green-50 border border-green-200 rounded p-2 text-sm">
          <p className="text-green-800">
            ✓ Aprovado por <strong>{avaliacao.aprovadoPor}</strong> em{" "}
            {new Date(avaliacao.aprovadoEm).toLocaleDateString("pt-BR")}
          </p>
        </div>
      )}

      {avaliacao.statusAprovacao === "REPROVADO" && (
        <div className="mt-3 bg-red-50 border border-red-200 rounded p-2 text-sm">
          <p className="text-red-800">
            ✗ Reprovado em{" "}
            {new Date(avaliacao.reprovadoEm).toLocaleDateString("pt-BR")}
          </p>
          {avaliacao.reprovadoMotivo && (
            <p className="text-red-700 mt-1">
              Motivo: {avaliacao.reprovadoMotivo}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function PlanoTratamentoCard({ plano }: { plano: any }) {
  const [expanded, setExpanded] = useState(false);

  const procedimentos = plano.procedimentosPlano || [];
  const totalProcedimentos = procedimentos.length;
  const concluidos = procedimentos.filter(
    (p: any) => p.progresso === "CONCLUIDO"
  ).length;
  const progresso =
    totalProcedimentos > 0
      ? Math.round((concluidos / totalProcedimentos) * 100)
      : 0;

  const valorTotal = procedimentos.reduce((total: number, proc: any) => {
    return total + Number(proc.valorPraticado || proc.procedimento?.valor || 0);
  }, 0);

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h4 className="font-medium text-gray-900">Plano de Tratamento</h4>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {progresso}% Concluído
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Criado em {new Date(plano.createdAt).toLocaleDateString("pt-BR")}
          </p>
          {plano.avaliacao && (
            <p className="text-xs text-gray-500 mt-1">
              Baseado na avaliação de{" "}
              {new Date(
                plano.avaliacao.createdAt || plano.createdAt
              ).toLocaleDateString("pt-BR")}
            </p>
          )}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <ChevronDownIcon
            className={`h-5 w-5 transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">
            {concluidos} de {totalProcedimentos} procedimentos concluídos
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center py-2 border-t border-gray-200">
        <span className="font-medium text-gray-700">Valor Total:</span>
        <span className="font-bold text-gray-900 text-lg">
          R$ {valorTotal.toFixed(2)}
        </span>
      </div>

      {expanded && procedimentos.length > 0 && (
        <div className="mt-3 space-y-2 border-t border-gray-200 pt-3">
          {procedimentos.map((proc: any, index: number) => (
            <div
              key={proc.id}
              className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded"
            >
              <div className="flex items-center gap-2 flex-1">
                <span className="font-medium text-gray-500">{index + 1}.</span>
                <span className="text-gray-900">
                  {proc.procedimento?.nome || "Procedimento"}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-xs ${
                    proc.progresso === "CONCLUIDO"
                      ? "bg-green-100 text-green-800"
                      : proc.progresso === "EM_ANDAMENTO"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {proc.progresso === "CONCLUIDO"
                    ? "Concluído"
                    : proc.progresso === "EM_ANDAMENTO"
                    ? "Em Andamento"
                    : "Não Iniciado"}
                </span>
              </div>
              <span className="font-medium text-gray-900">
                R${" "}
                {Number(
                  proc.valorPraticado || proc.procedimento?.valor || 0
                ).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProntuarioTab({ paciente, atendimentos, onReload }: any) {
  return (
    <div className="p-6">
      <p className="text-gray-500">
        {atendimentos.length} atendimento(s) (em construção)
      </p>
    </div>
  );
}
