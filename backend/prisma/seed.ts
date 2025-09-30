import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed dos planos...");

  // Criar Planos
  const planoBasico = await prisma.plano.upsert({
    where: { slug: "basico" },
    update: {},
    create: {
      nome: "Básico",
      slug: "basico",
      descricao: "Plano ideal para profissionais autônomos",
      profissionaisAtivos: 1,
      usuarios: 2,
      agendamentosMes: 100,
      pacientes: 50,
      armazenamentoMB: 100,
      whatsappAtivo: false,
      googleCalendarSync: false,
      valorMensal: 49.9,
      valorAnual: 499.0,
      ativo: true,
    },
  });

  const planoPremium = await prisma.plano.upsert({
    where: { slug: "premium" },
    update: {},
    create: {
      nome: "Premium",
      slug: "premium",
      descricao: "Plano completo para clínicas pequenas e médias",
      profissionaisAtivos: 3,
      usuarios: 5,
      agendamentosMes: 500,
      pacientes: 200,
      armazenamentoMB: 500,
      whatsappAtivo: true,
      googleCalendarSync: true,
      valorMensal: 149.9,
      valorAnual: 1499.0,
      ativo: true,
    },
  });

  const planoEnterprise = await prisma.plano.upsert({
    where: { slug: "enterprise" },
    update: {},
    create: {
      nome: "Enterprise",
      slug: "enterprise",
      descricao: "Plano ilimitado para grandes clínicas e redes",
      profissionaisAtivos: 999999, // Valor alto para representar "ilimitado"
      usuarios: 999999,
      agendamentosMes: 999999,
      pacientes: 999999,
      armazenamentoMB: 999999,
      whatsappAtivo: true,
      googleCalendarSync: true,
      valorMensal: 499.9,
      valorAnual: 4999.0,
      ativo: true,
    },
  });

  console.log("✅ Planos criados:", {
    basico: planoBasico.id,
    premium: planoPremium.id,
    enterprise: planoEnterprise.id,
  });

  // Atualizar tenants existentes para usar o plano básico
  const planoBasicoId = planoBasico.id;

  const tenantsExistentes = await prisma.tenant.findMany({
    select: { id: true },
  });

  if (tenantsExistentes.length > 0) {
    console.log(
      `📝 Atualizando ${tenantsExistentes.length} tenant(s) existente(s)...`
    );

    for (const tenant of tenantsExistentes) {
      await prisma.tenant.update({
        where: { id: tenant.id },
        data: { planoId: planoBasicoId },
      });
    }

    console.log("✅ Tenants atualizados com plano básico");
  }

  console.log("🎉 Seed concluído!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
