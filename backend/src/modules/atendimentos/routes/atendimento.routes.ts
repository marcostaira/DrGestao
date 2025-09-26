import { Router } from "express";
import { AtendimentoController } from "../controllers/atendimento.controller";
import { authenticate } from "../../../middleware/auth";
import { validateTenant } from "../../../middleware/tenant";
import { validate } from "../../../middleware/validation";
import {
  createAtendimentoSchema,
  updateAtendimentoSchema,
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

// ==========================================================================
// ROUTES
// ==========================================================================

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
  validate({ params: Joi.object({ pacienteId: idSchema }) }),
  AtendimentoController.getByPaciente
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
 * @route   PUT /atendimentos/:id
 * @desc    Atualizar atendimento
 * @access  Private
 */
router.put(
  "/:id",
  validate({
    params: Joi.object({ id: idSchema }),
    body: updateAtendimentoSchema,
  }),
  AtendimentoController.update
);

/**
 * @route   DELETE /atendimentos/:id
 * @desc    Excluir atendimento
 * @access  Private
 */
router.delete(
  "/:id",
  validate({ params: Joi.object({ id: idSchema }) }),
  AtendimentoController.delete
);

export default router;
