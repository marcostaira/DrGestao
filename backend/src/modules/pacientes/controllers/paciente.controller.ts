import { Response } from "express";
import { PacienteService } from "../services/paciente.service";
import { AuthenticatedRequest, ApiResponse, AppError } from "../../../types";

// Helper para normalizar data
const normalizeDate = (dateString?: string): Date | undefined => {
  if (!dateString) return undefined;

  // Se já está no formato ISO completo, retorna
  if (dateString.includes("T")) {
    return new Date(dateString);
  }

  // Se está no formato YYYY-MM-DD, adiciona hora
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return new Date(`${dateString}T00:00:00.000Z`);
  }

  return new Date(dateString);
};

// ============================================================================
// PACIENTE CONTROLLER
// ============================================================================

export class PacienteController {
  // ==========================================================================
  // CREATE PACIENTE
  // ==========================================================================

  static async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError("Usuário não autenticado", 401);
      }

      const {
        nome,
        cpf,
        dataNascimento,
        telefone,
        telefone2,
        email,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        alergias,
        menorIdade,
        responsavelNome,
        responsavelCpf,
        responsavelTelefone,
        responsavelParentesco,
        profissionalId,
        observacoes,
      } = req.body;

      const paciente = await PacienteService.create(req.user.tenantId, {
        nome,
        cpf: cpf || undefined,
        dataNascimento: normalizeDate(dataNascimento),
        telefone,
        telefone2: telefone2 || undefined,
        email: email || undefined,
        cep: cep || undefined,
        logradouro: logradouro || undefined,
        numero: numero || undefined,
        complemento: complemento || undefined,
        bairro: bairro || undefined,
        cidade: cidade || undefined,
        estado: estado || undefined,
        alergias: alergias || undefined,
        menorIdade: menorIdade || false,
        responsavelNome: responsavelNome || undefined,
        responsavelCpf: responsavelCpf || undefined,
        responsavelTelefone: responsavelTelefone || undefined,
        responsavelParentesco: responsavelParentesco || undefined,
        profissionalId: profissionalId || undefined,
        observacoes: observacoes || undefined,
      });

      const response: ApiResponse = {
        success: true,
        data: paciente,
        message: "Paciente criado com sucesso",
      };

      res.status(201).json(response);
    } catch (error) {
      if (error instanceof AppError) {
        const response: ApiResponse = {
          success: false,
          error: error.message,
        };
        res.status(error.statusCode).json(response);
      } else {
        console.error("Erro ao criar paciente:", error);
        const response: ApiResponse = {
          success: false,
          error: "Erro interno do servidor",
        };
        res.status(500).json(response);
      }
    }
  }

  // ==========================================================================
  // GET PACIENTE BY ID
  // ==========================================================================

  static async getById(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError("Usuário não autenticado", 401);
      }

      const { id } = req.params;

      const paciente = await PacienteService.getById(req.user.tenantId, id);

      const response: ApiResponse = {
        success: true,
        data: paciente,
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof AppError) {
        const response: ApiResponse = {
          success: false,
          error: error.message,
        };
        res.status(error.statusCode).json(response);
      } else {
        console.error("Erro ao buscar paciente:", error);
        const response: ApiResponse = {
          success: false,
          error: "Erro interno do servidor",
        };
        res.status(500).json(response);
      }
    }
  }

  // ==========================================================================
  // LIST PACIENTES
  // ==========================================================================

  static async list(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError("Usuário não autenticado", 401);
      }

      const {
        page = "1",
        limit = "20",
        search = "",
        profissionalId,
        telefone,
        sortBy = "nome",
        sortOrder = "asc",
      } = req.query;

      const filters = {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        search: search as string,
        profissionalId: profissionalId as string,
        telefone: telefone as string,
        sortBy: sortBy as string,
        sortOrder: sortOrder as "asc" | "desc",
      };

      const result = await PacienteService.list(req.user.tenantId, filters);

      const response: ApiResponse = {
        success: true,
        data: result.pacientes,
        meta: result.meta,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Erro ao listar pacientes:", error);
      const response: ApiResponse = {
        success: false,
        error: "Erro interno do servidor",
      };
      res.status(500).json(response);
    }
  }

  // ==========================================================================
  // UPDATE PACIENTE
  // ==========================================================================

  static async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError("Usuário não autenticado", 401);
      }

      const { id } = req.params;
      const {
        nome,
        cpf,
        dataNascimento,
        telefone,
        telefone2,
        email,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        alergias,
        menorIdade,
        responsavelNome,
        responsavelCpf,
        responsavelTelefone,
        responsavelParentesco,
        profissionalId,
        observacoes,
      } = req.body;

      const paciente = await PacienteService.update(req.user.tenantId, id, {
        nome,
        cpf: cpf || undefined,
        dataNascimento: normalizeDate(dataNascimento),
        telefone,
        telefone2: telefone2 || undefined,
        email: email || undefined,
        cep: cep || undefined,
        logradouro: logradouro || undefined,
        numero: numero || undefined,
        complemento: complemento || undefined,
        bairro: bairro || undefined,
        cidade: cidade || undefined,
        estado: estado || undefined,
        alergias: alergias || undefined,
        menorIdade,
        responsavelNome: responsavelNome || undefined,
        responsavelCpf: responsavelCpf || undefined,
        responsavelTelefone: responsavelTelefone || undefined,
        responsavelParentesco: responsavelParentesco || undefined,
        profissionalId: profissionalId || undefined,
        observacoes: observacoes || undefined,
      });

      const response: ApiResponse = {
        success: true,
        data: paciente,
        message: "Paciente atualizado com sucesso",
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof AppError) {
        const response: ApiResponse = {
          success: false,
          error: error.message,
        };
        res.status(error.statusCode).json(response);
      } else {
        console.error("Erro ao atualizar paciente:", error);
        const response: ApiResponse = {
          success: false,
          error: "Erro interno do servidor",
        };
        res.status(500).json(response);
      }
    }
  }

  // ==========================================================================
  // DELETE PACIENTE
  // ==========================================================================

  static async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError("Usuário não autenticado", 401);
      }

      const { id } = req.params;

      await PacienteService.delete(req.user.tenantId, id);

      const response: ApiResponse = {
        success: true,
        message: "Paciente excluído com sucesso",
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof AppError) {
        const response: ApiResponse = {
          success: false,
          error: error.message,
        };
        res.status(error.statusCode).json(response);
      } else {
        console.error("Erro ao excluir paciente:", error);
        const response: ApiResponse = {
          success: false,
          error: "Erro interno do servidor",
        };
        res.status(500).json(response);
      }
    }
  }

  // ==========================================================================
  // GET PACIENTES BY PROFISSIONAL
  // ==========================================================================

  static async getByProfissional(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError("Usuário não autenticado", 401);
      }

      const { profissionalId } = req.params;

      const pacientes = await PacienteService.getByProfissional(
        req.user.tenantId,
        profissionalId
      );

      const response: ApiResponse = {
        success: true,
        data: pacientes,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Erro ao buscar pacientes do profissional:", error);
      const response: ApiResponse = {
        success: false,
        error: "Erro interno do servidor",
      };
      res.status(500).json(response);
    }
  }

  // ==========================================================================
  // SEARCH PACIENTES (Autocomplete)
  // ==========================================================================

  static async search(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError("Usuário não autenticado", 401);
      }

      const { term = "", limit = "10" } = req.query;

      const pacientes = await PacienteService.search(
        req.user.tenantId,
        term as string,
        parseInt(limit as string)
      );

      const response: ApiResponse = {
        success: true,
        data: pacientes,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Erro ao pesquisar pacientes:", error);
      const response: ApiResponse = {
        success: false,
        error: "Erro interno do servidor",
      };
      res.status(500).json(response);
    }
  }

  // ==========================================================================
  // GET STATISTICS
  // ==========================================================================

  static async getStatistics(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError("Usuário não autenticado", 401);
      }

      const statistics = await PacienteService.getStatistics(req.user.tenantId);

      const response: ApiResponse = {
        success: true,
        data: statistics,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Erro ao obter estatísticas de pacientes:", error);
      const response: ApiResponse = {
        success: false,
        error: "Erro interno do servidor",
      };
      res.status(500).json(response);
    }
  }

  // ==========================================================================
  // BULK ASSIGN PROFISSIONAL
  // ==========================================================================

  static async bulkAssignProfissional(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError("Usuário não autenticado", 401);
      }

      const { pacienteIds, profissionalId } = req.body;

      if (!Array.isArray(pacienteIds) || pacienteIds.length === 0) {
        throw new AppError("Lista de pacientes é obrigatória", 400);
      }

      if (!profissionalId) {
        throw new AppError("Profissional é obrigatório", 400);
      }

      const result = await PacienteService.bulkAssignProfissional(
        req.user.tenantId,
        pacienteIds,
        profissionalId
      );

      const response: ApiResponse = {
        success: true,
        data: result,
        message: `${result.updated} paciente(s) atribuído(s) ao profissional ${result.profissional.nome}`,
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof AppError) {
        const response: ApiResponse = {
          success: false,
          error: error.message,
        };
        res.status(error.statusCode).json(response);
      } else {
        console.error("Erro ao atribuir profissional em lote:", error);
        const response: ApiResponse = {
          success: false,
          error: "Erro interno do servidor",
        };
        res.status(500).json(response);
      }
    }
  }

  // ==========================================================================
  // BULK REMOVE PROFISSIONAL
  // ==========================================================================

  static async bulkRemoveProfissional(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError("Usuário não autenticado", 401);
      }

      const { pacienteIds } = req.body;

      if (!Array.isArray(pacienteIds) || pacienteIds.length === 0) {
        throw new AppError("Lista de pacientes é obrigatória", 400);
      }

      const result = await PacienteService.bulkRemoveProfissional(
        req.user.tenantId,
        pacienteIds
      );

      const response: ApiResponse = {
        success: true,
        data: result,
        message: `Profissional removido de ${result.updated} paciente(s)`,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Erro ao remover profissional em lote:", error);
      const response: ApiResponse = {
        success: false,
        error: "Erro interno do servidor",
      };
      res.status(500).json(response);
    }
  }

  // ==========================================================================
  // VALIDATE PHONE
  // ==========================================================================

  static async validatePhone(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const { telefone } = req.body;

      if (!telefone) {
        throw new AppError("Telefone é obrigatório", 400);
      }

      const isValid = PacienteService.validatePhone(telefone);
      const formatted = PacienteService.formatPhone(telefone);

      const response: ApiResponse = {
        success: true,
        data: {
          telefone,
          isValid,
          formatted,
        },
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof AppError) {
        const response: ApiResponse = {
          success: false,
          error: error.message,
        };
        res.status(error.statusCode).json(response);
      } else {
        console.error("Erro ao validar telefone:", error);
        const response: ApiResponse = {
          success: false,
          error: "Erro interno do servidor",
        };
        res.status(500).json(response);
      }
    }
  }
}
