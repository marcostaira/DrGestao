import { Router } from "express";
import { AgendamentoController } from "../controllers/agendamento.controller";
import { authenticate } from "../../../middleware/auth";
import { validateTenant } from "../../../middleware/tenant";
import { validate } from "../../../middleware/validation";
import {
  createAgendamentoSchema,
  updateAgendamentoSchema,
  batchAgendamentoSchema,
  paginationSchema,
  idSchema,
} from "../../../middleware/validation";
import Joi from "joi";

// ============================================================================
// AGENDAMENTO ROUTES
// ============================================================================

const router = Router();

router.use(authenticate);
router.use(validateTenant);

// ==========================================================================
// ROUTES
// ==========================================================================

/**
 * @route   POST /agendamentos
 * @desc    Criar agendamento (individual ou lote)
 * @access  Private
 */
router.post(
  "/",
  validate({ body: createAgendamentoSchema }),
  AgendamentoController.create
);

/**
 * @route   GET /agendamentos
 * @desc    Listar agendamentos
 * @access  Private
 */
router.get(
  "/",
  validate({
    query: paginationSchema.keys({
      dataInicio: Joi.date().iso().optional(),
      dataFim: Joi.date().iso().optional(),
      pacienteId: Joi.string().optional(),
      profissionalId: Joi.string().optional(),
      status: Joi.string()
        .valid("MARCADO", "CONFIRMADO", "COMPARECEU", "FALTOU", "CANCELADO")
        .optional(),
    }),
  }),
  AgendamentoController.list
);

/**
 * @route   GET /agendamentos/calendar
 * @desc    Visualização de calendário
 * @access  Private
 */
router.get(
  "/calendar",
  validate({
    query: Joi.object({
      dataInicio: Joi.date().iso().required(),
      dataFim: Joi.date().iso().required(),
      profissionalId: Joi.string().optional(),
    }),
  }),
  AgendamentoController.getCalendarView
);

/**
 * @route   PUT /agendamentos/batch
 * @desc    Atualizar múltiplos agendamentos
 * @access  Private
 */
router.put(
  "/batch",
  validate({ body: batchAgendamentoSchema }),
  AgendamentoController.batchUpdate
);

/**
 * @route   DELETE /agendamentos/batch
 * @desc    Excluir múltiplos agendamentos
 * @access  Private
 */
router.delete(
  "/batch",
  validate({
    body: Joi.object({
      ids: Joi.array().items(Joi.string()).min(1).required(),
    }),
  }),
  AgendamentoController.batchDelete
);

/**
 * @route   GET /agendamentos/:id
 * @desc    Obter agendamento por ID
 * @access  Private
 */
router.get(
  "/:id",
  validate({ params: Joi.object({ id: idSchema }) }),
  AgendamentoController.getById
);

/**
 * @route   PUT /agendamentos/:id
 * @desc    Atualizar agendamento
 * @access  Private
 */
router.put(
  "/:id",
  validate({
    params: Joi.object({ id: idSchema }),
    body: updateAgendamentoSchema,
  }),
  AgendamentoController.update
);

/**
 * @route   DELETE /agendamentos/:id
 * @desc    Excluir agendamento
 * @access  Private
 */
router.delete(
  "/:id",
  validate({ params: Joi.object({ id: idSchema }) }),
  AgendamentoController.delete
);

/**
 * @route   PATCH /agendamentos/:id/status
 * @desc    Alternar status do agendamento
 * @access  Private
 */
router.patch(
  "/:id/status",
  validate({ params: Joi.object({ id: idSchema }) }),
  AgendamentoController.toggleStatus
);

export default router;
