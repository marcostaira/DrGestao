import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import {
  authenticate,
  adminOnly,
  refreshTokenMiddleware,
  createUserRateLimit,
} from "../../../middleware/auth";
import { validate } from "../../../middleware/validation";
import {
  loginSchema,
  refreshTokenSchema,
  createTenantSchema,
  createUserSchema,
  updateUserSchema,
  paginationSchema,
  idSchema,
} from "../../../middleware/validation";

// ============================================================================
// AUTH ROUTES
// ============================================================================

const router = Router();

// Rate limiting para rotas sensíveis
const authRateLimit = createUserRateLimit();

// ==========================================================================
// PUBLIC ROUTES (Não requerem autenticação)
// ==========================================================================

/**
 * @route   POST /auth/login
 * @desc    Login de usuário
 * @access  Public
 */
router.post(
  "/login",
  authRateLimit,
  validate({ body: loginSchema }),
  AuthController.login
);

/**
 * @route   POST /auth/register-tenant
 * @desc    Registro de novo tenant com usuário admin
 * @access  Public
 */
router.post(
  "/register-tenant",
  authRateLimit,
  validate({ body: createTenantSchema }),
  AuthController.registerTenant
);

/**
 * @route   POST /auth/refresh
 * @desc    Renovar token usando refresh token
 * @access  Public
 */
router.post(
  "/refresh",
  authRateLimit,
  validate({ body: refreshTokenSchema }),
  refreshTokenMiddleware
);

// ==========================================================================
// PROTECTED ROUTES (Requerem autenticação)
// ==========================================================================

/**
 * @route   GET /auth/profile
 * @desc    Obter perfil do usuário logado
 * @access  Private
 */
router.get("/profile", authenticate, AuthController.getProfile);

/**
 * @route   PUT /auth/profile
 * @desc    Atualizar perfil do usuário logado
 * @access  Private
 */
router.put(
  "/profile",
  authenticate,
  validate({ body: updateUserSchema }),
  AuthController.updateProfile
);

/**
 * @route   POST /auth/change-password
 * @desc    Alterar própria senha
 * @access  Private
 */
router.post(
  "/change-password",
  authenticate,
  authRateLimit,
  validate({
    body: {
      senhaAtual: loginSchema.extract("senha"),
      novaSenha: loginSchema.extract("senha"),
    },
  }),
  AuthController.changePassword
);

/**
 * @route   POST /auth/logout
 * @desc    Logout (registra log)
 * @access  Private
 */
router.post("/logout", authenticate, AuthController.logout);

/**
 * @route   GET /auth/validate
 * @desc    Validar se token ainda é válido
 * @access  Private
 */
router.get("/validate", authenticate, AuthController.validateToken);

// ==========================================================================
// ADMIN ONLY ROUTES
// ==========================================================================

/**
 * @route   POST /auth/users
 * @desc    Criar novo usuário no tenant
 * @access  Private (Admin only)
 */
router.post(
  "/users",
  authenticate,
  adminOnly,
  validate({ body: createUserSchema }),
  AuthController.createUser
);

/**
 * @route   GET /auth/users
 * @desc    Listar usuários do tenant
 * @access  Private (Admin only)
 */
router.get(
  "/users",
  authenticate,
  adminOnly,
  validate({ query: paginationSchema }),
  AuthController.listUsers
);

/**
 * @route   POST /auth/reset-password
 * @desc    Resetar senha de outro usuário (admin)
 * @access  Private (Admin only)
 */
router.post(
  "/reset-password",
  authenticate,
  adminOnly,
  authRateLimit,
  validate({
    body: {
      usuarioId: idSchema,
      novaSenha: loginSchema.extract("senha"),
    },
  }),
  AuthController.resetPassword
);

/**
 * @route   DELETE /auth/users/:id
 * @desc    Desativar usuário
 * @access  Private (Admin only)
 */
router.delete(
  "/users/:id",
  authenticate,
  adminOnly,
  validate({ params: { id: idSchema } }),
  AuthController.deactivateUser
);

// ==========================================================================
// HEALTH CHECK ROUTE
// ==========================================================================

/**
 * @route   GET /auth/health
 * @desc    Health check para o módulo de autenticação
 * @access  Public
 */
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Auth module is healthy",
    timestamp: new Date().toISOString(),
  });
});

export default router;
