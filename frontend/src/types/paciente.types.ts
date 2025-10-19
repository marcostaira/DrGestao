// frontend/src/types/paciente.types.ts

// ============================================================================
// PACIENTE TYPES
// ============================================================================

export interface Paciente {
  id: string;
  tenantId: string;
  profissionalId?: string | null;

  // Dados pessoais
  nome: string;
  cpf?: string | null;
  dataNascimento?: string | null;

  // Contatos
  telefone: string;
  telefone2?: string | null;
  email?: string | null;

  // Endereço
  cep?: string | null;
  logradouro?: string | null;
  numero?: string | null;
  complemento?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  estado?: string | null;

  // Dados médicos
  alergias?: string | null;

  // Responsável (para menores de idade)
  menorIdade: boolean;
  responsavelNome?: string | null;
  responsavelCpf?: string | null;
  responsavelTelefone?: string | null;
  responsavelParentesco?: string | null;

  observacoes?: string | null;

  createdAt: string;
  updatedAt: string;

  // Relações
  profissional?: {
    id: string;
    nome: string;
    especialidade?: string;
  } | null;
}

export interface CreatePacienteData {
  nome: string;
  cpf?: string;
  dataNascimento?: string;
  telefone: string;
  telefone2?: string;
  email?: string;

  // Endereço
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;

  // Dados médicos
  alergias?: string;

  // Responsável
  menorIdade?: boolean;
  responsavelNome?: string;
  responsavelCpf?: string;
  responsavelTelefone?: string;
  responsavelParentesco?: string;

  profissionalId?: string;
  observacoes?: string;
}

export interface UpdatePacienteData extends Partial<CreatePacienteData> {}

export interface PacienteFilters {
  busca?: string;
  profissionalId?: string;
  menorIdade?: boolean;
  cidade?: string;
  estado?: string;
  page?: number;
  limit?: number;
}

export interface PacienteStatistics {
  total: number;
  menores: number;
  adultos: number;
  comEmail: number;
  semEmail: number;
  porCidade: { cidade: string; total: number }[];
  porEstado: { estado: string; total: number }[];
}

// ============================================================================
// FORM DATA
// ============================================================================

export interface PacienteFormData {
  // Dados pessoais
  nome: string;
  cpf: string;
  dataNascimento: string;

  // Contatos
  telefone: string;
  telefone2: string;
  email: string;

  // Endereço
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;

  // Dados médicos
  alergias: string;

  // Responsável
  menorIdade: boolean;
  responsavelNome: string;
  responsavelCpf: string;
  responsavelTelefone: string;
  responsavelParentesco: string;

  profissionalId: string;
  observacoes: string;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export const formatarTelefone = (telefone: string): string => {
  const cleaned = telefone.replace(/\D/g, "");

  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(
      7
    )}`;
  } else if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(
      6
    )}`;
  }

  return telefone;
};

