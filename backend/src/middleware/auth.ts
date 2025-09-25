import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {
  AuthenticatedRequest,
  JWTPayload,
  AppError,
  TipoUsuario,
} from "../types";
import { prisma } from "../config/database";

// ============================================================================
// JWT CONFIGURATION
// ============================================================================

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || "30d";

// ============================================================================
// TOKEN UTILITIES
// ============================================================================

export const generateToken = (
  payload: Omit<JWTPayload, "iat" | "exp">
): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const generateRefreshToken = (
  payload: Omit<JWTPayload, "iat" | "exp">
): string => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
};

export const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError("Token expirado", 401);
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError("Token inválido", 401);
    }
    throw new AppError("Erro de autenticação", 401);
  }
};

export const verifyRefreshToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as JWTPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError("Refresh token expirado", 401);
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError("Refresh token inválido", 401);
    }
    throw new AppError("Erro de autenticação", 401);
  }
};

// ============================================================================
// AUTHENTICATION MIDDLEWARE
// ============================================================================

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Extrair token do header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Token de acesso requerido", 401);
    }

    const token = authHeader.substring(7); // Remove 'Bearer '

    // Verificar e decodificar token
    const decoded = verifyToken(token);

    // Buscar usuário no banco para verificar se ainda está ativo
    const usuario = await prisma.usuario.findUnique({
      where: { id: decoded.userId },
      include: {
        tenant: true,
      },
    });

    if (!usuario) {
      throw new AppError("Usuário não encontrado", 401);
    }

    if (!usuario.ativo) {
      throw new AppError("Usuário inativo", 401);
    }

    if (!usuario.tenant.ativo) {
      throw new AppError("Tenant inativo", 401);
    }

    // Adicionar dados do usuário e tenant à requisição
    req.user = {
      id: usuario.id,
      tenantId: usuario.tenantId,
      email: usuario.email,
      nome: usuario.nome,
      tipo: usuario.tipo as TipoUsuario,
    };

    req.tenant = {
      id: usuario.tenant.id,
      nome: usuario.tenant.nome,
      plano: usuario.tenant.plano,
      ativo: usuario.tenant.ativo,
    };

    next();
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(401).json({
        success: false,
        error: "Erro de autenticação",
      });
    }
  }
};

// ============================================================================
// AUTHORIZATION MIDDLEWARE
// ============================================================================

export const authorize = (...allowedRoles: TipoUsuario[]) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: "Usuário não autenticado",
      });
      return;
    }

    if (!allowedRoles.includes(req.user.tipo)) {
      res.status(403).json({
        success: false,
        error: "Acesso negado - privilégios insuficientes",
      });
      return;
    }

    next();
  };
};

// ============================================================================
// ADMIN ONLY MIDDLEWARE
// ============================================================================

export const adminOnly = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: "Usuário não autenticado",
    });
    return;
  }

  if (req.user.tipo !== TipoUsuario.ADMIN) {
    res.status(403).json({
      success: false,
      error: "Acesso restrito a administradores",
    });
    return;
  }

  next();
};

// ============================================================================
// OPTIONAL AUTHENTICATION
// ============================================================================

export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next();
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    const usuario = await prisma.usuario.findUnique({
      where: { id: decoded.userId },
      include: { tenant: true },
    });

    if (usuario && usuario.ativo && usuario.tenant.ativo) {
      req.user = {
        id: usuario.id,
        tenantId: usuario.tenantId,
        email: usuario.email,
        nome: usuario.nome,
        tipo: usuario.tipo as TipoUsuario,
      };

      req.tenant = {
        id: usuario.tenant.id,
        nome: usuario.tenant.nome,
        plano: usuario.tenant.plano,
        ativo: usuario.tenant.ativo,
      };
    }

    next();
  } catch (error) {
    // Em caso de erro, continua sem autenticação
    next();
  }
};

// ============================================================================
// REFRESH TOKEN MIDDLEWARE
// ============================================================================

export const refreshTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AppError("Refresh token requerido", 400);
    }

    const decoded = verifyRefreshToken(refreshToken);

    // Verificar se o usuário ainda existe e está ativo
    const usuario = await prisma.usuario.findUnique({
      where: { id: decoded.userId },
      include: { tenant: true },
    });

    if (!usuario || !usuario.ativo || !usuario.tenant.ativo) {
      throw new AppError("Refresh token inválido", 401);
    }

    // Gerar novos tokens
    const tokenPayload = {
      userId: usuario.id,
      tenantId: usuario.tenantId,
      email: usuario.email,
      nome: usuario.nome,
      tipo: usuario.tipo as TipoUsuario,
    };

    const newToken = generateToken(tokenPayload);
    const newRefreshToken = generateRefreshToken(tokenPayload);

    res.json({
      success: true,
      data: {
        token: newToken,
        refreshToken: newRefreshToken,
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
          plano: usuario.tenant.plano,
        },
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Erro interno do servidor",
      });
    }
  }
};

// ============================================================================
// RATE LIMITING POR USUÁRIO
// ============================================================================

export const createUserRateLimit = () => {
  const attempts = new Map<string, { count: number; resetTime: number }>();
  const MAX_ATTEMPTS = 5;
  const WINDOW_MS = 15 * 60 * 1000; // 15 minutos

  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    const userId = req.user?.id || req.ip;
    const now = Date.now();

    const userAttempts = attempts.get(userId) || {
      count: 0,
      resetTime: now + WINDOW_MS,
    };

    if (now > userAttempts.resetTime) {
      userAttempts.count = 0;
      userAttempts.resetTime = now + WINDOW_MS;
    }

    userAttempts.count++;
    attempts.set(userId, userAttempts);

    if (userAttempts.count > MAX_ATTEMPTS) {
      res.status(429).json({
        success: false,
        error: "Muitas tentativas. Tente novamente em 15 minutos.",
      });
      return;
    }

    next();
  };
};

