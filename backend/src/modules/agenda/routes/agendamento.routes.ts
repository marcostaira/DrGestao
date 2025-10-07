import { Router } from "express";
import { AgendamentoController } from "../controllers/agendamento.controller";
import { authenticate } from "../../../middleware/auth";
import { autorizar } from "../../../middleware/autorizar";
import { Modulo } from "../../../types";
import { validateTenant } from "../../../middleware/tenant";
import { validate } from "../../../middleware/validation";
import {
  createAgendamentoSchema,
  updateAgendamentoSchema,
  batchAgendamentoSchema,
  paginationSchema,
  idSchema,
} from "../../../middleware/validation";
import Joi from "joi";

// ============================================================================
// AGENDAMENTO ROUTES COM AUTORIZAÇÕES GRANULARES
// ============================================================================

const router = Router();

// Aplicar autenticação e validação de tenant a todas as rotas
router.use(authenticate);
router.use(validateTenant);

// ==========================================================================
// ROTAS DE LEITURA - REQUER PERMISSÃO DE VISUALIZAR
// ==========================================================================

/**
 * @route   GET /agendamentos
 * @desc    Listar agendamentos
 * @access  Private (Requer permissão: AGENDA.visualizar)
 */
router.get(
  "/",
  autorizar(Modulo.AGENDA, "visualizar"),
  validate({
    query: paginationSchema.keys({
      dataInicio: Joi.date().iso().optional(),
      dataFim: Joi.date().iso().optional(),
      pacienteId: Joi.string().optional(),
      profissionalId: Joi.string().optional(),
      status: Joi.string()
        .valid(
          "MARCADO",
          "CONFIRMADO",
          "COMPARECEU",
          "FALTOU",
          "CANCELADO",
          "REAGENDAR"
        )
        .optional(),
    }),
  }),
  AgendamentoController.list
);

/**
 * @route   GET /agendamentos/calendar
 * @desc    Visualização de calendário
 * @access  Private (Requer permissão: AGENDA.visualizar)
 */
router.get(
  "/calendar",
  autorizar(Modulo.AGENDA, "visualizar"),
  validate({
    query: Joi.object({
      dataInicio: Joi.date().iso().required(),
      dataFim: Joi.date().iso().required(),
      profissionalId: Joi.string().optional(),
    }),
  }),
  AgendamentoController.getCalendarView
);

/**
 * @route   GET /agendamentos/:id
 * @desc    Obter agendamento por ID
 * @access  Private (Requer permissão: AGENDA.visualizar)
 */
router.get(
  "/:id",
  autorizar(Modulo.AGENDA, "visualizar"),
  validate({ params: Joi.object({ id: idSchema }) }),
  AgendamentoController.getById
);

/**
 * @route   GET /agendamentos/recorrencia/:recorrenciaId/count
 * @desc    Contar agendamentos de uma recorrência
 * @access  Private (Requer permissão: AGENDA.visualizar)
 */
router.get(
  "/recorrencia/:recorrenciaId/count",
  autorizar(Modulo.AGENDA, "visualizar"),
  validate({
    params: Joi.object({
      recorrenciaId: Joi.string().required(),
    }),
  }),
  AgendamentoController.countRecorrencia
);

// ==========================================================================
// ROTAS DE ESCRITA - REQUER PERMISSÃO DE CRIAR/ALTERAR
// ==========================================================================

/**
 * @route   POST /agendamentos
 * @desc    Criar agendamento (individual ou lote)
 * @access  Private (Requer permissão: AGENDA.criarAlterar)
 */
router.post(
  "/",
  autorizar(Modulo.AGENDA, "criarAlterar"),
  validate({ body: createAgendamentoSchema }),
  AgendamentoController.create
);

/**
 * @route   PUT /agendamentos/batch
 * @desc    Atualizar múltiplos agendamentos
 * @access  Private (Requer permissão: AGENDA.criarAlterar)
 */
router.put(
  "/batch",
  autorizar(Modulo.AGENDA, "criarAlterar"),
  validate({ body: batchAgendamentoSchema }),
  AgendamentoController.batchUpdate
);

/**
 * @route   PUT /agendamentos/:id
 * @desc    Atualizar agendamento
 * @access  Private (Requer permissão: AGENDA.criarAlterar)
 */
router.put(
  "/:id",
  autorizar(Modulo.AGENDA, "criarAlterar"),
  validate({
    params: Joi.object({ id: idSchema }),
    body: updateAgendamentoSchema,
  }),
  AgendamentoController.update
);

/**
 * @route   PATCH /agendamentos/:id/status
 * @desc    Atualizar status do agendamento
 * @access  Private (Requer permissão: AGENDA.criarAlterar)
 */
router.patch(
  "/:id/status",
  autorizar(Modulo.AGENDA, "criarAlterar"),
  validate({
    params: Joi.object({ id: idSchema }),
    body: Joi.object({
      status: Joi.string()
        .valid(
          "MARCADO",
          "CONFIRMADO",
          "COMPARECEU",
          "FALTOU",
          "CANCELADO",
          "REAGENDAR"
        )
        .required(),
    }),
  }),
  AgendamentoController.updateStatus
);

/**
 * @route   PUT /agendamentos/recorrencia/:recorrenciaId
 * @desc    Atualizar todos agendamentos de uma recorrência
 * @access  Private (Requer permissão: AGENDA.criarAlterar)
 */
router.put(
  "/recorrencia/:recorrenciaId",
  autorizar(Modulo.AGENDA, "criarAlterar"),
  validate({
    params: Joi.object({
      recorrenciaId: Joi.string().required(),
    }),
    body: updateAgendamentoSchema,
  }),
  AgendamentoController.updateRecorrencia
);

// ==========================================================================
// ROTAS DE CANCELAMENTO - REQUER PERMISSÃO DE CANCELAR
// ==========================================================================

/**
 * @route   DELETE /agendamentos/:id
 * @desc    Excluir/Cancelar agendamento
 * @access  Private (Requer permissão: AGENDA.cancelar)
 */
router.delete(
  "/:id",
  autorizar(Modulo.AGENDA, "cancelar"),
  validate({ params: Joi.object({ id: idSchema }) }),
  AgendamentoController.delete
);

/**
 * @route   DELETE /agendamentos/batch
 * @desc    Excluir/Cancelar múltiplos agendamentos
 * @access  Private (Requer permissão: AGENDA.cancelar)
 */
router.delete(
  "/batch",
  autorizar(Modulo.AGENDA, "cancelar"),
  validate({
    body: Joi.object({
      ids: Joi.array().items(Joi.string()).min(1).required(),
    }),
  }),
  AgendamentoController.batchDelete
);

/**
 * @route   DELETE /agendamentos/recorrencia/:recorrenciaId
 * @desc    Excluir todos agendamentos de uma recorrência
 * @access  Private (Requer permissão: AGENDA.cancelar)
 */
router.delete(
  "/recorrencia/:recorrenciaId",
  autorizar(Modulo.AGENDA, "cancelar"),
  validate({
    params: Joi.object({
      recorrenciaId: Joi.string().required(),
    }),
  }),
  AgendamentoController.deleteRecorrencia
);

export default router;
