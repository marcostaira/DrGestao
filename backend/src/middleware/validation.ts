import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../types";

// ============================================================================
// VALIDATION MIDDLEWARE
// ============================================================================

export interface ValidationSchemas {
  body?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
}

export const validate = (schemas: ValidationSchemas) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: string[] = [];

    // Validate body
    if (schemas.body) {
      const { error } = schemas.body.validate(req.body, { abortEarly: false });
      if (error) {
        errors.push(...error.details.map((detail) => detail.message));
      }
    }

    // Validate query
    if (schemas.query) {
      const { error } = schemas.query.validate(req.query, {
        abortEarly: false,
      });
      if (error) {
        errors.push(...error.details.map((detail) => detail.message));
      }
    }

    // Validate params
    if (schemas.params) {
      const { error } = schemas.params.validate(req.params, {
        abortEarly: false,
      });
      if (error) {
        errors.push(...error.details.map((detail) => detail.message));
      }
    }

    if (errors.length > 0) {
      res.status(400).json({
        success: false,
        error: "Erro de validação",
        details: errors,
      });
      return;
    }

    next();
  };
};

// ============================================================================
// COMMON VALIDATION SCHEMAS
// ============================================================================

export const idSchema = Joi.string().required().messages({
  "string.empty": "ID é obrigatório",
  "any.required": "ID é obrigatório",
});

export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  sortBy: Joi.string().optional(),
  sortOrder: Joi.string().valid("asc", "desc").default("desc"),
});

// ============================================================================
// AUTH VALIDATION SCHEMAS
// ============================================================================

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email deve ter um formato válido",
    "string.empty": "Email é obrigatório",
    "any.required": "Email é obrigatório",
  }),
  senha: Joi.string().min(6).required().messages({
    "string.min": "Senha deve ter pelo menos 6 caracteres",
    "string.empty": "Senha é obrigatória",
    "any.required": "Senha é obrigatória",
  }),
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    "string.empty": "Refresh token é obrigatório",
    "any.required": "Refresh token é obrigatório",
  }),
});

// ============================================================================
// TENANT VALIDATION SCHEMAS
// ============================================================================

export const createTenantSchema = Joi.object({
  nome: Joi.string().trim().min(2).max(100).required(),
  plano: Joi.string()
    .valid("basico", "premium", "enterprise")
    .default("basico"),
  adminUser: Joi.object({
    nome: Joi.string().trim().min(2).max(100).required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required(),
  }).required(),
});

export const updateTenantSchema = Joi.object({
  nome: Joi.string().trim().min(2).max(100),
  plano: Joi.string().valid("basico", "premium", "enterprise"),
  ativo: Joi.boolean(),
});

export const createUserSchema = Joi.object({
  nome: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
  tipo: Joi.string().valid("ADMIN", "SECRETARIA").default("SECRETARIA"),
});

export const updateUserSchema = Joi.object({
  nome: Joi.string().trim().min(2).max(100),
  email: Joi.string().email(),
});

// ============================================================================
// PROFISSIONAL VALIDATION SCHEMAS
// ============================================================================

