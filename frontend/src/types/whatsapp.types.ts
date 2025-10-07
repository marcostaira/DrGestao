// frontend/src/types/whatsapp.types.ts

export interface WhatsAppConfig {
  id: string;
  status: "DISCONNECTED" | "CONNECTING" | "CONNECTED";
  phoneNumber?: string;
  profileName?: string;
  totalContacts: number;
  totalChats: number;
  mensagensEnviadas: number;
  mensagensRecebidas: number;
  horasAntecedencia: number;
  enviarLinkAnamnese: boolean;
  formularioId?: string;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WhatsAppMensagem {
  id: string;
  telefone: string;
  mensagem: string;
  tipo:
    | "CONFIRMACAO"
    | "RESPOSTA_CONFIRMADO"
    | "RESPOSTA_REAGENDAR"
    | "RESPOSTA_INVALIDA";
  status: "PENDENTE" | "ENVIANDO" | "ENVIADA" | "ERRO" | "RESPONDIDA";
  respostaRecebida?: string;
  respostaEm?: string;
  tentativas: number;
  erroMensagem?: string;
  enviadaEm?: string;
  createdAt: string;
  updatedAt: string;
  paciente?: {
    id: string;
    nome: string;
  };
  agendamento?: {
    id: string;
    dataHora: string;
  };
}

export interface WhatsAppTemplates {
  templateConfirmacao: string;
  templateConfirmado: string;
  templateReagendar: string;
  templateOpcaoInvalida: string;
  horasAntecedencia: number;
  enviarLinkAnamnese: boolean;
  formularioId?: string;
}

export interface WhatsAppStats {
  totalEnviadas: number;
  totalRecebidas: number;
  mensagensHoje: number;
  mensagensRespondidas: number;
  mensagensErro: number;
  totalContatos: number;
  totalChats: number;
  status: string;
  phoneNumber?: string;
  profileName?: string;
  ativo: boolean;
}

export interface QRCodeResponse {
  success: boolean;
  qrCode: string;
  instanceName: string;
}

export interface StatusResponse {
  status: string;
  phoneNumber?: string;
  profileName?: string;
  totalContacts?: number;
  totalChats?: number;
}
