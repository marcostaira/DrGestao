// backend/src/modules/anamnese/link-anamnese.routes.ts

import express from "express";
import { authenticate } from "../../../middleware/auth";
import { LinkAnamneseController } from "../controllers/link-anamnese.controller";
import Joi from "joi";
import { validate } from "../../../middleware/validation";

const router = express.Router();

// ============================================================================
// ROTAS PÚBLICAS (SEM AUTENTICAÇÃO) - Para pacientes preencherem
// ============================================================================

/**
 * @route   GET /api/anamnese/link/:token
 * @desc    Validar token e buscar formulário (público)
 * @access  Public
 */
router.get(
  "/link/:token",
  validate({
    params: Joi.object({
      token: Joi.string().required(),
    }),
  }),
  LinkAnamneseController.validateToken
);

/**
 * @route   POST /api/anamnese/link/:token/responder
 * @desc    Salvar resposta da anamnese (público)
 * @access  Public
 */
router.post(
  "/link/:token/responder",
  validate({
    params: Joi.object({
      token: Joi.string().required(),
    }),
    body: Joi.object({
      respostas: Joi.object().required(),
      observacoes: Joi.string().optional().allow(""),
    }),
  }),
  LinkAnamneseController.saveResposta
);

// ============================================================================
// APLICAR AUTENTICAÇÃO PARA ROTAS PRIVADAS
// ============================================================================

router.use(authenticate);

// ============================================================================
// ROTAS PRIVADAS (COM AUTENTICAÇÃO)
// ============================================================================

/**
 * @route   POST /api/anamnese/link
 * @desc    Criar link de anamnese
 * @access  Private
 */
router.post(
  "/link",
  validate({
    body: Joi.object({
      pacienteId: Joi.string().required(),
      formularioId: Joi.string().required(),
      agendamentoId: Joi.string().optional(),
      expiresInDays: Joi.number().integer().min(1).max(365).optional(),
    }),
  }),
  LinkAnamneseController.create
);

/**
 * @route   GET /api/anamnese/link/paciente/:pacienteId
 * @desc    Listar links de um paciente
 * @access  Private
 */
router.get(
  "/link/paciente/:pacienteId",
  validate({
    params: Joi.object({
      pacienteId: Joi.string().required(),
    }),
  }),
  LinkAnamneseController.listByPaciente
);

/**
 * @route   POST /api/anamnese/link/whatsapp
 * @desc    Enviar link via WhatsApp
 * @access  Private
 */
router.post(
  "/link/whatsapp",
  validate({
    body: Joi.object({
      pacienteId: Joi.string().required(),
      formularioId: Joi.string().required(),
      agendamentoId: Joi.string().optional(),
    }),
  }),
  LinkAnamneseController.sendViaWhatsApp
);

export default router;
