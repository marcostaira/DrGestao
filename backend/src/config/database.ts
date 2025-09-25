import { PrismaClient } from "@prisma/client";
import { DatabaseConfig } from "../types";

// ============================================================================
// PRISMA CLIENT CONFIGURATION
// ============================================================================

const databaseConfig: DatabaseConfig = {
  url: process.env.DATABASE_URL || "",
  maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || "10"),
  connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT || "5000"),
};

// Singleton pattern for Prisma Client
class DatabaseService {
  private static instance: PrismaClient;

  static getInstance(): PrismaClient {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new PrismaClient({
        datasources: {
          db: {
            url: databaseConfig.url,
          },
        },
        log:
          process.env.NODE_ENV === "development"
            ? ["query", "info", "warn", "error"]
            : ["error"],
      });

      // Middleware para log de queries lentas
      DatabaseService.instance.$use(async (params, next) => {
        const before = Date.now();
        const result = await next(params);
        const after = Date.now();

        const queryTime = after - before;
        if (queryTime > 1000) {
          // Log queries > 1s
          console.warn(
            `Slow query detected: ${params.model}.${params.action} took ${queryTime}ms`
          );
        }

        return result;
      });

      // Middleware para isolamento de tenant
      DatabaseService.instance.$use(async (params, next) => {
        // Skip middleware para modelos que não têm tenantId
        const skipModels = ["LogSistema"];
        if (skipModels.includes(params.model || "")) {
          return next(params);
        }

        // Para operações que não são de sistema
        if (params.model && !["Tenant"].includes(params.model)) {
          // Adicionar filtro de tenantId automaticamente se não estiver presente
          if (params.action === "findMany" || params.action === "findFirst") {
            if (params.args?.where && !params.args.where.tenantId) {
              console.warn(
                `Query without tenantId filter on model ${params.model}`
              );
            }
          }
        }

        return next(params);
      });
    }

    return DatabaseService.instance;
  }

  static async disconnect(): Promise<void> {
    if (DatabaseService.instance) {
      await DatabaseService.instance.$disconnect();
    }
  }

  static async connect(): Promise<void> {
    const prisma = DatabaseService.getInstance();
    try {
      await prisma.$connect();
      console.log("📦 Database connected successfully");
    } catch (error) {
      console.error("❌ Failed to connect to database:", error);
      throw error;
    }
  }

  static async checkConnection(): Promise<boolean> {
    try {
      const prisma = DatabaseService.getInstance();
      await prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error("Database connection check failed:", error);
      return false;
    }
  }
}

// ============================================================================
// TRANSACTION HELPERS
// ============================================================================

export const runTransaction = async <T>(
  callback: (prisma: PrismaClient) => Promise<T>
): Promise<T> => {
  const prisma = DatabaseService.getInstance();
  return prisma.$transaction(callback);
};

// ============================================================================
// TENANT ISOLATION HELPERS
// ============================================================================

