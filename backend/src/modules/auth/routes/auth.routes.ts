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
import Joi from "joi";

// ============================================================================
// AUTH ROUTES
// ============================================================================

const router = Router();

// Rate limiting para rotas sensíveis
const authRateLimit = createUserRateLimit();

// ==========================================================================
// PUBLIC ROUTES (Não requerem autenticação)
// ==========================================================================

router.post(
  "/login",
  authRateLimit,
  validate({ body: loginSchema }),
  AuthController.login
);

router.post(
  "/register-tenant",
  authRateLimit,
  validate({ body: createTenantSchema }),
  AuthController.registerTenant
);

router.post(
  "/refresh",
  authRateLimit,
  validate({ body: refreshTokenSchema }),
  refreshTokenMiddleware,
  AuthController.refreshToken
);

// ==========================================================================
// PROTECTED ROUTES (Requerem autenticação)
// ==========================================================================

router.get("/profile", authenticate, AuthController.getProfile);

router.put(
  "/profile",
  authenticate,
  validate({ body: updateUserSchema }),
  AuthController.updateProfile
);

router.post(
  "/change-password",
  authenticate,
  authRateLimit,
  validate({
    body: Joi.object({
      senhaAtual: Joi.string().min(6).required(),
      novaSenha: Joi.string().min(6).required(),
    }),
  }),
  AuthController.changePassword
);

router.post("/logout", authenticate, AuthController.logout);

router.get("/validate", authenticate, AuthController.validateToken);

// ==========================================================================
// ADMIN ONLY ROUTES
// ==========================================================================

router.post(
  "/users",
  authenticate,
  adminOnly,
  validate({ body: createUserSchema }),
  AuthController.createUser
);

router.get(
  "/users",
  authenticate,
  adminOnly,
  validate({ query: paginationSchema }),
  AuthController.listUsers
);

router.post(
  "/reset-password",
  authenticate,
  adminOnly,
  authRateLimit,
  validate({
    body: Joi.object({
      usuarioId: idSchema,
      novaSenha: Joi.string().min(6).required(),
    }),
  }),
  AuthController.resetPassword
);

router.delete(
  "/users/:id",
  authenticate,
  adminOnly,
  validate({ params: Joi.object({ id: idSchema }) }),
  AuthController.deactivateUser
);

// ==========================================================================
// HEALTH CHECK ROUTE
// ==========================================================================

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Auth module is healthy",
    timestamp: new Date().toISOString(),
  });
});

export default router;
