import { Router } from "express";
import { ProfissionalController } from "../controllers/profissional.controller";
import { authenticate } from "../../../middleware/auth";
import { autorizar } from "../../../middleware/autorizar";
import { Modulo } from "../../../types";
import { validateTenant } from "../../../middleware/tenant";
import { validate } from "../../../middleware/validation";
import {
  createProfissionalSchema,
  updateProfissionalSchema,
  idSchema,
} from "../../../middleware/validation";
import Joi from "joi";

// ============================================================================
// PROFISSIONAL ROUTES COM AUTORIZAÇÕES GRANULARES
// ============================================================================

const router = Router();

// Aplicar autenticação e validação de tenant a todas as rotas
router.use(authenticate);
router.use(validateTenant);

// ==========================================================================
// ROTAS DE LEITURA - REQUER PERMISSÃO DE VISUALIZAR
// ==========================================================================

/**
 * @route   GET /profissionais
 * @desc    Listar profissionais
 * @access  Private (Requer permissão: PROFISSIONAIS.visualizar)
 */
router.get(
  "/",
  autorizar(Modulo.PROFISSIONAIS, "visualizar"),
  ProfissionalController.list
);

/**
 * @route   GET /profissionais/active
 * @desc    Obter profissional ativo
 * @access  Private (Requer permissão: PROFISSIONAIS.visualizar)
 */
router.get(
  "/active",
  autorizar(Modulo.PROFISSIONAIS, "visualizar"),
  ProfissionalController.getActive
);

/**
 * @route   GET /profissionais/:id
 * @desc    Obter profissional por ID
 * @access  Private (Requer permissão: PROFISSIONAIS.visualizar)
 */
router.get(
  "/:id",
  autorizar(Modulo.PROFISSIONAIS, "visualizar"),
  validate({ params: Joi.object({ id: idSchema }) }),
  ProfissionalController.getById
);

// ==========================================================================
// ROTAS DE ESCRITA - REQUER PERMISSÃO DE CRIAR/ALTERAR
// ==========================================================================

/**
 * @route   POST /profissionais
 * @desc    Criar profissional
 * @access  Private (Requer permissão: PROFISSIONAIS.criarAlterar)
 */
router.post(
  "/",
  autorizar(Modulo.PROFISSIONAIS, "criarAlterar"),
  validate({ body: createProfissionalSchema }),
  ProfissionalController.create
);

/**
 * @route   PUT /profissionais/:id
 * @desc    Atualizar profissional
 * @access  Private (Requer permissão: PROFISSIONAIS.criarAlterar)
 */
router.put(
  "/:id",
  autorizar(Modulo.PROFISSIONAIS, "criarAlterar"),
  validate({
    params: Joi.object({ id: idSchema }),
    body: updateProfissionalSchema,
  }),
  ProfissionalController.update
);

/**
 * @route   DELETE /profissionais/:id
 * @desc    Excluir profissional
 * @access  Private (Requer permissão: PROFISSIONAIS.criarAlterar)
 */
router.delete(
  "/:id",
  autorizar(Modulo.PROFISSIONAIS, "criarAlterar"),
  validate({ params: Joi.object({ id: idSchema }) }),
  ProfissionalController.delete
);

export default router;
