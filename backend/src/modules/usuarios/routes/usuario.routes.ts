import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";
import { authenticate } from "../../../middleware/auth";
import { autorizar } from "../../../middleware/autorizar";
import { Modulo } from "../../../types";
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
// USUARIO ROUTES COM AUTORIZAÇÕES GRANULARES
// ============================================================================

const router = Router();

router.use(authenticate);
router.use(validateTenant);

// ==========================================================================
// ROTAS PÚBLICAS (Qualquer usuário autenticado)
// ==========================================================================

/**
 * @route   POST /usuarios/change-password
 * @desc    Alterar própria senha
 * @access  Private (Qualquer usuário autenticado)
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

// ==========================================================================
// ROTAS DE LEITURA - REQUER PERMISSÃO DE VISUALIZAR
// ==========================================================================

/**
 * @route   GET /usuarios
 * @desc    Listar usuários
 * @access  Private (Requer permissão: USUARIOS.visualizar)
 */
router.get(
  "/",
  autorizar(Modulo.USUARIOS, "visualizar"),
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
 * @desc    Estatísticas de usuários
 * @access  Private (Requer permissão: USUARIOS.visualizar)
 */
router.get(
  "/statistics",
  autorizar(Modulo.USUARIOS, "visualizar"),
  UsuarioController.getStatistics
);

/**
 * @route   GET /usuarios/:id
 * @desc    Obter usuário por ID
 * @access  Private (Requer permissão: USUARIOS.visualizar)
 */
router.get(
  "/:id",
  autorizar(Modulo.USUARIOS, "visualizar"),
  validate({ params: Joi.object({ id: idSchema }) }),
  UsuarioController.getById
);

// ==========================================================================
// ROTAS DE ESCRITA - REQUER PERMISSÃO DE CRIAR/ALTERAR
// ==========================================================================

/**
 * @route   POST /usuarios
 * @desc    Criar usuário
 * @access  Private (Requer permissão: USUARIOS.criarAlterar)
 */
router.post(
  "/",
  autorizar(Modulo.USUARIOS, "criarAlterar"),
  validate({ body: createUserSchema }),
  UsuarioController.create
);

/**
 * @route   PUT /usuarios/:id
 * @desc    Atualizar usuário
 * @access  Private (Requer permissão: USUARIOS.criarAlterar)
 */
router.put(
  "/:id",
  autorizar(Modulo.USUARIOS, "criarAlterar"),
  validate({
    params: Joi.object({ id: idSchema }),
    body: updateUserSchema,
  }),
  UsuarioController.update
);

/**
 * @route   POST /usuarios/reset-password
 * @desc    Resetar senha de usuário
 * @access  Private (Requer permissão: USUARIOS.criarAlterar)
 */
router.post(
  "/reset-password",
  autorizar(Modulo.USUARIOS, "criarAlterar"),
  validate({
    body: Joi.object({
      usuarioId: idSchema,
      novaSenha: Joi.string().min(6).required(),
    }),
  }),
  UsuarioController.resetPassword
);

/**
 * @route   PATCH /usuarios/:id/status
 * @desc    Ativar/Desativar usuário
 * @access  Private (Requer permissão: USUARIOS.criarAlterar)
 */
router.patch(
  "/:id/status",
  autorizar(Modulo.USUARIOS, "criarAlterar"),
  validate({ params: Joi.object({ id: idSchema }) }),
  UsuarioController.toggleStatus
);

/**
 * @route   DELETE /usuarios/:id
 * @desc    Desativar usuário
 * @access  Private (Requer permissão: USUARIOS.criarAlterar)
 */
router.delete(
  "/:id",
  autorizar(Modulo.USUARIOS, "criarAlterar"),
  validate({ params: Joi.object({ id: idSchema }) }),
  UsuarioController.delete
);

export default router;