export const formatarCPF = (cpf: string): string => {
  const cleaned = cpf.replace(/\D/g, "");

  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(
      6,
      9
    )}-${cleaned.slice(9)}`;
  }

  return cpf;
};

export const formatarCEP = (cep: string): string => {
  const cleaned = cep.replace(/\D/g, "");

  if (cleaned.length === 8) {
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
  }

  return cep;
};

export const calcularIdade = (dataNascimento: string): number => {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;
};

export const isMenorDeIdade = (dataNascimento: string): boolean => {
  return calcularIdade(dataNascimento) < 18;
};

export const formatarEndereco = (paciente: Paciente): string => {
  const partes: string[] = [];

  if (paciente.logradouro) partes.push(paciente.logradouro);
  if (paciente.numero) partes.push(paciente.numero);
  if (paciente.complemento) partes.push(paciente.complemento);
  if (paciente.bairro) partes.push(paciente.bairro);
  if (paciente.cidade && paciente.estado) {
    partes.push(`${paciente.cidade}/${paciente.estado}`);
  } else if (paciente.cidade) {
    partes.push(paciente.cidade);
  }
  if (paciente.cep) partes.push(`CEP: ${formatarCEP(paciente.cep)}`);

  return partes.join(", ");
};

// ============================================================================
// VALIDATION
// ============================================================================

export const validarCPF = (cpf: string): boolean => {
  const cleaned = cpf.replace(/\D/g, "");

  if (cleaned.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleaned)) return false;

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cleaned.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cleaned.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cleaned.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cleaned.substring(10, 11))) return false;

  return true;
};

export const validarTelefone = (telefone: string): boolean => {
  const cleaned = telefone.replace(/\D/g, "");
  return cleaned.length === 10 || cleaned.length === 11;
};

export const validarEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validarCEP = (cep: string): boolean => {
  const cleaned = cep.replace(/\D/g, "");
  return cleaned.length === 8;
};

export const validarPaciente = (
  data: CreatePacienteData | UpdatePacienteData
): string[] => {
  const errors: string[] = [];

  if ("nome" in data && data.nome !== undefined) {
    if (!data.nome || data.nome.trim().length < 2) {
      errors.push("Nome deve ter pelo menos 2 caracteres");
    }
  }

  if ("cpf" in data && data.cpf) {
    if (!validarCPF(data.cpf)) {
      errors.push("CPF inválido");
    }
  }

  if ("telefone" in data && data.telefone !== undefined) {
    if (!validarTelefone(data.telefone)) {
      errors.push("Telefone inválido");
    }
  }

  if ("telefone2" in data && data.telefone2) {
    if (!validarTelefone(data.telefone2)) {
      errors.push("Telefone 2 inválido");
    }
  }

  if ("email" in data && data.email) {
    if (!validarEmail(data.email)) {
      errors.push("E-mail inválido");
    }
  }

  if ("cep" in data && data.cep) {
    if (!validarCEP(data.cep)) {
      errors.push("CEP inválido");
    }
  }

  if ("menorIdade" in data && data.menorIdade) {
    if (!data.responsavelNome) {
      errors.push("Nome do responsável é obrigatório para menores de idade");
    }
    if (!data.responsavelCpf) {
      errors.push("CPF do responsável é obrigatório para menores de idade");
    } else if (!validarCPF(data.responsavelCpf)) {
      errors.push("CPF do responsável inválido");
    }
    if (!data.responsavelTelefone) {
      errors.push(
        "Telefone do responsável é obrigatório para menores de idade"
      );
    } else if (!validarTelefone(data.responsavelTelefone)) {
      errors.push("Telefone do responsável inválido");
    }
    if (!data.responsavelParentesco) {
      errors.push(
        "Parentesco do responsável é obrigatório para menores de idade"
      );
    }
  }

  return errors;
};

// ============================================================================
// CONSTANTS
// ============================================================================

export const ESTADOS_BRASIL = [
  { sigla: "AC", nome: "Acre" },
  { sigla: "AL", nome: "Alagoas" },
  { sigla: "AP", nome: "Amapá" },
  { sigla: "AM", nome: "Amazonas" },
  { sigla: "BA", nome: "Bahia" },
  { sigla: "CE", nome: "Ceará" },
  { sigla: "DF", nome: "Distrito Federal" },
  { sigla: "ES", nome: "Espírito Santo" },
  { sigla: "GO", nome: "Goiás" },
  { sigla: "MA", nome: "Maranhão" },
  { sigla: "MT", nome: "Mato Grosso" },
  { sigla: "MS", nome: "Mato Grosso do Sul" },
  { sigla: "MG", nome: "Minas Gerais" },
  { sigla: "PA", nome: "Pará" },
  { sigla: "PB", nome: "Paraíba" },
  { sigla: "PR", nome: "Paraná" },
  { sigla: "PE", nome: "Pernambuco" },
  { sigla: "PI", nome: "Piauí" },
  { sigla: "RJ", nome: "Rio de Janeiro" },
  { sigla: "RN", nome: "Rio Grande do Norte" },
  { sigla: "RS", nome: "Rio Grande do Sul" },
  { sigla: "RO", nome: "Rondônia" },
  { sigla: "RR", nome: "Roraima" },
  { sigla: "SC", nome: "Santa Catarina" },
  { sigla: "SP", nome: "São Paulo" },
  { sigla: "SE", nome: "Sergipe" },
  { sigla: "TO", nome: "Tocantins" },
];

export const PARENTESCOS = [
  "Pai",
  "Mãe",
  "Avô",
  "Avó",
  "Tio",
  "Tia",
  "Irmão",
  "Irmã",
  "Tutor Legal",
  "Outro",
];
