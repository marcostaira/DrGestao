import { Response } from "express";
import { AuthenticatedRequest, ApiResponse } from "../../../types";
import { FormularioService } from "../services/formulario.service";

export class FormularioController {
  // ==========================================================================
  // CREATE
  // ==========================================================================

  static async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const formulario = await FormularioService.create(tenantId, req.body);

      const response: ApiResponse = {
        success: true,
        data: formulario,
        message: "Formulário criado com sucesso",
      };

      res.status(201).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao criar formulário",
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

      const formulario = await FormularioService.getById(tenantId, id);

      const response: ApiResponse = {
        success: true,
        data: formulario,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao buscar formulário",
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
      const { profissionalId, ativo, busca } = req.query;

      const filters: any = {};
      if (profissionalId) filters.profissionalId = profissionalId as string;
      if (ativo !== undefined) filters.ativo = ativo === "true";
      if (busca) filters.busca = busca as string;

      const formularios = await FormularioService.list(tenantId, filters);

      const response: ApiResponse = {
        success: true,
        data: formularios,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao listar formulários",
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

      const formulario = await FormularioService.update(tenantId, id, req.body);

      const response: ApiResponse = {
        success: true,
        data: formulario,
        message: "Formulário atualizado com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao atualizar formulário",
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

      await FormularioService.delete(tenantId, id);

      const response: ApiResponse = {
        success: true,
        message: "Formulário excluído com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao excluir formulário",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // DUPLICATE
  // ==========================================================================

  static async duplicate(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { id } = req.params;
      const { novoNome } = req.body;

      const formulario = await FormularioService.duplicate(
        tenantId,
        id,
        novoNome
      );

      const response: ApiResponse = {
        success: true,
        data: formulario,
        message: "Formulário duplicado com sucesso",
      };

      res.status(201).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao duplicar formulário",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }
}
