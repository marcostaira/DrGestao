import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

// Import types
import { ApiResponse, AppError } from "./types";

// Import routes
import authRoutes from "./modules/auth/routes/auth.routes";
import pacienteRoutes from "./modules/pacientes/routes/paciente.routes";

// Load environment variables
dotenv.config();

// ============================================================================
// APP CONFIGURATION
// ============================================================================

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  // ==========================================================================
  // MIDDLEWARE SETUP
  // ==========================================================================

  private setupMiddlewares(): void {
    // Security headers
    this.app.use(
      helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
          },
        },
      })
    );

    // CORS configuration
    const corsOptions = {
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      credentials: true,
      optionsSuccessStatus: 200,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    };
    this.app.use(cors(corsOptions));

    // Body parsing
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    // Logging
    if (process.env.NODE_ENV !== "test") {
      this.app.use(morgan("combined"));
    }

    // Rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: {
        success: false,
        error: "Muitas requisições, tente novamente em 15 minutos",
      },
      standardHeaders: true,
      legacyHeaders: false,
    });
    this.app.use(limiter);

    // Trust proxy (for rate limiting and IP detection)
    this.app.set("trust proxy", 1);
  }

  // ==========================================================================
  // ROUTES SETUP
  // ==========================================================================

  private setupRoutes(): void {
    // Health check route
    this.app.get("/health", (req: Request, res: Response) => {
      const response: ApiResponse = {
        success: true,
        message: "API is healthy",
        data: {
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
          environment: process.env.NODE_ENV || "development",
          version: process.env.npm_package_version || "1.0.0",
        },
      };
      res.status(200).json(response);
    });

    // API routes
    this.app.use("/api/auth", authRoutes);
    this.app.use("/api/pacientes", pacienteRoutes);

    // 404 handler
    this.app.use("*", (req: Request, res: Response) => {
      const response: ApiResponse = {
        success: false,
        error: `Rota ${req.originalUrl} não encontrada`,
      };
      res.status(404).json(response);
    });
  }

  // ==========================================================================
  // ERROR HANDLING
  // ==========================================================================

  private setupErrorHandling(): void {
    // Global error handler
    this.app.use(
      (
        error: Error | AppError,
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        console.error("Global error handler:", error);

        // Handle AppError (custom errors)
        if (error instanceof AppError) {
          const response: ApiResponse = {
            success: false,
            error: error.message,
          };
          return res.status(error.statusCode).json(response);
        }

        // Handle Prisma errors
        if (error.message.includes("Unique constraint")) {
          const response: ApiResponse = {
            success: false,
            error: "Registro duplicado encontrado",
          };
          return res.status(400).json(response);
        }

        if (error.message.includes("Record to update not found")) {
          const response: ApiResponse = {
            success: false,
            error: "Registro não encontrado",
          };
          return res.status(404).json(response);
        }

        // Handle validation errors
        if (error.message.includes("ValidationError")) {
          const response: ApiResponse = {
            success: false,
            error: "Dados inválidos fornecidos",
          };
          return res.status(400).json(response);
        }

        // Handle JWT errors
        if (
          error.message.includes("JsonWebTokenError") ||
          error.message.includes("TokenExpiredError")
        ) {
          const response: ApiResponse = {
            success: false,
            error: "Token inválido ou expirado",
          };
          return res.status(401).json(response);
        }

        // Default error response
        const response: ApiResponse = {
          success: false,
          error:
            process.env.NODE_ENV === "production"
              ? "Erro interno do servidor"
              : error.message,
        };

        res.status(500).json(response);
      }
    );

    // Handle uncaught exceptions
    process.on("uncaughtException", (error: Error) => {
      console.error("Uncaught Exception:", error);
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
      console.error("Unhandled Rejection at:", promise, "reason:", reason);
      process.exit(1);
    });
  }

  // ==========================================================================
  // GRACEFUL SHUTDOWN
  // ==========================================================================

  public setupGracefulShutdown(): void {
    const gracefulShutdown = (signal: string) => {
      console.log(`\n${signal} received. Shutting down gracefully...`);

      // Close server
      process.exit(0);
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  }
}

export default new App().app;
