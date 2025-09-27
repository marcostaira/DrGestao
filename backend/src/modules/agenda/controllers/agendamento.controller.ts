import { Response } from "express";
import { AgendamentoService } from "../services/agendamento.service";
import { AuthenticatedRequest, ApiResponse } from "../../../types";

// ============================================================================
// AGENDAMENTO CONTROLLER
// ============================================================================

export class AgendamentoController {
  // ==========================================================================
  // CREATE
  // ==========================================================================

  static async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;

      // Se tem recorrência, criar em lote
      if (req.body.recorrencia) {
        const agendamentos = await AgendamentoService.createBatch(
          tenantId,
          req.body
        );
        const response: ApiResponse = {
          success: true,
          data: agendamentos,
          message: `${agendamentos.length} agendamento(s) criado(s) com sucesso`,
        };
        res.status(201).json(response);
      } else {
        const agendamento = await AgendamentoService.create(tenantId, req.body);
        const response: ApiResponse = {
          success: true,
          data: agendamento,
          message: "Agendamento criado com sucesso",
        };
        res.status(201).json(response);
      }
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao criar agendamento",
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

      const agendamento = await AgendamentoService.getById(tenantId, id);

      const response: ApiResponse = {
        success: true,
        data: agendamento,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao buscar agendamento",
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
        dataInicio,
        dataFim,
        pacienteId,
        profissionalId,
        status,
      } = req.query;

      const result = await AgendamentoService.list(tenantId, {
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        dataInicio: dataInicio ? new Date(dataInicio as string) : undefined,
        dataFim: dataFim ? new Date(dataFim as string) : undefined,
        pacienteId: pacienteId as string,
        profissionalId: profissionalId as string,
        status: status as string,
      });

      const response: ApiResponse = {
        success: true,
        data: result.agendamentos,
        meta: result.meta,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao listar agendamentos",
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

      const agendamento = await AgendamentoService.update(
        tenantId,
        id,
        req.body
      );

      const response: ApiResponse = {
        success: true,
        data: agendamento,
        message: "Agendamento atualizado com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao atualizar agendamento",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // BATCH UPDATE
  // ==========================================================================

  static async batchUpdate(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { ids, data } = req.body;

      const result = await AgendamentoService.updateBatch(tenantId, ids, data);

      const response: ApiResponse = {
        success: true,
        data: result,
        message: `${result.updated} agendamento(s) atualizado(s)`,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao atualizar agendamentos",
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

      await AgendamentoService.delete(tenantId, id);

      const response: ApiResponse = {
        success: true,
        message: "Agendamento excluído com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao excluir agendamento",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // BATCH DELETE
  // ==========================================================================

  static async batchDelete(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { ids } = req.body;

      const result = await AgendamentoService.deleteBatch(tenantId, ids);

      const response: ApiResponse = {
        success: true,
        data: result,
        message: `${result.deleted} agendamento(s) excluído(s)`,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao excluir agendamentos",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // GET CALENDAR VIEW
  // ==========================================================================

  static async getCalendarView(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { dataInicio, dataFim, profissionalId } = req.query;

      if (!dataInicio || !dataFim) {
        const response: ApiResponse = {
          success: false,
          error: "dataInicio e dataFim são obrigatórios",
        };
        res.status(400).json(response);
        return;
      }

      const agendamentos = await AgendamentoService.getCalendarView(
        tenantId,
        new Date(dataInicio as string),
        new Date(dataFim as string),
        profissionalId as string
      );

      const response: ApiResponse = {
        success: true,
        data: agendamentos,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao buscar calendário",
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

      const agendamento = await AgendamentoService.toggleStatus(tenantId, id);

      const response: ApiResponse = {
        success: true,
        data: agendamento,
        message: `Status alterado para ${agendamento.status}`,
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
}
