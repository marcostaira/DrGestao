// backend/src/modules/atendimentos/controllers/link-aprovacao.controller.ts

import { Request, Response } from "express";
import { LinkAprovacaoService } from "../services/link-aprovacao.service";
import { ApiResponse } from "../../../types";

export class LinkAprovacaoController {
  // Validar token (público)
  static async validateToken(req: Request, res: Response) {
    try {
      const { token } = req.params;

      const dados = await LinkAprovacaoService.validarToken(token);

      const response: ApiResponse = {
        success: true,
        data: dados,
      };

      res.json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao validar token",
      };
      res.status(error.statusCode || 500).json(response);
    }
  }

  // Aprovar avaliação (público)
  static async aprovar(req: Request, res: Response) {
    try {
      const { token } = req.params;
      const { aprovadoPor } = req.body;

      const resultado = await LinkAprovacaoService.aprovarAvaliacao(
        token,
        aprovadoPor
      );

      const response: ApiResponse = {
        success: true,
        data: resultado,
        message: "Avaliação aprovada e plano de tratamento criado com sucesso!",
      };

      res.json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao aprovar avaliação",
      };
      res.status(error.statusCode || 400).json(response);
    }
  }
}
