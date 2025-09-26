import { Router } from "express";
import { TenantController } from "../controllers/tenant.controller";
import { authenticate, adminOnly } from "../../../middleware/auth";
import { validateTenant } from "../../../middleware/tenant";
import { validate } from "../../../middleware/validation";
import { updateTenantSchema } from "../../../middleware/validation";

// ============================================================================
// TENANT ROUTES
// ============================================================================

const router = Router();

// Aplicar autenticação e validação de tenant
router.use(authenticate);
router.use(validateTenant);

// ==========================================================================
// ROUTES
// ==========================================================================

/**
 * @route   GET /tenants/current
 * @desc    Obter informações do tenant atual
 * @access  Private
 */
router.get("/current", TenantController.getCurrent);

/**
 * @route   PUT /tenants/current
 * @desc    Atualizar tenant (Admin only)
 * @access  Private (Admin)
 */
router.put(
  "/current",
  adminOnly,
  validate({ body: updateTenantSchema }),
  TenantController.update
);

/**
 * @route   GET /tenants/statistics
 * @desc    Obter estatísticas do tenant
 * @access  Private
 */
router.get("/statistics", TenantController.getStatistics);

/**
 * @route   GET /tenants/plan-limits
 * @desc    Obter limites do plano atual
 * @access  Private
 */
router.get("/plan-limits", TenantController.getPlanLimits);

export default router;
