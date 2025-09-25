import { withTenantIsolation } from "../../../config/database";
import {
  CreatePacienteData,
  UpdatePacienteData,
  PacienteFilters,
  AppError,
} from "../../../types";

// ============================================================================
// PACIENTE SERVICE
// ============================================================================

export class PacienteService {
  // ==========================================================================
  // CREATE PACIENTE
  // ==========================================================================

  static async create(tenantId: string, data: CreatePacienteData) {
    const db = withTenantIsolation(tenantId);

    // Verificar se já existe paciente com mesmo telefone
    const existingPaciente = await db.paciente.findFirst({
      where: {
        telefone: data.telefone.trim(),
      },
    });

    if (existingPaciente) {
      throw new AppError("Já existe um paciente com este telefone", 400);
    }

    // Verificar se profissional existe (se fornecido)
    if (data.profissionalId) {
      const profissional = await db.profissional.findUnique({
        where: { id: data.profissionalId },
      });

      if (!profissional || !profissional.ativo) {
        throw new AppError("Profissional não encontrado ou inativo", 400);
      }
    }

    // Criar paciente
    const paciente = await db.paciente.create({
      data: {
        nome: data.nome.trim(),
        telefone: data.telefone.trim(),
        email: data.email?.trim().toLowerCase() || null,
        observacoes: data.observacoes?.trim() || null,
        profissionalId: data.profissionalId || null,
      },
      include: {
        profissional: {
          select: {
            id: true,
            nome: true,
            especialidade: true,
          },
        },
      },
    });

    return paciente;
  }

  // ==========================================================================
  // GET PACIENTE BY ID
  // ==========================================================================

