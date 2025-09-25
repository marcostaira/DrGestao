# Sistema SaaS de Agendamentos

Sistema completo de agendamentos para clínicas odontológicas e profissionais liberais (fisioterapeutas, psicólogos, etc.) com arquitetura multitenant.

## 🚀 Características Principais

### Backend (Node.js + TypeScript)

- **Arquitetura Multitenant** com isolamento completo por tenant
- **API RESTful** com autenticação JWT
- **PostgreSQL** com Prisma ORM
- **Middleware de segurança** (Helmet, CORS, Rate Limiting)
- **Validação robusta** com Joi
- **Níveis de acesso** (Admin/Secretária)

### Frontend (Next.js + TypeScript)

- **Interface responsiva** com Tailwind CSS
- **Design mobile-first** com componentes adaptativos
- **Calendário interativo** para desktop e cards para mobile
- **Sistema de autenticação** completo
- **Estado global** gerenciado com SWR

### Integrações

- **WhatsApp** via Evolution API (confirmações automáticas)
- **Google Calendar** (sincronização bidirecional)
- **Sistema de notificações** por email

## 📋 Modelo de Negócio

### Plano Básico (Implementado)

- 1 profissional ativo por tenant
- 2 usuários no sistema (1 Admin + 1 Secretária)
- Módulos selecionáveis:
  - ✅ Módulo Agenda
  - ✅ Módulo Pacientes
  - ✅ Módulo Profissionais
  - ✅ Módulo Procedimentos
  - ✅ Módulo Atendimentos
  - ✅ Módulo WhatsApp

## 🏗️ Arquitetura

```
saas-agendamentos/
├── backend/                 # API Node.js
│   ├── src/
│   │   ├── modules/        # Módulos da aplicação
│   │   │   ├── auth/       # Autenticação e usuários
│   │   │   ├── pacientes/  # Gestão de pacientes
│   │   │   ├── profissionais/ # Gestão de profissionais
│   │   │   ├── procedimentos/ # Gestão de procedimentos
│   │   │   ├── agenda/     # Sistema de agendamentos
│   │   │   ├── atendimentos/ # Registro de atendimentos
│   │   │   └── whatsapp/   # Integração WhatsApp
│   │   ├── middleware/     # Middlewares de segurança
│   │   ├── config/         # Configurações
│   │   └── types/          # Tipos TypeScript
│   └── prisma/             # Schema e migrações
└── frontend/               # Interface Next.js
    ├── pages/              # Páginas da aplicação
    ├── components/         # Componentes reutilizáveis
    │   ├── ui/            # Componentes base
    │   ├── mobile/        # Componentes mobile
    │   └── desktop/       # Componentes desktop
    └── lib/               # Utilitários e configurações
```

## ⚡ Instalação e Configuração

### Pré-requisitos

- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

### 1. Clonagem e Configuração Inicial

```bash
# Executar os comandos de estrutura
mkdir saas-agendamentos
cd saas-agendamentos

# Executar todos os comandos mkdir e touch do primeiro artifact
# (Copie e execute a estrutura de diretórios fornecida)
```

### 2. Backend Setup

```bash
cd backend

# Instalar dependências
npm init -y
npm install express @types/express typescript ts-node @prisma/client prisma jsonwebtoken @types/jsonwebtoken bcryptjs @types/bcryptjs joi @types/joi cors @types/cors helmet dotenv node-cron @types/node-cron axios @types/axios googleapis express-rate-limit morgan @types/morgan

# Instalar dependências de desenvolvimento
npm install -D @types/node nodemon jest @types/jest ts-jest supertest @types/supertest

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações

# Configurar banco de dados
npx prisma generate
npx prisma db push

# Executar em desenvolvimento
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend

# Instalar dependências
npm init -y
npm install next react react-dom @types/react @types/react-dom typescript tailwindcss postcss autoprefixer axios @heroicons/react @headlessui/react react-hook-form @hookform/resolvers yup date-fns react-calendar @types/react-calendar js-cookie @types/js-cookie swr react-hot-toast

# Instalar dependências de desenvolvimento
npm install -D @types/node eslint eslint-config-next

# Inicializar Tailwind CSS
npx tailwindcss init -p

# Executar em desenvolvimento
npm run dev
```

### 4. Variáveis de Ambiente

#### Backend (.env)

