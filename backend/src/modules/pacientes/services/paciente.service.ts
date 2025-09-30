import { PlanoService } from "@/modules/planos/services/plano.service";
import { prisma } from "../../../config/database";
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
    // Validar limite do plano
    await PlanoService.verificarLimitePacientes(tenantId);

    // Verificar se já existe paciente com mesmo telefone
    const existingPaciente = await prisma.paciente.findFirst({
      where: {
        tenantId,
        telefone: data.telefone.trim(),
      },
    });

    if (existingPaciente) {
      throw new AppError("Já existe um paciente com este telefone", 400);
    }

    // Verificar se profissional existe (se fornecido)
    if (data.profissionalId) {
      const profissional = await prisma.profissional.findFirst({
        where: { id: data.profissionalId, tenantId },
      });

      if (!profissional || !profissional.ativo) {
        throw new AppError("Profissional não encontrado ou inativo", 400);
      }
    }

    // Criar paciente com TODOS os campos
    const paciente = await prisma.paciente.create({
      data: {
        tenantId,
        nome: data.nome.trim(),
        cpf: data.cpf || null,
        dataNascimento: data.dataNascimento || null,
        telefone: data.telefone.trim(),
        telefone2: data.telefone2 || null,
        email: data.email?.trim().toLowerCase() || null,
        cep: data.cep || null,
        logradouro: data.logradouro || null,
        numero: data.numero || null,
        complemento: data.complemento || null,
        bairro: data.bairro || null,
        cidade: data.cidade || null,
        estado: data.estado || null,
        alergias: data.alergias || null,
        menorIdade: data.menorIdade || false,
        responsavelNome: data.responsavelNome || null,
        responsavelCpf: data.responsavelCpf || null,
        responsavelTelefone: data.responsavelTelefone || null,
        responsavelParentesco: data.responsavelParentesco || null,
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
    const paciente = await prisma.paciente.findFirst({
      where: { id: pacienteId, tenantId },
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
          take: 10,
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
    const where: any = { tenantId };

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
      prisma.paciente.findMany({
        where,
        include: {
          profissional: {
            select: {
              id: true,
              nome: true,
              especialidade: true,
            },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.paciente.count({ where }),
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
    // Verificar se paciente existe
    const existingPaciente = await prisma.paciente.findFirst({
      where: { id: pacienteId, tenantId },
    });

    if (!existingPaciente) {
      throw new AppError("Paciente não encontrado", 404);
    }

    // Verificar telefone duplicado (se alterado)
    if (data.telefone && data.telefone !== existingPaciente.telefone) {
      const pacienteComTelefone = await prisma.paciente.findFirst({
        where: {
          tenantId,
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
      const profissional = await prisma.profissional.findFirst({
        where: { id: data.profissionalId, tenantId },
      });

      if (!profissional || !profissional.ativo) {
        throw new AppError("Profissional não encontrado ou inativo", 400);
      }
    }

    // Preparar dados para atualização com TODOS os campos
    const updateData: any = {};

    if (data.nome !== undefined) updateData.nome = data.nome.trim();
    if (data.cpf !== undefined) updateData.cpf = data.cpf || null;
    if (data.dataNascimento !== undefined)
      updateData.dataNascimento = data.dataNascimento || null;
    if (data.telefone !== undefined) updateData.telefone = data.telefone.trim();
    if (data.telefone2 !== undefined)
      updateData.telefone2 = data.telefone2 || null;
    if (data.email !== undefined) {
      updateData.email = data.email ? data.email.trim().toLowerCase() : null;
    }
    if (data.cep !== undefined) updateData.cep = data.cep || null;
    if (data.logradouro !== undefined)
      updateData.logradouro = data.logradouro || null;
    if (data.numero !== undefined) updateData.numero = data.numero || null;
    if (data.complemento !== undefined)
      updateData.complemento = data.complemento || null;
    if (data.bairro !== undefined) updateData.bairro = data.bairro || null;
    if (data.cidade !== undefined) updateData.cidade = data.cidade || null;
    if (data.estado !== undefined) updateData.estado = data.estado || null;
    if (data.alergias !== undefined)
      updateData.alergias = data.alergias || null;
    if (data.menorIdade !== undefined) updateData.menorIdade = data.menorIdade;
    if (data.responsavelNome !== undefined)
      updateData.responsavelNome = data.responsavelNome || null;
    if (data.responsavelCpf !== undefined)
      updateData.responsavelCpf = data.responsavelCpf || null;
    if (data.responsavelTelefone !== undefined)
      updateData.responsavelTelefone = data.responsavelTelefone || null;
    if (data.responsavelParentesco !== undefined)
      updateData.responsavelParentesco = data.responsavelParentesco || null;
    if (data.observacoes !== undefined) {
      updateData.observacoes = data.observacoes
        ? data.observacoes.trim()
        : null;
    }
    if (data.profissionalId !== undefined) {
      updateData.profissionalId = data.profissionalId || null;
    }

    // Atualizar paciente
    const paciente = await prisma.paciente.update({
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
    // Verificar se paciente existe
    const existingPaciente = await prisma.paciente.findFirst({
      where: { id: pacienteId, tenantId },
    });

    if (!existingPaciente) {
      throw new AppError("Paciente não encontrado", 404);
    }

    // Verificar se tem agendamentos
    const agendamentosCount = await prisma.agendamento.count({
      where: { pacienteId, tenantId },
    });

    if (agendamentosCount > 0) {
      throw new AppError(
        "Não é possível excluir paciente com agendamentos",
        400
      );
    }

    // Excluir paciente
    await prisma.paciente.delete({
      where: { id: pacienteId },
    });
  }

  // ==========================================================================
  // GET PACIENTES BY PROFISSIONAL
  // ==========================================================================

  static async getByProfissional(tenantId: string, profissionalId: string) {
    const pacientes = await prisma.paciente.findMany({
      where: { tenantId, profissionalId },
      select: {
        id: true,
        nome: true,
        telefone: true,
        email: true,
      },
      orderBy: { nome: "asc" },
    });

    return pacientes;
  }

  // ==========================================================================
  // SEARCH PACIENTES (Para autocomplete)
  // ==========================================================================

  static async search(tenantId: string, term: string, limit: number = 10) {
    if (!term || term.length < 2) {
      return [];
    }

    const pacientes = await prisma.paciente.findMany({
      where: {
        tenantId,
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
    const [total, comProfissional, semProfissional, recentes] =
      await Promise.all([
        prisma.paciente.count({ where: { tenantId } }),
        prisma.paciente.count({
          where: { tenantId, profissionalId: { not: null } },
        }),
        prisma.paciente.count({
          where: { tenantId, profissionalId: null },
        }),
        prisma.paciente.count({
          where: {
            tenantId,
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
    const profissional = await prisma.profissional.findFirst({
      where: { id: profissionalId, tenantId },
    });

    if (!profissional || !profissional.ativo) {
      throw new AppError("Profissional não encontrado ou inativo", 400);
    }

    const result = await prisma.paciente.updateMany({
      where: {
        id: { in: pacienteIds },
        tenantId,
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
    const result = await prisma.paciente.updateMany({
      where: {
        id: { in: pacienteIds },
        tenantId,
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
  // VALIDATE & FORMAT PHONE
  // ==========================================================================

  static validatePhone(phone: string): boolean {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10 || cleanPhone.length > 11) return false;
    if (cleanPhone.length === 11) return cleanPhone[2] === "9";
    if (cleanPhone.length === 10) return cleanPhone[2] !== "9";
    return false;
  }

  static formatPhone(phone: string): string {
    const clean = phone.replace(/[^0-9]/g, "");
    if (clean.length === 11) {
      return `(${clean.slice(0, 2)}) ${clean.slice(2, 3)}${clean.slice(
        3,
        7
      )}-${clean.slice(7)}`;
    } else if (clean.length === 10) {
      return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6)}`;
    }
    return phone;
  }
}
