import { Router } from "express";
import { FormularioController } from "../controllers/formulario.controller";
import { authenticate } from "../../../middleware/auth";
import { validateRequest } from "../../../middleware/validation";
import {
  createFormularioSchema,
  updateFormularioSchema,
} from "../validators/formulario.validator";
import { autorizar } from "../../../middleware/autorizar";
import { Modulo } from "../../../types";

const router = Router();

// Todas as rotas requerem autenticação
router.use(authenticate);

// =============================================================================
// ROTAS DE FORMULÁRIOS
// =============================================================================

/**
 * @route   POST /api/formularios
 * @desc    Criar novo formulário
 * @access  Admin
 */
router.post(
  "/",
  autorizar(Modulo.ATENDIMENTOS, "criarAlterar"),
  validateRequest(createFormularioSchema),
  FormularioController.create
);

/**
 * @route   GET /api/formularios
 * @desc    Listar formulários
 * @access  Admin, Secretaria
 * @query   profissionalId, ativo, busca
 */
router.get(
  "/",
  autorizar(Modulo.ATENDIMENTOS, "visualizar"),
  FormularioController.list
);

/**
 * @route   GET /api/formularios/:id
 * @desc    Buscar formulário por ID
 * @access  Admin, Secretaria
 */
router.get(
  "/:id",
  autorizar(Modulo.ATENDIMENTOS, "visualizar"),
  FormularioController.getById
);

/**
 * @route   PUT /api/formularios/:id
 * @desc    Atualizar formulário
 * @access  Admin
 */
router.put(
  "/:id",
  autorizar(Modulo.ATENDIMENTOS, "criarAlterar"),
  validateRequest(updateFormularioSchema),
  FormularioController.update
);

/**
 * @route   DELETE /api/formularios/:id
 * @desc    Excluir formulário
 * @access  Admin
 */
router.delete(
  "/:id",
  autorizar(Modulo.ATENDIMENTOS, "cancelar"),
  FormularioController.delete
);

/**
 * @route   POST /api/formularios/:id/duplicate
 * @desc    Duplicar formulário
 * @access  Admin
 */
router.post(
  "/:id/duplicate",
  autorizar(Modulo.ATENDIMENTOS, "criarAlterar"),
  FormularioController.duplicate
);

export default router;
