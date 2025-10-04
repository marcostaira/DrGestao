import { Router } from "express";
import { AtendimentoController } from "../controllers/atendimento.controller";
import { authenticate } from "../../../middleware/auth";
import { autorizar } from "../../../middleware/autorizar";
import { Modulo } from "../../../types";
import { validateTenant } from "../../../middleware/tenant";
import { validate } from "../../../middleware/validation";
import {
  createAtendimentoSchema,
  paginationSchema,
  idSchema,
} from "../../../middleware/validation";
import Joi from "joi";

// ============================================================================
// ATENDIMENTO ROUTES COM AUTORIZAÇÕES
// ============================================================================

const router = Router();

router.use(authenticate);
router.use(validateTenant);

// ==========================================================================
// ROTAS DE LEITURA - REQUER PERMISSÃO DE VISUALIZAR
// ==========================================================================

/**
 * @route   GET /atendimentos
 * @desc    Listar atendimentos
 * @access  Private (Requer permissão: ATENDIMENTOS.visualizar)
 */
router.get(
  "/",
  autorizar(Modulo.ATENDIMENTOS, "visualizar"),
  validate({
    query: paginationSchema.keys({
      pacienteId: Joi.string().optional(),
      profissionalId: Joi.string().optional(),
      dataInicio: Joi.date().iso().optional(),
      dataFim: Joi.date().iso().optional(),
      incluirCancelados: Joi.boolean().optional(),
    }),
  }),
  AtendimentoController.list
);

/**
 * @route   GET /atendimentos/paciente/:pacienteId
 * @desc    Listar atendimentos de um paciente
 * @access  Private (Requer permissão: ATENDIMENTOS.visualizar)
 */
router.get(
  "/paciente/:pacienteId",
  autorizar(Modulo.ATENDIMENTOS, "visualizar"),
  validate({
    params: Joi.object({ pacienteId: idSchema }),
    query: Joi.object({
      incluirCancelados: Joi.boolean().optional(),
    }),
  }),
  AtendimentoController.getByPaciente
);

/**
 * @route   GET /atendimentos/agendamento/:agendamentoId
 * @desc    Obter atendimento por ID do agendamento
 * @access  Private (Requer permissão: ATENDIMENTOS.visualizar)
 */
router.get(
  "/agendamento/:agendamentoId",
  autorizar(Modulo.ATENDIMENTOS, "visualizar"),
  validate({
    params: Joi.object({
      agendamentoId: Joi.string().required(),
    }),
  }),
  AtendimentoController.getByAgendamento
);

/**
 * @route   GET /atendimentos/:id
 * @desc    Obter atendimento por ID
 * @access  Private (Requer permissão: ATENDIMENTOS.visualizar)
 */
router.get(
  "/:id",
  autorizar(Modulo.ATENDIMENTOS, "visualizar"),
  validate({ params: Joi.object({ id: idSchema }) }),
  AtendimentoController.getById
);

// ==========================================================================
// ROTAS DE ESCRITA - REQUER PERMISSÃO DE CRIAR/ALTERAR
// ==========================================================================

/**
 * @route   POST /atendimentos
 * @desc    Criar atendimento
 * @access  Private (Requer permissão: ATENDIMENTOS.criarAlterar)
 */
router.post(
  "/",
  autorizar(Modulo.ATENDIMENTOS, "criarAlterar"),
  validate({ body: createAtendimentoSchema }),
  AtendimentoController.create
);

// ==========================================================================
// ROTA DE CANCELAMENTO - REQUER PERMISSÃO DE CANCELAR
// ==========================================================================

/**
 * @route   PATCH /atendimentos/:id/cancel
 * @desc    Cancelar atendimento
 * @access  Private (Requer permissão: ATENDIMENTOS.cancelar)
 */
router.patch(
  "/:id/cancel",
  autorizar(Modulo.ATENDIMENTOS, "cancelar"),
  validate({ params: Joi.object({ id: idSchema }) }),
  AtendimentoController.cancel
);

export default router;
