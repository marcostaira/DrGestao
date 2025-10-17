// backend/src/modules/atendimentos/routes/atendimento.routes.ts

import { Router } from "express";
import { AtendimentoController } from "../controllers/atendimento.controller";
import { authenticate } from "../../../middleware/auth";
import { autorizar } from "../../../middleware/autorizar";
import { Modulo } from "../../../types";
import { validateTenant } from "../../../middleware/tenant";
import { validate } from "../../../middleware/validation";
import {
  createAtendimentoSchema,
  updateAtendimentoSchema,
  aprovarAvaliacaoSchema,
  reprovarAvaliacaoSchema,
  updateProgressoProcedimentoSchema,
  paginationSchema,
  idSchema,
} from "../../../middleware/validation";
import Joi from "joi";
import { LinkAprovacaoController } from "../controllers/link-aprovacao.controller";

// ============================================================================
// ATENDIMENTO ROUTES COM AUTORIZAÇÕES
// ============================================================================

const router = Router();

// ==========================================================================
// ROTAS PÚBLICAS (SEM AUTENTICAÇÃO) - LINK DE APROVAÇÃO
// ==========================================================================

/**
 * @route   GET /atendimentos/:id/link-aprovacao/status
 * @desc    Verificar status do link de aprovação
 * @access  Private (Requer permissão: ATENDIMENTOS.visualizar)
 */
router.get(
  "/:id/link-aprovacao/status",
  authenticate,
  validateTenant,
  autorizar(Modulo.ATENDIMENTOS, "visualizar"),
  validate({
    params: Joi.object({ id: idSchema }),
  }),
  AtendimentoController.verificarStatusLink
);

/**
 * @route   GET /atendimentos/link-aprovacao/:token
 * @desc    Validar token de aprovação (público)
 * @access  Public
 */
router.get(
  "/link-aprovacao/:token",
  validate({
    params: Joi.object({
      token: Joi.string().required(),
    }),
  }),
  AtendimentoController.validarTokenAprovacao
);

/**
 * @route   POST /atendimentos/link-aprovacao/:token/aprovar
 * @desc    Aprovar via link (público)
 * @access  Public
 */
router.post(
  "/link-aprovacao/:token/aprovar",
  validate({
    params: Joi.object({
      token: Joi.string().required(),
    }),
    body: Joi.object({
      aprovadoPor: Joi.string().required().min(3).max(100),
    }),
  }),
  AtendimentoController.aprovarViaLink
);

/**
 * @route   POST /atendimentos/link-aprovacao/:token/reprovar
 * @desc    Reprovar avaliação via link público
 * @access  Public
 */
router.post(
  "/link-aprovacao/:token/reprovar",
  validate({
    params: Joi.object({
      token: Joi.string().required(),
    }),
    body: Joi.object({
      motivo: Joi.string().required().min(10).max(500).messages({
        "string.min": "O motivo deve ter no mínimo 10 caracteres",
        "string.max": "O motivo deve ter no máximo 500 caracteres",
        "any.required": "O motivo é obrigatório",
      }),
    }),
  }),
  LinkAprovacaoController.reprovar // ✅ Usar o novo método
);
// ==========================================================================
// MIDDLEWARE DE AUTENTICAÇÃO E TENANT
// ==========================================================================

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
      tipo: Joi.string()
        .valid("AVULSO", "AVALIACAO", "PLANO_TRATAMENTO")
        .optional(),
      statusAprovacao: Joi.string()
        .valid("PENDENTE", "APROVADO", "REPROVADO")
        .optional(),
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
 * @route   GET /atendimentos/paciente/:pacienteId/plano-tratamento
 * @desc    Listar planos de tratamento de um paciente
 * @access  Private (Requer permissão: ATENDIMENTOS.visualizar)
 */
