import bcrypt from "bcryptjs";
import { prisma } from "../../../config/database";
import { generateToken, generateRefreshToken } from "../../../middleware/auth";
import {
  LoginCredentials,
  AuthResponse,
  AppError,
  CreateTenantData,
  CreateUserData,
} from "../../../types";
import { TipoUsuario } from "../../../generated/prisma";
import { AutorizacaoService } from "../../autorizacoes/services/autorizacao.service";

// ============================================================================
// AUTH SERVICE
// ============================================================================

export class AuthService {
  // ==========================================================================
  // LOGIN
  // ==========================================================================

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { email, senha } = credentials;

    // Buscar usuário com tenant e plano
    const usuario = await prisma.usuario.findFirst({
      where: {
        email: email.toLowerCase().trim(),
        ativo: true,
      },
      include: {
        tenant: {
          include: {
            plano: true,
          },
        },
      },
    });

    if (!usuario) {
      throw new AppError("Credenciais inválidas", 401);
    }

    if (!usuario.tenant.ativo) {
      throw new AppError("Conta inativa. Entre em contato com o suporte.", 401);
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new AppError("Credenciais inválidas", 401);
    }

    // Gerar tokens
    const tokenPayload = {
      userId: usuario.id,
      tenantId: usuario.tenantId,
      email: usuario.email,
      nome: usuario.nome,
      tipo: usuario.tipo,
    };

    const token = generateToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Log do login
    await prisma.logSistema.create({
      data: {
        tenantId: usuario.tenantId,
        usuarioId: usuario.id,
        tipo: "LOGIN",
        descricao: `Login realizado por ${usuario.email}`,
        metadata: {
          timestamp: new Date().toISOString(),
        },
      },
    });