export const withTenantIsolation = (tenantId: string) => {
  const prisma = DatabaseService.getInstance();

  return {
    // Pacientes
    paciente: {
      findMany: (args?: any) =>
        prisma.paciente.findMany({
          ...args,
          where: { ...args?.where, tenantId },
        }),
      findFirst: (args?: any) =>
        prisma.paciente.findFirst({
          ...args,
          where: { ...args?.where, tenantId },
        }),
      findUnique: (args: any) =>
        prisma.paciente.findFirst({
          where: { ...args.where, tenantId },
        }),
      create: (args: any) =>
        prisma.paciente.create({
          ...args,
          data: { ...args.data, tenantId },
        }),
      update: (args: any) =>
        prisma.paciente.updateMany({
          ...args,
          where: { ...args.where, tenantId },
        }),
      delete: (args: any) =>
        prisma.paciente.deleteMany({
          where: { ...args.where, tenantId },
        }),
      count: (args?: any) =>
        prisma.paciente.count({
          ...args,
          where: { ...args?.where, tenantId },
        }),
    },

    // Profissionais
    profissional: {
      findMany: (args?: any) =>
        prisma.profissional.findMany({
          ...args,
          where: { ...args?.where, tenantId },
        }),
      findFirst: (args?: any) =>
        prisma.profissional.findFirst({
          ...args,
          where: { ...args?.where, tenantId },
        }),
      findUnique: (args: any) =>
        prisma.profissional.findFirst({
          where: { ...args.where, tenantId },
        }),
      create: (args: any) =>
        prisma.profissional.create({
          ...args,
          data: { ...args.data, tenantId },
        }),
      update: (args: any) =>
        prisma.profissional.updateMany({
          ...args,
          where: { ...args.where, tenantId },
        }),
      delete: (args: any) =>
        prisma.profissional.deleteMany({
          where: { ...args.where, tenantId },
        }),
      count: (args?: any) =>
        prisma.profissional.count({
          ...args,
          where: { ...args?.where, tenantId },
        }),
    },

    // Procedimentos
    procedimento: {
      findMany: (args?: any) =>
        prisma.procedimento.findMany({
          ...args,
          where: { ...args?.where, tenantId },
        }),
      findFirst: (args?: any) =>
        prisma.procedimento.findFirst({
          ...args,
          where: { ...args?.where, tenantId },
        }),
      findUnique: (args: any) =>
        prisma.procedimento.findFirst({
          where: { ...args.where, tenantId },
        }),
      create: (args: any) =>
        prisma.procedimento.create({
          ...args,
          data: { ...args.data, tenantId },
        }),
      update: (args: any) =>
        prisma.procedimento.updateMany({
          ...args,
          where: { ...args.where, tenantId },
        }),
      delete: (args: any) =>
        prisma.procedimento.deleteMany({
          where: { ...args.where, tenantId },
        }),
      count: (args?: any) =>
        prisma.procedimento.count({
          ...args,
          where: { ...args?.where, tenantId },
        }),
    },

    // Agendamentos
    agendamento: {
      findMany: (args?: any) =>
        prisma.agendamento.findMany({
          ...args,
          where: { ...args?.where, tenantId },
        }),
      findFirst: (args?: any) =>
        prisma.agendamento.findFirst({
          ...args,
          where: { ...args?.where, tenantId },
        }),
      findUnique: (args: any) =>
        prisma.agendamento.findFirst({
          where: { ...args.where, tenantId },
        }),
      create: (args: any) =>
        prisma.agendamento.create({
          ...args,
          data: { ...args.data, tenantId },
        }),
      update: (args: any) =>
        prisma.agendamento.updateMany({
          ...args,
          where: { ...args.where, tenantId },
        }),
      delete: (args: any) =>
        prisma.agendamento.deleteMany({
          where: { ...args.where, tenantId },
        }),
      count: (args?: any) =>
        prisma.agendamento.count({
          ...args,
          where: { ...args?.where, tenantId },
        }),
    },

    // Atendimentos
    atendimento: {
      findMany: (args?: any) =>
        prisma.atendimento.findMany({
          ...args,
          where: { ...args?.where, tenantId },
        }),
      findFirst: (args?: any) =>
        prisma.atendimento.findFirst({
          ...args,
          where: { ...args?.where, tenantId },
        }),
      findUnique: (args: any) =>
        prisma.atendimento.findFirst({
          where: { ...args.where, tenantId },
        }),
      create: (args: any) =>
        prisma.atendimento.create({
          ...args,
          data: { ...args.data, tenantId },
        }),
      update: (args: any) =>
        prisma.atendimento.updateMany({
          ...args,
          where: { ...args.where, tenantId },
        }),
      delete: (args: any) =>
        prisma.atendimento.deleteMany({
          where: { ...args.where, tenantId },
        }),
      count: (args?: any) =>
        prisma.atendimento.count({
          ...args,
          where: { ...args?.where, tenantId },
        }),
    },

    // WhatsApp Config
    whatsappConfig: {
      findFirst: (args?: any) =>
        prisma.whatsAppConfig.findFirst({
          ...args,
          where: { ...args?.where, tenantId },
        }),
      create: (args: any) =>
        prisma.whatsAppConfig.create({
          ...args,
          data: { ...args.data, tenantId },
        }),
      update: (args: any) =>
        prisma.whatsAppConfig.updateMany({
          ...args,
          where: { ...(args?.where || {}), tenantId },
        }),
      upsert: async (args: any) => {
        const existing = await prisma.whatsAppConfig.findFirst({
          where: { tenantId },
        });

        if (existing) {
          return prisma.whatsAppConfig.update({
            where: { id: existing.id },
            data: args.update,
          });
        } else {
          return prisma.whatsAppConfig.create({
            data: { ...args.create, tenantId },
          });
        }
      },
    },
  };
};

export const prisma = DatabaseService.getInstance();
export default DatabaseService;
