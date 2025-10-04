import Joi from "joi";

// ============================================================================
// CREATE ANAMNESE
// ============================================================================

export const createAnamneseSchema = Joi.object({
  pacienteId: Joi.string().required().messages({
    "string.empty": "Paciente é obrigatório",
  }),
  formularioId: Joi.string().required().messages({
    "string.empty": "Formulário é obrigatório",
  }),
  atendimentoId: Joi.string().optional().allow(null),
  respostas: Joi.object().required().messages({
    "object.base": "Respostas são obrigatórias",
  }),
  observacoes: Joi.string().max(2000).optional().allow("", null),
});

// ============================================================================
// UPDATE ANAMNESE
// ============================================================================

export const updateAnamneseSchema = Joi.object({
  respostas: Joi.object().optional(),
  observacoes: Joi.string().max(2000).optional().allow("", null),
}).min(1);
