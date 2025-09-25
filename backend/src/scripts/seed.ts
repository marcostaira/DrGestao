import { PrismaClient, TipoUsuario } from "../../src/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Criar Tenant de exemplo
  console.log("📦 Creating demo tenant...");
  const demoTenant = await prisma.tenant.create({
    data: {
      nome: "Clínica Demo",
      plano: "basico",
      ativo: true,
    },
  });

  // Criar usuário admin
  console.log("👤 Creating admin user...");
  const hashedPasswordAdmin = await bcrypt.hash("admin123", 10);
  const adminUser = await prisma.usuario.create({
    data: {
      tenantId: demoTenant.id,
      nome: "Administrador Demo",
      email: "admin@demo.com",
      senha: hashedPasswordAdmin,
      tipo: TipoUsuario.ADMIN,
      ativo: true,
    },
  });

  // Criar usuário secretária
  console.log("👤 Creating secretary user...");
  const hashedPasswordSecretary = await bcrypt.hash("secretaria123", 10);
  const secretaryUser = await prisma.usuario.create({
    data: {
      tenantId: demoTenant.id,
      nome: "Secretária Demo",
      email: "secretaria@demo.com",
      senha: hashedPasswordSecretary,
      tipo: TipoUsuario.SECRETARIA,
      ativo: true,
    },
  });

  // Criar profissional de exemplo
  console.log("👨‍⚕️ Creating demo professional...");
  const demoProfessional = await prisma.profissional.create({
    data: {
      tenantId: demoTenant.id,
      nome: "Dr. João Silva",
      especialidade: "Odontologia",
      observacoes: "Especialista em implantes",
      ativo: true,
    },
  });

  // Criar alguns pacientes de exemplo
  console.log("🏥 Creating demo patients...");
  const demoPatients = await prisma.paciente.createMany({
    data: [
      {
        tenantId: demoTenant.id,
        profissionalId: demoProfessional.id,
        nome: "Maria Santos",
        telefone: "11987654321",
        email: "maria@email.com",
        observacoes: "Paciente regular",
      },
      {
        tenantId: demoTenant.id,
        profissionalId: demoProfessional.id,
        nome: "Pedro Oliveira",
        telefone: "11976543210",
        observacoes: "Primeira consulta agendada",
      },
      {
        tenantId: demoTenant.id,
        nome: "Ana Costa",
        telefone: "11965432109",
        email: "ana@email.com",
      },
    ],
  });

  // Criar procedimentos de exemplo
  console.log("🦷 Creating demo procedures...");
  await prisma.procedimento.createMany({
    data: [
      {
        tenantId: demoTenant.id,
        nome: "Consulta",
        valor: 150.0,
        duracaoMinutos: 30,
      },
      {
        tenantId: demoTenant.id,
        nome: "Limpeza",
        valor: 200.0,
        duracaoMinutos: 45,
      },
      {
        tenantId: demoTenant.id,
        nome: "Extração",
        valor: 300.0,
        duracaoMinutos: 60,
      },
      {
        tenantId: demoTenant.id,
        nome: "Canal",
        valor: 800.0,
        duracaoMinutos: 90,
      },
    ],
  });

  console.log("✅ Seed completed successfully!");
  console.log("\n📊 Created resources:");
  console.log(`  - Tenant: ${demoTenant.nome} (${demoTenant.id})`);
  console.log(`  - Admin: ${adminUser.email} / Password: admin123`);
  console.log(
    `  - Secretary: ${secretaryUser.email} / Password: secretaria123`
  );
  console.log(`  - Professional: ${demoProfessional.nome}`);
  console.log(`  - ${demoPatients.count} Patients`);
  console.log("  - 4 Procedures\n");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error during seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
