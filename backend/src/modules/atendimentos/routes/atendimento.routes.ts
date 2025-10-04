import { Router } from "express";
import { AtendimentoController } from "../controllers/atendimento.controller";
import { authenticate } from "../../../middleware/auth";
import { validateTenant } from "../../../middleware/tenant";
import { validate } from "../../../middleware/validation";
import {
  createAtendimentoSchema,
  paginationSchema,
  idSchema,
} from "../../../middleware/validation";
import Joi from "joi";

// ============================================================================
// ATENDIMENTO ROUTES
// ============================================================================

const router = Router();

router.use(authenticate);
router.use(validateTenant);

/**
 * @route   POST /atendimentos
 * @desc    Criar atendimento
 * @access  Private
 */
router.post(
  "/",
  validate({ body: createAtendimentoSchema }),
  AtendimentoController.create
);

/**
 * @route   GET /atendimentos
 * @desc    Listar atendimentos
 * @access  Private
 */
router.get(
  "/",
  validate({
    query: paginationSchema.keys({
      pacienteId: Joi.string().optional(),
      profissionalId: Joi.string().optional(),
      dataInicio: Joi.date().iso().optional(),
      dataFim: Joi.date().iso().optional(),
      incluirCancelados: Joi.boolean().optional(),
    }),
  }),
  AtendimentoController.list
);

/**
 * @route   GET /atendimentos/paciente/:pacienteId
 * @desc    Listar atendimentos de um paciente
 * @access  Private
 */
router.get(
  "/paciente/:pacienteId",
  validate({
    params: Joi.object({ pacienteId: idSchema }),
    query: Joi.object({
      incluirCancelados: Joi.boolean().optional(),
    }),
  }),
  AtendimentoController.getByPaciente
);

/**
 * @route   GET /atendimentos/agendamento/:agendamentoId
 * @desc    Obter atendimento por ID do agendamento
 * @access  Private
 */
router.get(
  "/agendamento/:agendamentoId",
  validate({
    params: Joi.object({
      agendamentoId: Joi.string().required(),
    }),
  }),
  AtendimentoController.getByAgendamento
);

/**
 * @route   GET /atendimentos/:id
 * @desc    Obter atendimento por ID
 * @access  Private
 */
router.get(
  "/:id",
  validate({ params: Joi.object({ id: idSchema }) }),
  AtendimentoController.getById
);

/**
 * @route   PATCH /atendimentos/:id/cancel
 * @desc    Cancelar atendimento
 * @access  Private
 */
router.patch(
  "/:id/cancel",
  validate({ params: Joi.object({ id: idSchema }) }),
  AtendimentoController.cancel
);

// ROTAS REMOVIDAS (atendimento não é editável nem deletável):
// PUT /atendimentos/:id - update
// DELETE /atendimentos/:id - delete
// PATCH /atendimentos/:id/status - toggleStatus

export default router;
