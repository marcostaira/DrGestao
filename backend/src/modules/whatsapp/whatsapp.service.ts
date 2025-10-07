// backend/src/modules/whatsapp/whatsapp.service.ts

import { whatsappModel } from "./whatsapp.model";
import { evolutionService } from "../../config/evolution.config";
import { WhatsAppQueue } from "./whatsapp.queue";
import { prisma } from "../../config/database";

export class WhatsAppService {
  private queue: WhatsAppQueue;

  constructor() {
    this.queue = new WhatsAppQueue();
  }

  // ============================================================================
  // CONEXÃO E CONFIGURAÇÃO
  // ============================================================================

  async inicializarConexao(tenantId: string) {
    try {
      let config = await whatsappModel.findConfigByTenantId(tenantId);

      if (!config) {
        config = await whatsappModel.createConfig({
          tenantId,
          instanceName: `tenant_${tenantId}`,
        });
      }

      const instanceName = config.instanceName || `tenant_${tenantId}`;

      console.log("🔌 Conectando à Evolution API...");
      console.log("Instance:", instanceName);

      // PRIMEIRO: Verificar se a instância já existe e está conectada
      try {
        const statusCheck = await evolutionService.getInstanceStatus(
          instanceName
        );

        if (statusCheck.connectionStatus === "open") {
          console.log("✅ Instância já está conectada!");

          // Buscar informações do perfil
          const profileInfo = await evolutionService.getProfileInfo(
            instanceName
          );
          const contacts = await evolutionService.fetchContacts(instanceName);
          const chats = await evolutionService.fetchChats(instanceName);

          // Atualizar config
          await whatsappModel.updateConfig(tenantId, {
            status: "CONNECTED",
            phoneNumber: profileInfo.number || null,
            profileName: profileInfo.name || null,
            totalContacts: contacts?.length || 0,
            totalChats: chats?.length || 0,
          });

          return {
            success: true,
            message: "WhatsApp já está conectado",
            alreadyConnected: true,
          };
        }
      } catch (statusError) {
        console.log(
          "⚠️ Instância não existe ou não está conectada, criando nova..."
        );
      }

      const webhookUrl = `${
        process.env.API_URL || "http://localhost:3001"
      }/api/whatsapp/webhook`;

      const createPayload = {
        instanceName,
        qrcode: true,
        integration: "WHATSAPP-BAILEYS",
        webhookUrl,
        webhookByEvents: true,
        webhookBase64: false,
        webhookEvents: [
          "MESSAGES_UPSERT",
          "CONNECTION_UPDATE",
          "QRCODE_UPDATED",
        ],
      };

      try {
        await evolutionService.createInstance(createPayload);
        console.log("✅ Instância criada");
      } catch (createError: any) {
        const errorData = createError.errorData || {};
        const errorMessage = createError.message || "";
        const responseMessages = errorData.response?.message || [];

        const messagesString = Array.isArray(responseMessages)
          ? responseMessages.join(" ").toLowerCase()
          : "";

        const alreadyExists =
          errorMessage.toLowerCase().includes("already in use") ||
          messagesString.includes("already in use");

        if (alreadyExists) {
          console.log("♻️ Instância já existe, deletando...");

          try {
            await evolutionService.deleteInstance(instanceName);
            console.log("✅ Deletada");

            await new Promise((resolve) => setTimeout(resolve, 3000));

            console.log("🔄 Recriando...");
            await evolutionService.createInstance(createPayload);
            console.log("✅ Recriada!");
          } catch (deleteError: any) {
            console.error("❌ Erro ao deletar:", deleteError.message);
          }
        } else {
          throw createError;
        }
      }

      // Buscar QR Code
      console.log("📱 Buscando QR Code...");
      const qrData = await evolutionService.fetchQRCode(instanceName);

      // Atualizar config
      const updatedConfig = await whatsappModel.updateConfig(tenantId, {
        instanceName,
        qrCode: qrData.qrcode.base64,
        status: "CONNECTING",
      });

      console.log("✅ QR Code gerado!");

      return {
        success: true,
        qrCode: qrData.qrcode.base64,
        instanceName,
        config: updatedConfig,
      };
    } catch (error: any) {
      console.error("❌ Erro fatal:", error.message);
      throw new Error(error.message || "Erro ao inicializar conexão");
    }
  }

