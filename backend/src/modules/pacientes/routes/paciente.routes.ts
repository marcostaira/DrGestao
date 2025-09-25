import { Router } from "express";
import { PacienteController } from "../controllers/paciente.controller";
import { authenticate, adminOnly } from "../../../middleware/auth";
import {
  validateTenant,
  validateResourceOwnership,
} from "../../../middleware/tenant";
import { validate } from "../../../middleware/validation";
import {
  createPacienteSchema,
  updatePacienteSchema,
  paginationSchema,
  idSchema,
} from "../../../middleware/validation";
import Joi from "joi";

// ============================================================================
// PACIENTE ROUTES
// ============================================================================

const router = Router();

// Aplicar autenticação e validação de tenant a todas as rotas
router.use(authenticate);
router.use(validateTenant);

// ==========================================================================
// MAIN CRUD ROUTES
// ==========================================================================

/**
 * @route   POST /pacientes
 * @desc    Criar novo paciente
 * @access  Private (Admin/Secretaria)
 */
router.post(
  "/",
  validate({ body: createPacienteSchema }),
  PacienteController.create
);

/**
 * @route   GET /pacientes
 * @desc    Listar pacientes com filtros e paginação
 * @access  Private (Admin/Secretaria)
 */
router.get(
  "/",
  validate({
    query: paginationSchema.keys({
      profissionalId: Joi.string().optional(),
      telefone: Joi.string().optional(),
    }),
  }),
  PacienteController.list
);

/**
 * @route   GET /pacientes/:id
 * @desc    Obter paciente por ID
 * @access  Private (Admin/Secretaria)
 */
router.get(
  "/:id",
  validate({ params: Joi.object({ id: idSchema }) }),
  validateResourceOwnership("paciente"),
  PacienteController.getById
);

/**
 * @route   PUT /pacientes/:id
 * @desc    Atualizar paciente
 * @access  Private (Admin/Secretaria)
 */
router.put(
  "/:id",
  validate({
    params: Joi.object({ id: idSchema }),
    body: updatePacienteSchema,
  }),
  validateResourceOwnership("paciente"),
  PacienteController.update
);

/**
 * @route   DELETE /pacientes/:id
 * @desc    Excluir paciente
 * @access  Private (Admin only)
 */
router.delete(
  "/:id",
  validate({ params: Joi.object({ id: idSchema }) }),
  adminOnly,
  validateResourceOwnership("paciente"),
  PacienteController.delete
);

// ==========================================================================
// SEARCH AND FILTER ROUTES
// ==========================================================================

/**
 * @route   GET /pacientes/search/autocomplete
 * @desc    Busca rápida de pacientes para autocomplete
 * @access  Private (Admin/Secretaria)
 */
router.get(
  "/search/autocomplete",
  validate({
    query: Joi.object({
      term: Joi.string().min(2).required().messages({
        "string.min": "Termo de busca deve ter pelo menos 2 caracteres",
        "any.required": "Termo de busca é obrigatório",
      }),
      limit: Joi.number().integer().min(1).max(50).default(10),
    }),
  }),
  PacienteController.search
);

/**
 * @route   GET /pacientes/profissional/:profissionalId
 * @desc    Listar pacientes de um profissional específico
 * @access  Private (Admin/Secretaria)
 */
router.get(
  "/profissional/:profissionalId",
  validate({ params: Joi.object({ profissionalId: idSchema }) }),
  PacienteController.getByProfissional
);

// ==========================================================================
// STATISTICS ROUTES
// ==========================================================================

/**
 * @route   GET /pacientes/stats/overview
 * @desc    Obter estatísticas gerais dos pacientes
 * @access  Private (Admin/Secretaria)
 */
router.get("/stats/overview", PacienteController.getStatistics);

// ==========================================================================
// BULK OPERATIONS (Admin only)
// ==========================================================================

/**
 * @route   POST /pacientes/bulk/assign-profissional
 * @desc    Atribuir profissional a múltiplos pacientes
 * @access  Private (Admin only)
 */
router.post(
  "/bulk/assign-profissional",
  adminOnly,
  validate({
    body: Joi.object({
      pacienteIds: Joi.array().items(idSchema).min(1).required().messages({
        "array.min": "Pelo menos um paciente deve ser selecionado",
        "any.required": "Lista de pacientes é obrigatória",
      }),
      profissionalId: idSchema.required().messages({
        "any.required": "Profissional é obrigatório",
      }),
    }),
  }),
  PacienteController.bulkAssignProfissional
);

/**
 * @route   POST /pacientes/bulk/remove-profissional
 * @desc    Remover profissional de múltiplos pacientes
 * @access  Private (Admin only)
 */
router.post(
  "/bulk/remove-profissional",
  adminOnly,
  validate({
    body: Joi.object({
      pacienteIds: Joi.array().items(idSchema).min(1).required().messages({
        "array.min": "Pelo menos um paciente deve ser selecionado",
        "any.required": "Lista de pacientes é obrigatória",
      }),
    }),
  }),
  PacienteController.bulkRemoveProfissional
);

// ==========================================================================
// UTILITY ROUTES
// ==========================================================================

/**
 * @route   POST /pacientes/validate/phone
 * @desc    Validar formato de telefone
 * @access  Private (Admin/Secretaria)
 */
router.post(
  "/validate/phone",
  validate({
    body: Joi.object({
      telefone: Joi.string().required().messages({
        "string.empty": "Telefone é obrigatório",
        "any.required": "Telefone é obrigatório",
      }),
    }),
  }),
  PacienteController.validatePhone
);

export default router;
