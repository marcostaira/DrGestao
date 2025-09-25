import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { AppError, ValidationResult } from '../types';

// ============================================================================
// VALIDATION MIDDLEWARE FACTORY
// ============================================================================

interface ValidationSchemas {
  body?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
}

export const validate = (schemas: ValidationSchemas) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: any[] = [];

    // Validar body
    if (schemas.body) {
      const { error } = schemas.body.validate(req.body);
      if (error) {
        errors.push({
          field: 'body',
          message: error.details[0].message,
          value: error.details[0].context?.value,
        });
      }
    }

    // Validar params
    if (schemas.params) {
      const { error } = schemas.params.validate(req.params);
      if (error) {
        errors.push({
          field: 'params',
          message: error.details[0].message,
          value: error.details[0].context?.value,
        });
      }
    }

    // Validar query
    if (schemas.query) {
      const { error } = schemas.query.validate(req.query);
      if (error) {
        errors.push({
          field: 'query',
          message: error.details[0].message,
          value: error.details[0].context?.value,
        });
      }
    }

    if (errors.length > 0) {
      res.status(400).json({
        success: false,
        error: 'Dados inválidos',
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

// ID Schema (MongoDB ObjectId ou UUID)
export const idSchema = Joi.string().required().messages({
  'string.empty': 'ID é obrigatório',
  'any.required': 'ID é obrigatório',
});

// Pagination Schema
export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  search: Joi.string().trim().allow(''),
  sortBy: Joi.string().trim().allow(''),
  sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
});

// Date range Schema
export const dateRangeSchema = Joi.object({
  dataInicio: Joi.date().iso(),
  dataFim: Joi.date().iso().min(Joi.ref('dataInicio')),
});

// ============================================================================
// AUTH VALIDATION SCHEMAS
// ============================================================================

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email deve ter um formato válido',
    'string.empty': 'Email é obrigatório',
    'any.required': 'Email é obrigatório',
  }),
  senha: Joi.string().min(6).required().messages({
    'string.min': 'Senha deve ter pelo menos 6 caracteres',
    'string.empty': 'Senha é obrigatória',
    'any.required': 'Senha é obrigatória',
  }),
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    'string.empty': 'Refresh token é obrigatório',
    'any.required': 'Refresh token é obrigatório',
  }),
});

// ============================================================================
// TENANT VALIDATION SCHEMAS
// ============================================================================

export const createTenantSchema = Joi.object({
  nome: Joi.string().trim().min(2).max(100).required().messages({
    'string.min': 'Nome deve ter pelo menos 2 caracteres',
    'string.max': 'Nome deve ter no máximo 100 caracteres',
    'string.empty': 'Nome é obrigatório',
    'any.required': 'Nome é obrigatório',
  }),
  plano: Joi.string().valid('basico', 'premium', 'enterprise').default('basico'),
  adminUser: Joi.object({
    nome: Joi.string().trim().min(2).max(100).required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required(),
  }).required(),
});

export const updateTenantSchema = Joi.object({
  nome: Joi.string().trim().min(2).max(100),
  plano: Joi.string().valid('basico', 'premium', 'enterprise'),
  ativo: Joi.boolean(),
});

// ============================================================================
// USER VALIDATION SCHEMAS
// ============================================================================

export const createUserSchema = Joi.object({
  nome: Joi.string().trim().min(2).max(100).required().messages({
    'string.min': 'Nome deve ter pelo menos 2 caracteres',
    'string.max': 'Nome deve ter no máximo 100 caracteres',
    'string.empty': 'Nome é obrigatório',
    'any.required': 'Nome é obrigatório',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email deve ter um formato válido',
    'string.empty': 'Email é obrigatório',
    'any.required': 'Email é obrigatório',
  }),
  senha: Joi.string().min(6).required().messages({
    'string.min': 'Senha deve ter pelo menos 6 caracteres',
    'string.empty': 'Senha é obrigatória',
    'any.required': 'Senha é obrigatória',
  }),
  tipo: Joi.string().valid('ADMIN', 'SECRETARIA').default('SECRETARIA'),
});

export const updateUserSchema = Joi.object({
  nome: Joi.string().trim().min(2).max(100),
  email: Joi.string().email(),
  senha: Joi.string().min(6),
  tipo: Joi.string().valid('ADMIN', 'SECRETARIA'),
  ativo: Joi.boolean(),
});

// ============================================================================
// PACIENTE VALIDATION SCHEMAS
// ============================================================================

