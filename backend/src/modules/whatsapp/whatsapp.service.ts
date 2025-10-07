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
        console.log(
          "📊 Dados completos da instância:",
          JSON.stringify(instanceData, null, 2)
        );

        // Normalizar o status
        const normalizedStatus = instanceData.connectionStatus?.toLowerCase();
        console.log("📊 Connection Status:", normalizedStatus);

        // Verificar se está conectado
        const isConnected =
          normalizedStatus === "open" || normalizedStatus === "connected";

        console.log("🔐 Está conectado?", isConnected);

        if (isConnected) {
          console.log("✅ WhatsApp CONECTADO!");

          // Extrair número do ownerJid (formato: 554188273161@s.whatsapp.net)
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

        // Se não está conectado, verificar se está conectando
        const isConnecting =
          normalizedStatus === "connecting" ||
          normalizedStatus === "close" ||
          normalizedStatus === "qr";

        console.log("⏳ Está conectando?", isConnecting);

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

        // Se der erro ao consultar a Evolution, marcar como desconectado
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
      console.error(error.stack);
      console.log("==========================================");

      // Em caso de erro, retornar o status atual do banco
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

      // Verificar se o paciente tem telefone
      if (!agendamento.paciente.telefone) {
        throw new Error("Paciente não possui telefone cadastrado");
      }

      // Montar mensagem com template
      let mensagem = config.templateConfirmacao
        .replace("{nome}", agendamento.paciente.nome)
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

      // Criar mensagem no banco
      const mensagemDb = await whatsappModel.createMensagem({
        tenantId,
        configId: config.id,
        agendamentoId: agendamento.id,
        pacienteId: agendamento.paciente.id,
        telefone: agendamento.paciente.telefone,
        mensagem,
        tipo: "CONFIRMACAO",
      });

      // Adicionar à fila
      this.queue.addToQueue(mensagemDb.id);

      return {
        success: true,
        mensagemId: mensagemDb.id,
        message: "Mensagem adicionada à fila de envio",
      };
    } catch (error: any) {
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
  // PROCESSAMENTO DE RESPOSTAS
  // ============================================================================

  async processarResposta(
    tenantId: string,
    telefone: string,
    mensagemRecebida: string
  ) {
    try {
      const config = await whatsappModel.findConfigByTenantId(tenantId);

      if (!config) {
        return { success: false, message: "Configuração não encontrada" };
      }

      // Buscar mensagem enviada nas últimas 24h
      const mensagemOriginal =
        await whatsappModel.findMensagemByTelefoneRecente(
          tenantId,
          telefone,
          config.horasAntecedencia
        );

      if (!mensagemOriginal) {
        console.log(`Nenhuma mensagem recente encontrada para ${telefone}`);
        return {
          success: false,
          message: "Nenhuma mensagem recente encontrada",
        };
      }

      // Verificar se já foi respondida
      if (mensagemOriginal.status === "RESPONDIDA") {
        console.log(`Mensagem já foi respondida para ${telefone}`);
        return { success: false, message: "Mensagem já foi respondida" };
      }

      // Processar resposta
      const respostaNormalizada = mensagemRecebida.trim();
      let mensagemResposta = "";
      let tipoResposta = "";
      let novoStatusAgendamento: "CONFIRMADO" | "CANCELADO" | "" = "";

      if (respostaNormalizada === "1") {
        // Confirmar
        mensagemResposta = config.templateConfirmado
          .replace(
            "{data}",
            new Date(mensagemOriginal.agendamento!.dataHora).toLocaleDateString(
              "pt-BR"
            )
          )
          .replace(
            "{hora}",
            new Date(mensagemOriginal.agendamento!.dataHora).toLocaleTimeString(
              "pt-BR",
              { hour: "2-digit", minute: "2-digit" }
            )
          );

        tipoResposta = "RESPOSTA_CONFIRMADO";
        novoStatusAgendamento = "CONFIRMADO";
      } else if (respostaNormalizada === "2") {
        // Reagendar
        mensagemResposta = config.templateReagendar;
        tipoResposta = "RESPOSTA_REAGENDAR";
        novoStatusAgendamento = "CANCELADO";
      } else {
        // Opção inválida
        mensagemResposta = config.templateOpcaoInvalida;
        tipoResposta = "RESPOSTA_INVALIDA";
      }

      // Atualizar mensagem original
      await whatsappModel.updateMensagem(mensagemOriginal.id, {
        respostaRecebida: mensagemRecebida,
        respostaEm: new Date(),
        status: "RESPONDIDA",
      });

      // Atualizar status do agendamento se necessário
      if (novoStatusAgendamento && mensagemOriginal.agendamentoId) {
        await prisma.agendamento.update({
          where: { id: mensagemOriginal.agendamentoId },
          data: { status: novoStatusAgendamento },
        });
      }

      // Criar mensagem de resposta
      const mensagemRespostaDb = await whatsappModel.createMensagem({
        tenantId,
        configId: config.id,
        agendamentoId: mensagemOriginal.agendamentoId || undefined,
        pacienteId: mensagemOriginal.pacienteId,
        telefone,
        mensagem: mensagemResposta,
        tipo: tipoResposta,
      });

      // Adicionar à fila para envio
      this.queue.addToQueue(mensagemRespostaDb.id);

      // Incrementar contador de mensagens recebidas
      await whatsappModel.incrementMensagensRecebidas(tenantId);

      return {
        success: true,
        tipoResposta,
        novoStatusAgendamento,
      };
    } catch (error: any) {
      console.error("Erro ao processar resposta:", error);
      throw new Error(`Erro ao processar resposta: ${error.message}`);
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
        // Enviar mensagem via Evolution API
        await evolutionService.sendTextMessage(config.instanceName, {
          number: mensagem.telefone,
          text: mensagem.mensagem,
        });

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

  iniciarProcessamentoFila() {
    setInterval(async () => {
      await this.processarFila();
    }, 1000); // Processa a cada 1 segundo (conforme requisito)
  }
}

export const whatsappService = new WhatsAppService();
