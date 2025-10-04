import Joi from "joi";
import { TipoCampoFormulario } from "../../../types";

// ============================================================================
// CAMPO FORMULÁRIO SCHEMA
// ============================================================================

const campoFormularioSchema = Joi.object({
  id: Joi.string().required(),
  label: Joi.string().min(1).max(200).required(),
  tipo: Joi.string()
    .valid(...Object.values(TipoCampoFormulario))
    .required(),
  obrigatorio: Joi.boolean().required(),
  ordem: Joi.number().integer().min(0).required(),
  opcoes: Joi.array().items(Joi.string()).optional(),
  placeholder: Joi.string().max(200).optional(),
  valorPadrao: Joi.any().optional(),
  validacao: Joi.object({
    min: Joi.number().optional(),
    max: Joi.number().optional(),
    regex: Joi.string().optional(),
    mensagem: Joi.string().optional(),
  }).optional(),
});

// ============================================================================
// CREATE FORMULÁRIO
// ============================================================================

export const createFormularioSchema = Joi.object({
  nome: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Nome é obrigatório",
    "string.min": "Nome deve ter no mínimo 3 caracteres",
    "string.max": "Nome deve ter no máximo 100 caracteres",
  }),
  descricao: Joi.string().max(500).optional().allow("", null),
  profissionalId: Joi.string().uuid().optional().allow(null),
  campos: Joi.array().items(campoFormularioSchema).min(1).required().messages({
    "array.min": "Formulário deve ter pelo menos 1 campo",
    "array.base": "Campos inválidos",
  }),
  ativo: Joi.boolean().optional(),
});

// ============================================================================
// UPDATE FORMULÁRIO
// ============================================================================

export const updateFormularioSchema = Joi.object({
  nome: Joi.string().min(3).max(100).optional(),
  descricao: Joi.string().max(500).optional().allow("", null),
  profissionalId: Joi.string().uuid().optional().allow(null),
  campos: Joi.array().items(campoFormularioSchema).min(1).optional(),
  ativo: Joi.boolean().optional(),
}).min(1);
