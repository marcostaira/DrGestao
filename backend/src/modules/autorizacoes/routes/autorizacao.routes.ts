import { Router } from "express";
import { AutorizacaoController } from "../controllers/autorizacao.controller";
import { authenticate, adminOnly } from "../../../middleware/auth";
import { validate } from "../../../middleware/validation";
import Joi from "joi";

// ============================================================================
// AUTORIZACAO ROUTES
// ============================================================================

const router = Router();

// ==========================================================================
// SCHEMAS DE VALIDAÇÃO
// ==========================================================================

const moduloEnum = [
  "PACIENTES",
  "PROFISSIONAIS",
  "PROCEDIMENTOS",
  "AGENDA",
  "ATENDIMENTOS",
  "WHATSAPP",
  "USUARIOS",
  "RELATORIOS",
];

const autorizacaoSchema = Joi.object({
  modulo: Joi.string()
    .valid(...moduloEnum)
    .required(),
  visualizar: Joi.boolean().required(),
  criarAlterar: Joi.boolean().required(),
});

const updateAutorizacoesSchema = Joi.object({
  autorizacoes: Joi.array().items(autorizacaoSchema).min(1).required(),
});

const criarAutorizacoesIniciaisSchema = Joi.object({
  usuarioId: Joi.string().required(),
  tipo: Joi.string().valid("ADMIN", "SECRETARIA").required(),
});

// ==========================================================================
// ROTAS PROTEGIDAS (Requer autenticação)
// ==========================================================================

// Buscar minhas autorizações
router.get(
  "/minhas",
  authenticate,
  AutorizacaoController.getMinhasAutorizacoes
);

// ==========================================================================
// ROTAS ADMIN (Requer autenticação + admin)
// ==========================================================================

// Listar todos os usuários com autorizações
router.get(
  "/usuarios",
  authenticate,
  adminOnly,
  AutorizacaoController.listarUsuariosComAutorizacoes
);

// Buscar autorizações de um usuário específico
router.get(
  "/usuarios/:usuarioId",
  authenticate,
  adminOnly,
  AutorizacaoController.getAutorizacoesUsuario
);

// Atualizar autorizações de um usuário
router.put(
  "/usuarios/:usuarioId",
  authenticate,
  adminOnly,
  validate({ body: updateAutorizacoesSchema }),
  AutorizacaoController.atualizarAutorizacoes
);

// Criar autorizações iniciais (usado ao criar novo usuário)
router.post(
  "/criar-iniciais",
  authenticate,
  adminOnly,
  validate({ body: criarAutorizacoesIniciaisSchema }),
  AutorizacaoController.criarAutorizacoesIniciais
);

export default router;
