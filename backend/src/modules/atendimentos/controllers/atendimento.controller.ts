// backend/src/modules/atendimentos/controllers/atendimento.controller.ts

import { Response } from "express";
import { AtendimentoService } from "../services/atendimento.service";
import { AuthenticatedRequest, ApiResponse } from "../../../types";
import { LinkAprovacaoService } from "../services/link-aprovacao.service";

// ============================================================================
// ATENDIMENTO CONTROLLER
// ============================================================================

export class AtendimentoController {
  // ==========================================================================
  // CREATE
  // ==========================================================================

  static async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const atendimento = await AtendimentoService.create(tenantId, req.body);

      const response: ApiResponse = {
        success: true,
        data: atendimento,
        message: "Atendimento registrado com sucesso",
      };

      res.status(201).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao registrar atendimento",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // GET BY ID
  // ==========================================================================

  static async getById(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { id } = req.params;

      const atendimento = await AtendimentoService.getById(tenantId, id);

      const response: ApiResponse = {
        success: true,
        data: atendimento,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao buscar atendimento",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // LIST
  // ==========================================================================

  static async list(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const {
        page,
        limit,
        pacienteId,
        profissionalId,
        tipo,
        statusAprovacao,
        dataInicio,
        dataFim,
      } = req.query;

      const result = await AtendimentoService.list(tenantId, {
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        pacienteId: pacienteId as string,
        profissionalId: profissionalId as string,
        tipo: tipo as any,
        statusAprovacao: statusAprovacao as any,
        dataInicio: dataInicio ? new Date(dataInicio as string) : undefined,
        dataFim: dataFim ? new Date(dataFim as string) : undefined,
      });

      const response: ApiResponse = {
        success: true,
        data: result.atendimentos,
        meta: result.meta,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao listar atendimentos",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // UPDATE
  // ==========================================================================

  static async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { id } = req.params;

      const atendimento = await AtendimentoService.update(
        tenantId,
        id,
        req.body
      );

      const response: ApiResponse = {
        success: true,
        data: atendimento,
        message: "Atendimento atualizado com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao atualizar atendimento",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // DELETE
  // ==========================================================================

  static async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { id } = req.params;

      await AtendimentoService.delete(tenantId, id);

      const response: ApiResponse = {
        success: true,
        message: "Atendimento excluído com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao excluir atendimento",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // CANCEL
  // ==========================================================================

  static async cancel(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { id } = req.params;

      const atendimento = await AtendimentoService.cancel(tenantId, id);

      const response: ApiResponse = {
        success: true,
        data: atendimento,
        message: "Atendimento cancelado com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao cancelar atendimento",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // GET BY PACIENTE
  // ==========================================================================

  static async getByPaciente(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { pacienteId } = req.params;

      const atendimentos = await AtendimentoService.getByPaciente(
        tenantId,
        pacienteId
      );

      const response: ApiResponse = {
        success: true,
        data: atendimentos,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao buscar atendimentos",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // TOGGLE STATUS
  // ==========================================================================

  static async toggleStatus(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { id } = req.params;

      const atendimento = await AtendimentoService.toggleStatusAgendamento(
        tenantId,
        id
      );

      const response: ApiResponse = {
        success: true,
        data: atendimento,
        message: `Status alterado para ${atendimento?.agendamento.status}`,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao alterar status",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // GET BY AGENDAMENTO
  // ==========================================================================

  static async getByAgendamento(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { agendamentoId } = req.params;

      const atendimento = await AtendimentoService.getByAgendamento(
        tenantId,
        agendamentoId
      );

      if (!atendimento) {
        const response: ApiResponse = {
          success: false,
          error: "Atendimento não encontrado",
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: atendimento,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao buscar atendimento",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // APROVAR AVALIAÇÃO
  // ==========================================================================

  static async aprovarAvaliacao(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { id } = req.params;

      const result = await AtendimentoService.aprovarAvaliacao(
        tenantId,
        id,
        req.body
      );

      const response: ApiResponse = {
        success: true,
        data: result,
        message: "Avaliação aprovada e plano de tratamento criado com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao aprovar avaliação",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // REPROVAR AVALIAÇÃO
  // ==========================================================================

  static async reprovarAvaliacao(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { id } = req.params;

      const avaliacao = await AtendimentoService.reprovarAvaliacao(
        tenantId,
        id,
        req.body
      );

      const response: ApiResponse = {
        success: true,
        data: avaliacao,
        message: "Avaliação reprovada",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao reprovar avaliação",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // GET PLANO TRATAMENTO BY PACIENTE
  // ==========================================================================

  static async getPlanoTratamentoByPaciente(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { pacienteId } = req.params;

      const planos = await AtendimentoService.getPlanoTratamentoByPaciente(
        tenantId,
        pacienteId
      );

      const response: ApiResponse = {
        success: true,
        data: planos,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao buscar planos de tratamento",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // UPDATE PROGRESSO PROCEDIMENTO
  // ==========================================================================

  static async updateProgressoProcedimento(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { procedimentoPlanoId } = req.params;

      const procedimento = await AtendimentoService.updateProgressoProcedimento(
        tenantId,
        procedimentoPlanoId,
        req.body
      );

      const response: ApiResponse = {
        success: true,
        data: procedimento,
        message: "Progresso do procedimento atualizado com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao atualizar progresso do procedimento",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // GET PROCEDIMENTOS PLANO
  // ==========================================================================

  static async getProcedimentosPlano(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { id } = req.params;

      const procedimentos = await AtendimentoService.getProcedimentosPlano(
        tenantId,
        id
      );

      const response: ApiResponse = {
        success: true,
        data: procedimentos,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao buscar procedimentos do plano",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // AGENDAR PROCEDIMENTO DO PLANO
  // ==========================================================================

  static async agendarProcedimentoPlano(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { planoId, procedimentoId } = req.params;
      const { agendamentoId } = req.body;

      const procedimento = await AtendimentoService.agendarProcedimentoPlano(
        tenantId,
        planoId,
        procedimentoId,
        agendamentoId
      );

      const response: ApiResponse = {
        success: true,
        data: procedimento,
        message: "Procedimento agendado com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao agendar procedimento",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // GET PROCEDIMENTOS PENDENTES DE AGENDAMENTO
  // ==========================================================================

  static async getProcedimentosPendentes(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { planoId } = req.params;

      const procedimentos = await AtendimentoService.getProcedimentosPendentes(
        tenantId,
        planoId
      );

      const response: ApiResponse = {
        success: true,
        data: procedimentos,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao buscar procedimentos pendentes",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // GERAR LINK DE APROVAÇÃO
  // ==========================================================================

  static async gerarLinkAprovacao(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { id } = req.params;
      const { expiresInDays = 7 } = req.body;

      const linkData = await AtendimentoService.gerarLinkAprovacao(
        tenantId,
        id,
        expiresInDays
      );

      const response: ApiResponse = {
        success: true,
        data: linkData,
        message: "Link de aprovação gerado com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao gerar link de aprovação",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // ENVIAR LINK VIA WHATSAPP
  // ==========================================================================

  static async enviarLinkAprovacaoWhatsApp(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { id } = req.params;

      await AtendimentoService.enviarLinkAprovacaoWhatsApp(tenantId, id);

      const response: ApiResponse = {
        success: true,
        message: "Link enviado via WhatsApp com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao enviar link via WhatsApp",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // VERIFICAR STATUS DO LINK DE APROVAÇÃO
  // ==========================================================================

  static async verificarStatusLink(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { id: avaliacaoId } = req.params;

      const linkData = await AtendimentoService.verificarStatusLink(
        tenantId,
        avaliacaoId
      );

      const response: ApiResponse = {
        success: true,
        data: linkData,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao verificar status do link",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // VALIDAR TOKEN DE APROVAÇÃO (PÚBLICO)
  // ==========================================================================

  static async validarTokenAprovacao(
    req: any, // ⬅️ MUDADO para any
    res: Response
  ): Promise<void> {
    try {
      const { token } = req.params;

      const data = await LinkAprovacaoService.validarToken(token);

      const response: ApiResponse = {
        success: true,
        data,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Token inválido ou expirado",
      };
      res.status(error.statusCode || 400).json(response);
    }
  }

  // ==========================================================================
  // APROVAR VIA LINK (PÚBLICO)
  // ==========================================================================

  static async aprovarViaLink(
    req: any, // ⬅️ MUDADO para any
    res: Response
  ): Promise<void> {
    try {
      const { token } = req.params;
      const { aprovadoPor } = req.body;

      if (!aprovadoPor) {
        const response: ApiResponse = {
          success: false,
          error: "Campo 'aprovadoPor' é obrigatório",
        };
        res.status(400).json(response);
        return;
      }

      const result = await LinkAprovacaoService.aprovarAvaliacao(
        token,
        aprovadoPor
      );

      const response: ApiResponse = {
        success: true,
        data: result,
        message: "Avaliação aprovada com sucesso!",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao aprovar avaliação",
      };
      res.status(error.statusCode || 400).json(response);
    }
  }

  // ==========================================================================
  // GET ATENDIMENTO DETALHADO (COM PRONTUÁRIO E PROCEDIMENTOS)
  // ==========================================================================

  static async getDetalhado(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      console.log("🎯 CONTROLLER getDetalhado CHAMADO");
      console.log("Params:", req.params);
      console.log("Query:", req.query);
      console.log("User TenantId:", req.user?.tenantId);

      const tenantId = req.user!.tenantId;
      const { id } = req.params;
      const { incluirProntuario, incluirProcedimentosPlano } = req.query;

      console.log("🔍 Chamando service com:", {
        tenantId,
        id,
        incluirProntuario: incluirProntuario !== "false",
        incluirProcedimentosPlano: incluirProcedimentosPlano !== "false",
      });

      const atendimento = await AtendimentoService.getDetalhado(tenantId, id, {
        incluirProntuario: incluirProntuario !== "false",
        incluirProcedimentosPlano: incluirProcedimentosPlano !== "false",
      });

      console.log("✅ Service retornou dados com sucesso");

      const response: ApiResponse = {
        success: true,
        data: atendimento,
      };

      res.status(200).json(response);
    } catch (error: any) {
      console.error("❌ ERRO no controller getDetalhado:", error);

      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao buscar atendimento detalhado",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }
}
