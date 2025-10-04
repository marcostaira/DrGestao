import { Router } from "express";
import { AnamneseController } from "../controllers/anamnese.controller";
import { authenticate } from "../../../middleware/auth";
import { validateRequest } from "../../../middleware/validation";
import {
  createAnamneseSchema,
  updateAnamneseSchema,
} from "../validators/anamnese.validator";
import { autorizar } from "../../../middleware/autorizar";
import { Modulo } from "../../../types";

const router = Router();

// Todas as rotas requerem autenticação
router.use(authenticate);

// =============================================================================
// ROTAS DE ANAMNESES
// =============================================================================

/**
 * @route   POST /api/anamneses
 * @desc    Criar nova anamnese
 * @access  Admin, Secretaria
 */
router.post(
  "/",
  autorizar(Modulo.ATENDIMENTOS, "criarAlterar"),
  validateRequest(createAnamneseSchema),
  AnamneseController.create
);

/**
 * @route   GET /api/anamneses/:id
 * @desc    Buscar anamnese por ID
 * @access  Admin, Secretaria
 */
router.get(
  "/:id",
  autorizar(Modulo.ATENDIMENTOS, "visualizar"),
  AnamneseController.getById
);

/**
 * @route   GET /api/anamneses/paciente/:pacienteId
 * @desc    Listar anamneses de um paciente
 * @access  Admin, Secretaria
 */
router.get(
  "/paciente/:pacienteId",
  autorizar(Modulo.ATENDIMENTOS, "visualizar"),
  AnamneseController.listByPaciente
);

/**
 * @route   GET /api/anamneses/formulario/:formularioId
 * @desc    Listar anamneses de um formulário
 * @access  Admin, Secretaria
 */
router.get(
  "/formulario/:formularioId",
  autorizar(Modulo.ATENDIMENTOS, "visualizar"),
  AnamneseController.listByFormulario
);

/**
 * @route   PUT /api/anamneses/:id
 * @desc    Atualizar anamnese
 * @access  Admin, Secretaria
 */
router.put(
  "/:id",
  autorizar(Modulo.ATENDIMENTOS, "criarAlterar"),
  validateRequest(updateAnamneseSchema),
  AnamneseController.update
);

/**
 * @route   DELETE /api/anamneses/:id
 * @desc    Excluir anamnese
 * @access  Admin
 */
router.delete(
  "/:id",
  autorizar(Modulo.ATENDIMENTOS, "cancelar"),
  AnamneseController.delete
);

export default router;
