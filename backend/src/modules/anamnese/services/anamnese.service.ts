import { prisma } from "../../../config/database";
import { AppError } from "../../../middleware/errorHandler";
import {
  CreateAnamneseData,
  UpdateAnamneseData,
  CampoFormulario,
  TipoCampoFormulario,
  RespostaAnamnese,
} from "../../../types";
import { Prisma } from "../../../../generated/prisma";

export class AnamneseService {
  // ==========================================================================
  // CREATE
  // ==========================================================================

  static async create(tenantId: string, data: CreateAnamneseData) {
    // Validar paciente
    const paciente = await prisma.paciente.findFirst({
      where: {
        id: data.pacienteId,
        tenantId,
      },
    });

    if (!paciente) {
      throw new AppError("Paciente não encontrado", 404);
    }

    // Validar formulário
    const formulario = await prisma.formulario.findFirst({
      where: {
        id: data.formularioId,
        tenantId,
        ativo: true,
      },
    });

    if (!formulario) {
      throw new AppError("Formulário não encontrado ou inativo", 404);
    }

    // Validar atendimento se fornecido
    if (data.atendimentoId) {
      const atendimento = await prisma.atendimento.findFirst({
        where: {
          id: data.atendimentoId,
          tenantId,
          pacienteId: data.pacienteId,
        },
      });

      if (!atendimento) {
        throw new AppError("Atendimento não encontrado", 404);
      }
    }

    // Validar respostas contra campos do formulário
    const campos = formulario.campos as unknown as CampoFormulario[];
    this.validarRespostas(campos, data.respostas);

    const anamnese = await prisma.anamnese.create({
      data: {
        tenantId,
        pacienteId: data.pacienteId,
        formularioId: data.formularioId,
        atendimentoId: data.atendimentoId,
        respostas: data.respostas as unknown as Prisma.InputJsonValue,
        observacoes: data.observacoes,
      },
      include: {
        formulario: {
          select: {
            id: true,
            nome: true,
            descricao: true,
            campos: true,
          },
        },
        paciente: {
          select: {
            id: true,
            nome: true,
          },
        },
        atendimento: {
          select: {
            id: true,
            createdAt: true,
          },
        },
      },
    });

    return {
      ...anamnese,
      respostas: anamnese.respostas as unknown as RespostaAnamnese,
      formulario: {
        ...anamnese.formulario,
        campos: anamnese.formulario.campos as unknown as CampoFormulario[],
      },
    };
  }

  // ==========================================================================
  // GET BY ID
  // ==========================================================================

  static async getById(tenantId: string, id: string) {
    const anamnese = await prisma.anamnese.findFirst({
      where: {
        id,
        tenantId,
      },
      include: {
        formulario: {
          select: {
            id: true,
            nome: true,
            descricao: true,
            campos: true,
          },
        },
        paciente: {
          select: {
            id: true,
            nome: true,
            telefone: true,
          },
        },
        atendimento: {
          select: {
            id: true,
            createdAt: true,
            anotacoes: true,
          },
        },
      },
    });

    if (!anamnese) {
      throw new AppError("Anamnese não encontrada", 404);
    }

    return {
      ...anamnese,
      respostas: anamnese.respostas as unknown as RespostaAnamnese,
      formulario: {
        ...anamnese.formulario,
        campos: anamnese.formulario.campos as unknown as CampoFormulario[],
      },
    };
  }

  // ==========================================================================
  // LIST BY PACIENTE
  // ==========================================================================