// ============================================================================
// JWT CONFIGURATION
// ============================================================================

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || "30d";

// ============================================================================
// TOKEN UTILITIES
// ============================================================================

export const generateToken = (
  payload: Omit<JWTPayload, "iat" | "exp">
): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const generateRefreshToken = (
  payload: Omit<JWTPayload, "iat" | "exp">
): string => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
};

export const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError("Token expirado", 401);
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError("Token inválido", 401);
    }
    throw new AppError("Erro de autenticação", 401);
  }
};

export const verifyRefreshToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as JWTPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError("Refresh token expirado", 401);
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError("Refresh token inválido", 401);
    }
    throw new AppError("Erro de autenticação", 401);
  }
};

// ============================================================================
// AUTHENTICATION MIDDLEWARE
// ============================================================================

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Extrair token do header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Token de acesso requerido", 401);
    }

    const token = authHeader.substring(7); // Remove 'Bearer '

    // Verificar e decodificar token
    const decoded = verifyToken(token);

    // Buscar usuário no banco para verificar se ainda está ativo
    const usuario = await prisma.usuario.findUnique({
      where: { id: decoded.userId },
      include: {
        tenant: true,
      },
    });

    if (!usuario) {
      throw new AppError("Usuário não encontrado", 401);
    }

    if (!usuario.ativo) {
      throw new AppError("Usuário inativo", 401);
    }

    if (!usuario.tenant.ativo) {
      throw new AppError("Tenant inativo", 401);
    }

    // Adicionar dados do usuário e tenant à requisição
    req.user = {
      id: usuario.id,
      tenantId: usuario.tenantId,
      email: usuario.email,
      nome: usuario.nome,
      tipo: usuario.tipo,
    };

    req.tenant = {
      id: usuario.tenant.id,
      nome: usuario.tenant.nome,
      plano: usuario.tenant.plano,
      ativo: usuario.tenant.ativo,
    };

    next();
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(401).json({
        success: false,
        error: "Erro de autenticação",
      });
    }
  }
};

// ============================================================================
// AUTHORIZATION MIDDLEWARE
// ============================================================================

export const authorize = (...allowedRoles: TipoUsuario[]) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: "Usuário não autenticado",
      });
      return;
    }

    if (!allowedRoles.includes(req.user.tipo)) {
      res.status(403).json({
        success: false,
        error: "Acesso negado - privilégios insuficientes",
      });
      return;
    }

    next();
  };
};

// ============================================================================
// ADMIN ONLY MIDDLEWARE
// ============================================================================

export const adminOnly = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: "Usuário não autenticado",
    });
    return;
  }

  if (req.user.tipo !== TipoUsuario.ADMIN) {
    res.status(403).json({
      success: false,
      error: "Acesso restrito a administradores",
    });
    return;
  }

  next();
};

// ============================================================================
// OPTIONAL AUTHENTICATION
// ============================================================================

export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next();
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    const usuario = await prisma.usuario.findUnique({
      where: { id: decoded.userId },
      include: { tenant: true },
    });

    if (usuario && usuario.ativo && usuario.tenant.ativo) {
      req.user = {
        id: usuario.id,
        tenantId: usuario.tenantId,
        email: usuario.email,
        nome: usuario.nome,
        tipo: usuario.tipo,
      };

      req.tenant = {
        id: usuario.tenant.id,
        nome: usuario.tenant.nome,
        plano: usuario.tenant.plano,
        ativo: usuario.tenant.ativo,
      };
    }

    next();
  } catch (error) {
    // Em caso de erro, continua sem autenticação
    next();
  }
};

// ============================================================================
// REFRESH TOKEN MIDDLEWARE
// ============================================================================

export const refreshTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AppError("Refresh token requerido", 400);
    }

    const decoded = verifyRefreshToken(refreshToken);

    // Verificar se o usuário ainda existe e está ativo
    const usuario = await prisma.usuario.findUnique({
      where: { id: decoded.userId },
      include: { tenant: true },
    });

    if (!usuario || !usuario.ativo || !usuario.tenant.ativo) {
      throw new AppError("Refresh token inválido", 401);
    }

    // Gerar novos tokens
    const tokenPayload = {
      userId: usuario.id,
      tenantId: usuario.tenantId,
      email: usuario.email,
      nome: usuario.nome,
      tipo: usuario.tipo,
    };

    const newToken = generateToken(tokenPayload);
    const newRefreshToken = generateRefreshToken(tokenPayload);

    res.json({
      success: true,
      data: {
        token: newToken,
        refreshToken: newRefreshToken,
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
          plano: usuario.tenant.plano,
        },
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Erro interno do servidor",
      });
    }
  }
};

// ============================================================================
// RATE LIMITING POR USUÁRIO
// ============================================================================

export const createUserRateLimit = () => {
  const attempts = new Map<string, { count: number; resetTime: number }>();
  const MAX_ATTEMPTS = 5;
  const WINDOW_MS = 15 * 60 * 1000; // 15 minutos

  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    const userId = req.user?.id || req.ip;
    const now = Date.now();

    const userAttempts = attempts.get(userId) || {
      count: 0,
      resetTime: now + WINDOW_MS,
    };

    if (now > userAttempts.resetTime) {
      userAttempts.count = 0;
      userAttempts.resetTime = now + WINDOW_MS;
    }

    userAttempts.count++;
    attempts.set(userId, userAttempts);

    if (userAttempts.count > MAX_ATTEMPTS) {
      res.status(429).json({
        success: false,
        error: "Muitas tentativas. Tente novamente em 15 minutos.",
      });
      return;
    }

    next();
  };
};
