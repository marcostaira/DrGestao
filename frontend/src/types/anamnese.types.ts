export enum TipoCampoFormulario {
  TEXTO = "TEXTO",
  TEXTO_LONGO = "TEXTO_LONGO",
  NUMERO = "NUMERO",
  DATA = "DATA",
  SELECAO = "SELECAO",
  MULTIPLA_ESCOLHA = "MULTIPLA_ESCOLHA",
  RADIO = "RADIO",
  CHECKBOX = "CHECKBOX",
  EMAIL = "EMAIL",
  TELEFONE = "TELEFONE",
  SIM_NAO = "SIM_NAO",
}

export interface CampoFormulario {
  id: string;
  label: string;
  tipo: TipoCampoFormulario;
  obrigatorio: boolean;
  ordem: number;
  opcoes?: string[];
  placeholder?: string;
  valorPadrao?: any;
  validacao?: {
    min?: number;
    max?: number;
    regex?: string;
    mensagem?: string;
  };
}

export interface Formulario {
  id: string;
  tenantId: string;
  profissionalId?: string;
  nome: string;
  descricao?: string;
  campos: CampoFormulario[];
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
  profissional?: {
    id: string;
    nome: string;
  };
  _count?: {
    anamneses: number;
  };
}

export interface RespostaAnamnese {
  [campoId: string]: any;
}

export interface Anamnese {
  id: string;
  tenantId: string;
  pacienteId: string;
  formularioId: string;
  atendimentoId?: string;
  respostas: RespostaAnamnese;
  observacoes?: string;
  createdAt: string;
  updatedAt: string;
  formulario: {
    id: string;
    nome: string;
    descricao?: string;
    campos: CampoFormulario[];
  };
  paciente: {
    id: string;
    nome: string;
  };
  atendimento?: {
    id: string;
    createdAt: string;
  };
}

export const TIPO_CAMPO_LABELS: Record<TipoCampoFormulario, string> = {
  [TipoCampoFormulario.TEXTO]: "Texto Curto",
  [TipoCampoFormulario.TEXTO_LONGO]: "Texto Longo",
  [TipoCampoFormulario.NUMERO]: "Número",
  [TipoCampoFormulario.DATA]: "Data",
  [TipoCampoFormulario.SELECAO]: "Seleção (Dropdown)",
  [TipoCampoFormulario.MULTIPLA_ESCOLHA]: "Múltipla Escolha",
  [TipoCampoFormulario.RADIO]: "Opção Única (Radio)",
  [TipoCampoFormulario.CHECKBOX]: "Checkbox",
  [TipoCampoFormulario.EMAIL]: "Email",
  [TipoCampoFormulario.TELEFONE]: "Telefone",
  [TipoCampoFormulario.SIM_NAO]: "Sim/Não",
};