export const createPacienteSchema = Joi.object({
  nome: Joi.string().trim().min(2).max(100).required().messages({
    'string.min': 'Nome deve ter pelo menos 2 caracteres',
    'string.max': 'Nome deve ter no máximo 100 caracteres',
    'string.empty': 'Nome é obrigatório',
    'any.required': 'Nome é obrigatório',
  }),
  telefone: Joi.string().trim().pattern(/^[0-9+\-\s()]+$/).min(10).max(20).required().messages({
    'string.pattern.base': 'Telefone deve conter apenas números, +, -, espaços e parênteses',
    'string.min': 'Telefone deve ter pelo menos 10 caracteres',
    'string.max': 'Telefone deve ter no máximo 20 caracteres',
    'string.empty': 'Telefone é obrigatório',
    'any.required': 'Telefone é obrigatório',
  }),
  email: Joi.string().email().allow('').messages({
    'string.email': 'Email deve ter um formato válido',
  }),
  observacoes: Joi.string().max(500).allow('').messages({
    'string.max': 'Observações devem ter no máximo 500 caracteres',
  }),
  profissionalId: Joi.string().allow(''),
});

export const updatePacienteSchema = Joi.object({
  nome: Joi.string().trim().min(2).max(100),
  telefone: Joi.string().trim().pattern(/^[0-9+\-\s()]+$/).min(10).max(20),
  email: Joi.string().email().allow(''),
  observacoes: Joi.string().max(500).allow(''),
  profissionalId: Joi.string().allow(''),
});

// ============================================================================
// PROFISSIONAL VALIDATION SCHEMAS
// ============================================================================

export const createProfissionalSchema = Joi.object({
  nome: Joi.string().trim().min(2).max(100).required().messages({
    'string.min': 'Nome deve ter pelo menos 2 caracteres',
    'string.max': 'Nome deve ter no máximo 100 caracteres',
    'string.empty': 'Nome é obrigatório',
    'any.required': 'Nome é obrigatório',
  }),
  especialidade: Joi.string().trim().max(100).allow('').messages({
    'string.max': 'Especialidade deve ter no máximo 100 caracteres',
  }),
  observacoes: Joi.string().max(500).allow('').messages({
    'string.max': 'Observações devem ter no máximo 500 caracteres',
  }),
});

export const updateProfissionalSchema = Joi.object({
  nome: Joi.string().trim().min(2).max(100),
  especialidade: Joi.string().trim().max(100).allow(''),
  observacoes: Joi.string().max(500).allow(''),
  ativo: Joi.boolean(),
});

// ============================================================================
// PROCEDIMENTO VALIDATION SCHEMAS
// ============================================================================

export const createProcedimentoSchema = Joi.object({
  nome: Joi.string().trim().min(2).max(100).required().messages({
    'string.min': 'Nome deve ter pelo menos 2 caracteres',
    'string.max': 'Nome deve ter no máximo 100 caracteres',
    'string.empty': 'Nome é obrigatório',
    'any.required': 'Nome é obrigatório',
  }),
  valor: Joi.number().precision(2).positive().allow(null).messages({
    'number.positive': 'Valor deve ser positivo',
    'number.precision': 'Valor deve ter no máximo 2 casas decimais',
  }),
  duracaoMinutos: Joi.number().integer().positive().required().messages({
    'number.integer': 'Duração deve ser um número inteiro',
    'number.positive': 'Duração deve ser positiva',
    'any.required': 'Duração em minutos é obrigatória',
  }),
});

export const updateProcedimentoSchema = Joi.object({
  nome: Joi.string().trim().min(2).max(100),
  valor: Joi.number().precision(2).positive().allow(null),
  duracaoMinutos: Joi.number().integer().positive(),
});

// ============================================================================
// AGENDAMENTO VALIDATION SCHEMAS
// ============================================================================

