import { Request, Response, NextFunction } from "express";

// ============================================================================
// APP ERROR CLASS
// ============================================================================

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

// ============================================================================
// ERROR HANDLER MIDDLEWARE
// ============================================================================

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      error: error.message,
    });
    return;
  }

  // Erros do Prisma
  if (error.name === "PrismaClientKnownRequestError") {
    res.status(400).json({
      success: false,
      error: "Erro ao processar requisição no banco de dados",
    });
    return;
  }

  // Erro de validação
  if (error.name === "ValidationError") {
    res.status(400).json({
      success: false,
      error: error.message,
    });
    return;
  }

  // Erro genérico
  console.error("Erro não tratado:", error);
  res.status(500).json({
    success: false,
    error: "Erro interno do servidor",
  });
};

// ============================================================================
// NOT FOUND HANDLER
// ============================================================================

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404).json({
    success: false,
    error: `Rota ${req.originalUrl} não encontrada`,
  });
};
