import api from "@/lib/api";

export interface EnderecoViaCep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export const buscarCep = async (cep: string): Promise<EnderecoViaCep> => {
  const cepLimpo = cep.replace(/\D/g, "");
  const response = await api.get(`/cep/${cepLimpo}`);
  return response.data.data;
};

export const formatarCep = (cep: string): string => {
  const cepLimpo = cep.replace(/\D/g, "");
  if (cepLimpo.length === 8) {
    return `${cepLimpo.slice(0, 5)}-${cepLimpo.slice(5)}`;
  }
  return cep;
};

export const formatarCpf = (cpf: string): string => {
  const cpfLimpo = cpf.replace(/\D/g, "");
  if (cpfLimpo.length === 11) {
    return `${cpfLimpo.slice(0, 3)}.${cpfLimpo.slice(3, 6)}.${cpfLimpo.slice(
      6,
      9
    )}-${cpfLimpo.slice(9)}`;
  }
  return cpf;
};

export const calcularIdade = (dataNascimento: string): number => {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;
};

export const removeMask = (value: string): string => {
  return value.replace(/\D/g, "");
};
