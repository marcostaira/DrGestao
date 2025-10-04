import { useAuth } from "@/contexts/AuthContext";
import { Modulo } from "@/types/autorizacao.types";

export function usePermissoes() {
  const { permissoes, isAdmin, temPermissao } = useAuth();

  return {
    // Permissões por módulo
    pacientes: {
      visualizar: temPermissao(Modulo.PACIENTES, "visualizar"),
      criarAlterar: temPermissao(Modulo.PACIENTES, "criarAlterar"),
    },
    profissionais: {
      visualizar: temPermissao(Modulo.PROFISSIONAIS, "visualizar"),
      criarAlterar: temPermissao(Modulo.PROFISSIONAIS, "criarAlterar"),
    },
    procedimentos: {
      visualizar: temPermissao(Modulo.PROCEDIMENTOS, "visualizar"),
      criarAlterar: temPermissao(Modulo.PROCEDIMENTOS, "criarAlterar"),
    },
    agenda: {
      visualizar: temPermissao(Modulo.AGENDA, "visualizar"),
      criarAlterar: temPermissao(Modulo.AGENDA, "criarAlterar"),
      cancelar: temPermissao(Modulo.AGENDA, "cancelar"),
    },
    atendimentos: {
      visualizar: temPermissao(Modulo.ATENDIMENTOS, "visualizar"),
      criarAlterar: temPermissao(Modulo.ATENDIMENTOS, "criarAlterar"),
      cancelar: temPermissao(Modulo.ATENDIMENTOS, "cancelar"),
    },
    whatsapp: {
      visualizar: temPermissao(Modulo.WHATSAPP, "visualizar"),
      criarAlterar: temPermissao(Modulo.WHATSAPP, "criarAlterar"),
    },
    usuarios: {
      visualizar: temPermissao(Modulo.USUARIOS, "visualizar"),
      criarAlterar: temPermissao(Modulo.USUARIOS, "criarAlterar"),
    },
    relatorios: {
      visualizar: temPermissao(Modulo.RELATORIOS, "visualizar"),
      criarAlterar: temPermissao(Modulo.RELATORIOS, "criarAlterar"),
    },

    // Helpers
    isAdmin,
    permissoes,
    temPermissao,
  };
}