export const createProfissionalSchema = Joi.object({
  nome: Joi.string().required().trim().min(2).max(100).messages({
    "string.empty": "Nome é obrigatório",
    "string.min": "Nome deve ter pelo menos 2 caracteres",
  }),
  especialidade: Joi.string().optional().allow("", null).trim().max(100),
  cor: Joi.string()
    .optional()
    .pattern(/^#[0-9A-Fa-f]{6}$/)
    .messages({
      "string.pattern.base": "Cor deve estar no formato hexadecimal (#RRGGBB)",
    }),
  observacoes: Joi.string().optional().allow("", null).trim().max(500),
});

export const updateProfissionalSchema = Joi.object({
  nome: Joi.string().optional().trim().min(2).max(100),
  especialidade: Joi.string().optional().allow("", null).trim().max(100),
  cor: Joi.string()
    .optional()
    .pattern(/^#[0-9A-Fa-f]{6}$/)
    .messages({
      "string.pattern.base": "Cor deve estar no formato hexadecimal (#RRGGBB)",
    }),
  observacoes: Joi.string().optional().allow("", null).trim().max(500),
  ativo: Joi.boolean().optional(),
});

// ============================================================================
// PROCEDIMENTO VALIDATION SCHEMAS
// ============================================================================

export const createProcedimentoSchema = Joi.object({
  nome: Joi.string().trim().min(2).max(100).required(),
  valor: Joi.number().min(0).optional(),
  duracaoMinutos: Joi.number().integer().min(1).required(),
});

export const updateProcedimentoSchema = Joi.object({
  nome: Joi.string().trim().min(2).max(100),
  valor: Joi.number().min(0),
  duracaoMinutos: Joi.number().integer().min(1),
});

// ============================================================================
// AGENDAMENTO VALIDATION SCHEMAS
// ============================================================================

export const createAgendamentoSchema = Joi.object({
  pacienteId: Joi.string().optional(),
  profissionalId: Joi.string().required(),
  procedimentoId: Joi.string().required(),
  dataHora: Joi.date().iso().greater("now").required(),
  observacoes: Joi.string().max(500).allow(""),
  recorrencia: Joi.object({
    tipo: Joi.string().valid("DIARIO", "SEMANAL", "MENSAL").required(),
    quantidade: Joi.number().integer().min(1).max(30).required(),
    diasSemana: Joi.array().items(Joi.number().integer().min(0).max(6)),
  }).optional(),
});

export const updateAgendamentoSchema = Joi.object({
  pacienteId: Joi.string().allow(null),
  profissionalId: Joi.string(),
  procedimentoId: Joi.string(),
  dataHora: Joi.date().iso(),
  status: Joi.string().valid(
    "MARCADO",
    "CONFIRMADO",
    "COMPARECEU",
    "FALTOU",
    "CANCELADO"
  ),
  observacoes: Joi.string().max(500).allow(""),
});

export const batchAgendamentoSchema = Joi.object({
  ids: Joi.array().items(Joi.string()).min(1).required(),
  operation: Joi.string().valid("UPDATE", "DELETE").required(),
  data: Joi.when("operation", {
    is: "UPDATE",
    then: updateAgendamentoSchema.required(),
    otherwise: Joi.forbidden(),
  }),
});

// ============================================================================
// ATENDIMENTO VALIDATION SCHEMAS
// ============================================================================

export const createAtendimentoSchema = Joi.object({
  agendamentoId: Joi.string().required(),
  anotacoes: Joi.string().max(2000).allow(""),
  procedimentosRealizados: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      nome: Joi.string().required(),
      valor: Joi.number().min(0).optional(),
      observacoes: Joi.string().max(500).optional(),
    })
  ),
});

export const updateAtendimentoSchema = Joi.object({
  anotacoes: Joi.string().max(2000).allow(""),
  procedimentosRealizados: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      nome: Joi.string().required(),
      valor: Joi.number().min(0).optional(),
      observacoes: Joi.string().max(500).optional(),
    })
  ),
});

// ============================================================================
// WHATSAPP VALIDATION SCHEMAS
// ============================================================================

export const updateWhatsAppConfigSchema = Joi.object({
  templateConfirmacao: Joi.string().max(500),
  templateSim: Joi.string().max(200),
  templateNao: Joi.string().max(200),
  templateOpcoesInvalidas: Joi.string().max(200),
  horasAntecedencia: Joi.number().integer().min(1).max(168),
  ativo: Joi.boolean(),
});

export const whatsAppWebhookSchema = Joi.object({
  from: Joi.string().required(),
  message: Joi.string().required(),
  timestamp: Joi.string().required(),
});

// ============================================================================
// CUSTOM VALIDATORS
// ============================================================================