    return {
      token,
      refreshToken,
      user: {
        id: usuario.id,
        tenantId: usuario.tenantId,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
      },
      tenant: {
        id: usuario.tenant.id,
        nome: usuario.tenant.nome,
        plano: usuario.tenant.plano.nome,
      },
    };
  }

  // ==========================================================================
  // REGISTER TENANT
  // ==========================================================================

  static async registerTenant(data: CreateTenantData): Promise<AuthResponse> {
    const { nome, adminUser } = data;

    // Verificar se já existe usuário com mesmo email
    const existingUser = await prisma.usuario.findFirst({
      where: {
        email: {
          equals: adminUser.email.toLowerCase().trim(),
          mode: "insensitive",
        },
      },
    });

    if (existingUser) {
      throw new AppError("Já existe um usuário com este email", 400);
    }

    // Buscar plano básico
    const planoBasico = await prisma.plano.findFirst({
      where: { slug: "basico", ativo: true },
    });

    if (!planoBasico) {
      throw new AppError(
        "Plano básico não encontrado. Execute o seed primeiro.",
        500
      );
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(adminUser.senha, 12);

    // Criar tenant, usuário admin e autorizações em uma transação
    const result = await prisma.$transaction(async (tx) => {
      // Criar tenant
      const tenant = await tx.tenant.create({
        data: {
          nome: nome.trim(),
          planoId: planoBasico.id,
          ativo: true,
        },
        include: {
          plano: true,
        },
      });

      // Criar usuário admin
      const usuario = await tx.usuario.create({
        data: {
          tenantId: tenant.id,
          nome: adminUser.nome.trim(),
          email: adminUser.email.toLowerCase().trim(),
          senha: hashedPassword,
          tipo: TipoUsuario.ADMIN,
          ativo: true,
        },
      });

      // Criar autorizações iniciais para o admin (todas as permissões)
      await AutorizacaoService.criarAutorizacoesIniciais(
        usuario.id,
        TipoUsuario.ADMIN
      );

      return { tenant, usuario };
    });

    // Gerar tokens
    const tokenPayload = {
      userId: result.usuario.id,
      tenantId: result.tenant.id,
      email: result.usuario.email,
      nome: result.usuario.nome,
      tipo: result.usuario.tipo,
    };

    const token = generateToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    return {
      token,
      refreshToken,
      user: {
        id: result.usuario.id,
        tenantId: result.tenant.id,
        nome: result.usuario.nome,
        email: result.usuario.email,
        tipo: result.usuario.tipo,
      },
      tenant: {
        id: result.tenant.id,
        nome: result.tenant.nome,
        plano: result.tenant.plano.nome,
      },
    };
  }

  // ==========================================================================
  // CREATE USER (Criar usuário adicional no tenant)
  // ==========================================================================

  static async createUser(
    tenantId: string,
    data: CreateUserData
  ): Promise<void> {
    const { nome, email, senha, tipo = TipoUsuario.SECRETARIA } = data;

    // Verificar se tenant existe e está ativo
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      include: {
        plano: true,
      },
    });

    if (!tenant || !tenant.ativo) {
      throw new AppError("Tenant não encontrado ou inativo", 404);
    }

    // Verificar limites do plano
    const usuariosAtivos = await prisma.usuario.count({
      where: { tenantId, ativo: true },
    });

    if (usuariosAtivos >= tenant.plano.usuarios) {
      throw new AppError(
        `Limite de ${tenant.plano.usuarios} usuário(s) atingido para o plano ${tenant.plano.nome}. Faça upgrade do plano.`,
        403
      );
    }

    // Verificar se email já existe
    const existingUser = await prisma.usuario.findFirst({
      where: {
        email: {
          equals: email.toLowerCase().trim(),
          mode: "insensitive",
        },
      },
    });

    if (existingUser) {
      throw new AppError("Já existe um usuário com este email", 400);
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(senha, 12);

    // Criar usuário e autorizações em uma transação
    await prisma.$transaction(async (tx) => {
      // Criar usuário
      const usuario = await tx.usuario.create({
        data: {
          tenantId,
          nome: nome.trim(),
          email: email.toLowerCase().trim(),
          senha: hashedPassword,
          tipo,
          ativo: true,
        },
      });

      // Criar autorizações iniciais
      await AutorizacaoService.criarAutorizacoesIniciais(usuario.id, tipo);
    });
  }

  // ==========================================================================
  // CHANGE PASSWORD
  // ==========================================================================

  static async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const usuario = await prisma.usuario.findUnique({
      where: { id: userId, ativo: true },
    });

    if (!usuario) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const senhaValida = await bcrypt.compare(currentPassword, usuario.senha);
    if (!senhaValida) {
      throw new AppError("Senha atual incorreta", 400);
    }

    const mesmaSenh = await bcrypt.compare(newPassword, usuario.senha);
    if (mesmaSenh) {
      throw new AppError("A nova senha deve ser diferente da atual", 400);
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    await prisma.usuario.update({
      where: { id: userId },
      data: { senha: hashedNewPassword },
    });

    await prisma.logSistema.create({
      data: {
        tenantId: usuario.tenantId,
        usuarioId: userId,
        tipo: "LOGIN",
        descricao: "Senha alterada pelo usuário",
        metadata: {
          timestamp: new Date().toISOString(),
        },
      },
    });
  }

  // ==========================================================================
  // RESET PASSWORD (Admin reset)
  // ==========================================================================

  static async resetPassword(
    adminUserId: string,
    targetUserId: string,
    newPassword: string
  ): Promise<void> {
    const adminUser = await prisma.usuario.findUnique({
      where: { id: adminUserId, ativo: true },
    });

    if (!adminUser || adminUser.tipo !== TipoUsuario.ADMIN) {
      throw new AppError("Apenas administradores podem resetar senhas", 403);
    }

    const targetUser = await prisma.usuario.findUnique({
      where: { id: targetUserId, ativo: true },
    });

    if (!targetUser) {
      throw new AppError("Usuário não encontrado", 404);
    }

    if (adminUser.tenantId !== targetUser.tenantId) {
      throw new AppError(
        "Não é possível alterar senha de usuário de outro tenant",
        403
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.usuario.update({
      where: { id: targetUserId },
      data: { senha: hashedPassword },
    });

    await prisma.logSistema.create({
      data: {
        tenantId: targetUser.tenantId,
        usuarioId: adminUserId,
        tipo: "LOGIN",
        descricao: `Senha resetada pelo admin para usuário ${targetUser.email}`,
        metadata: {
          targetUserId,
          targetUserEmail: targetUser.email,
          timestamp: new Date().toISOString(),
        },
      },
    });
  }

  // ==========================================================================
  // GET USER PROFILE
  // ==========================================================================

  static async getUserProfile(userId: string) {
    const usuario = await prisma.usuario.findUnique({
      where: { id: userId, ativo: true },
      select: {
        id: true,
        nome: true,
        email: true,
        tipo: true,
        createdAt: true,
        tenant: {
          select: {
            id: true,
            nome: true,
            plano: {
              select: {
                nome: true,
                slug: true,
              },
            },
          },
        },
      },
    });

    if (!usuario) {
      throw new AppError("Usuário não encontrado", 404);
    }

    return usuario;
  }

  // ==========================================================================
  // UPDATE PROFILE
  // ==========================================================================

  static async updateProfile(
    userId: string,
    data: { nome?: string; email?: string }
  ): Promise<void> {
    const updateData: any = {};

    if (data.nome) {
      updateData.nome = data.nome.trim();
    }

    if (data.email) {
      const existingUser = await prisma.usuario.findFirst({
        where: {
          email: {
            equals: data.email.toLowerCase().trim(),
            mode: "insensitive",
          },
          id: { not: userId },
        },
      });

      if (existingUser) {
        throw new AppError("Este email já está em uso", 400);
      }

      updateData.email = data.email.toLowerCase().trim();
    }

    if (Object.keys(updateData).length === 0) {
      return;
    }

    await prisma.usuario.update({
      where: { id: userId },
      data: updateData,
    });
  }

  // ==========================================================================
  // DEACTIVATE USER
  // ==========================================================================

  static async deactivateUser(
    adminUserId: string,
    targetUserId: string
  ): Promise<void> {
    const adminUser = await prisma.usuario.findUnique({
      where: { id: adminUserId, ativo: true },
    });

    if (!adminUser || adminUser.tipo !== TipoUsuario.ADMIN) {
      throw new AppError(
        "Apenas administradores podem desativar usuários",
        403
      );
    }

    if (adminUserId === targetUserId) {
      throw new AppError("Não é possível desativar seu próprio usuário", 400);
    }

    const targetUser = await prisma.usuario.findUnique({
      where: { id: targetUserId },
    });

    if (!targetUser) {
      throw new AppError("Usuário não encontrado", 404);
    }

    if (adminUser.tenantId !== targetUser.tenantId) {
      throw new AppError(
        "Não é possível desativar usuário de outro tenant",
        403
      );
    }

    await prisma.usuario.update({
      where: { id: targetUserId },
      data: { ativo: false },
    });

    await prisma.logSistema.create({
      data: {
        tenantId: targetUser.tenantId,
        usuarioId: adminUserId,
        tipo: "LOGIN",
        descricao: `Usuário ${targetUser.email} desativado pelo admin`,
        metadata: {
          targetUserId,
          targetUserEmail: targetUser.email,
          timestamp: new Date().toISOString(),
        },
      },
    });
  }

  // ==========================================================================
  // LIST TENANT USERS
  // ==========================================================================

  static async listTenantUsers(
    tenantId: string,
    page: number = 1,
    limit: number = 20
  ) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.usuario.findMany({
        where: { tenantId },
        select: {
          id: true,
          nome: true,
          email: true,
          tipo: true,
          ativo: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.usuario.count({
        where: { tenantId },
      }),
    ]);

    return {
      users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // ==========================================================================
  // VALIDATE TOKEN (Para middleware)
  // ==========================================================================

  static async validateUserToken(userId: string, tenantId: string) {
    const usuario = await prisma.usuario.findUnique({
      where: { id: userId },
      include: {
        tenant: {
          include: {
            plano: true,
          },
        },
      },
    });

    if (!usuario || !usuario.ativo || !usuario.tenant.ativo) {
      throw new AppError("Token inválido ou usuário inativo", 401);
    }

    if (usuario.tenantId !== tenantId) {
      throw new AppError("Token inválido para este tenant", 401);
    }

    return {
      user: {
        id: usuario.id,
        tenantId: usuario.tenantId,
        email: usuario.email,
        nome: usuario.nome,
        tipo: usuario.tipo,
      },
      tenant: {
        id: usuario.tenant.id,
        nome: usuario.tenant.nome,
        plano: usuario.tenant.plano.nome,
        ativo: usuario.tenant.ativo,
      },
    };
  }

  // ==========================================================================
  // LOGOUT (Log da ação)
  // ==========================================================================

  static async logout(userId: string, tenantId: string): Promise<void> {
    await prisma.logSistema.create({
      data: {
        tenantId,
        usuarioId: userId,
        tipo: "LOGOUT",
        descricao: "Logout realizado",
        metadata: {
          timestamp: new Date().toISOString(),
        },
      },
    });
  }

  // ==========================================================================
  // GENERATE NEW TOKENS (Para refresh token)
  // ==========================================================================

  static async generateNewTokens(
    userId: string,
    tenantId: string
  ): Promise<{ token: string; refreshToken: string }> {
    const usuario = await prisma.usuario.findUnique({
      where: { id: userId, tenantId, ativo: true },
    });

    if (!usuario) {
      throw new AppError("Usuário não encontrado ou inativo", 401);
    }

    const tokenPayload = {
      userId: usuario.id,
      tenantId: usuario.tenantId,
      email: usuario.email,
      nome: usuario.nome,
      tipo: usuario.tipo,
    };

    const token = generateToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    return { token, refreshToken };
  }

  // ==========================================================================
  // GET USERS (Listar usuários do tenant)
  // ==========================================================================

  static async getUsers(
    tenantId: string,
    pagination: { page: number; limit: number }
  ): Promise<{
    data: any[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    const [usuarios, total] = await Promise.all([
      prisma.usuario.findMany({
        where: { tenantId },
        select: {
          id: true,
          nome: true,
          email: true,
          tipo: true,
          ativo: true,
          createdAt: true,
          updatedAt: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.usuario.count({ where: { tenantId } }),
    ]);

    return {
      data: usuarios,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