```env
DATABASE_URL="postgresql://username:password@localhost:5432/saas_agendamentos"
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"
REFRESH_TOKEN_SECRET="your-refresh-token-secret"
REFRESH_TOKEN_EXPIRES_IN="30d"
PORT=3001
NODE_ENV=development

# Evolution API (WhatsApp)
EVOLUTION_API_URL="http://localhost:8080"
EVOLUTION_API_KEY="your-evolution-api-key"

# Google Calendar API
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_REDIRECT_URI="http://localhost:3001/auth/google/callback"
```

#### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME="Sistema de Agendamentos"
```

## 🎯 Funcionalidades Implementadas

### 1. Sistema de Autenticação

- [x] Login/Logout
- [x] Registro de tenant
- [x] JWT com refresh token
- [x] Middleware de autenticação
- [x] Níveis de acesso (Admin/Secretária)

### 2. Gestão de Pacientes

- [x] CRUD completo
- [x] Busca e filtros
- [x] Validação de telefone
- [x] Vinculação com profissionais
- [x] Operações em lote

### 3. Sistema de Agenda

- [ ] Calendário visual (próximo)
- [ ] Status de agendamento com cores
- [ ] Agendamento em lote
- [ ] Validação de conflitos
- [ ] Agendamentos recorrentes

### 4. Gestão de Profissionais

- [ ] CRUD de profissionais (próximo)
- [ ] Restrição de 1 ativo por tenant
- [ ] Especialidades

### 5. Gestão de Procedimentos

- [ ] CRUD de procedimentos (próximo)
- [ ] Duração em minutos
- [ ] Valores opcionais

### 6. Sistema de Atendimentos

- [ ] Registro de atendimentos (próximo)
- [ ] Anotações em texto livre
- [ ] Procedimentos realizados

### 7. Integração WhatsApp

- [ ] Confirmações automáticas (próximo)
- [ ] Templates configuráveis
- [ ] Webhook para respostas

## 🗄️ Banco de Dados

### Modelos Principais

- **Tenants** - Isolamento multitenant
- **Usuarios** - Sistema de autenticação
- **Pacientes** - Cadastro de pacientes
- **Profissionais** - Cadastro de profissionais
- **Procedimentos** - Tipos de procedimentos
- **Agendamentos** - Sistema de agendas
- **Atendimentos** - Registro de consultas
- **WhatsAppConfig** - Configurações por tenant

## 📱 Interface Mobile

### Design Responsivo

- **Breakpoint**: 768px
- **Desktop**: Calendário em grid, tabelas completas
- **Mobile**: Cards verticais, navegação otimizada

### Status de Agendamento

- 🟡 **Marcado** (amarelo)
- 🟢 **Confirmado** (verde)
- 🔵 **Compareceu** (azul)
- 🔴 **Faltou** (vermelho)
- ⚫ **Cancelado** (cinza)

## 🔧 Comandos Úteis

```bash
# Backend
npm run dev          # Desenvolvimento
npm run build        # Build produção
npm run start        # Executar produção
npm run db:studio    # Interface do banco
npm run db:migrate   # Executar migrações

# Frontend
npm run dev          # Desenvolvimento
npm run build        # Build produção
npm run start        # Executar produção
npm run lint         # Verificar código
```

## 🚦 Status do Desenvolvimento

### ✅ Completo

- [x] Estrutura base do projeto
- [x] Configuração do banco (Prisma)
- [x] Sistema de autenticação
- [x] Middleware de segurança
- [x] Módulo de pacientes
- [x] Isolamento multitenant

### 🔄 Em Desenvolvimento

- [ ] Interface frontend
- [ ] Módulo de agenda
- [ ] Módulo de profissionais
- [ ] Módulo de procedimentos

### 📋 Próximos Passos

- [ ] Módulo de atendimentos
- [ ] Integração WhatsApp
- [ ] Integração Google Calendar
- [ ] Testes automatizados
- [ ] Deploy e CI/CD

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

- 📧 Email: seu-email@dominio.com
- 💬 Issues: [GitHub Issues](https://github.com/seu-usuario/saas-agendamentos/issues)
- 📚 Documentação: [Wiki do Projeto](https://github.com/seu-usuario/saas-agendamentos/wiki)

---

**Desenvolvido com ❤️ para facilitar a gestão de agendamentos de profissionais da saúde.**
