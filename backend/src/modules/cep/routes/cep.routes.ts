import { Router } from "express";
import { CepController } from "../controllers/cep.controller";
import { authenticate } from "../../../middleware/auth";

const router = Router();

router.use(authenticate);

/**
 * @route   GET /cep/:cep
 * @desc    Buscar endereço por CEP
 * @access  Private
 */
router.get("/:cep", CepController.buscarCep);

export default router;