  async verificarStatus(tenantId: string) {
    try {
      console.log("==========================================");
      console.log("🔍 VERIFICANDO STATUS DO WHATSAPP");
      console.log("Tenant ID:", tenantId);
      console.log("==========================================");

      const config = await whatsappModel.findConfigByTenantId(tenantId);

      if (!config || !config.instanceName) {
        console.log("⚠️ Config não encontrada ou sem instanceName");
        return {
          status: "DISCONNECTED",
          message: "Instância não configurada",
        };
      }

      console.log("📱 Instance Name:", config.instanceName);
      console.log("📊 Status atual no banco:", config.status);

      try {
        // Buscar instância completa com todas as informações
        console.log("🔍 Buscando informações completas da instância...");
        const instances = await evolutionService.fetchInstances(
          config.instanceName
        );

        if (!instances || instances.length === 0) {
          console.log("⚠️ Instância não encontrada na Evolution API");

          await whatsappModel.updateConfig(tenantId, {
            status: "DISCONNECTED",
          });

          return {
            status: "DISCONNECTED",
            message: "Instância não encontrada",
          };
        }

        const instanceData = instances[0];
        console.log("📊 Connection Status:", instanceData.connectionStatus);

        // Verificar se está conectado
        const isConnected =
          instanceData.connectionStatus?.toLowerCase() === "open";

        console.log("🔐 Está conectado?", isConnected);

        if (isConnected) {
          console.log("✅ WhatsApp CONECTADO!");

          // ========================================================================
          // CONFIGURAR WEBHOOK E SETTINGS QUANDO CONECTAR
          // ========================================================================

          const webhookUrl = `${
            process.env.API_URL || "http://localhost:3001"
          }/api/whatsapp/webhook`;

          try {
            console.log("🔧 Configurando webhook e settings...");

            // Configurar webhook
            await evolutionService.configureWebhook(
              config.instanceName,
              webhookUrl
            );

            // Configurar settings (não ignorar grupos para receber mensagens)
            await evolutionService.updateSettings(config.instanceName, {
              reject_call: false,
              groups_ignore: false, // IMPORTANTE: false para receber mensagens
              always_online: false,
              read_messages: false, // false para não marcar como lido automaticamente
              read_status: false,
            });

            console.log("✅ Webhook e settings configurados!");
          } catch (webhookError) {
            console.error(
              "⚠️ Erro ao configurar webhook/settings (não crítico):",
              webhookError
            );
          }

          // ========================================================================

          // Extrair número do ownerJid
          let phoneNumber = instanceData.number;
          if (!phoneNumber && instanceData.ownerJid) {
            phoneNumber = instanceData.ownerJid.split("@")[0];
          }

          const profileName = instanceData.profileName;
          const totalContacts = instanceData._count?.Contact || 0;
          const totalChats = instanceData._count?.Chat || 0;

          console.log("📱 Informações extraídas:");
          console.log("  - Telefone:", phoneNumber);
          console.log("  - Nome:", profileName);
          console.log("  - Contatos:", totalContacts);
          console.log("  - Chats:", totalChats);

          // Atualizar config no banco
          await whatsappModel.updateConfig(tenantId, {
            status: "CONNECTED",
            phoneNumber,
            profileName,
            totalContacts,
            totalChats,
          });

          console.log("✅ Status atualizado para CONNECTED no banco");
          console.log("==========================================");

          return {
            status: "CONNECTED",
            phoneNumber,
            profileName,
            totalContacts,
            totalChats,
          };
        }

        // Se não está conectado
        const isConnecting =
          instanceData.connectionStatus?.toLowerCase() === "connecting" ||
          instanceData.connectionStatus?.toLowerCase() === "close" ||
          instanceData.connectionStatus?.toLowerCase() === "qr";

        let newStatus: "CONNECTING" | "DISCONNECTED" = isConnecting
          ? "CONNECTING"
          : "DISCONNECTED";

        await whatsappModel.updateConfig(tenantId, {
          status: newStatus,
        });

        console.log(`📊 Status atualizado para ${newStatus} no banco`);
        console.log("==========================================");

        return {
          status: newStatus,
          message: "Status atualizado",
          connectionStatus: instanceData.connectionStatus,
        };
      } catch (evolutionError: any) {
        console.error(
          "❌ Erro ao consultar Evolution API:",
          evolutionError.message
        );

        await whatsappModel.updateConfig(tenantId, {
          status: "DISCONNECTED",
        });

        console.log("==========================================");

        return {
          status: "DISCONNECTED",
          message: `Erro ao verificar: ${evolutionError.message}`,
        };
      }
    } catch (error: any) {
      console.error("❌ Erro GERAL ao verificar status:", error);
      console.log("==========================================");

      try {
        const config = await whatsappModel.findConfigByTenantId(tenantId);
        return {
          status: config?.status || "DISCONNECTED",
          message: `Erro ao verificar status: ${error.message}`,
        };
      } catch {
        return {
          status: "DISCONNECTED",
          message: `Erro crítico: ${error.message}`,
        };
      }
    }
  }

