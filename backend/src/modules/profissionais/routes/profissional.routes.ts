import { Router } from "express";
import { ProfissionalController } from "../controllers/profissional.controller";
import { authenticate, adminOnly } from "../../../middleware/auth";
import { validateTenant } from "../../../middleware/tenant";
import { validate } from "../../../middleware/validation";
import {
  createProfissionalSchema,
  updateProfissionalSchema,
  idSchema,
} from "../../../middleware/validation";
import Joi from "joi";

// ============================================================================
// PROFISSIONAL ROUTES
// ============================================================================

const router = Router();

// Aplicar autenticação e validação de tenant a todas as rotas
router.use(authenticate);
router.use(validateTenant);

// ==========================================================================
// ROUTES
// ==========================================================================

/**
 * @route   POST /profissionais
 * @desc    Criar profissional (Admin only)
 * @access  Private (Admin)
 */
router.post(
  "/",
  adminOnly,
  validate({ body: createProfissionalSchema }),
  ProfissionalController.create
);

/**
 * @route   GET /profissionais
 * @desc    Listar profissionais
 * @access  Private
 */
router.get("/", ProfissionalController.list);

/**
 * @route   GET /profissionais/active
 * @desc    Obter profissional ativo
 * @access  Private
 */
router.get("/active", ProfissionalController.getActive);

/**
 * @route   GET /profissionais/:id
 * @desc    Obter profissional por ID
 * @access  Private
 */
router.get(
  "/:id",
  validate({ params: Joi.object({ id: idSchema }) }),
  ProfissionalController.getById
);

/**
 * @route   PUT /profissionais/:id
 * @desc    Atualizar profissional (Admin only)
 * @access  Private (Admin)
 */
router.put(
  "/:id",
  adminOnly,
  validate({
    params: Joi.object({ id: idSchema }),
    body: updateProfissionalSchema,
  }),
  ProfissionalController.update
);

/**
 * @route   DELETE /profissionais/:id
 * @desc    Excluir profissional (Admin only)
 * @access  Private (Admin)
 */
router.delete(
  "/:id",
  adminOnly,
  validate({ params: Joi.object({ id: idSchema }) }),
  ProfissionalController.delete
);

export default router;
