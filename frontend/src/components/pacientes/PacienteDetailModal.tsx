"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { Paciente } from "@/services/pacienteService";
import { getAtendimentos } from "@/services/atendimentoService";

interface PacienteDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  paciente: Paciente | null;
  onEdit: (paciente: Paciente) => void;
  onDelete: (paciente: Paciente) => void;
}

type TabType = "info" | "historico";

export function PacienteDetailModal({
  isOpen,
  onClose,
  paciente,
  onEdit,
  onDelete,
}: PacienteDetailModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("info");
  const [atendimentos, setAtendimentos] = useState<any[]>([]);
  const [incluirCancelados, setIncluirCancelados] = useState(false);
  const [isLoadingAtendimentos, setIsLoadingAtendimentos] = useState(false);

  useEffect(() => {
    if (isOpen && paciente && activeTab === "historico") {
      loadAtendimentos();
    }
  }, [isOpen, paciente, activeTab, incluirCancelados]);

  const loadAtendimentos = async () => {
    if (!paciente) return;

    setIsLoadingAtendimentos(true);
    try {
      const data = await getAtendimentos({
        pacienteId: paciente.id,
        incluirCancelados,
      });
      setAtendimentos(data);
    } catch (error) {
      console.error("Erro ao carregar atendimentos:", error);
    } finally {
      setIsLoadingAtendimentos(false);
    }
  };

  if (!paciente) return null;

  const calcularIdade = () => {
    if (!paciente.dataNascimento) return null;
    const hoje = new Date();
    const nascimento = new Date(paciente.dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={paciente.nome} size="xl">
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("info")}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === "info"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            Informações
          </button>
          <button
            onClick={() => setActiveTab("historico")}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === "historico"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            Histórico de Atendimentos
          </button>
        </nav>
      </div>

      {/* Conteúdo das Tabs */}
      {activeTab === "info" && (
        <div className="space-y-4">
          {/* Dados Pessoais */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Dados Pessoais
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {paciente.cpf && (
                <div>
                  <span className="text-gray-600">CPF:</span>
                  <p className="font-medium text-gray-900">{paciente.cpf}</p>
                </div>
              )}
              {paciente.dataNascimento && (
                <div>
                  <span className="text-gray-600">Data de Nascimento:</span>
                  <p className="font-medium text-gray-900">
                    {new Date(paciente.dataNascimento).toLocaleDateString(
                      "pt-BR"
                    )}{" "}
                    ({calcularIdade()} anos)
                  </p>
                </div>
              )}
              <div>
                <span className="text-gray-600">Telefone:</span>
                <p className="font-medium text-gray-900">{paciente.telefone}</p>
              </div>
              {paciente.telefone2 && (
                <div>
                  <span className="text-gray-600">Telefone 2:</span>
                  <p className="font-medium text-gray-900">
                    {paciente.telefone2}
                  </p>
                </div>
              )}
              {paciente.email && (
                <div className="col-span-2">
                  <span className="text-gray-600">E-mail:</span>
                  <p className="font-medium text-gray-900">{paciente.email}</p>
                </div>
              )}
            </div>
          </div>

          {/* Endereço */}
          {(paciente.cep || paciente.logradouro) && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Endereço
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {paciente.cep && (
                  <div>
                    <span className="text-gray-600">CEP:</span>
                    <p className="font-medium text-gray-900">{paciente.cep}</p>
                  </div>
                )}
                {paciente.logradouro && (
                  <div className="col-span-2">
                    <span className="text-gray-600">Logradouro:</span>
                    <p className="font-medium text-gray-900">
                      {paciente.logradouro}
                      {paciente.numero && `, ${paciente.numero}`}
                    </p>
                  </div>
                )}
                {paciente.complemento && (
                  <div className="col-span-2">
                    <span className="text-gray-600">Complemento:</span>
                    <p className="font-medium text-gray-900">
                      {paciente.complemento}
                    </p>
                  </div>
                )}
                {paciente.bairro && (
                  <div>
                    <span className="text-gray-600">Bairro:</span>
                    <p className="font-medium text-gray-900">
                      {paciente.bairro}
                    </p>
                  </div>
                )}
                {paciente.cidade && (
                  <div>
                    <span className="text-gray-600">Cidade:</span>
                    <p className="font-medium text-gray-900">
                      {paciente.cidade}/{paciente.estado}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Informações Clínicas */}
          {paciente.alergias && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-red-900 mb-2">
                Alergias
              </h3>
              <p className="text-sm text-red-800">{paciente.alergias}</p>
            </div>
          )}

          {/* Responsável */}
          {paciente.menorIdade && paciente.responsavelNome && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-blue-900 mb-3">
                Responsável Legal
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-blue-600">Nome:</span>
                  <p className="font-medium text-blue-900">
                    {paciente.responsavelNome}
                  </p>
                </div>
                {paciente.responsavelCpf && (
                  <div>
                    <span className="text-blue-600">CPF:</span>
                    <p className="font-medium text-blue-900">
                      {paciente.responsavelCpf}
                    </p>
                  </div>
                )}
                {paciente.responsavelTelefone && (
                  <div>
                    <span className="text-blue-600">Telefone:</span>
                    <p className="font-medium text-blue-900">
                      {paciente.responsavelTelefone}
                    </p>
                  </div>
                )}
                {paciente.responsavelParentesco && (
                  <div>
                    <span className="text-blue-600">Parentesco:</span>
                    <p className="font-medium text-blue-900">
                      {paciente.responsavelParentesco}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Observações */}
          {paciente.observacoes && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Observações
              </h3>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {paciente.observacoes}
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "historico" && (
        <div className="space-y-4">
          {/* Filtro */}
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={incluirCancelados}
                onChange={(e) => setIncluirCancelados(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                Incluir atendimentos cancelados
              </span>
            </label>
            <span className="text-sm text-gray-600">
              {atendimentos.length} atendimento(s)
            </span>
          </div>

          {/* Lista de Atendimentos */}
          {isLoadingAtendimentos ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : atendimentos.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                Nenhum atendimento encontrado
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {atendimentos.map((atendimento) => (
                <div
                  key={atendimento.id}
                  className={`border rounded-lg p-4 ${
                    atendimento.cancelado
                      ? "bg-red-50 border-red-200"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(
                          atendimento.agendamento.dataHora
                        ).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p className="text-xs text-gray-600">
                        {atendimento.profissional.nome}
                      </p>
                    </div>
                    {atendimento.cancelado && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Cancelado
                      </span>
                    )}
                  </div>

                  {atendimento.anotacoes && (
                    <p className="text-sm text-gray-700 mb-2">
                      {atendimento.anotacoes}
                    </p>
                  )}

                  {atendimento.procedimentosRealizados?.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">
                        Procedimentos realizados:
                      </p>
                      <ul className="space-y-1">
                        {atendimento.procedimentosRealizados.map(
                          (proc: any, idx: number) => (
                            <li key={idx} className="text-sm text-gray-700">
                              • {proc.nome || "Procedimento"}
                              {proc.observacao && (
                                <span className="text-gray-600">
                                  {" "}
                                  - {proc.observacao}
                                </span>
                              )}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Botões */}
      <div className="flex justify-between pt-6 border-t mt-6">
        <Button variant="danger" onClick={() => onDelete(paciente)}>
          Excluir
        </Button>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose}>
            Fechar
          </Button>
          <Button onClick={() => onEdit(paciente)}>Editar</Button>
        </div>
      </div>
    </Modal>
  );
}
