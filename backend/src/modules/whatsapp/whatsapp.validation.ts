// backend/src/modules/whatsapp/whatsapp.validation.ts

import Joi from "joi";

export const whatsappValidation = {
  // Inicializar conexão
  inicializarConexao: Joi.object({
    // Sem body necessário - usa tenantId do middleware
  }),

  // Atualizar templates
  atualizarTemplates: Joi.object({
    templateConfirmacao: Joi.string().min(10).max(1000).optional(),
    templateConfirmado: Joi.string().min(5).max(500).optional(),
    templateReagendar: Joi.string().min(5).max(500).optional(),
    templateOpcaoInvalida: Joi.string().min(5).max(500).optional(),
    horasAntecedencia: Joi.number().integer().min(1).max(168).optional(), // Máximo 7 dias
    enviarLinkAnamnese: Joi.boolean().optional(),
    formularioId: Joi.string().optional().allow(null, ""),
  }),

  // Enviar confirmação
  enviarConfirmacao: Joi.object({
    agendamentoId: Joi.string().required(),
  }),

  // Enviar confirmação em lote
  enviarConfirmacaoEmLote: Joi.object({
    agendamentoIds: Joi.array().items(Joi.string()).min(1).max(100).required(),
  }),

  // Buscar histórico
  buscarHistorico: Joi.object({
    dataInicio: Joi.date().optional(),
    dataFim: Joi.date().optional(),
    agendamentoId: Joi.string().optional(),
  }),

  // Webhook
  webhook: Joi.object({
    event: Joi.string().required(),
    instance: Joi.string().required(),
    data: Joi.object().required(),
  }),
};