  async desconectar(tenantId: string) {
    try {
      const config = await whatsappModel.findConfigByTenantId(tenantId);

      if (!config || !config.instanceName) {
        throw new Error("Instância não encontrada");
      }

      // Desconectar no Evolution
      await evolutionService.logoutInstance(config.instanceName);

      // Atualizar no banco
      await whatsappModel.updateConfig(tenantId, {
        status: "DISCONNECTED",
        qrCode: null,
        phoneNumber: null,
        profileName: null,
        totalContacts: 0,
        totalChats: 0,
        ativo: false,
      });

      return {
        success: true,
        message: "Desconectado com sucesso",
      };
    } catch (error: any) {
      throw new Error(`Erro ao desconectar: ${error.message}`);
    }
  }

  // ============================================================================
  // TEMPLATES
  // ============================================================================

  async atualizarTemplates(
    tenantId: string,
    templates: {
      templateConfirmacao?: string;
      templateConfirmado?: string;
      templateReagendar?: string;
      templateOpcaoInvalida?: string;
      horasAntecedencia?: number;
      enviarLinkAnamnese?: boolean;
      formularioId?: string;
    }
  ) {
    try {
      const config = await whatsappModel.updateConfig(tenantId, templates);

      return {
        success: true,
        config,
      };
    } catch (error: any) {
      throw new Error(`Erro ao atualizar templates: ${error.message}`);
    }
  }

  async buscarTemplates(tenantId: string) {
    try {
      let config = await whatsappModel.findConfigByTenantId(tenantId);

      // Se não existir config, criar uma padrão
      if (!config) {
        config = await whatsappModel.createConfig({
          tenantId,
          instanceName: `tenant_${tenantId}`,
        });
      }

      return {
        templateConfirmacao: config.templateConfirmacao,
        templateConfirmado: config.templateConfirmado,
        templateReagendar: config.templateReagendar,
        templateOpcaoInvalida: config.templateOpcaoInvalida,
        horasAntecedencia: config.horasAntecedencia,
        enviarLinkAnamnese: config.enviarLinkAnamnese,
        formularioId: config.formularioId,
      };
    } catch (error: any) {
      console.error("Erro ao buscar templates:", error);
      throw new Error(`Erro ao buscar templates: ${error.message}`);
    }
  }

  // ============================================================================
  // ENVIO DE MENSAGENS
  // ============================================================================

