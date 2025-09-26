import { Router } from "express";
import { ProcedimentoController } from "../controllers/procedimento.controller";
import { authenticate } from "../../../middleware/auth";
import { validateTenant } from "../../../middleware/tenant";
import { validate } from "../../../middleware/validation";
import {
  createProcedimentoSchema,
  updateProcedimentoSchema,
  idSchema,
} from "../../../middleware/validation";
import Joi from "joi";

// ============================================================================
// PROCEDIMENTO ROUTES
// ============================================================================

const router = Router();

// Aplicar autenticação e validação de tenant a todas as rotas
router.use(authenticate);
router.use(validateTenant);

// ==========================================================================
// ROUTES
// ==========================================================================

/**
 * @route   POST /procedimentos
 * @desc    Criar procedimento
 * @access  Private
 */
router.post(
  "/",
  validate({ body: createProcedimentoSchema }),
  ProcedimentoController.create
);

/**
 * @route   GET /procedimentos
 * @desc    Listar procedimentos
 * @access  Private
 */
router.get("/", ProcedimentoController.list);

/**
 * @route   GET /procedimentos/statistics
 * @desc    Obter estatísticas dos procedimentos
 * @access  Private
 */
router.get("/statistics", ProcedimentoController.getStatistics);

/**
 * @route   GET /procedimentos/:id
 * @desc    Obter procedimento por ID
 * @access  Private
 */
router.get(
  "/:id",
  validate({ params: Joi.object({ id: idSchema }) }),
  ProcedimentoController.getById
);

/**
 * @route   PUT /procedimentos/:id
 * @desc    Atualizar procedimento
 * @access  Private
 */
router.put(
  "/:id",
  validate({
    params: Joi.object({ id: idSchema }),
    body: updateProcedimentoSchema,
  }),
  ProcedimentoController.update
);

/**
 * @route   DELETE /procedimentos/:id
 * @desc    Excluir procedimento
 * @access  Private
 */
router.delete(
  "/:id",
  validate({ params: Joi.object({ id: idSchema }) }),
  ProcedimentoController.delete
);

export default router;
