import { Response } from "express";
import { AtendimentoService } from "../services/atendimento.service";
import { AuthenticatedRequest, ApiResponse } from "../../../types";

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
      const { page, limit, pacienteId, profissionalId, dataInicio, dataFim } =
        req.query;

      const result = await AtendimentoService.list(tenantId, {
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        pacienteId: pacienteId as string,
        profissionalId: profissionalId as string,
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

  // Adicionar este método

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
}