  static async listByPaciente(tenantId: string, pacienteId: string) {
    const paciente = await prisma.paciente.findFirst({
      where: {
        id: pacienteId,
        tenantId,
      },
    });

    if (!paciente) {
      throw new AppError("Paciente não encontrado", 404);
    }

    const anamneses = await prisma.anamnese.findMany({
      where: {
        tenantId,
        pacienteId,
      },
      include: {
        formulario: {
          select: {
            id: true,
            nome: true,
            campos: true,
          },
        },
        atendimento: {
          select: {
            id: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return anamneses.map((a) => ({
      ...a,
      respostas: a.respostas as unknown as RespostaAnamnese,
      formulario: {
        ...a.formulario,
        campos: a.formulario.campos as unknown as CampoFormulario[],
      },
    }));
  }

  // ==========================================================================
  // LIST BY FORMULARIO
  // ==========================================================================

  static async listByFormulario(tenantId: string, formularioId: string) {
    const formulario = await prisma.formulario.findFirst({
      where: {
        id: formularioId,
        tenantId,
      },
    });

    if (!formulario) {
      throw new AppError("Formulário não encontrado", 404);
    }

    const anamneses = await prisma.anamnese.findMany({
      where: {
        tenantId,
        formularioId,
      },
      include: {
        paciente: {
          select: {
            id: true,
            nome: true,
          },
        },
        atendimento: {
          select: {
            id: true,
            createdAt: true,
          },
        },
        formulario: {
          select: {
            campos: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return anamneses.map((a) => ({
      ...a,
      respostas: a.respostas as unknown as RespostaAnamnese,
      formulario: {
        campos: a.formulario.campos as unknown as CampoFormulario[],
      },
    }));
  }

  // ==========================================================================
  // UPDATE
  // ==========================================================================

  static async update(tenantId: string, id: string, data: UpdateAnamneseData) {
    const anamneseExistente = await this.getById(tenantId, id);

    // Se respostas foram fornecidas, validar contra campos do formulário
    if (data.respostas) {
      const campos = anamneseExistente.formulario.campos;
      this.validarRespostas(campos, data.respostas);
    }

    const updateData: any = {};
    if (data.respostas)
      updateData.respostas = data.respostas as unknown as Prisma.InputJsonValue;
    if (data.observacoes !== undefined)
      updateData.observacoes = data.observacoes;

    const anamnese = await prisma.anamnese.update({
      where: { id },
      data: updateData,
      include: {
        formulario: {
          select: {
            id: true,
            nome: true,
            descricao: true,
            campos: true,
          },
        },
        paciente: {
          select: {
            id: true,
            nome: true,
          },
        },
        atendimento: {
          select: {
            id: true,
            createdAt: true,
          },
        },
      },
    });

    return {
      ...anamnese,
      respostas: anamnese.respostas as unknown as RespostaAnamnese,
      formulario: {
        ...anamnese.formulario,
        campos: anamnese.formulario.campos as unknown as CampoFormulario[],
      },
    };
  }

  // ==========================================================================
  // DELETE
  // ==========================================================================

  static async delete(tenantId: string, id: string) {
    await this.getById(tenantId, id);

    await prisma.anamnese.delete({
      where: { id },
    });
  }

  // ==========================================================================
  // VALIDAR RESPOSTAS
  // ==========================================================================

  private static validarRespostas(
    campos: CampoFormulario[],
    respostas: RespostaAnamnese
  ): void {
    // Verificar campos obrigatórios
    const camposObrigatorios = campos.filter((c) => c.obrigatorio);

    for (const campo of camposObrigatorios) {
      const resposta = respostas[campo.id];

      if (resposta === undefined || resposta === null || resposta === "") {
        throw new AppError(
          `Campo obrigatório não preenchido: ${campo.label}`,
          400
        );
      }
    }

    // Validar tipos e formatos
    for (const campoId in respostas) {
      const campo = campos.find((c) => c.id === campoId);

      if (!campo) {
        throw new AppError(`Campo ${campoId} não existe no formulário`, 400);
      }

      const resposta = respostas[campoId];

      // Pular validação se não obrigatório e vazio
      if (!campo.obrigatorio && (resposta === null || resposta === "")) {
        continue;
      }

      // Validações por tipo
      switch (campo.tipo) {
        case TipoCampoFormulario.NUMERO: {
          if (isNaN(Number(resposta))) {
            throw new AppError(`Campo ${campo.label} deve ser um número`, 400);
          }
          if (campo.validacao?.min && Number(resposta) < campo.validacao.min) {
            throw new AppError(
              `Campo ${campo.label} deve ser maior ou igual a ${campo.validacao.min}`,
              400
            );
          }
          if (campo.validacao?.max && Number(resposta) > campo.validacao.max) {
            throw new AppError(
              `Campo ${campo.label} deve ser menor ou igual a ${campo.validacao.max}`,
              400
            );
          }
          break;
        }

        case TipoCampoFormulario.EMAIL: {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(resposta)) {
            throw new AppError(
              `Campo ${campo.label} deve ser um email válido`,
              400
            );
          }
          break;
        }

        case TipoCampoFormulario.TELEFONE: {
          const telefoneRegex = /^\d{10,11}$/;
          if (!telefoneRegex.test(resposta.replace(/\D/g, ""))) {
            throw new AppError(
              `Campo ${campo.label} deve ser um telefone válido`,
              400
            );
          }
          break;
        }

        case TipoCampoFormulario.DATA: {
          if (isNaN(Date.parse(resposta))) {
            throw new AppError(
              `Campo ${campo.label} deve ser uma data válida`,
              400
            );
          }
          break;
        }

        case TipoCampoFormulario.SELECAO:
        case TipoCampoFormulario.RADIO: {
          if (campo.opcoes && !campo.opcoes.includes(resposta)) {
            throw new AppError(`Campo ${campo.label}: opção inválida`, 400);
          }
          break;
        }

        case TipoCampoFormulario.MULTIPLA_ESCOLHA: {
          if (!Array.isArray(resposta)) {
            throw new AppError(`Campo ${campo.label} deve ser um array`, 400);
          }
          if (campo.opcoes) {
            for (const opcao of resposta) {
              if (!campo.opcoes.includes(opcao)) {
                throw new AppError(
                  `Campo ${campo.label}: opção "${opcao}" inválida`,
                  400
                );
              }
            }
          }
          break;
        }

        case TipoCampoFormulario.SIM_NAO: {
          if (typeof resposta !== "boolean") {
            throw new AppError(
              `Campo ${campo.label} deve ser verdadeiro ou falso`,
              400
            );
          }
          break;
        }
      }

      // Validação com regex personalizado
      if (campo.validacao?.regex && typeof resposta === "string") {
        const regex = new RegExp(campo.validacao.regex);
        if (!regex.test(resposta)) {
          throw new AppError(
            campo.validacao.mensagem ||
              `Campo ${campo.label} está em formato inválido`,
            400
          );
        }
      }
    }
  }
}