  static async getById(tenantId: string, pacienteId: string) {
    const db = withTenantIsolation(tenantId);

    const paciente = await db.paciente.findUnique({
      where: { id: pacienteId },
      include: {
        profissional: {
          select: {
            id: true,
            nome: true,
            especialidade: true,
          },
        },
        agendamentos: {
          select: {
            id: true,
            dataHora: true,
            status: true,
            observacoes: true,
            procedimento: {
              select: {
                id: true,
                nome: true,
                duracaoMinutos: true,
              },
            },
            profissional: {
              select: {
                id: true,
                nome: true,
              },
            },
          },
          orderBy: {
            dataHora: "desc",
          },
          take: 10, // Últimos 10 agendamentos
        },
        atendimentos: {
          select: {
            id: true,
            createdAt: true,
            anotacoes: true,
            procedimento: {
              select: {
                nome: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 5, // Últimos 5 atendimentos
        },
        _count: {
          select: {
            agendamentos: true,
            atendimentos: true,
          },
        },
      },
    });

    if (!paciente) {
      throw new AppError("Paciente não encontrado", 404);
    }

    return paciente;
  }

  // ==========================================================================
  // LIST PACIENTES WITH FILTERS
  // ==========================================================================

  static async list(tenantId: string, filters: PacienteFilters = {}) {
    const db = withTenantIsolation(tenantId);

    const {
      page = 1,
      limit = 20,
      search = "",
      profissionalId,
      telefone,
      sortBy = "nome",
      sortOrder = "asc",
    } = filters;

    const skip = (page - 1) * limit;

    // Construir filtros where
    const where: any = {};

    if (search) {
      where.OR = [
        { nome: { contains: search, mode: "insensitive" } },
        { telefone: { contains: search } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    if (profissionalId) {
      where.profissionalId = profissionalId;
    }

    if (telefone) {
      where.telefone = { contains: telefone };
    }

    // Configurar ordenação
    const orderBy: any = {};
    if (sortBy === "nome") {
      orderBy.nome = sortOrder;
    } else if (sortBy === "createdAt") {
      orderBy.createdAt = sortOrder;
    } else if (sortBy === "telefone") {
      orderBy.telefone = sortOrder;
    } else {
      orderBy.nome = "asc";
    }

    // Buscar pacientes e total
    const [pacientes, total] = await Promise.all([
      db.paciente.findMany({
        where,
        include: {
          profissional: {
            select: {
              id: true,
              nome: true,
              especialidade: true,
            },
          },
          _count: {
            select: {
              agendamentos: true,
              atendimentos: true,
            },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      db.paciente.count({ where }),
    ]);

    return {
      pacientes,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // ==========================================================================
  // UPDATE PACIENTE
  // ==========================================================================

  static async update(
    tenantId: string,
    pacienteId: string,
    data: UpdatePacienteData
  ) {
    const db = withTenantIsolation(tenantId);

    // Verificar se paciente existe
    const existingPaciente = await db.paciente.findUnique({
      where: { id: pacienteId },
    });

    if (!existingPaciente) {
      throw new AppError("Paciente não encontrado", 404);
    }

    // Verificar telefone duplicado (se alterado)
    if (data.telefone && data.telefone !== existingPaciente.telefone) {
      const pacienteComTelefone = await db.paciente.findFirst({
        where: {
          telefone: data.telefone.trim(),
          id: { not: pacienteId },
        },
      });

      if (pacienteComTelefone) {
        throw new AppError("Já existe um paciente com este telefone", 400);
      }
    }

    // Verificar se profissional existe (se fornecido)
    if (data.profissionalId) {
      const profissional = await db.profissional.findUnique({
        where: { id: data.profissionalId },
      });

      if (!profissional || !profissional.ativo) {
        throw new AppError("Profissional não encontrado ou inativo", 400);
      }
    }

    // Preparar dados para atualização
    const updateData: any = {};

    if (data.nome) updateData.nome = data.nome.trim();
    if (data.telefone) updateData.telefone = data.telefone.trim();
    if (data.email !== undefined) {
      updateData.email = data.email ? data.email.trim().toLowerCase() : null;
    }
    if (data.observacoes !== undefined) {
      updateData.observacoes = data.observacoes
        ? data.observacoes.trim()
        : null;
    }
    if (data.profissionalId !== undefined) {
      updateData.profissionalId = data.profissionalId || null;
    }

    // Atualizar paciente
    const paciente = await db.paciente.update({
      where: { id: pacienteId },
      data: updateData,
      include: {
        profissional: {
          select: {
            id: true,
            nome: true,
            especialidade: true,
          },
        },
      },
    });

    return paciente;
  }

  // ==========================================================================
  // DELETE PACIENTE
  // ==========================================================================

  static async delete(tenantId: string, pacienteId: string) {
    const db = withTenantIsolation(tenantId);

    // Verificar se paciente existe
    const existingPaciente = await db.paciente.findUnique({
      where: { id: pacienteId },
      include: {
        _count: {
          select: {
            agendamentos: true,
            atendimentos: true,
          },
        },
      },
    });

    if (!existingPaciente) {
      throw new AppError("Paciente não encontrado", 404);
    }

    // Verificar se tem agendamentos ou atendimentos
    if (
      existingPaciente._count.agendamentos > 0 ||
      existingPaciente._count.atendimentos > 0
    ) {
      throw new AppError(
        "Não é possível excluir paciente com agendamentos ou atendimentos. Considere desativar em vez de excluir.",
        400
      );
    }

    // Excluir paciente
    await db.paciente.delete({
      where: { id: pacienteId },
    });
  }

  // ==========================================================================
  // GET PACIENTES BY PROFISSIONAL
  // ==========================================================================

  static async getByProfissional(tenantId: string, profissionalId: string) {
    const db = withTenantIsolation(tenantId);

    const pacientes = await db.paciente.findMany({
      where: { profissionalId },
      select: {
        id: true,
        nome: true,
        telefone: true,
        email: true,
        _count: {
          select: {
            agendamentos: true,
            atendimentos: true,
          },
        },
      },
      orderBy: { nome: "asc" },
    });

    return pacientes;
  }

  // ==========================================================================
  // SEARCH PACIENTES (Para autocomplete)
  // ==========================================================================

  static async search(tenantId: string, term: string, limit: number = 10) {
    const db = withTenantIsolation(tenantId);

    if (!term || term.length < 2) {
      return [];
    }

    const pacientes = await db.paciente.findMany({
      where: {
        OR: [
          { nome: { contains: term, mode: "insensitive" } },
          { telefone: { contains: term } },
          { email: { contains: term, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        nome: true,
        telefone: true,
        email: true,
        profissional: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
      orderBy: { nome: "asc" },
      take: limit,
    });

    return pacientes;
  }

  // ==========================================================================
  // GET PACIENTE STATISTICS
  // ==========================================================================

  static async getStatistics(tenantId: string) {
    const db = withTenantIsolation(tenantId);

    const [total, comProfissional, semProfissional, recentes] =
      await Promise.all([
        // Total de pacientes
        db.paciente.count(),

        // Pacientes com profissional associado
        db.paciente.count({
          where: { profissionalId: { not: null } },
        }),

        // Pacientes sem profissional associado
        db.paciente.count({
          where: { profissionalId: null },
        }),

        // Pacientes cadastrados nos últimos 30 dias
        db.paciente.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            },
          },
        }),
      ]);

    return {
      total,
      comProfissional,
      semProfissional,
      recentes,
      porcentagemComProfissional:
        total > 0 ? Math.round((comProfissional / total) * 100) : 0,
    };
  }

  // ==========================================================================
  // BULK OPERATIONS
  // ==========================================================================

  static async bulkAssignProfissional(
    tenantId: string,
    pacienteIds: string[],
    profissionalId: string
  ) {
    const db = withTenantIsolation(tenantId);

    // Verificar se profissional existe
    const profissional = await db.profissional.findUnique({
      where: { id: profissionalId },
    });

    if (!profissional || !profissional.ativo) {
      throw new AppError("Profissional não encontrado ou inativo", 400);
    }

    // Atualizar pacientes em lote
    const result = await db.paciente.updateMany({
      where: {
        id: { in: pacienteIds },
      },
      data: {
        profissionalId,
      },
    });

    return {
      updated: result.count,
      profissional: {
        id: profissional.id,
        nome: profissional.nome,
      },
    };
  }

  static async bulkRemoveProfissional(tenantId: string, pacienteIds: string[]) {
    const db = withTenantIsolation(tenantId);

    const result = await db.paciente.updateMany({
      where: {
        id: { in: pacienteIds },
      },
      data: {
        profissionalId: null,
      },
    });

    return {
      updated: result.count,
    };
  }

  // ==========================================================================
  // VALIDATE PHONE NUMBER
  // ==========================================================================

  static validatePhone(phone: string): boolean {
    // Remover caracteres especiais
    const cleanPhone = phone.replace(/[^0-9]/g, "");

    // Verificar se tem entre 10 e 11 dígitos (Brasil)
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      return false;
    }

    // Verificar padrões básicos brasileiros
    // Celular: 11 dígitos começando com DDD + 9
    // Fixo: 10 dígitos começando com DDD
    if (cleanPhone.length === 11) {
      // Verificar se o terceiro dígito é 9 (celular)
      return cleanPhone[2] === "9";
    }

    if (cleanPhone.length === 10) {
      // Verificar se o terceiro dígito não é 9 (fixo)
      return cleanPhone[2] !== "9";
    }

    return false;
  }

  // ==========================================================================
  // FORMAT PHONE NUMBER
  // ==========================================================================

  static formatPhone(phone: string): string {
    const clean = phone.replace(/[^0-9]/g, "");

    if (clean.length === 11) {
      // Formato: (XX) 9XXXX-XXXX
      return `(${clean.slice(0, 2)}) ${clean.slice(2, 3)}${clean.slice(
        3,
        7
      )}-${clean.slice(7)}`;
    } else if (clean.length === 10) {
      // Formato: (XX) XXXX-XXXX
      return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6)}`;
    }

    return phone; // Retorna original se não conseguir formatar
  }
}
