import { prisma } from "../../../config/database";
import { AppError } from "../../../middleware/errorHandler";
import {
  CreateFormularioData,
  UpdateFormularioData,
  CampoFormulario,
} from "../../../types";
import { Prisma } from "../../../../generated/prisma";

export class FormularioService {
  // ==========================================================================
  // CREATE
  // ==========================================================================

  static async create(tenantId: string, data: CreateFormularioData) {
    // Validar se profissional existe e pertence ao tenant (se informado)
    if (data.profissionalId) {
      const profissional = await prisma.profissional.findFirst({
        where: {
          id: data.profissionalId,
          tenantId,
          ativo: true,
        },
      });

      if (!profissional) {
        throw new AppError("Profissional não encontrado", 404);
      }
    }

    // Validar unicidade dos IDs dos campos
    const campoIds = data.campos.map((c) => c.id);
    const uniqueIds = new Set(campoIds);
    if (campoIds.length !== uniqueIds.size) {
      throw new AppError("IDs dos campos devem ser únicos", 400);
    }

    // Validar campos com opções
    data.campos.forEach((campo) => {
      if (
        ["SELECAO", "MULTIPLA_ESCOLHA", "RADIO"].includes(campo.tipo) &&
        (!campo.opcoes || campo.opcoes.length === 0)
      ) {
        throw new AppError(
          `Campo "${campo.label}" do tipo ${campo.tipo} requer opções`,
          400
        );
      }
    });

    const formulario = await prisma.formulario.create({
      data: {
        tenantId,
        nome: data.nome,
        descricao: data.descricao,
        profissionalId: data.profissionalId,
        campos: data.campos as unknown as Prisma.InputJsonValue,
        ativo: data.ativo ?? true,
      },
      include: {
        profissional: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });

    return {
      ...formulario,
      campos: formulario.campos as unknown as CampoFormulario[],
    };
  }

  // ==========================================================================
  // GET BY ID
  // ==========================================================================

  static async getById(tenantId: string, id: string) {
    const formulario = await prisma.formulario.findFirst({
      where: {
        id,
        tenantId,
      },
      include: {
        profissional: {
          select: {
            id: true,
            nome: true,
          },
        },
        _count: {
          select: {
            anamneses: true,
          },
        },
      },
    });

    if (!formulario) {
      throw new AppError("Formulário não encontrado", 404);
    }

    return {
      ...formulario,
      campos: formulario.campos as unknown as CampoFormulario[],
    };
  }

  // ==========================================================================
  // LIST
  // ==========================================================================

  static async list(
    tenantId: string,
    filters?: {
      profissionalId?: string;
      ativo?: boolean;
      busca?: string;
    }
  ) {
    const where: any = {
      tenantId,
    };

    if (filters?.profissionalId) {
      where.profissionalId = filters.profissionalId;
    }

    if (filters?.ativo !== undefined) {
      where.ativo = filters.ativo;
    }

    if (filters?.busca) {
      where.OR = [
        { nome: { contains: filters.busca, mode: "insensitive" } },
        { descricao: { contains: filters.busca, mode: "insensitive" } },
      ];
    }

    const formularios = await prisma.formulario.findMany({
      where,
      include: {
        profissional: {
          select: {
            id: true,
            nome: true,
          },
        },
        _count: {
          select: {
            anamneses: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return formularios.map((f) => ({
      ...f,
      campos: f.campos as unknown as CampoFormulario[],
    }));
  }

  // ==========================================================================
  // UPDATE
  // ==========================================================================

  static async update(
    tenantId: string,
    id: string,
    data: UpdateFormularioData
  ) {
    const formularioExistente = await this.getById(tenantId, id);

    // Validar se profissional existe e pertence ao tenant (se informado)
    if (data.profissionalId) {
      const profissional = await prisma.profissional.findFirst({
        where: {
          id: data.profissionalId,
          tenantId,
          ativo: true,
        },
      });

      if (!profissional) {
        throw new AppError("Profissional não encontrado", 404);
      }
    }

    // Validar campos se fornecidos
    if (data.campos) {
      const campoIds = data.campos.map((c) => c.id);
      const uniqueIds = new Set(campoIds);
      if (campoIds.length !== uniqueIds.size) {
        throw new AppError("IDs dos campos devem ser únicos", 400);
      }

      data.campos.forEach((campo) => {
        if (
          ["SELECAO", "MULTIPLA_ESCOLHA", "RADIO"].includes(campo.tipo) &&
          (!campo.opcoes || campo.opcoes.length === 0)
        ) {
          throw new AppError(
            `Campo "${campo.label}" do tipo ${campo.tipo} requer opções`,
            400
          );
        }
      });
    }

    const updateData: any = {};
    if (data.nome) updateData.nome = data.nome;
    if (data.descricao !== undefined) updateData.descricao = data.descricao;
    if (data.profissionalId !== undefined)
      updateData.profissionalId = data.profissionalId;
    if (data.campos)
      updateData.campos = data.campos as unknown as Prisma.InputJsonValue;
    if (data.ativo !== undefined) updateData.ativo = data.ativo;

    const formulario = await prisma.formulario.update({
      where: { id },
      data: updateData,
      include: {
        profissional: {
          select: {
            id: true,
            nome: true,
          },
        },
        _count: {
          select: {
            anamneses: true,
          },
        },
      },
    });

    return {
      ...formulario,
      campos: formulario.campos as unknown as CampoFormulario[],
    };
  }

  // ==========================================================================
  // DELETE
  // ==========================================================================

  static async delete(tenantId: string, id: string) {
    const formulario = await this.getById(tenantId, id);

    // Verificar se existem anamneses usando este formulário
    const countAnamneses = await prisma.anamnese.count({
      where: {
        formularioId: id,
        tenantId,
      },
    });

    if (countAnamneses > 0) {
      throw new AppError(
        "Não é possível excluir formulário com anamneses registradas. Desative-o ao invés de excluir.",
        400
      );
    }

    await prisma.formulario.delete({
      where: { id },
    });
  }

  // ==========================================================================
  // DUPLICATE
  // ==========================================================================

  static async duplicate(tenantId: string, id: string, novoNome?: string) {
    const formularioOriginal = await this.getById(tenantId, id);

    const nome = novoNome || `${formularioOriginal.nome} (Cópia ${Date.now()})`;

    const novoFormulario = await prisma.formulario.create({
      data: {
        tenantId,
        nome,
        descricao: formularioOriginal.descricao,
        profissionalId: formularioOriginal.profissionalId,
        campos: formularioOriginal.campos as unknown as Prisma.InputJsonValue,
        ativo: true,
      },
      include: {
        profissional: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });

    return {
      ...novoFormulario,
      campos: novoFormulario.campos as unknown as CampoFormulario[],
    };
  }
}
