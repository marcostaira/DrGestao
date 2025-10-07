// backend/src/modules/whatsapp/whatsapp.router.ts

import { Router } from "express";
import { whatsappController } from "./whatsapp.controller";
import { authenticate } from "../../middleware/auth";

const router = Router();

// Todas as rotas requerem autenticação
router.use(authenticate);

/**
 * @route   POST /api/whatsapp/inicializar
 * @desc    Inicializar conexão WhatsApp
 * @access  Private
 */
router.post("/inicializar", whatsappController.inicializarConexao);

/**
 * @route   GET /api/whatsapp/qrcode/:instanceName
 * @desc    Buscar novo QR Code sem recriar instância
 * @access  Private
 */
router.get("/qrcode/:instanceName", whatsappController.buscarNovoQRCode);

/**
 * @route   GET /api/whatsapp/status
 * @desc    Verificar status da conexão
 * @access  Private
 */
router.get("/status", whatsappController.verificarStatus);

/**
 * @route   POST /api/whatsapp/desconectar
 * @desc    Desconectar WhatsApp
 * @access  Private
 */
router.post("/desconectar", whatsappController.desconectar);

/**
 * @route   GET /api/whatsapp/templates
 * @desc    Buscar templates de mensagens
 * @access  Private
 */
router.get("/templates", whatsappController.buscarTemplates);

/**
 * @route   PUT /api/whatsapp/templates
 * @desc    Atualizar templates de mensagens
 * @access  Private
 */
router.put("/templates", whatsappController.atualizarTemplates);

/**
 * @route   POST /api/whatsapp/enviar-confirmacao
 * @desc    Enviar confirmação para um agendamento
 * @access  Private
 */
router.post("/enviar-confirmacao", whatsappController.enviarConfirmacao);

/**
 * @route   POST /api/whatsapp/enviar-lote
 * @desc    Enviar confirmações em lote
 * @access  Private
 */
router.post("/enviar-lote", whatsappController.enviarConfirmacaoEmLote);

/**
 * @route   GET /api/whatsapp/estatisticas
 * @desc    Buscar estatísticas
 * @access  Private
 */
router.get("/estatisticas", whatsappController.buscarEstatisticas);

/**
 * @route   GET /api/whatsapp/historico
 * @desc    Buscar histórico de mensagens
 * @access  Private
 */
router.get("/historico", whatsappController.buscarHistorico);

/**
 * @route   POST /api/whatsapp/webhook
 * @desc    Webhook para receber eventos da Evolution API
 * @access  Public (mas validado pela Evolution)
 */
router.post("/webhook", whatsappController.handleWebhook);

/**
 * @route   GET /api/whatsapp/config
 * @desc    Buscar configuração
 * @access  Private
 */
router.get("/config", whatsappController.buscarConfiguracao);

/**
 * @route   PUT /api/whatsapp/ativar
 * @desc    Ativar/Desativar WhatsApp
 * @access  Private
 */
router.put("/ativar", whatsappController.ativarDesativar);

export default router;
