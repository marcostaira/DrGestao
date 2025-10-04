import { prisma } from "../../../config/database";
import {
  AppError,
  TipoUsuario,
  Modulo,
  CreateAutorizacoesData,
  UpdateAutorizacoesData,
  AutorizacoesUsuario,
} from "../../../types";

// ============================================================================
// AUTORIZACAO SERVICE
// ============================================================================

export class AutorizacaoService {
  // ==========================================================================
  // CRIAR AUTORIZAÇÕES PARA NOVO USUÁRIO
  // ==========================================================================

  static async criarAutorizacoesIniciais(usuarioId: string, tipo: TipoUsuario) {
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId },
    });

    if (!usuario) {
      throw new AppError("Usuário não encontrado", 404);
    }

    // Se for ADMIN, criar todas as permissões
    const todosModulos = Object.values(Modulo);
    const isAdmin = tipo === TipoUsuario.ADMIN;

    const autorizacoes = todosModulos.map((modulo) => ({
      usuarioId,
      modulo,
      visualizar: isAdmin,
      criarAlterar: isAdmin,
    }));

    await prisma.autorizacao.createMany({
      data: autorizacoes,
      skipDuplicates: true,
    });

    return this.buscarAutorizacoes(usuarioId);
  }

  // ==========================================================================
  // BUSCAR AUTORIZAÇÕES DE UM USUÁRIO
  // ==========================================================================

  static async buscarAutorizacoes(
    usuarioId: string
  ): Promise<AutorizacoesUsuario> {
    const autorizacoes = await prisma.autorizacao.findMany({
      where: { usuarioId },
      select: {
        modulo: true,
        visualizar: true,
        criarAlterar: true,
      },
    });

    // Transformar em objeto { MODULO: { visualizar, criarAlterar } }
    const permissoes: AutorizacoesUsuario = {};

    autorizacoes.forEach((auth) => {
      permissoes[auth.modulo] = {
        visualizar: auth.visualizar,
        criarAlterar: auth.criarAlterar,
      };
    });

    return permissoes;
  }

  // ==========================================================================
  // BUSCAR AUTORIZAÇÕES COM DETALHES DO USUÁRIO
  // ==========================================================================

  static async buscarAutorizacoesDetalhadas(
    tenantId: string,
    usuarioId: string
  ) {
    // Verificar se o usuário pertence ao tenant
    const usuario = await prisma.usuario.findFirst({
      where: {
        id: usuarioId,
        tenantId,
      },
      include: {
        autorizacoes: {
          orderBy: { modulo: "asc" },
        },
      },
    });

    if (!usuario) {
      throw new AppError("Usuário não encontrado", 404);
    }

    return {
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
      },
      autorizacoes: usuario.autorizacoes,
    };
  }

  // ==========================================================================
  // ATUALIZAR AUTORIZAÇÕES DE UM USUÁRIO
  // ==========================================================================

  static async atualizarAutorizacoes(
    tenantId: string,
    usuarioId: string,
    data: UpdateAutorizacoesData
  ) {
    // Verificar se o usuário pertence ao tenant
    const usuario = await prisma.usuario.findFirst({
      where: {
        id: usuarioId,
        tenantId,
      },
    });

    if (!usuario) {
      throw new AppError("Usuário não encontrado", 404);
    }

    // Se for ADMIN, forçar todas as permissões
    if (usuario.tipo === TipoUsuario.ADMIN) {
      const todosModulos = Object.values(Modulo);

      for (const modulo of todosModulos) {
        await prisma.autorizacao.upsert({
          where: {
            usuarioId_modulo: {
              usuarioId,
              modulo,
            },
          },
          update: {
            visualizar: true,
            criarAlterar: true,
          },
          create: {
            usuarioId,
            modulo,
            visualizar: true,
            criarAlterar: true,
          },
        });
      }
    } else {
      // Para outros tipos, aplicar as permissões enviadas
      for (const auth of data.autorizacoes) {
        await prisma.autorizacao.upsert({
          where: {
            usuarioId_modulo: {
              usuarioId,
              modulo: auth.modulo,
            },
          },
          update: {
            visualizar: auth.visualizar,
            criarAlterar: auth.criarAlterar,
          },
          create: {
            usuarioId,
            modulo: auth.modulo,
            visualizar: auth.visualizar,
            criarAlterar: auth.criarAlterar,
          },
        });
      }
    }

    return this.buscarAutorizacoes(usuarioId);
  }

  // ==========================================================================
  // LISTAR TODOS OS USUÁRIOS COM SUAS AUTORIZAÇÕES
  // ==========================================================================

  static async listarUsuariosComAutorizacoes(
    tenantId: string,
    filters: {
      page?: number;
      limit?: number;
      tipo?: TipoUsuario;
      ativo?: boolean;
    } = {}
  ) {
    const { page = 1, limit = 20, tipo, ativo } = filters;
    const skip = (page - 1) * limit;

    const where: any = { tenantId };
    if (tipo) where.tipo = tipo;
    if (ativo !== undefined) where.ativo = ativo;

    const [usuarios, total] = await Promise.all([
      prisma.usuario.findMany({
        where,
        select: {
          id: true,
          nome: true,
          email: true,
          tipo: true,
          ativo: true,
          autorizacoes: {
            select: {
              modulo: true,
              visualizar: true,
              criarAlterar: true,
            },
            orderBy: { modulo: "asc" },
          },
        },
        orderBy: [{ ativo: "desc" }, { nome: "asc" }],
        skip,
        take: limit,
      }),
      prisma.usuario.count({ where }),
    ]);

    return {
      usuarios,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // ==========================================================================
  // VERIFICAR SE USUÁRIO TEM PERMISSÃO ESPECÍFICA
  // ==========================================================================

  static async verificarPermissao(
    usuarioId: string,
    modulo: Modulo,
    tipo: "visualizar" | "criarAlterar"
  ): Promise<boolean> {
    const autorizacao = await prisma.autorizacao.findUnique({
      where: {
        usuarioId_modulo: {
          usuarioId,
          modulo,
        },
      },
    });

    if (!autorizacao) {
      return false;
    }

    return autorizacao[tipo];
  }
}
