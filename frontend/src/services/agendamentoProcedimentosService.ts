// frontend/src/services/agendamentoProcedimentosService.ts

import api from "@/lib/api";
import {
  AgendarProcedimentoPayload,
  DisponibilidadeResponse,
} from "@/types/agendamento-procedimentos.types";

export const agendamentoProcedimentosService = {
  /**
   * Listar procedimentos pendentes de agendamento de uma avaliação
   */
  async listarProcedimentosParaAgendar(avaliacaoId: string) {
    const response = await api.get(
      `/atendimentos/agendamento-procedimentos/${avaliacaoId}/listar`
    );
    return response.data.data;
  },

  /**
   * Agendar múltiplos procedimentos em lote
   */
  async agendarProcedimentos(payload: AgendarProcedimentoPayload) {
    const response = await api.post(
      `/atendimentos/agendamento-procedimentos/lote`,
      payload
    );
    return response.data.data;
  },

  /**
   * Agendar um procedimento individual
   */
  async agendarProcedimentoIndividual(
    atendimentoProcedimentoId: string,
    profissionalId: string,
    dataHora: string
  ) {
    const response = await api.post(
      `/atendimentos/agendamento-procedimentos/${atendimentoProcedimentoId}`,
      {
        profissionalId,
        dataHora,
      }
    );
    return response.data.data;
  },

  /**
   * Verificar disponibilidade de um horário
   */
  async verificarDisponibilidade(
    profissionalId: string,
    dataHora: string,
    duracaoMinutos: number
  ): Promise<DisponibilidadeResponse> {
    const response = await api.get(
      `/atendimentos/agendamento-procedimentos/disponibilidade`,
      {
        params: {
          profissionalId,
          dataHora,
          duracaoMinutos,
        },
      }
    );
    return response.data.data;
  },
};
