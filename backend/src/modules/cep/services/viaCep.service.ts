import axios from "axios";

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export class ViaCepService {
  private static readonly BASE_URL = "https://viacep.com.br/ws";

  static async buscarCep(cep: string): Promise<ViaCepResponse | null> {
    try {
      // Remove caracteres não numéricos
      const cepLimpo = cep.replace(/\D/g, "");

      // Valida formato do CEP
      if (cepLimpo.length !== 8) {
        throw new Error("CEP inválido");
      }

      const response = await axios.get<ViaCepResponse>(
        `${this.BASE_URL}/${cepLimpo}/json/`,
        {
          timeout: 5000,
        }
      );

      // ViaCEP retorna erro: true quando o CEP não existe
      if (response.data.erro) {
        return null;
      }

      return response.data;
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      return null;
    }
  }

  static formatarCep(cep: string): string {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length === 8) {
      return `${cepLimpo.slice(0, 5)}-${cepLimpo.slice(5)}`;
    }
    return cep;
  }
}
