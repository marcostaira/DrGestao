-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "public"."TipoUsuario" AS ENUM ('ADMIN', 'SECRETARIA');

-- CreateEnum
CREATE TYPE "public"."StatusAgendamento" AS ENUM ('MARCADO', 'CONFIRMADO', 'COMPARECEU', 'FALTOU', 'CANCELADO');

-- CreateEnum
CREATE TYPE "public"."TipoLog" AS ENUM ('LOGIN', 'LOGOUT', 'AGENDAMENTO_CRIADO', 'AGENDAMENTO_ATUALIZADO', 'AGENDAMENTO_CANCELADO', 'CONFIRMACAO_ENVIADA', 'CONFIRMACAO_RECEBIDA', 'SYNC_GOOGLE_CALENDAR', 'ERROR', 'CREATE', 'UPDATE', 'DELETE');

-- CreateTable
CREATE TABLE "public"."tenants" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "plano" TEXT NOT NULL DEFAULT 'basico',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."usuarios" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" "public"."TipoUsuario" NOT NULL DEFAULT 'SECRETARIA',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."profissionais" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "especialidade" TEXT,
    "observacoes" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profissionais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pacientes" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "profissional_id" TEXT,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT,
    "observacoes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."procedimentos" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "valor" DECIMAL(10,2),
    "duracao_minutos" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "procedimentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."agendamentos" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "paciente_id" TEXT,
    "profissional_id" TEXT NOT NULL,
    "procedimento_id" TEXT NOT NULL,
    "data_hora" TIMESTAMP(3) NOT NULL,
    "status" "public"."StatusAgendamento" NOT NULL DEFAULT 'MARCADO',
    "observacoes" TEXT,
    "confirmacao_enviada" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "data_hora_fim" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agendamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."atendimentos" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "agendamento_id" TEXT NOT NULL,
    "paciente_id" TEXT NOT NULL,
    "profissional_id" TEXT NOT NULL,
    "procedimento_id" TEXT NOT NULL,
    "anotacoes" TEXT,
    "procedimentos_realizados" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "atendimentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."whatsapp_config" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "template_confirmacao" TEXT NOT NULL DEFAULT 'Olá {nome}! Você tem consulta marcada para {data} às {hora}. Para confirmar, responda: 1=SIM ou 2=NÃO',
    "template_sim" TEXT NOT NULL DEFAULT 'Consulta confirmada! Nos vemos em {data} às {hora}.',
    "template_nao" TEXT NOT NULL DEFAULT 'Consulta cancelada. Entre em contato para reagendar.',
    "template_opcoes_invalidas" TEXT NOT NULL DEFAULT 'Resposta não reconhecida. Digite 1 para SIM ou 2 para NÃO.',
    "horas_antecedencia" INTEGER NOT NULL DEFAULT 24,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "whatsapp_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."logs_sistema" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "usuario_id" TEXT,
    "tipo" "public"."TipoLog" NOT NULL,
    "descricao" TEXT NOT NULL,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logs_sistema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "usuarios_tenant_id_email_idx" ON "public"."usuarios"("tenant_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_tenant_id_email_key" ON "public"."usuarios"("tenant_id", "email");

-- CreateIndex
CREATE INDEX "profissionais_tenant_id_ativo_idx" ON "public"."profissionais"("tenant_id", "ativo");

-- CreateIndex
CREATE INDEX "pacientes_tenant_id_nome_idx" ON "public"."pacientes"("tenant_id", "nome");

-- CreateIndex
CREATE INDEX "pacientes_tenant_id_telefone_idx" ON "public"."pacientes"("tenant_id", "telefone");

-- CreateIndex
CREATE INDEX "procedimentos_tenant_id_nome_idx" ON "public"."procedimentos"("tenant_id", "nome");

-- CreateIndex
CREATE INDEX "agendamentos_tenant_id_data_hora_idx" ON "public"."agendamentos"("tenant_id", "data_hora");

-- CreateIndex
CREATE INDEX "agendamentos_tenant_id_profissional_id_idx" ON "public"."agendamentos"("tenant_id", "profissional_id");

-- CreateIndex
CREATE INDEX "agendamentos_tenant_id_paciente_id_idx" ON "public"."agendamentos"("tenant_id", "paciente_id");

-- CreateIndex
CREATE UNIQUE INDEX "atendimentos_agendamento_id_key" ON "public"."atendimentos"("agendamento_id");

-- CreateIndex
CREATE INDEX "atendimentos_tenant_id_paciente_id_idx" ON "public"."atendimentos"("tenant_id", "paciente_id");

-- CreateIndex
CREATE INDEX "atendimentos_tenant_id_profissional_id_idx" ON "public"."atendimentos"("tenant_id", "profissional_id");

-- CreateIndex
CREATE UNIQUE INDEX "whatsapp_config_tenant_id_key" ON "public"."whatsapp_config"("tenant_id");

-- CreateIndex
CREATE INDEX "logs_sistema_tenant_id_tipo_idx" ON "public"."logs_sistema"("tenant_id", "tipo");

-- CreateIndex
CREATE INDEX "logs_sistema_tenant_id_created_at_idx" ON "public"."logs_sistema"("tenant_id", "created_at");

-- AddForeignKey
ALTER TABLE "public"."usuarios" ADD CONSTRAINT "usuarios_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."profissionais" ADD CONSTRAINT "profissionais_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pacientes" ADD CONSTRAINT "pacientes_profissional_id_fkey" FOREIGN KEY ("profissional_id") REFERENCES "public"."profissionais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pacientes" ADD CONSTRAINT "pacientes_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."procedimentos" ADD CONSTRAINT "procedimentos_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."agendamentos" ADD CONSTRAINT "agendamentos_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "public"."pacientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."agendamentos" ADD CONSTRAINT "agendamentos_procedimento_id_fkey" FOREIGN KEY ("procedimento_id") REFERENCES "public"."procedimentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."agendamentos" ADD CONSTRAINT "agendamentos_profissional_id_fkey" FOREIGN KEY ("profissional_id") REFERENCES "public"."profissionais"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."agendamentos" ADD CONSTRAINT "agendamentos_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."atendimentos" ADD CONSTRAINT "atendimentos_agendamento_id_fkey" FOREIGN KEY ("agendamento_id") REFERENCES "public"."agendamentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."atendimentos" ADD CONSTRAINT "atendimentos_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "public"."pacientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."atendimentos" ADD CONSTRAINT "atendimentos_procedimento_id_fkey" FOREIGN KEY ("procedimento_id") REFERENCES "public"."procedimentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."atendimentos" ADD CONSTRAINT "atendimentos_profissional_id_fkey" FOREIGN KEY ("profissional_id") REFERENCES "public"."profissionais"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."atendimentos" ADD CONSTRAINT "atendimentos_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."whatsapp_config" ADD CONSTRAINT "whatsapp_config_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable - Adicionar novos campos ao modelo Paciente
ALTER TABLE "pacientes" 
ADD COLUMN IF NOT EXISTS "cpf" TEXT,
ADD COLUMN IF NOT EXISTS "data_nascimento" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "telefone2" TEXT,
ADD COLUMN IF NOT EXISTS "cep" TEXT,
ADD COLUMN IF NOT EXISTS "logradouro" TEXT,
ADD COLUMN IF NOT EXISTS "numero" TEXT,
ADD COLUMN IF NOT EXISTS "complemento" TEXT,
ADD COLUMN IF NOT EXISTS "bairro" TEXT,
ADD COLUMN IF NOT EXISTS "cidade" TEXT,
ADD COLUMN IF NOT EXISTS "estado" VARCHAR(2),
ADD COLUMN IF NOT EXISTS "alergias" TEXT,
ADD COLUMN IF NOT EXISTS "menor_idade" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS "responsavel_nome" TEXT,
ADD COLUMN IF NOT EXISTS "responsavel_cpf" TEXT,
ADD COLUMN IF NOT EXISTS "responsavel_telefone" TEXT,
ADD COLUMN IF NOT EXISTS "responsavel_parentesco" TEXT;

-- CreateIndex - Adicionar índice para CPF
CREATE INDEX IF NOT EXISTS "pacientes_cpf_idx" ON "pacientes"("cpf");