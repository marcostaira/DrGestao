// backend/src/modules/whatsapp/whatsapp.router.ts

import { Router } from "express";
import { whatsappController } from "./whatsapp.controller";
import { authenticate } from "../../middleware/auth";
import { validateTenant } from "../../middleware/tenant";
import { validateRequest } from "../../middleware/validation";
import { whatsappValidation } from "./whatsapp.validation";

const router = Router();

// Aplicar middlewares de autenticação e tenant em todas as rotas (exceto webhook)
const authAndTenantMiddleware = (req: any, res: any, next: any) => {
  // Webhook não precisa de autenticação
  if (req.path === "/webhook") {
    return next();
  }

  // Aplicar autenticação e tenant
  authenticate(req, res, (err?: any) => {
    if (err) return next(err);
    validateTenant(req, res, next);
  });
};

router.use(authAndTenantMiddleware);

// ============================================================================
// ROTAS DE CONEXÃO
// ============================================================================

/**
 * @route   POST /api/whatsapp/inicializar
 * @desc    Inicializar conexão WhatsApp e obter QR Code
 * @access  Private (Admin)
 */
router.post(
  "/inicializar",
  whatsappController.inicializarConexao.bind(whatsappController)
);

/**
 * @route   GET /api/whatsapp/status
 * @desc    Verificar status da conexão WhatsApp
 * @access  Private (Admin/Secretária)
 */
router.get(
  "/status",
  whatsappController.verificarStatus.bind(whatsappController)
);

/**
 * @route   POST /api/whatsapp/desconectar
 * @desc    Desconectar WhatsApp
 * @access  Private (Admin)
 */
router.post(
  "/desconectar",
  whatsappController.desconectar.bind(whatsappController)
);

// ============================================================================
// ROTAS DE TEMPLATES
// ============================================================================

/**
 * @route   GET /api/whatsapp/templates
 * @desc    Buscar templates configurados
 * @access  Private (Admin)
 */
router.get(
  "/templates",
  whatsappController.buscarTemplates.bind(whatsappController)
);

/**
 * @route   PUT /api/whatsapp/templates
 * @desc    Atualizar templates
 * @access  Private (Admin)
 */
router.put(
  "/templates",
  validateRequest(whatsappValidation.atualizarTemplates),
  whatsappController.atualizarTemplates.bind(whatsappController)
);

// ============================================================================
// ROTAS DE ENVIO
// ============================================================================

/**
 * @route   POST /api/whatsapp/enviar-confirmacao
 * @desc    Enviar confirmação para um agendamento
 * @access  Private (Admin/Secretária)
 */
router.post(
  "/enviar-confirmacao",
  validateRequest(whatsappValidation.enviarConfirmacao),
  whatsappController.enviarConfirmacao.bind(whatsappController)
);

/**
 * @route   POST /api/whatsapp/enviar-confirmacao-lote
 * @desc    Enviar confirmações em lote
 * @access  Private (Admin/Secretária)
 */
router.post(
  "/enviar-confirmacao-lote",
  validateRequest(whatsappValidation.enviarConfirmacaoEmLote),
  whatsappController.enviarConfirmacaoEmLote.bind(whatsappController)
);

// ============================================================================
// ROTAS DE ESTATÍSTICAS E HISTÓRICO
// ============================================================================

/**
 * @route   GET /api/whatsapp/estatisticas
 * @desc    Buscar estatísticas de mensagens
 * @access  Private (Admin/Secretária)
 */
router.get(
  "/estatisticas",
  whatsappController.buscarEstatisticas.bind(whatsappController)
);

/**
 * @route   GET /api/whatsapp/historico
 * @desc    Buscar histórico de mensagens
 * @access  Private (Admin/Secretária)
 * @query   dataInicio, dataFim, agendamentoId
 */
router.get(
  "/historico",
  whatsappController.buscarHistorico.bind(whatsappController)
);

// ============================================================================
// ROTAS DE CONFIGURAÇÃO
// ============================================================================

/**
 * @route   GET /api/whatsapp/configuracao
 * @desc    Buscar configuração do WhatsApp
 * @access  Private (Admin/Secretária)
 */
router.get(
  "/configuracao",
  whatsappController.buscarConfiguracao.bind(whatsappController)
);

/**
 * @route   PUT /api/whatsapp/ativar
 * @desc    Ativar/Desativar WhatsApp
 * @access  Private (Admin)
 */
router.put(
  "/ativar",
  whatsappController.ativarDesativar.bind(whatsappController)
);

// ============================================================================
// WEBHOOK (PÚBLICO)
// ============================================================================

/**
 * @route   POST /api/whatsapp/webhook
 * @desc    Webhook para receber eventos da Evolution API
 * @access  Public (mas validado pela Evolution API)
 */
router.post(
  "/webhook",
  whatsappController.handleWebhook.bind(whatsappController)
);

export default router;
