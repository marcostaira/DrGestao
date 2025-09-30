import React, { useState, useEffect, useRef } from "react";
import { CreatePacienteData } from "@/services/pacienteService";
import { Profissional } from "@/services/profissionalService";
import { buscarCep, calcularIdade } from "@/services/cepService";
import { useMask } from "@/hooks/useMask";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface PacienteFormProps {
  formData: CreatePacienteData;
  setFormData: (data: CreatePacienteData) => void;
  profissionais: Profissional[];
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

export const PacienteForm: React.FC<PacienteFormProps> = ({
  formData,
  setFormData,
  profissionais,
  onSubmit,
  isSubmitting,
  isEditing,
}) => {
  const { maskCpf, maskPhone, maskCep, unmask } = useMask();
  const numeroInputRef = useRef<HTMLInputElement>(null);

  const [buscandoCep, setBuscandoCep] = useState(false);
  const [erroCep, setErroCep] = useState("");
  const [idade, setIdade] = useState<number | null>(null);

  // Calcular idade quando a data de nascimento muda
  useEffect(() => {
    if (formData.dataNascimento) {
      const idadeCalculada = calcularIdade(formData.dataNascimento);
      setIdade(idadeCalculada);

      if (idadeCalculada < 18) {
        setFormData({ ...formData, menorIdade: true });
      } else if (formData.menorIdade && idadeCalculada >= 18) {
        setFormData({
          ...formData,
          menorIdade: false,
          responsavelNome: "",
          responsavelCpf: "",
          responsavelTelefone: "",
          responsavelParentesco: "",
        });
      }
    } else {
      setIdade(null);
    }
  }, [formData.dataNascimento]);

  const handleBuscarCep = async () => {
    if (!formData.cep || unmask(formData.cep).length !== 8) {
      setErroCep("CEP inválido");
      return;
    }

    setBuscandoCep(true);
    setErroCep("");

    try {
      const endereco = await buscarCep(unmask(formData.cep));
      setFormData({
        ...formData,
        cep: maskCep(endereco.cep),
        logradouro: endereco.logradouro,
        bairro: endereco.bairro,
        cidade: endereco.cidade,
        estado: endereco.estado,
        complemento: endereco.complemento || formData.complemento || "",
      });

      // Focar no campo número após buscar CEP
      setTimeout(() => {
        numeroInputRef.current?.focus();
      }, 100);
    } catch (error: any) {
      setErroCep("CEP não encontrado");
    } finally {
      setBuscandoCep(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Dados Pessoais */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
          Dados Pessoais
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input
              label="Nome Completo"
              value={formData.nome}
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
              required
              placeholder="Nome completo do paciente"
            />
          </div>

          <Input
            label="CPF"
            value={formData.cpf || ""}
            onChange={(e) => {
              const masked = maskCpf(e.target.value);
              setFormData({ ...formData, cpf: masked });
            }}
            placeholder="000.000.000-00"
            maxLength={14}
          />

          <div>
            <Input
              label="Data de Nascimento"
              type="date"
              value={formData.dataNascimento || ""}
              onChange={(e) =>
                setFormData({ ...formData, dataNascimento: e.target.value })
              }
            />
            {idade !== null && (
              <p className="text-sm text-gray-600 mt-1">
                Idade: {idade} anos {idade < 18 && "(menor de idade)"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Contatos */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
          Contatos
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Telefone Principal"
            value={formData.telefone}
            onChange={(e) => {
              const masked = maskPhone(e.target.value);
              setFormData({ ...formData, telefone: masked });
            }}
            required
            placeholder="(00) 00000-0000"
            maxLength={15}
          />

          <Input
            label="Telefone Secundário"
            value={formData.telefone2 || ""}
            onChange={(e) => {
              const masked = maskPhone(e.target.value);
              setFormData({ ...formData, telefone2: masked });
            }}
            placeholder="(00) 00000-0000"
            maxLength={15}
          />

          <div className="md:col-span-2">
            <Input
              label="E-mail"
              type="email"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="email@exemplo.com"
            />
          </div>
        </div>
      </div>

      {/* Endereço */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
          Endereço
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CEP
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.cep || ""}
                onChange={(e) => {
                  const masked = maskCep(e.target.value);
                  setFormData({ ...formData, cep: masked });
                  setErroCep("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleBuscarCep();
                  }
                }}
                placeholder="00000-000"
                maxLength={9}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Button
                type="button"
                size="sm"
                onClick={handleBuscarCep}
                disabled={buscandoCep}
                isLoading={buscandoCep}
              >
                Buscar
              </Button>
            </div>
            {erroCep && <p className="text-sm text-red-600 mt-1">{erroCep}</p>}
          </div>

          <div className="md:col-span-2">
            <Input
              label="Logradouro"
              value={formData.logradouro || ""}
              onChange={(e) =>
                setFormData({ ...formData, logradouro: e.target.value })
              }
              placeholder="Rua, Avenida, etc"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número
            </label>
            <input
              ref={numeroInputRef}
              type="text"
              value={formData.numero || ""}
              onChange={(e) =>
                setFormData({ ...formData, numero: e.target.value })
              }
              placeholder="123"
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="md:col-span-2">
            <Input
              label="Complemento"
              value={formData.complemento || ""}
              onChange={(e) =>
                setFormData({ ...formData, complemento: e.target.value })
              }
              placeholder="Apto, Bloco, etc"
            />
          </div>

          <Input
            label="Bairro"
            value={formData.bairro || ""}
            onChange={(e) =>
              setFormData({ ...formData, bairro: e.target.value })
            }
            placeholder="Bairro"
          />

          <Input
            label="Cidade"
            value={formData.cidade || ""}
            onChange={(e) =>
              setFormData({ ...formData, cidade: e.target.value })
            }
            placeholder="Cidade"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              value={formData.estado || ""}
              onChange={(e) =>
                setFormData({ ...formData, estado: e.target.value })
              }
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Selecione</option>
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AM</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MT">MT</option>
              <option value="MS">MS</option>
              <option value="MG">MG</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PR">PR</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SC">SC</option>
              <option value="SP">SP</option>
              <option value="SE">SE</option>
              <option value="TO">TO</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dados do Responsável (se menor de idade) */}
      {formData.menorIdade && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-yellow-300">
            Dados do Responsável Legal
            <span className="text-sm font-normal text-yellow-800 ml-2">
              (Obrigatório para menores de 18 anos)
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Nome do Responsável"
                value={formData.responsavelNome || ""}
                onChange={(e) =>
                  setFormData({ ...formData, responsavelNome: e.target.value })
                }
                required={formData.menorIdade}
                placeholder="Nome completo do responsável"
              />
            </div>

            <Input
              label="CPF do Responsável"
              value={formData.responsavelCpf || ""}
              onChange={(e) => {
                const masked = maskCpf(e.target.value);
                setFormData({ ...formData, responsavelCpf: masked });
              }}
              required={formData.menorIdade}
              placeholder="000.000.000-00"
              maxLength={14}
            />

            <Input
              label="Telefone do Responsável"
              value={formData.responsavelTelefone || ""}
              onChange={(e) => {
                const masked = maskPhone(e.target.value);
                setFormData({ ...formData, responsavelTelefone: masked });
              }}
              required={formData.menorIdade}
              placeholder="(00) 00000-0000"
              maxLength={15}
            />

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parentesco <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.responsavelParentesco || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    responsavelParentesco: e.target.value,
                  })
                }
                required={formData.menorIdade}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Selecione o parentesco</option>
                <option value="Pai">Pai</option>
                <option value="Mãe">Mãe</option>
                <option value="Avô">Avô</option>
                <option value="Avó">Avó</option>
                <option value="Tio">Tio</option>
                <option value="Tia">Tia</option>
                <option value="Irmão">Irmão</option>
                <option value="Irmã">Irmã</option>
                <option value="Tutor Legal">Tutor Legal</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Informações Médicas */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
          Informações Médicas
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alergias
          </label>
          <textarea
            value={formData.alergias || ""}
            onChange={(e) =>
              setFormData({ ...formData, alergias: e.target.value })
            }
            rows={3}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Liste todas as alergias conhecidas (medicamentos, alimentos, etc)"
          />
        </div>
      </div>

      {/* Outros */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
          Outras Informações
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profissional Responsável
            </label>
            <select
              value={formData.profissionalId || ""}
              onChange={(e) =>
                setFormData({ ...formData, profissionalId: e.target.value })
              }
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Observações Gerais
            </label>
            <textarea
              value={formData.observacoes || ""}
              onChange={(e) =>
                setFormData({ ...formData, observacoes: e.target.value })
              }
              rows={4}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Outras informações relevantes sobre o paciente..."
            />
          </div>
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="submit" isLoading={isSubmitting}>
          {isEditing ? "Atualizar Paciente" : "Cadastrar Paciente"}
        </Button>
      </div>
    </form>
  );
};
