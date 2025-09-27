import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";
import { authenticate, adminOnly } from "../../../middleware/auth";
import { validateTenant } from "../../../middleware/tenant";
import { validate } from "../../../middleware/validation";
import {
  createUserSchema,
  updateUserSchema,
  paginationSchema,
  idSchema,
} from "../../../middleware/validation";
import Joi from "joi";

// ============================================================================
// USUARIO ROUTES
// ============================================================================

const router = Router();

router.use(authenticate);
router.use(validateTenant);

// ==========================================================================
// ROUTES
// ==========================================================================

/**
 * @route   POST /usuarios
 * @desc    Criar usuário (Admin only)
 * @access  Private (Admin)
 */
router.post(
  "/",
  adminOnly,
  validate({ body: createUserSchema }),
  UsuarioController.create
);

/**
 * @route   GET /usuarios
 * @desc    Listar usuários (Admin only)
 * @access  Private (Admin)
 */
router.get(
  "/",
  adminOnly,
  validate({
    query: paginationSchema.keys({
      tipo: Joi.string().valid("ADMIN", "SECRETARIA").optional(),
      ativo: Joi.string().valid("true", "false").optional(),
    }),
  }),
  UsuarioController.list
);

/**
 * @route   GET /usuarios/statistics
 * @desc    Estatísticas de usuários (Admin only)
 * @access  Private (Admin)
 */
router.get("/statistics", adminOnly, UsuarioController.getStatistics);

/**
 * @route   POST /usuarios/change-password
 * @desc    Alterar própria senha
 * @access  Private
 */
router.post(
  "/change-password",
  validate({
    body: Joi.object({
      senhaAtual: Joi.string().min(6).required(),
      novaSenha: Joi.string().min(6).required(),
    }),
  }),
  UsuarioController.changePassword
);

/**
 * @route   POST /usuarios/reset-password
 * @desc    Resetar senha de usuário (Admin only)
 * @access  Private (Admin)
 */
router.post(
  "/reset-password",
  adminOnly,
  validate({
    body: Joi.object({
      usuarioId: idSchema,
      novaSenha: Joi.string().min(6).required(),
    }),
  }),
  UsuarioController.resetPassword
);

/**
 * @route   GET /usuarios/:id
 * @desc    Obter usuário por ID (Admin only)
 * @access  Private (Admin)
 */
router.get(
  "/:id",
  adminOnly,
  validate({ params: Joi.object({ id: idSchema }) }),
  UsuarioController.getById
);

/**
 * @route   PUT /usuarios/:id
 * @desc    Atualizar usuário (Admin only)
 * @access  Private (Admin)
 */
router.put(
  "/:id",
  adminOnly,
  validate({
    params: Joi.object({ id: idSchema }),
    body: updateUserSchema,
  }),
  UsuarioController.update
);

/**
 * @route   DELETE /usuarios/:id
 * @desc    Desativar usuário (Admin only)
 * @access  Private (Admin)
 */
router.delete(
  "/:id",
  adminOnly,
  validate({ params: Joi.object({ id: idSchema }) }),
  UsuarioController.delete
);

/**
 * @route   PATCH /usuarios/:id/status
 * @desc    Ativar/Desativar usuário (Admin only)
 * @access  Private (Admin)
 */
router.patch(
  "/:id/status",
  adminOnly,
  validate({ params: Joi.object({ id: idSchema }) }),
  UsuarioController.toggleStatus
);

export default router;
