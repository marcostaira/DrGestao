// backend/src/modules/atendimentos/routes/agendamento-procedimentos.routes.ts

import { Router } from "express";
import { AgendamentoProcedimentosController } from "../controllers/agendamento-procedimentos.controller";
import { authenticate } from "../../../middleware/auth";
import { validateTenant } from "../../../middleware/tenant";
import { autorizar } from "../../../middleware/autorizar";
import { validate } from "../../../middleware/validation";
import {
  agendarProcedimentosAvaliacaoSchema,
  agendarProcedimentoIndividualSchema,
  idSchema,
} from "../../../middleware/validation";
import { Modulo } from "../../../types";
import Joi from "joi";

const router = Router();

// Aplicar autenticação e validação de tenant a todas as rotas
router.use(authenticate);
router.use(validateTenant);

// ===========================================================================
// ROTAS DE LEITURA - REQUER PERMISSÃO DE VISUALIZAR
// ===========================================================================

/**
 * @route   GET /atendimentos/agendamento-procedimentos/:avaliacaoId/listar
 * @desc    Listar procedimentos pendentes de agendamento da avaliação
 * @access  Private (Requer permissão: ATENDIMENTOS.visualizar)
 */
router.get(
  "/:avaliacaoId/listar",
  autorizar(Modulo.ATENDIMENTOS, "visualizar"),
  validate({ params: Joi.object({ avaliacaoId: idSchema }) }),
  AgendamentoProcedimentosController.listarProcedimentosParaAgendar
);

/**
 * @route   GET /atendimentos/agendamento-procedimentos/disponibilidade
 * @desc    Verificar disponibilidade de um horário
 * @access  Private (Requer permissão: ATENDIMENTOS.criarAlterar)
 */
router.get(
  "/disponibilidade",
  autorizar(Modulo.ATENDIMENTOS, "criarAlterar"),
  validate({
    query: Joi.object({
      profissionalId: Joi.string().required(),
      dataHora: Joi.date().iso().required(),
      duracaoMinutos: Joi.number().integer().min(1).required(),
    }),
  }),
  AgendamentoProcedimentosController.verificarDisponibilidade
);

// ===========================================================================
// ROTAS DE ESCRITA - REQUER PERMISSÃO DE CRIAR/ALTERAR
// ===========================================================================

/**
 * @route   POST /atendimentos/agendamento-procedimentos/lote
 * @desc    Agendar múltiplos procedimentos de uma avaliação
 * @access  Private (Requer permissão: ATENDIMENTOS.criarAlterar)
 */
router.post(
  "/lote",
  autorizar(Modulo.ATENDIMENTOS, "criarAlterar"),
  validate({ body: agendarProcedimentosAvaliacaoSchema }),
  AgendamentoProcedimentosController.agendarProcedimentos
);

/**
 * @route   POST /atendimentos/agendamento-procedimentos/:atendimentoProcedimentoId
 * @desc    Agendar um procedimento individual
 * @access  Private (Requer permissão: ATENDIMENTOS.criarAlterar)
 */
router.post(
  "/:atendimentoProcedimentoId",
  autorizar(Modulo.ATENDIMENTOS, "criarAlterar"),
  validate({
    params: Joi.object({ atendimentoProcedimentoId: idSchema }),
    body: agendarProcedimentoIndividualSchema,
  }),
  AgendamentoProcedimentosController.agendarProcedimentoIndividual
);

export default router;
