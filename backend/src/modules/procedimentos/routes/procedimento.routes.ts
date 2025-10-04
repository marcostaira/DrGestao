import { Router } from "express";
import { ProcedimentoController } from "../controllers/procedimento.controller";
import { authenticate } from "../../../middleware/auth";
import { autorizar } from "../../../middleware/autorizar";
import { Modulo } from "../../../types";
import { validateTenant } from "../../../middleware/tenant";
import { validate } from "../../../middleware/validation";
import {
  createProcedimentoSchema,
  updateProcedimentoSchema,
  idSchema,
} from "../../../middleware/validation";
import Joi from "joi";

// ============================================================================
// PROCEDIMENTO ROUTES COM AUTORIZAÇÕES GRANULARES
// ============================================================================

const router = Router();

// Aplicar autenticação e validação de tenant a todas as rotas
router.use(authenticate);
router.use(validateTenant);

// ==========================================================================
// ROTAS DE LEITURA - REQUER PERMISSÃO DE VISUALIZAR
// ==========================================================================

/**
 * @route   GET /procedimentos
 * @desc    Listar procedimentos
 * @access  Private (Requer permissão: PROCEDIMENTOS.visualizar)
 */
router.get(
  "/",
  autorizar(Modulo.PROCEDIMENTOS, "visualizar"),
  ProcedimentoController.list
);

/**
 * @route   GET /procedimentos/statistics
 * @desc    Obter estatísticas dos procedimentos
 * @access  Private (Requer permissão: PROCEDIMENTOS.visualizar)
 */
router.get(
  "/statistics",
  autorizar(Modulo.PROCEDIMENTOS, "visualizar"),
  ProcedimentoController.getStatistics
);

/**
 * @route   GET /procedimentos/:id
 * @desc    Obter procedimento por ID
 * @access  Private (Requer permissão: PROCEDIMENTOS.visualizar)
 */
router.get(
  "/:id",
  autorizar(Modulo.PROCEDIMENTOS, "visualizar"),
  validate({ params: Joi.object({ id: idSchema }) }),
  ProcedimentoController.getById
);

// ==========================================================================
// ROTAS DE ESCRITA - REQUER PERMISSÃO DE CRIAR/ALTERAR
// ==========================================================================

/**
 * @route   POST /procedimentos
 * @desc    Criar procedimento
 * @access  Private (Requer permissão: PROCEDIMENTOS.criarAlterar)
 */
router.post(
  "/",
  autorizar(Modulo.PROCEDIMENTOS, "criarAlterar"),
  validate({ body: createProcedimentoSchema }),
  ProcedimentoController.create
);

/**
 * @route   PUT /procedimentos/:id
 * @desc    Atualizar procedimento
 * @access  Private (Requer permissão: PROCEDIMENTOS.criarAlterar)
 */
router.put(
  "/:id",
  autorizar(Modulo.PROCEDIMENTOS, "criarAlterar"),
  validate({
    params: Joi.object({ id: idSchema }),
    body: updateProcedimentoSchema,
  }),
  ProcedimentoController.update
);

/**
 * @route   DELETE /procedimentos/:id
 * @desc    Excluir procedimento
 * @access  Private (Requer permissão: PROCEDIMENTOS.criarAlterar)
 */
router.delete(
  "/:id",
  autorizar(Modulo.PROCEDIMENTOS, "criarAlterar"),
  validate({ params: Joi.object({ id: idSchema }) }),
  ProcedimentoController.delete
);

export default router;
