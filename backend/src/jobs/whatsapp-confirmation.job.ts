// backend/src/jobs/whatsapp-confirmation.job.ts

import cron from "node-cron";
import { whatsappService } from "../modules/whatsapp/whatsapp.service";
import { prisma } from "@/config/database";


export class WhatsAppConfirmationJob {
  private cronJob: cron.ScheduledTask | null = null;

  // Iniciar job (executar a cada hora)
  start() {
    console.log("🚀 Iniciando job de confirmação automática...");

    // Executar a cada hora
    this.cronJob = cron.schedule("0 * * * *", async () => {
      await this.processConfirmations();
    });

    // Também processar a fila a cada segundo
    whatsappService.iniciarProcessamentoFila();

    console.log("✅ Job de confirmação automática iniciado");
  }

  // Parar job
  stop() {
    if (this.cronJob) {
      this.cronJob.stop();
      console.log("Job de confirmação automática parado");
    }
  }

  // Processar confirmações
  async processConfirmations() {
    try {
      console.log("🔍 Processando confirmações automáticas...");

      // Buscar todos os tenants com WhatsApp ativo
      const configs = await prisma.whatsAppConfig.findMany({
        where: {
          ativo: true,
          status: "CONNECTED",
        },
      });

      console.log(`📊 ${configs.length} tenant(s) com WhatsApp ativo`);

      for (const config of configs) {
        await this.processTenanConfirmations(config);
      }

      console.log("✅ Processamento de confirmações concluído");
    } catch (error: any) {
      console.error("❌ Erro ao processar confirmações:", error);
    }
  }

  // Processar confirmações de um tenant
  private async processTenanConfirmations(config: any) {
    try {
      const { tenantId, horasAntecedencia } = config;

      // Calcular data/hora de referência
      const dataReferencia = new Date();
      dataReferencia.setHours(dataReferencia.getHours() + horasAntecedencia);

      // Margem de 1 hora (para executar apenas na hora certa)
      const dataInicio = new Date(dataReferencia);
      dataInicio.setHours(dataInicio.getHours() - 1);

      const dataFim = new Date(dataReferencia);
      dataFim.setHours(dataFim.getHours() + 1);

      // Buscar agendamentos que precisam de confirmação
      const agendamentos = await prisma.agendamento.findMany({
        where: {
          tenantId,
          dataHora: {
            gte: dataInicio,
            lte: dataFim,
          },
          status: "MARCADO", // Apenas os marcados (não confirmados ainda)
        },
        include: {
          paciente: true,
          whatsappMensagens: true,
        },
      });

      console.log(
        `📅 ${agendamentos.length} agendamento(s) encontrado(s) para ${tenantId}`
      );

      for (const agendamento of agendamentos) {
        // Verificar se já foi enviada confirmação
        const jaEnviada = agendamento.whatsappMensagens.some(
          (msg: any) => msg.tipo === "CONFIRMACAO" && msg.status !== "ERRO"
        );

        if (jaEnviada) {
          console.log(
            `⏭️  Confirmação já enviada para agendamento ${agendamento.id}`
          );
          continue;
        }

        // Verificar se paciente existe
        if (!agendamento.paciente) {
          console.log(
            `⚠️  Agendamento ${agendamento.id} sem paciente vinculado`
          );
          continue;
        }

        const paciente = agendamento.paciente;

        // Verificar se paciente tem telefone
        if (!paciente.telefone) {
          console.log(`⚠️  Paciente ${paciente.nome} não possui telefone`);
          continue;
        }

        // Enviar confirmação
        try {
          await whatsappService.enviarConfirmacao(tenantId, agendamento.id);
          console.log(
            `✅ Confirmação enviada para agendamento ${agendamento.id}`
          );
        } catch (error: any) {
          console.error(
            `❌ Erro ao enviar confirmação para ${agendamento.id}:`,
            error.message
          );
        }
      }
    } catch (error: any) {
      console.error(`❌ Erro ao processar tenant ${config.tenantId}:`, error);
    }
  }

  // Executar imediatamente (para testes)
  async runNow() {
    console.log("🔥 Executando job manualmente...");
    await this.processConfirmations();
  }
}

export const whatsappConfirmationJob = new WhatsAppConfirmationJob();
