import { Router } from "express";
import { PacienteController } from "../controllers/paciente.controller";
import { authenticate, adminOnly } from "../../../middleware/auth";
import { autorizar } from "../../../middleware/autorizar";
import { Modulo } from "../../../types";
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
// PACIENTE ROUTES COM AUTORIZAÇÕES GRANULARES
// ============================================================================

const router = Router();

// Aplicar autenticação e validação de tenant a todas as rotas
router.use(authenticate);
router.use(validateTenant);

// ==========================================================================
// ROTAS DE LEITURA - REQUER PERMISSÃO DE VISUALIZAR
// ==========================================================================

/**
 * @route   GET /pacientes
 * @desc    Listar pacientes com filtros e paginação
 * @access  Private (Requer permissão: PACIENTES.visualizar)
 */
router.get(
  "/",
  autorizar(Modulo.PACIENTES, "visualizar"),
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
 * @access  Private (Requer permissão: PACIENTES.visualizar)
 */
router.get(
  "/:id",
  autorizar(Modulo.PACIENTES, "visualizar"),
  validate({ params: Joi.object({ id: idSchema }) }),
  validateResourceOwnership("paciente"),
  PacienteController.getById
);

/**
 * @route   GET /pacientes/search/autocomplete
 * @desc    Busca rápida de pacientes para autocomplete
 * @access  Private (Requer permissão: PACIENTES.visualizar)
 */
router.get(
  "/search/autocomplete",
  autorizar(Modulo.PACIENTES, "visualizar"),
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
 * @access  Private (Requer permissão: PACIENTES.visualizar)
 */
router.get(
  "/profissional/:profissionalId",
  autorizar(Modulo.PACIENTES, "visualizar"),
  validate({ params: Joi.object({ profissionalId: idSchema }) }),
  PacienteController.getByProfissional
);

/**
 * @route   GET /pacientes/stats/overview
 * @desc    Obter estatísticas gerais dos pacientes
 * @access  Private (Requer permissão: PACIENTES.visualizar)
 */
router.get(
  "/stats/overview",
  autorizar(Modulo.PACIENTES, "visualizar"),
  PacienteController.getStatistics
);

// ==========================================================================
// ROTAS DE ESCRITA - REQUER PERMISSÃO DE CRIAR/ALTERAR
// ==========================================================================

/**
 * @route   POST /pacientes
 * @desc    Criar novo paciente
 * @access  Private (Requer permissão: PACIENTES.criarAlterar)
 */
router.post(
  "/",
  autorizar(Modulo.PACIENTES, "criarAlterar"),
  validate({ body: createPacienteSchema }),
  PacienteController.create
);

/**
 * @route   PUT /pacientes/:id
 * @desc    Atualizar paciente
 * @access  Private (Requer permissão: PACIENTES.criarAlterar)
 */
router.put(
  "/:id",
  autorizar(Modulo.PACIENTES, "criarAlterar"),
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
 * @access  Private (Requer permissão: PACIENTES.criarAlterar)
 */
router.delete(
  "/:id",
  autorizar(Modulo.PACIENTES, "criarAlterar"),
  validate({ params: Joi.object({ id: idSchema }) }),
  validateResourceOwnership("paciente"),
  PacienteController.delete
);

/**
 * @route   POST /pacientes/bulk/assign-profissional
 * @desc    Atribuir profissional a múltiplos pacientes
 * @access  Private (Requer permissão: PACIENTES.criarAlterar)
 */
router.post(
  "/bulk/assign-profissional",
  autorizar(Modulo.PACIENTES, "criarAlterar"),
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
 * @access  Private (Requer permissão: PACIENTES.criarAlterar)
 */
router.post(
  "/bulk/remove-profissional",
  autorizar(Modulo.PACIENTES, "criarAlterar"),
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

/**
 * @route   POST /pacientes/validate/phone
 * @desc    Validar formato de telefone
 * @access  Private (Requer permissão: PACIENTES.visualizar)
 */
router.post(
  "/validate/phone",
  autorizar(Modulo.PACIENTES, "visualizar"),
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
