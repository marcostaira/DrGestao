// backend/src/middleware/validation.ts

import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types";

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
  pacienteId: Joi.string().optional().allow(null),
  profissionalId: Joi.string().required(),
  procedimentoId: Joi.string().optional().allow(null),
  dataHora: Joi.date().iso().required(),
  observacoes: Joi.string().optional().allow("", null),

  // Validação de recorrência
  recorrencia: Joi.object({
    tipo: Joi.string().valid("DIARIA", "SEMANAL", "MENSAL").required(),
    dataFim: Joi.date().iso().required(),
    diasSemana: Joi.array()
      .items(Joi.number().min(0).max(6))
      .optional()
      .when("tipo", {
        is: "SEMANAL",
        then: Joi.array().min(1).required(),
        otherwise: Joi.array().optional(),
      }),
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

// Schema para procedimentos do plano/avaliação
export const procedimentoPlanoSchema = Joi.object({
  procedimentoId: Joi.string().required().messages({
    "string.empty": "ID do procedimento é obrigatório",
    "any.required": "ID do procedimento é obrigatório",
  }),
  ordem: Joi.number().integer().min(1).required().messages({
    "number.base": "Ordem deve ser um número",
    "number.min": "Ordem deve ser no mínimo 1",
    "any.required": "Ordem é obrigatória",
  }),
  observacoes: Joi.string().max(500).optional().allow("", null),
  valorPraticado: Joi.number().min(0).optional().allow(null),
});

export const createAtendimentoSchema = Joi.object({
  agendamentoId: Joi.string().required().messages({
    "string.empty": "ID do agendamento é obrigatório",
    "any.required": "ID do agendamento é obrigatório",
  }),
  tipo: Joi.string()
    .valid("AVULSO", "AVALIACAO", "PLANO_TRATAMENTO")
    .default("AVULSO")
    .messages({
      "any.only": "Tipo deve ser AVULSO, AVALIACAO ou PLANO_TRATAMENTO",
    }),
  anotacoes: Joi.string().max(2000).allow("", null),
  procedimentosRealizados: Joi.array()
    .items(
      Joi.object({
        procedimentoId: Joi.string().required(),
        observacao: Joi.string().max(500).optional().allow(""),
      })
    )
    .optional(),
  // Array de procedimentos para AVALIACAO ou PLANO_TRATAMENTO
  procedimentosPlano: Joi.array()
    .items(procedimentoPlanoSchema)
    .min(1)
    .when("tipo", {
      is: Joi.valid("AVALIACAO", "PLANO_TRATAMENTO"),
      then: Joi.required().messages({
        "array.min": "Deve haver pelo menos 1 procedimento no plano/avaliação",
        "any.required":
          "Procedimentos são obrigatórios para avaliação ou plano de tratamento",
      }),
      otherwise: Joi.optional(),
    }),
});

export const updateAtendimentoSchema = Joi.object({
  anotacoes: Joi.string().max(2000).allow("", null),
  procedimentosRealizados: Joi.array()
    .items(
      Joi.object({
        procedimentoId: Joi.string().required(),
        observacao: Joi.string().max(500).optional().allow(""),
      })
    )
    .optional(),
  procedimentosPlano: Joi.array().items(procedimentoPlanoSchema).optional(),
});

// Schema para aprovar avaliação
export const aprovarAvaliacaoSchema = Joi.object({
  aprovadoPor: Joi.string().required().trim().min(2).max(100).messages({
    "string.empty": "Nome de quem aprovou é obrigatório",
    "string.min": "Nome deve ter pelo menos 2 caracteres",
    "any.required": "Nome de quem aprovou é obrigatório",
  }),
});

// Schema para reprovar avaliação
export const reprovarAvaliacaoSchema = Joi.object({
  motivo: Joi.string().required().trim().min(5).max(500).messages({
    "string.empty": "Motivo da reprovação é obrigatório",
    "string.min": "Motivo deve ter pelo menos 5 caracteres",
    "any.required": "Motivo da reprovação é obrigatório",
  }),
});

// Schema para atualizar progresso de procedimento
export const updateProgressoProcedimentoSchema = Joi.object({
  progresso: Joi.string()
    .valid("NAO_INICIADO", "EM_ANDAMENTO", "CONCLUIDO")
    .required()
    .messages({
      "any.only": "Progresso deve ser NAO_INICIADO, EM_ANDAMENTO ou CONCLUIDO",
      "any.required": "Progresso é obrigatório",
    }),
  agendamentoId: Joi.string().optional().allow(null).messages({
    "string.base": "ID do agendamento deve ser uma string",
  }),
  observacoes: Joi.string().max(500).optional().allow("", null),
  concluidoEm: Joi.date().iso().optional().allow(null),
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
// PACIENTE VALIDATION SCHEMAS
// ============================================================================

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
// VALIDATE REQUEST MIDDLEWARE
// ============================================================================

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));

      const response: ApiResponse = {
        success: false,
        error: "Erro de validação",
        data: errors,
      };

      res.status(400).json(response);
      return;
    }

    // Substituir body pelos valores validados e sanitizados
    req.body = value;
    next();
  };
};

// ============================================================================
// VALIDATE QUERY MIDDLEWARE
// ============================================================================

export const validateQuery = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));

      const response: ApiResponse = {
        success: false,
        error: "Erro de validação",
        data: errors,
      };

      res.status(400).json(response);
      return;
    }

    req.query = value;
    next();
  };
};

// ============================================================================
// VALIDATE PARAMS MIDDLEWARE
// ============================================================================

export const validateParams = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));

      const response: ApiResponse = {
        success: false,
        error: "Erro de validação",
        data: errors,
      };

      res.status(400).json(response);
      return;
    }

    req.params = value;
    next();
  };
};

// ============================================================================
// VALIDATE PARAMS MIDDLEWARE
// ============================================================================
export const agendarProcedimentosAvaliacaoSchema = Joi.object({
  avaliacaoId: Joi.string().required().messages({
    "string.empty": "ID da avaliação é obrigatório",
    "any.required": "ID da avaliação é obrigatório",
  }),
  procedimentos: Joi.array()
    .items(
      Joi.object({
        atendimentoProcedimentoId: Joi.string().required().messages({
          "string.empty": "ID do procedimento é obrigatório",
        }),
        profissionalId: Joi.string().required().messages({
          "string.empty": "ID do profissional é obrigatório",
        }),
        dataHora: Joi.date().iso().required().messages({
          "date.base": "Data e hora devem ser válidas",
          "date.iso": "Data deve estar no formato ISO",
          "any.required": "Data e hora são obrigatórias",
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.min": "Deve haver pelo menos um procedimento para agendar",
      "any.required": "Lista de procedimentos é obrigatória",
    }),
});

export const agendarProcedimentoIndividualSchema = Joi.object({
  atendimentoProcedimentoId: Joi.string().required().messages({
    "string.empty": "ID do procedimento é obrigatório",
    "any.required": "ID do procedimento é obrigatório",
  }),
  profissionalId: Joi.string().required().messages({
    "string.empty": "ID do profissional é obrigatório",
    "any.required": "ID do profissional é obrigatório",
  }),
  dataHora: Joi.date().iso().required().messages({
    "date.base": "Data e hora devem ser válidas",
    "date.iso": "Data deve estar no formato ISO",
    "any.required": "Data e hora são obrigatórias",
  }),
});