export const createAgendamentoSchema = Joi.object({
  pacienteId: Joi.string().allow(''),
  profissionalId: Joi.string().required().messages({
    'string.empty': 'Profissional é obrigatório',
    'any.required': 'Profissional é obrigatório',
  }),
  procedimentoId: Joi.string().required().messages({
    'string.empty': 'Procedimento é obrigatório',
    'any.required': 'Procedimento é obrigatório',
  }),
  dataHora: Joi.date().iso().greater('now').required().messages({
    'date.greater': 'Data e hora devem ser futuras',
    'any.required': 'Data e hora são obrigatórias',
  }),
  observacoes: Joi.string().max(500).allow('').messages({
    'string.max': 'Observações devem ter no máximo 500 caracteres',
  }),
  recorrencia: Joi.object({
    tipo: Joi.string().valid('DIARIO', 'SEMANAL', 'MENSAL').required(),
    quantidade: Joi.number().integer().min(1).max(52).required(),
    diasSemana: Joi.array().items(Joi.number().integer().min(0).max(6)).when('tipo', {
      is: 'SEMANAL',
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
  }).allow(null),
});

export const updateAgendamentoSchema = Joi.object({
  pacienteId: Joi.string().allow(''),
  profissionalId: Joi.string(),
  procedimentoId: Joi.string(),
  dataHora: Joi.date().iso(),
  status: Joi.string().valid('MARCADO', 'CONFIRMADO', 'COMPARECEU', 'FALTOU', 'CANCELADO'),
  observacoes: Joi.string().max(500).allow(''),
});

export const batchAgendamentoSchema = Joi.object({
  ids: Joi.array().items(Joi.string()).min(1).required().messages({
    'array.min': 'Pelo menos um ID deve ser fornecido',
    'any.required': 'IDs são obrigatórios',
  }),
  operation: Joi.string().valid('UPDATE', 'DELETE').required().messages({
    'any.only': 'Operação deve ser UPDATE ou DELETE',
    'any.required': 'Operação é obrigatória',
  }),
  data: Joi.object().when('operation', {
    is: 'UPDATE',
    then: updateAgendamentoSchema.required(),
    otherwise: Joi.forbidden(),
  }),
});

// ============================================================================
// ATENDIMENTO VALIDATION SCHEMAS
// ============================================================================

export const createAtendimentoSchema = Joi.object({
  agendamentoId: Joi.string().required().messages({
    'string.empty': 'ID do agendamento é obrigatório',
    'any.required': 'ID do agendamento é obrigatório',
  }),
  anotacoes: Joi.string().max(1000).allow('').messages({
    'string.max': 'Anotações devem ter no máximo 1000 caracteres',
  }),
  procedimentosRealizados: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      nome: Joi.string().required(),
      valor: Joi.number().precision(2).positive().allow(null),
      observacoes: Joi.string().max(200).allow(''),
    })
  ).allow(null),
});

export const updateAtendimentoSchema = Joi.object({
  anotacoes: Joi.string().max(1000).allow(''),
  procedimentosRealizados: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      nome: Joi.string().required(),
      valor: Joi.number().precision(2).positive().allow(null),
      observacoes: Joi.string().max(200).allow(''),
    })
  ).allow(null),
});

// ============================================================================
// WHATSAPP VALIDATION SCHEMAS
// ============================================================================

export const updateWhatsAppConfigSchema = Joi.object({
  templateConfirmacao: Joi.string().min(10).max(300).messages({
    'string.min': 'Template deve ter pelo menos 10 caracteres',
    'string.max': 'Template deve ter no máximo 300 caracteres',
  }),
  templateSim: Joi.string().min(5).max(200),
  templateNao: Joi.string().min(5).max(200),
  templateOpcoesInvalidas: Joi.string().min(5).max(200),
  horasAntecedencia: Joi.number().integer().min(1).max(168).messages({
    'number.min': 'Horas de antecedência deve ser pelo menos 1',
    'number.max': 'Horas de antecedência deve ser no máximo 168 (7 dias)',
  }),
  ativo: Joi.boolean(),
});

export const whatsAppWebhookSchema = Joi.object({
  from: Joi.string().required(),
  message: Joi.string().required(),
  messageId: Joi.string(),
  timestamp: Joi.string(),
});

// ============================================================================
// CUSTOM VALIDATION FUNCTIONS
// ============================================================================

export const validateBusinessHours = (value: Date): boolean => {
  const hour = value.getHours();
  const day = value.getDay();
  
  // Verificar se é dia útil (segunda a sexta)
  if (day === 0 || day === 6) {
    return false;
  }
  
  // Verificar horário comercial (8h às 18h)
  if (hour < 8 || hour >= 18) {
    return false;
  }
  
  return true;
};

