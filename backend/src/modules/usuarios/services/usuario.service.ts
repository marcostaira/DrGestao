import bcrypt from "bcryptjs";
import { prisma } from "../../../config/database";
import { CreateUserData, UpdateUserData, AppError } from "../../../types";

// ============================================================================
// USUARIO SERVICE
// ============================================================================

export class UsuarioService {
  // ==========================================================================
  // CREATE USUARIO
  // ==========================================================================

  static async create(tenantId: string, data: CreateUserData) {
    // Verificar se email já existe
    const existingUser = await prisma.usuario.findFirst({
      where: {
        email: data.email.toLowerCase().trim(),
      },
    });

    if (existingUser) {
      throw new AppError("Email já cadastrado", 400);
    }

    // Verificar limite de usuários do plano
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      include: {
        plano: true,
      },
    });

    if (!tenant) {
      throw new AppError("Tenant não encontrado", 404);
    }

    const usuariosAtivos = await prisma.usuario.count({
      where: { tenantId, ativo: true },
    });

    if (usuariosAtivos >= tenant.plano.usuarios) {
      throw new AppError(
        `Limite de ${tenant.plano.usuarios} usuário(s) ativo(s) atingido para o plano ${tenant.plano.nome}.`,
        403
      );
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(data.senha, 10);

    // Criar usuário
    const usuario = await prisma.usuario.create({
      data: {
        tenantId,
        nome: data.nome.trim(),
        email: data.email.toLowerCase().trim(),
        senha: hashedPassword,
        tipo: data.tipo || "SECRETARIA",
        ativo: true,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        tipo: true,
        ativo: true,
        createdAt: true,
      },
    });

    return usuario;
  }

  // ==========================================================================
  // GET USUARIO BY ID
  // ==========================================================================

  static async getById(tenantId: string, usuarioId: string) {
    const usuario = await prisma.usuario.findFirst({
      where: { id: usuarioId, tenantId },
      select: {
        id: true,
        nome: true,
        email: true,
        tipo: true,
        ativo: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!usuario) {
      throw new AppError("Usuário não encontrado", 404);
    }

    return usuario;
  }

  // ==========================================================================
  // LIST USUARIOS
  // ==========================================================================

  static async list(
    tenantId: string,
    filters: {
      page?: number;
      limit?: number;
      tipo?: string;
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
          createdAt: true,
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
  // UPDATE USUARIO
  // ==========================================================================

  static async update(
    tenantId: string,
    usuarioId: string,
    data: UpdateUserData
  ) {
    const existingUser = await prisma.usuario.findFirst({
      where: { id: usuarioId, tenantId },
    });

    if (!existingUser) {
      throw new AppError("Usuário não encontrado", 404);
    }

    // Verificar email duplicado
    if (data.email && data.email !== existingUser.email) {
      const emailExists = await prisma.usuario.findFirst({
        where: {
          email: data.email.toLowerCase().trim(),
          id: { not: usuarioId },
        },
      });

      if (emailExists) {
        throw new AppError("Email já cadastrado", 400);
      }
    }

    const updateData: any = {};

    if (data.nome) updateData.nome = data.nome.trim();
    if (data.email) updateData.email = data.email.toLowerCase().trim();
    if (data.tipo) updateData.tipo = data.tipo;
    if (data.ativo !== undefined) updateData.ativo = data.ativo;

    const usuario = await prisma.usuario.update({
      where: { id: usuarioId },
      data: updateData,
      select: {
        id: true,
        nome: true,
        email: true,
        tipo: true,
        ativo: true,
        updatedAt: true,
      },
    });

    return usuario;
  }

  // ==========================================================================
  // CHANGE PASSWORD
  // ==========================================================================

  static async changePassword(
    usuarioId: string,
    senhaAtual: string,
    novaSenha: string
  ) {
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId },
    });

    if (!usuario) {
      throw new AppError("Usuário não encontrado", 404);
    }

    // Verificar senha atual
    const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha);

    if (!senhaValida) {
      throw new AppError("Senha atual incorreta", 401);
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(novaSenha, 10);

    await prisma.usuario.update({
      where: { id: usuarioId },
      data: { senha: hashedPassword },
    });
  }

  // ==========================================================================
  // RESET PASSWORD (Admin)
  // ==========================================================================

  static async resetPassword(
    tenantId: string,
    usuarioId: string,
    novaSenha: string
  ) {
    const usuario = await prisma.usuario.findFirst({
      where: { id: usuarioId, tenantId },
    });

    if (!usuario) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const hashedPassword = await bcrypt.hash(novaSenha, 10);

    await prisma.usuario.update({
      where: { id: usuarioId },
      data: { senha: hashedPassword },
    });
  }

  // ==========================================================================
  // GET STATISTICS
  // ==========================================================================

  static async getStatistics(tenantId: string) {
    const [total, ativos, inativos, admins, secretarias] = await Promise.all([
      prisma.usuario.count({ where: { tenantId } }),
      prisma.usuario.count({ where: { tenantId, ativo: true } }),
      prisma.usuario.count({ where: { tenantId, ativo: false } }),
      prisma.usuario.count({ where: { tenantId, tipo: "ADMIN" } }),
      prisma.usuario.count({ where: { tenantId, tipo: "SECRETARIA" } }),
    ]);

    return {
      total,
      ativos,
      inativos,
      porTipo: {
        admins,
        secretarias,
      },
    };
  }

  // ==========================================================================
  // DELETE USUARIO
  // ==========================================================================

  static async delete(tenantId: string, usuarioId: string) {
    const existingUser = await prisma.usuario.findFirst({
      where: { id: usuarioId, tenantId },
    });

    if (!existingUser) {
      throw new AppError("Usuário não encontrado", 404);
    }

    // Não permitir excluir o primeiro usuário (admin criador do tenant)
    const firstAdmin = await prisma.usuario.findFirst({
      where: { tenantId, tipo: "ADMIN" },
      orderBy: { createdAt: "asc" },
    });

    if (firstAdmin && firstAdmin.id === usuarioId) {
      throw new AppError(
        "Não é possível excluir o usuário administrador principal",
        400
      );
    }

    // Não permitir excluir o último admin ativo
    if (existingUser.tipo === "ADMIN") {
      const adminCount = await prisma.usuario.count({
        where: { tenantId, tipo: "ADMIN", ativo: true },
      });

      if (adminCount <= 1) {
        throw new AppError(
          "Não é possível excluir o último administrador ativo",
          400
        );
      }
    }

    // Soft delete (desativar)
    await prisma.usuario.update({
      where: { id: usuarioId },
      data: { ativo: false },
    });
  }

  // ==========================================================================
  // TOGGLE STATUS (Ativar/Desativar)
  // ==========================================================================

  static async toggleStatus(
    tenantId: string,
    usuarioId: string,
    currentUserId: string
  ) {
    const existingUser = await prisma.usuario.findFirst({
      where: { id: usuarioId, tenantId },
    });

    if (!existingUser) {
      throw new AppError("Usuário não encontrado", 404);
    }

    // Buscar o primeiro admin (criador do tenant)
    const firstAdmin = await prisma.usuario.findFirst({
      where: { tenantId, tipo: "ADMIN" },
      orderBy: { createdAt: "asc" },
    });

    // Não permitir desativar o primeiro admin (criador do tenant)
    if (firstAdmin && firstAdmin.id === usuarioId && existingUser.ativo) {
      throw new AppError(
        "Não é possível desativar o usuário administrador principal",
        400
      );
    }

    // Não permitir que o usuário desative a si mesmo
    if (usuarioId === currentUserId) {
      throw new AppError("Você não pode desativar seu próprio usuário", 400);
    }

    // Se está desativando um admin, verificar se não é o último
    if (existingUser.tipo === "ADMIN" && existingUser.ativo) {
      const adminCount = await prisma.usuario.count({
        where: { tenantId, tipo: "ADMIN", ativo: true },
      });

      if (adminCount <= 1) {
        throw new AppError(
          "Não é possível desativar o último administrador ativo",
          400
        );
      }
    }

    const usuario = await prisma.usuario.update({
      where: { id: usuarioId },
      data: { ativo: !existingUser.ativo },
      select: {
        id: true,
        nome: true,
        email: true,
        tipo: true,
        ativo: true,
        updatedAt: true,
      },
    });

    return usuario;
  }
}