export const validateBusinessHours = (value: Date): boolean => {
  const hour = value.getHours();
  const day = value.getDay();

  // Segunda a Sexta: 8h às 18h
  if (day >= 1 && day <= 5) {
    return hour >= 8 && hour < 18;
  }

  // Sábado: 8h às 12h
  if (day === 6) {
    return hour >= 8 && hour < 12;
  }

  return false;
};

export const validatePhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, "");
  return /^\d{10,11}$/.test(cleanPhone);
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, "");
};

// ============================================================================
// PACIENTE VALIDATION SCHEMAS
// ============================================================================

// ... código existente ...

export const createPacienteSchema = Joi.object({
  nome: Joi.string().required(),
  cpf: Joi.string()
    .pattern(/^\d{11}$/)
    .optional()
    .allow("", null),
  dataNascimento: Joi.alternatives()
    .try(Joi.date().iso(), Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/))
    .optional()
    .allow("", null),
  telefone: Joi.string().required(),
  telefone2: Joi.string().optional().allow("", null),
  email: Joi.string().email().optional().allow("", null),

  // Endereço
  cep: Joi.string()
    .pattern(/^\d{8}$/)
    .optional()
    .allow("", null),
  logradouro: Joi.string().optional().allow("", null),
  numero: Joi.string().optional().allow("", null),
  complemento: Joi.string().optional().allow("", null),
  bairro: Joi.string().optional().allow("", null),
  cidade: Joi.string().optional().allow("", null),
  estado: Joi.string().length(2).uppercase().optional().allow("", null),

  // Dados médicos
  alergias: Joi.string().optional().allow("", null),

  // Responsável
  menorIdade: Joi.boolean().optional(),
  responsavelNome: Joi.string().when("menorIdade", {
    is: true,
    then: Joi.required(),
    otherwise: Joi.optional().allow("", null),
  }),
  responsavelCpf: Joi.string()
    .pattern(/^\d{11}$/)
    .when("menorIdade", {
      is: true,
      then: Joi.required(),
      otherwise: Joi.optional().allow("", null),
    }),
  responsavelTelefone: Joi.string().when("menorIdade", {
    is: true,
    then: Joi.required(),
    otherwise: Joi.optional().allow("", null),
  }),
  responsavelParentesco: Joi.string().when("menorIdade", {
    is: true,
    then: Joi.required(),
    otherwise: Joi.optional().allow("", null),
  }),

  profissionalId: Joi.string().optional().allow("", null),
  observacoes: Joi.string().max(1000).allow("", null),
});

export const updatePacienteSchema = Joi.object({
  nome: Joi.string(),
  cpf: Joi.string()
    .pattern(/^\d{11}$/)
    .allow("", null),
  dataNascimento: Joi.alternatives()
    .try(Joi.date().iso(), Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/))
    .allow("", null),
  telefone: Joi.string(),
  telefone2: Joi.string().allow("", null),
  email: Joi.string().email().allow("", null),

  // Endereço
  cep: Joi.string()
    .pattern(/^\d{8}$/)
    .allow("", null),
  logradouro: Joi.string().allow("", null),
  numero: Joi.string().allow("", null),
  complemento: Joi.string().allow("", null),
  bairro: Joi.string().allow("", null),
  cidade: Joi.string().allow("", null),
  estado: Joi.string().length(2).uppercase().allow("", null),

  // Dados médicos
  alergias: Joi.string().allow("", null),

  // Responsável
  menorIdade: Joi.boolean(),
  responsavelNome: Joi.string().allow("", null),
  responsavelCpf: Joi.string()
    .pattern(/^\d{11}$/)
    .allow("", null),
  responsavelTelefone: Joi.string().allow("", null),
  responsavelParentesco: Joi.string().allow("", null),

  profissionalId: Joi.string().allow("", null),
  observacoes: Joi.string().max(1000).allow("", null),
});