router.get(
  "/paciente/:pacienteId/plano-tratamento",
  autorizar(Modulo.ATENDIMENTOS, "visualizar"),
  validate({
    params: Joi.object({ pacienteId: idSchema }),
  }),
  AtendimentoController.getPlanoTratamentoByPaciente
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

/**
 * @route   GET /atendimentos/:id/procedimentos
 * @desc    Obter procedimentos do plano/avaliação
 * @access  Private (Requer permissão: ATENDIMENTOS.visualizar)
 */
router.get(
  "/:id/procedimentos",
  autorizar(Modulo.ATENDIMENTOS, "visualizar"),
  validate({ params: Joi.object({ id: idSchema }) }),
  AtendimentoController.getProcedimentosPlano
);

// ==========================================================================
// NOVAS ROTAS - PLANO DE TRATAMENTO
// ==========================================================================

/**
 * @route   GET /atendimentos/plano/:planoId/procedimentos-pendentes
 * @desc    Listar procedimentos pendentes de agendamento
 * @access  Private (Requer permissão: ATENDIMENTOS.visualizar)
 */
router.get(
  "/plano/:planoId/procedimentos-pendentes",
  autorizar(Modulo.ATENDIMENTOS, "visualizar"),
  validate({
    params: Joi.object({
      planoId: idSchema,
    }),
  }),
  AtendimentoController.getProcedimentosPendentes
);

// ==========================================================================
// ROTAS DE ESCRITA - REQUER PERMISSÃO DE CRIAR/ALTERAR
// ==========================================================================

/**
 * @route   POST /atendimentos
 * @desc    Criar atendimento (AVULSO, AVALIACAO ou PLANO_TRATAMENTO)
 * @access  Private (Requer permissão: ATENDIMENTOS.criarAlterar)
 */
router.post(
  "/",
  autorizar(Modulo.ATENDIMENTOS, "criarAlterar"),
  validate({ body: createAtendimentoSchema }),
  AtendimentoController.create
);

/**
 * @route   PUT /atendimentos/:id
 * @desc    Atualizar atendimento
 * @access  Private (Requer permissão: ATENDIMENTOS.criarAlterar)
 */
router.put(
  "/:id",
  autorizar(Modulo.ATENDIMENTOS, "criarAlterar"),
  validate({
    params: Joi.object({ id: idSchema }),
    body: updateAtendimentoSchema,
  }),
  AtendimentoController.update
);

/**
 * @route   PATCH /atendimentos/:id/toggle-status
 * @desc    Alternar status do agendamento (COMPARECEU/MARCADO)
 * @access  Private (Requer permissão: ATENDIMENTOS.criarAlterar)
 */
router.patch(
  "/:id/toggle-status",
  autorizar(Modulo.ATENDIMENTOS, "criarAlterar"),
  validate({ params: Joi.object({ id: idSchema }) }),
  AtendimentoController.toggleStatus
);

// ==========================================================================
// NOVAS ROTAS - LINK DE APROVAÇÃO (AUTENTICADO)
// ==========================================================================

/**
 * @route   POST /atendimentos/:id/link-aprovacao
 * @desc    Gerar link de aprovação
 * @access  Private (Requer permissão: ATENDIMENTOS.criarAlterar)
 */
router.post(
  "/:id/link-aprovacao",
  autorizar(Modulo.ATENDIMENTOS, "criarAlterar"),
  validate({
    params: Joi.object({ id: idSchema }),
    body: Joi.object({
      expiresInDays: Joi.number().integer().min(1).max(30).optional(),
    }),
  }),
  AtendimentoController.gerarLinkAprovacao
);

/**
 * @route   POST /atendimentos/:id/link-aprovacao/whatsapp
 * @desc    Enviar link via WhatsApp
 * @access  Private (Requer permissão: ATENDIMENTOS.criarAlterar)
 */
router.post(
  "/:id/link-aprovacao/whatsapp",
  autorizar(Modulo.ATENDIMENTOS, "criarAlterar"),
  validate({
    params: Joi.object({ id: idSchema }),
  }),
  AtendimentoController.enviarLinkAprovacaoWhatsApp
);

// ==========================================================================
// NOVAS ROTAS - AGENDAR PROCEDIMENTO DO PLANO
// ==========================================================================

/**
 * @route   POST /atendimentos/plano/:planoId/procedimento/:procedimentoId/agendar
 * @desc    Agendar procedimento do plano
 * @access  Private (Requer permissão: ATENDIMENTOS.criarAlterar)
 */
router.post(
  "/plano/:planoId/procedimento/:procedimentoId/agendar",
  autorizar(Modulo.ATENDIMENTOS, "criarAlterar"),
  validate({
    params: Joi.object({
      planoId: idSchema,
      procedimentoId: idSchema,
    }),
    body: Joi.object({
      agendamentoId: idSchema.required(),
    }),
  }),
  AtendimentoController.agendarProcedimentoPlano
);

// ==========================================================================
// ROTAS DE AVALIAÇÃO - REQUER PERMISSÃO DE CRIAR/ALTERAR
// ==========================================================================

/**
 * @route   POST /atendimentos/:id/aprovar
 * @desc    Aprovar avaliação e criar plano de tratamento
 * @access  Private (Requer permissão: ATENDIMENTOS.criarAlterar)
 */
router.post(
  "/:id/aprovar",
  autorizar(Modulo.ATENDIMENTOS, "criarAlterar"),
  validate({
    params: Joi.object({ id: idSchema }),
    body: aprovarAvaliacaoSchema,
  }),
  AtendimentoController.aprovarAvaliacao
);

/**
 * @route   POST /atendimentos/:id/reprovar
 * @desc    Reprovar avaliação
 * @access  Private (Requer permissão: ATENDIMENTOS.criarAlterar)
 */
router.post(
  "/:id/reprovar",
  autorizar(Modulo.ATENDIMENTOS, "criarAlterar"),
  validate({
    params: Joi.object({ id: idSchema }),
    body: reprovarAvaliacaoSchema,
  }),
  AtendimentoController.reprovarAvaliacao
);

// ==========================================================================
// ROTAS DE PROGRESSO DE PROCEDIMENTO - REQUER PERMISSÃO DE CRIAR/ALTERAR
// ==========================================================================

/**
 * @route   PATCH /atendimentos/procedimento/:procedimentoPlanoId/progresso
 * @desc    Atualizar progresso de procedimento do plano
 * @access  Private (Requer permissão: ATENDIMENTOS.criarAlterar)
 */
router.patch(
  "/procedimento/:procedimentoPlanoId/progresso",
  autorizar(Modulo.ATENDIMENTOS, "criarAlterar"),
  validate({
    params: Joi.object({ procedimentoPlanoId: idSchema }),
    body: updateProgressoProcedimentoSchema,
  }),
  AtendimentoController.updateProgressoProcedimento
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

/**
 * @route   DELETE /atendimentos/:id
 * @desc    Excluir atendimento
 * @access  Private (Requer permissão: ATENDIMENTOS.cancelar)
 */
router.delete(
  "/:id",
  autorizar(Modulo.ATENDIMENTOS, "cancelar"),
  validate({ params: Joi.object({ id: idSchema }) }),
  AtendimentoController.delete
);

export default router;
