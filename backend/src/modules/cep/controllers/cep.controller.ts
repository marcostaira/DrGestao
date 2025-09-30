import { Response } from "express";
import { AuthenticatedRequest, ApiResponse } from "../../../types";
import { ViaCepService } from "../services/viaCep.service";

export class CepController {
  static async buscarCep(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const { cep } = req.params;

      const endereco = await ViaCepService.buscarCep(cep);

      if (!endereco) {
        const response: ApiResponse = {
          success: false,
          error: "CEP não encontrado",
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: {
          cep: ViaCepService.formatarCep(endereco.cep),
          logradouro: endereco.logradouro,
          complemento: endereco.complemento,
          bairro: endereco.bairro,
          cidade: endereco.localidade,
          estado: endereco.uf,
        },
      };

      res.json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Erro ao buscar CEP",
      };
      res.status(500).json(response);
    }
  }
}
