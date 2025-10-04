import { Response } from "express";
import { AuthenticatedRequest, ApiResponse } from "../../../types";
import { AnamneseService } from "../services/anamnese.service";

export class AnamneseController {
  // ==========================================================================
  // CREATE
  // ==========================================================================

  static async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const anamnese = await AnamneseService.create(tenantId, req.body);

      const response: ApiResponse = {
        success: true,
        data: anamnese,
        message: "Anamnese criada com sucesso",
      };

      res.status(201).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao criar anamnese",
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

      const anamnese = await AnamneseService.getById(tenantId, id);

      const response: ApiResponse = {
        success: true,
        data: anamnese,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao buscar anamnese",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // LIST BY PACIENTE
  // ==========================================================================

  static async listByPaciente(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { pacienteId } = req.params;

      const anamneses = await AnamneseService.listByPaciente(
        tenantId,
        pacienteId
      );

      const response: ApiResponse = {
        success: true,
        data: anamneses,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao listar anamneses",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // ==========================================================================
  // LIST BY FORMULARIO
  // ==========================================================================

  static async listByFormulario(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const tenantId = req.user!.tenantId;
      const { formularioId } = req.params;

      const anamneses = await AnamneseService.listByFormulario(
        tenantId,
        formularioId
      );

      const response: ApiResponse = {
        success: true,
        data: anamneses,
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao listar anamneses",
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

      const anamnese = await AnamneseService.update(tenantId, id, req.body);

      const response: ApiResponse = {
        success: true,
        data: anamnese,
        message: "Anamnese atualizada com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao atualizar anamnese",
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

      await AnamneseService.delete(tenantId, id);

      const response: ApiResponse = {
        success: true,
        message: "Anamnese excluída com sucesso",
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao excluir anamnese",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }
}