export const validatePhone = (phone: string): boolean => {
  // Remover caracteres especiais para validação
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  
  // Verificar se tem pelo menos 10 dígitos (celular brasileiro)
  return cleanPhone.length >= 10 && cleanPhone.length <= 11;
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};.empty': 'Profissional é obrigatório',
    'any.required': 'Profissional é obrigatório',
  }),
  procedimentoId: Joi.string().required().messages({
    'string.empty': 'Procedimento é obrigatório',
    'any.required': 'Procedimento é obrigatório',
  }),
  dataHora: Joi.date().iso().greater('now').required().messages({
    'date.greater': 'Data e hora devem ser futuras',
    'any.required': 'Data e hora são obrigatórias',
  }),
  observacoes: Joi.string().max(500).allow('').messages({
    'string.max': 'Observações devem ter no máximo 500 caracteres',
  }),
  recorrencia: Joi.object({
    tipo: Joi.string().valid('DIARIO', 'SEMANAL', 'MENSAL').required(),
    quantidade: Joi.number().integer().min(1).max(52).required(),
    diasSemana: Joi.array().items(Joi.number().integer().min(0).max(6)).when('tipo', {
      is: 'SEMANAL',
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
  }).allow(null),
});

export const updateAgendamentoSchema = Joi.object({
  pacienteId: Joi.string().allow(''),
  profissionalId: Joi.string(),
  procedimentoId: Joi.string(),
  dataHora: Joi.date().iso(),
  status: Joi.string().valid('MARCADO', 'CONFIRMADO', 'COMPARECEU', 'FALTOU', 'CANCELADO'),
  observacoes: Joi.string().max(500).allow(''),
});

export const batchAgendamentoSchema = Joi.object({
  ids: Joi.array().items(Joi.string()).min(1).required().messages({
    'array.min': 'Pelo menos um ID deve ser fornecido',
    'any.required': 'IDs são obrigatórios',
  }),
  operation: Joi.string().valid('UPDATE', 'DELETE').required().messages({
    'any.only': 'Operação deve ser UPDATE ou DELETE',
    'any.required': 'Operação é obrigatória',
  }),
  data: Joi.object().when('operation', {
    is: 'UPDATE',
    then: updateAgendamentoSchema.required(),
    otherwise: Joi.forbidden(),
  }),
});

// ============================================================================
// ATENDIMENTO VALIDATION SCHEMAS
// ============================================================================

export const createAtendimentoSchema = Joi.object({
  agendamentoId: Joi.string().required().messages({
    'string.empty': 'ID do agendamento é obrigatório',
    'any.required': 'ID do agendamento é obrigatório',
  }),
  anotacoes: Joi.string().max(1000).allow('').messages({
    'string.max': 'Anotações devem ter no máximo 1000 caracteres',
  }),
  procedimentosRealizados: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      nome: Joi.string().required(),
      valor: Joi.number().precision(2).positive().allow(null),
      observacoes: Joi.string().max(200).allow(''),
    })
  ).allow(null),
});

export const updateAtendimentoSchema = Joi.object({
  anotacoes: Joi.string().max(1000).allow(''),
  procedimentosRealizados: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      nome: Joi.string().required(),
      valor: Joi.number().precision(2).positive().allow(null),
      observacoes: Joi.string().max(200).allow(''),
    })
  ).allow(null),
});

// ============================================================================
// WHATSAPP VALIDATION SCHEMAS
// ============================================================================

export const updateWhatsAppConfigSchema = Joi.object({
  templateConfirmacao: Joi.string().min(10).max(300).messages({
    'string.min': 'Template deve ter pelo menos 10 caracteres',
    'string.max': 'Template deve ter no máximo 300 caracteres',
  }),
  templateSim: Joi.string().min(5).max(200),
  templateNao: Joi.string().min(5).max(200),
  templateOpcoesInvalidas: Joi.string().min(5).max(200),
  horasAntecedencia: Joi.number().integer().min(1).max(168).messages({
    'number.min': 'Horas de antecedência deve ser pelo menos 1',
    'number.max': 'Horas de antecedência deve ser no máximo 168 (7 dias)',
  }),
  ativo: Joi.boolean(),
});

export const whatsAppWebhookSchema = Joi.object({
  from: Joi.string().required(),
  message: Joi.string().required(),
  messageId: Joi.string(),
  timestamp: Joi.string(),
});

// ============================================================================
// CUSTOM VALIDATION FUNCTIONS
// ============================================================================

export const validateBusinessHours = (value: Date): boolean => {
  const hour = value.getHours();
  const day = value.getDay();
  
  // Verificar se é dia útil (segunda a sexta)
  if (day === 0 || day === 6) {
    return false;
  }
  
  // Verificar horário comercial (8h às 18h)
  if (hour < 8 || hour >= 18) {
    return false;
  }
  
  return true;
};

export const validatePhone = (phone: string): boolean => {
  // Remover caracteres especiais para validação
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  
  // Verificar se tem pelo menos 10 dígitos (celular brasileiro)
  return cleanPhone.length >= 10 && cleanPhone.length <= 11;
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};