  async enviarConfirmacao(tenantId: string, agendamentoId: string) {
    try {
      const config = await whatsappModel.findConfigByTenantId(tenantId);

      if (!config || config.status !== "CONNECTED") {
        throw new Error("WhatsApp não está conectado");
      }

      // ============================================================================
      // VERIFICAR SE JÁ FOI ENVIADA CONFIRMAÇÃO RECENTEMENTE (últimas 24h)
      // ============================================================================

      const vinteCuatroHorasAtras = new Date();
      vinteCuatroHorasAtras.setHours(vinteCuatroHorasAtras.getHours() - 24);

      const mensagemExistente = await prisma.whatsAppMensagem.findFirst({
        where: {
          tenantId,
          agendamentoId,
          tipo: "CONFIRMACAO",
          status: {
            in: ["PENDENTE", "ENVIADA", "RESPONDIDA"],
          },
          createdAt: {
            gte: vinteCuatroHorasAtras,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (mensagemExistente) {
        console.log(
          "⚠️ Já existe confirmação enviada recentemente para este agendamento"
        );
        throw new Error(
          "Já foi enviada uma confirmação para este agendamento nas últimas 24 horas"
        );
      }

      // Buscar agendamento com relacionamentos
      const agendamento = await prisma.agendamento.findUnique({
        where: { id: agendamentoId, tenantId },
        include: {
          paciente: true,
          profissional: true,
          procedimento: true,
        },
      });

      if (!agendamento) {
        throw new Error("Agendamento não encontrado");
      }

      // Verificar se o paciente existe
      if (!agendamento.paciente) {
        throw new Error("Agendamento sem paciente vinculado");
      }

      const paciente = agendamento.paciente;

      if (!paciente.telefone) {
        throw new Error("Paciente não possui telefone cadastrado");
      }

      // ============================================================================
      // LIMPAR E FORMATAR O TELEFONE
      // ============================================================================

      let telefone = paciente.telefone.replace(/\D/g, ""); // Remove tudo que não é número

      console.log("📱 Telefone original:", paciente.telefone);
      console.log("📱 Telefone limpo:", telefone);

      // Adicionar código do país se não tiver (Brasil = 55)
      if (!telefone.startsWith("55")) {
        telefone = "55" + telefone;
      }

      console.log("📱 Telefone com código país:", telefone);
      console.log("📱 Tamanho do telefone:", telefone.length);

      // O formato correto para WhatsApp é: 5511944604292@s.whatsapp.net
      const numeroFormatado = `${telefone}@s.whatsapp.net`;

      console.log("📱 Número formatado final:", numeroFormatado);

      // ============================================================================
      // MONTAR MENSAGEM
      // ============================================================================

      let mensagem = config.templateConfirmacao
        .replace("{nome}", paciente.nome)
        .replace(
          "{data}",
          new Date(agendamento.dataHora).toLocaleDateString("pt-BR")
        )
        .replace(
          "{hora}",
          new Date(agendamento.dataHora).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })
        )
        .replace("{profissional}", agendamento.profissional.nome);

      // Se configurado, adicionar link da anamnese
      if (config.enviarLinkAnamnese && config.formularioId) {
        const linkAnamnese = `${
          process.env.FRONTEND_URL || "http://localhost:3000"
        }/anamnese/${agendamento.id}`;
        mensagem += `\n\n📋 Preencha sua anamnese: ${linkAnamnese}`;
      }

      console.log("📝 Mensagem montada:", mensagem.substring(0, 100) + "...");

      // ============================================================================
      // SALVAR NO BANCO COM TELEFONE FORMATADO
      // ============================================================================

      const mensagemDb = await whatsappModel.createMensagem({
        tenantId,
        configId: config.id,
        agendamentoId: agendamento.id,
        pacienteId: paciente.id,
        telefone: numeroFormatado,
        mensagem,
        tipo: "CONFIRMACAO",
      });

      console.log("💾 Mensagem salva no banco com ID:", mensagemDb.id);

      // Adicionar à fila
      this.queue.addToQueue(mensagemDb.id);
      console.log("📬 Mensagem adicionada à fila");

      return {
        success: true,
        mensagemId: mensagemDb.id,
        message: "Mensagem adicionada à fila de envio",
      };
    } catch (error: any) {
      console.error("❌ Erro ao enviar confirmação:", error);
      throw new Error(`Erro ao enviar confirmação: ${error.message}`);
    }
  }

  async enviarConfirmacaoEmLote(tenantId: string, agendamentoIds: string[]) {
    try {
      const resultados: Array<{
        agendamentoId: string;
        success: boolean;
        mensagemId?: string;
        error?: string;
      }> = [];

      for (const agendamentoId of agendamentoIds) {
        try {
          const resultado = await this.enviarConfirmacao(
            tenantId,
            agendamentoId
          );
          resultados.push({
            agendamentoId,
            success: true,
            mensagemId: resultado.mensagemId,
          });
        } catch (error: any) {
          resultados.push({
            agendamentoId,
            success: false,
            error: error.message,
          });
        }
      }

      return {
        success: true,
        resultados,
        total: agendamentoIds.length,
        enviados: resultados.filter((r) => r.success).length,
        erros: resultados.filter((r) => !r.success).length,
      };
    } catch (error: any) {
      throw new Error(`Erro ao enviar confirmações em lote: ${error.message}`);
    }
  }

  // ============================================================================
  // ESTATÍSTICAS
  // ============================================================================

  async buscarEstatisticas(tenantId: string) {
    try {
      const stats = await whatsappModel.getEstatisticas(tenantId);
      const config = await whatsappModel.findConfigByTenantId(tenantId);

      return {
        ...stats,
        status: config?.status || "DISCONNECTED",
        phoneNumber: config?.phoneNumber,
        profileName: config?.profileName,
        ativo: config?.ativo || false,
      };
    } catch (error: any) {
      throw new Error(`Erro ao buscar estatísticas: ${error.message}`);
    }
  }

  async buscarHistoricoMensagens(
    tenantId: string,
    dataInicio?: Date,
    dataFim?: Date,
    agendamentoId?: string
  ) {
    try {
      if (agendamentoId) {
        return await whatsappModel.findMensagensByAgendamento(agendamentoId);
      }

      if (dataInicio && dataFim) {
        return await whatsappModel.findMensagensByPeriodo(
          tenantId,
          dataInicio,
          dataFim
        );
      }

      // Se não especificou período, buscar últimos 30 dias
      const fim = new Date();
      const inicio = new Date();
      inicio.setDate(inicio.getDate() - 30);

      return await whatsappModel.findMensagensByPeriodo(tenantId, inicio, fim);
    } catch (error: any) {
      throw new Error(`Erro ao buscar histórico: ${error.message}`);
    }
  }

  // ============================================================================
  // FILA DE ENVIO
  // ============================================================================

  async processarFila() {
    try {
      const mensagemId = this.queue.getNext();

      if (!mensagemId) {
        return null;
      }

      const mensagem = await whatsappModel.findMensagemById(mensagemId);

      if (!mensagem) {
        this.queue.removeFromQueue(mensagemId);
        return null;
      }

      const config = await whatsappModel.findConfigByTenantId(
        mensagem.tenantId
      );

      if (!config || !config.instanceName || config.status !== "CONNECTED") {
        await whatsappModel.updateMensagem(mensagem.id, {
          status: "ERRO",
          erroMensagem: "WhatsApp não está conectado",
        });
        this.queue.removeFromQueue(mensagemId);
        return null;
      }

      try {
        console.log("📤 Processando mensagem da fila...");
        console.log("Instance:", config.instanceName);
        console.log("Número:", mensagem.telefone);
        console.log("Mensagem:", mensagem.mensagem.substring(0, 50) + "...");

        // Enviar mensagem via Evolution API
        await evolutionService.sendTextMessage(config.instanceName, {
          number: mensagem.telefone,
          text: mensagem.mensagem,
        });

        console.log("✅ Mensagem enviada com sucesso!");

        // Atualizar status
        await whatsappModel.updateMensagem(mensagem.id, {
          status: "ENVIADA",
          enviadaEm: new Date(),
        });

        // Incrementar contador
        await whatsappModel.incrementMensagensEnviadas(mensagem.tenantId);

        this.queue.removeFromQueue(mensagemId);

        return {
          success: true,
          mensagemId: mensagem.id,
        };
      } catch (error: any) {
        console.error("❌ Erro ao enviar mensagem:", error.message);

        await whatsappModel.updateMensagem(mensagem.id, {
          status: "ERRO",
          tentativas: mensagem.tentativas + 1,
          erroMensagem: error.message,
        });

        this.queue.removeFromQueue(mensagemId);

        return {
          success: false,
          mensagemId: mensagem.id,
          error: error.message,
        };
      }
    } catch (error: any) {
      console.error("Erro ao processar fila:", error);
      return null;
    }
  }

  async processarResposta(
    tenantId: string,
    telefone: string,
    mensagem: string
  ) {
    try {
      console.log("==========================================");
      console.log("🔄 PROCESSANDO RESPOSTA DO PACIENTE");
      console.log("==========================================");
      console.log("Tenant ID:", tenantId);
      console.log("Telefone:", telefone);
      console.log("Mensagem:", mensagem);

      // Buscar mensagem pendente para este telefone
      const mensagemPendente = await prisma.whatsAppMensagem.findFirst({
        where: {
          tenantId,
          telefone: telefone,
          tipo: "CONFIRMACAO",
          status: {
            in: ["ENVIADA", "PENDENTE"],
          },
          respostaRecebida: null,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          agendamento: true,
          paciente: true,
          config: true,
        },
      });

      console.log(
        "📋 Mensagem pendente encontrada:",
        mensagemPendente ? "SIM" : "NÃO"
      );

      if (!mensagemPendente) {
        console.log(
          "⚠️ Nenhuma mensagem pendente encontrada para este telefone"
        );
        console.log("Telefone buscado:", telefone);

        // Buscar TODAS as mensagens deste telefone para debug
        const todasMensagens = await prisma.whatsAppMensagem.findMany({
          where: {
            tenantId,
            telefone: telefone,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
        });

        console.log(
          "🔍 Últimas 5 mensagens deste telefone:",
          JSON.stringify(todasMensagens, null, 2)
        );
        console.log("==========================================");
        return;
      }

      console.log("📌 ID da mensagem:", mensagemPendente.id);
      console.log("📌 Agendamento ID:", mensagemPendente.agendamentoId);
      console.log(
        "📌 Status atual do agendamento:",
        mensagemPendente.agendamento?.status
      );

      const config = mensagemPendente.config;

      // Normalizar resposta (remover espaços, pontos, vírgulas)
      const respostaNormalizada = mensagem.trim().replace(/[.,\s]/g, "");

      console.log("✨ Resposta normalizada:", respostaNormalizada);

      let mensagemResposta = "";
      let novoStatus: "CONFIRMADO" | "REAGENDAR" | null = null;

      // Processar resposta
      if (
        respostaNormalizada === "1" ||
        respostaNormalizada.toLowerCase() === "sim"
      ) {
        console.log("✅ Paciente CONFIRMOU!");

        mensagemResposta = config.templateConfirmado
          .replace("{nome}", mensagemPendente.paciente?.nome || "")
          .replace(
            "{data}",
            new Date(
              mensagemPendente.agendamento?.dataHora || ""
            ).toLocaleDateString("pt-BR")
          )
          .replace(
            "{hora}",
            new Date(
              mensagemPendente.agendamento?.dataHora || ""
            ).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })
          );

        novoStatus = "CONFIRMADO";
        console.log("🎯 Novo status será: CONFIRMADO");
      } else if (
        respostaNormalizada === "2" ||
        respostaNormalizada.toLowerCase() === "nao" ||
        respostaNormalizada.toLowerCase() === "não"
      ) {
        console.log("🔄 Paciente quer REAGENDAR!");

        mensagemResposta = config.templateReagendar.replace(
          "{nome}",
          mensagemPendente.paciente?.nome || ""
        );

        novoStatus = "REAGENDAR";
        console.log("🎯 Novo status será: REAGENDAR");
      } else {
        console.log("❓ Resposta INVÁLIDA!");
        console.log("Resposta recebida:", respostaNormalizada);

        mensagemResposta = config.templateOpcaoInvalida;

        // Atualizar mensagem mas não atualizar o agendamento
        await whatsappModel.updateMensagem(mensagemPendente.id, {
          status: "RESPONDIDA",
          respostaRecebida: mensagem,
          respostaEm: new Date(),
        });

        // Enviar mensagem de opção inválida
        await this.enviarMensagemDireta(tenantId, telefone, mensagemResposta);

        console.log("📤 Mensagem de opção inválida enviada");
        console.log("==========================================");
        return;
      }

      console.log(
        "📝 Mensagem de resposta:",
        mensagemResposta.substring(0, 50) + "..."
      );
      console.log("📊 Novo status definido:", novoStatus);

      // Atualizar mensagem
      console.log("💾 Atualizando mensagem no banco...");
      await whatsappModel.updateMensagem(mensagemPendente.id, {
        status: "RESPONDIDA",
        respostaRecebida: mensagem,
        respostaEm: new Date(),
      });
      console.log("✅ Mensagem atualizada no banco");

      // Atualizar status do agendamento
      if (novoStatus && mensagemPendente.agendamentoId) {
        console.log("💾 Atualizando status do agendamento...");
        console.log("Agendamento ID:", mensagemPendente.agendamentoId);
        console.log("Novo Status:", novoStatus);

        try {
          const agendamentoAtualizado = await prisma.agendamento.update({
            where: {
              id: mensagemPendente.agendamentoId,
            },
            data: {
              status: novoStatus,
            },
          });

          console.log("✅ Agendamento atualizado com sucesso!");
          console.log("Status anterior:", mensagemPendente.agendamento?.status);
          console.log("Status novo:", agendamentoAtualizado.status);
        } catch (updateError: any) {
          console.error("❌ ERRO ao atualizar agendamento:", updateError);
          console.error("Mensagem de erro:", updateError.message);
          console.error("Stack:", updateError.stack);
        }
      } else {
        console.log("⚠️ Não atualizou o agendamento:");
        console.log("- novoStatus:", novoStatus);
        console.log("- agendamentoId:", mensagemPendente.agendamentoId);
      }

      // Enviar mensagem de resposta
      console.log("📤 Enviando mensagem de resposta ao paciente...");
      await this.enviarMensagemDireta(tenantId, telefone, mensagemResposta);

      console.log("✅ Mensagem de resposta enviada!");
      console.log("==========================================");
    } catch (error: any) {
      console.error("❌ ERRO GERAL ao processar resposta:", error);
      console.error("Mensagem:", error.message);
      console.error("Stack:", error.stack);
      console.log("==========================================");
    }
  }

  private async enviarMensagemDireta(
    tenantId: string,
    telefone: string,
    mensagem: string
  ) {
    try {
      const config = await whatsappModel.findConfigByTenantId(tenantId);

      if (!config || !config.instanceName) {
        throw new Error("Configuração do WhatsApp não encontrada");
      }

      await evolutionService.sendTextMessage(config.instanceName, {
        number: telefone,
        text: mensagem,
      });

      // Incrementar contador
      await whatsappModel.incrementMensagensEnviadas(tenantId);
    } catch (error: any) {
      console.error("Erro ao enviar mensagem direta:", error);
      throw error;
    }
  }

  async reconfigurarWebhook(tenantId: string) {
    try {
      console.log("==========================================");
      console.log("🔧 RECONFIGURANDO WEBHOOK E SETTINGS");
      console.log("Tenant ID:", tenantId);
      console.log("==========================================");

      const config = await whatsappModel.findConfigByTenantId(tenantId);

      if (!config || !config.instanceName) {
        throw new Error("Configuração do WhatsApp não encontrada");
      }

      if (config.status !== "CONNECTED") {
        throw new Error("WhatsApp não está conectado");
      }

      const webhookUrl = `${
        process.env.API_URL || "http://localhost:3001"
      }/api/whatsapp/webhook`;

      console.log("📡 Webhook URL:", webhookUrl);
      console.log("📱 Instance:", config.instanceName);

      // Configurar webhook
      await evolutionService.configureWebhook(config.instanceName, webhookUrl);
      console.log("✅ Webhook configurado");

      // Tentar configurar settings (não crítico)
      try {
        console.log("⚙️ Tentando configurar settings...");
        await evolutionService.updateSettings(config.instanceName, {
          reject_call: false,
          groups_ignore: true,
          always_online: false,
          read_messages: false,
          read_status: false,
        });
        console.log("✅ Settings configurados");
      } catch (settingsError: any) {
        console.log("⚠️ Não foi possível configurar settings (não crítico)");
        console.log(
          "⚠️ Você pode configurar manualmente no painel da Evolution se necessário"
        );
        // Não lançar erro, settings é opcional
      }

      console.log("==========================================");

      return {
        success: true,
        message:
          "Webhook configurado com sucesso! Agora você receberá as respostas dos pacientes.",
        webhookUrl,
      };
    } catch (error: any) {
      console.error("❌ Erro ao reconfigurar webhook:", error);
      throw new Error(`Erro ao reconfigurar: ${error.message}`);
    }
  }

  iniciarProcessamentoFila() {
    setInterval(async () => {
      await this.processarFila();
    }, 1000); // Processa a cada 1 segundo (conforme requisito)
  }
}

export const whatsappService = new WhatsAppService();
