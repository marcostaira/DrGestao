# 💬 Módulo WhatsApp

O módulo WhatsApp permite enviar confirmações automáticas de consultas e receber respostas dos pacientes, tudo de forma automatizada!

> 🔑 **Acesso**: Apenas **Administradores** podem configurar o WhatsApp

---

## 🎯 O que você pode fazer

✅ Conectar WhatsApp da clínica ao sistema  
✅ Enviar confirmações automáticas de consultas  
✅ Receber respostas SIM/NÃO dos pacientes  
✅ Atualizar status automaticamente baseado na resposta  
✅ Personalizar templates de mensagens  
✅ Definir quantas horas antes enviar confirmação  
✅ Enviar links de planos de tratamento  
✅ Enviar links de anamnese

---

## 📱 Acessando o Módulo

1. No menu lateral, clique em **"WhatsApp"**
2. Você verá a tela de configuração e status

---

## 🔌 Conectando o WhatsApp

### Pré-requisito: Evolution API

O sistema usa a **Evolution API** para integração com WhatsApp.

> ⚠️ **Importante**: A Evolution API deve estar instalada e configurada. Entre em contato com o suporte técnico se ainda não tiver.

### Passo a Passo da Conexão

1. **Acesse** "WhatsApp" > "Conectar"

2. **Clique em** `Inicializar Conexão`

3. **QR Code aparece na tela**

   - Abra o WhatsApp no seu celular
   - Vá em **Menu (⋮)** > **Aparelhos conectados**
   - Toque em **"Conectar um aparelho"**
   - **Escaneie o QR Code** mostrado no sistema

4. **Aguarde confirmação**
   - Status muda para: 🟢 **CONECTADO**
   - Sistema já está pronto para enviar mensagens!

### Status da Conexão

| Status              | Significado            | O que fazer         |
| ------------------- | ---------------------- | ------------------- |
| 🔴 **DESCONECTADO** | WhatsApp não conectado | Inicializar conexão |
| 🟡 **CONECTANDO**   | Aguardando QR Code     | Escanear QR Code    |
| 🟢 **CONECTADO**    | Tudo funcionando!      | Nada, está ok!      |
| ⚠️ **ERRO**         | Problema na conexão    | Reconectar          |

---

## 📋 Configurando Templates de Mensagens

Os templates são as mensagens que o sistema envia automaticamente.

### Acesso

1. **WhatsApp** > **Templates de Mensagens**

### Templates Disponíveis

#### 1️⃣ Mensagem de Confirmação

**Quando é enviada?**  
Automaticamente X horas antes da consulta (você configura)

**Variáveis disponíveis**:

- `{nome}` - Nome do paciente
- `{data}` - Data da consulta (ex: 15/03/2024)
- `{hora}` - Horário da consulta (ex: 14:30)
- `{profissional}` - Nome do profissional
- `{procedimento}` - Nome do procedimento

**Template padrão**:
Olá {nome}!
Você tem consulta marcada para {data} às {hora} com {profissional}.
Para confirmar sua presença, responda:
1 = SIM, vou comparecer
2 = NÃO, preciso cancelar
Aguardamos seu retorno!

**Como personalizar**:
Olá {nome}! 👋
Lembramos que você tem {procedimento} agendado para:
📅 {data}
🕐 {hora}
👨‍⚕️ {profissional}
Confirme sua presença:
1️⃣ = Sim, estarei presente
2️⃣ = Não poderei comparecer
Obrigado! 😊

---

#### 2️⃣ Mensagem de Confirmação (quando responde SIM)

**Quando é enviada?**  
Quando paciente responde com "1"

**Variáveis disponíveis**:

- `{nome}` - Nome do paciente
- `{data}` - Data da consulta
- `{hora}` - Horário da consulta

**Template padrão**:
Obrigado, {nome}!
Sua consulta está confirmada para {data} às {hora}.
Aguardamos você! 😊

**Exemplos personalizados**:
✅ Confirmado!
Obrigado {nome}! Te esperamos em {data} às {hora}.
📍 Endereço: [seu endereço]
🅿️ Estacionamento disponível
Até breve! 👋

---

#### 3️⃣ Mensagem de Cancelamento (quando responde NÃO)

**Quando é enviada?**  
Quando paciente responde com "2"

**Variáveis disponíveis**:

- `{nome}` - Nome do paciente

**Template padrão**:
Entendemos, {nome}.
Sua consulta foi cancelada.
Entre em contato conosco para reagendar quando puder.
📞 [seu telefone]

**Exemplos personalizados**:
Tudo bem, {nome}!
Consulta cancelada com sucesso.
Para reagendar:
📞 WhatsApp: [seu número]
💻 Site: [seu site]
Esperamos ver você em breve! 😊

---

#### 4️⃣ Mensagem de Opção Inválida

**Quando é enviada?**  
Quando paciente responde algo diferente de "1" ou "2"

**Template padrão**:
Desculpe, não entendemos sua resposta.
Por favor, responda:
1 = SIM, vou comparecer
2 = NÃO, preciso cancelar

**Exemplo personalizado**:
Ops! Não conseguimos entender sua resposta. 😅
Por favor, responda apenas:
1️⃣ para CONFIRMAR
2️⃣ para CANCELAR
Obrigado! 🙏

---

## ⏰ Configurando Horário de Envio

### Quantas Horas Antes?

Defina com quantas horas de antecedência enviar as confirmações.

**Padrão**: 24 horas antes

**Como configurar**:

1. **WhatsApp** > **Configurações**
2. Campo **"Enviar confirmação X horas antes"**
3. Digite o número de horas (ex: 24, 48, 12)
4. Salve

**Exemplos**:

- **24 horas**: Consulta às 14h de terça, envia segunda às 14h
- **48 horas**: Consulta às 10h de quinta, envia terça às 10h
- **12 horas**: Consulta às 15h, envia às 03h (madrugada)

> 💡 **Recomendação**: 24 horas é o ideal. Nem muito cedo, nem em cima da hora.

---

## 🤖 Como Funciona a Automação

### Fluxo Completo

Sistema verifica agendamentos

Roda automaticamente a cada hora
Busca agendamentos nas próximas X horas

↓
Para cada agendamento encontrado

Verifica se já enviou confirmação
Verifica se paciente tem WhatsApp
Status deve ser MARCADO ou CONFIRMADO

↓
Envia mensagem de confirmação

Usa template configurado
Substitui variáveis ({nome}, {data}, etc)
Marca como "confirmação enviada"

↓
Aguarda resposta do paciente

Sistema fica "escutando" webhook
Quando paciente responde, processa

↓
Processa resposta
Se responder "1":
✅ Status muda para CONFIRMADO
✅ Envia mensagem de confirmação
Se responder "2":
❌ Status muda para CANCELADO
❌ Envia mensagem de cancelamento
Se responder outra coisa:
⚠️ Envia mensagem de opção inválida
⚠️ Aguarda nova resposta

---

## 📨 Outros Usos do WhatsApp

### Enviar Link de Plano de Tratamento

Quando criar um plano de tratamento:

1. Clique em **"Enviar via WhatsApp"**
2. Sistema envia automaticamente mensagem com link
3. Paciente clica no link e aprova/reprova

**Mensagem enviada**:
Olá {nome}! 👋
Preparamos seu plano de tratamento.
Clique no link abaixo para visualizar e aprovar:
[link único]
Qualquer dúvida, estamos à disposição!

---

### Enviar Link de Anamnese

Ao gerar link de anamnese:

1. Clique em **"Enviar via WhatsApp"**
2. Sistema envia mensagem com link do formulário
3. Paciente preenche pelo celular

**Mensagem enviada**:
Olá {nome}! 👋
Para agilizar seu atendimento, por favor preencha nossa anamnese online:
[link único]
Leva apenas alguns minutos!
Obrigado 😊

---

## 📊 Histórico de Mensagens

### Onde Ver

**WhatsApp** > **Histórico de Mensagens**

### O que Aparece

Para cada mensagem enviada:

| Campo         | Descrição                                 |
| ------------- | ----------------------------------------- |
| **Data/Hora** | Quando foi enviada                        |
| **Paciente**  | Para quem foi enviada                     |
| **Tipo**      | Confirmação, Plano, Anamnese, etc         |
| **Status**    | Enviada, Lida, Respondida                 |
| **Resposta**  | O que o paciente respondeu (se respondeu) |

### Filtros

- Por paciente
- Por tipo de mensagem
- Por período
- Por status

---

## ⚙️ Configurações Avançadas

### Ativar/Desativar Automação

**WhatsApp** > **Configurações** > **Envio Automático**

- ✅ **Ativo**: Sistema envia confirmações automaticamente
- ⭕ **Inativo**: Sistema não envia (você pode enviar manualmente)

### Reenviar Confirmação Manual

Se paciente não recebeu ou perdeu mensagem:

1. Acesse o **Agendamento**
2. Clique em **"Enviar Confirmação"** (botão manual)
3. Sistema envia nova mensagem

---

## 🔄 Desconectando WhatsApp

Se precisar desconectar:

1. **WhatsApp** > **Desconectar**
2. Confirme a ação
3. Status muda para DESCONECTADO

**Quando desconectar?**

- Trocar número de WhatsApp
- Manutenção
- Problemas de conexão

---

## ⚠️ Situações Comuns

### "QR Code não aparece"

**Problema**: Erro na conexão com Evolution API  
**Solução**: Verifique se Evolution API está rodando. Entre em contato com suporte técnico.

### "Paciente não recebeu mensagem"

**Possíveis causas**:

- Número de telefone incorreto
- WhatsApp desconectado
- Paciente bloqueou o número
- Número não tem WhatsApp

**Solução**:

1. Verifique número no cadastro do paciente
2. Verifique status da conexão
3. Tente enviar manualmente

### "Sistema não processa resposta do paciente"

**Problema**: Webhook não configurado  
**Solução**: Entre em contato com suporte técnico para configurar webhook

### "Mensagens estão demorando para enviar"

**Problema**: Muitas mensagens na fila  
**Solução**: Normal em horários de pico. Mensagens são enviadas em até 1 hora.

### "Paciente respondeu mas status não mudou"

**Problema**: Resposta não foi "1" ou "2" exatamente  
**Solução**: Verifique histórico para ver o que paciente respondeu. Pode ter enviado texto em vez de número.

---

## 💡 Boas Práticas

### ✅ Recomendações

1. **Teste antes de usar**: Crie agendamento de teste com seu próprio número
2. **Templates claros**: Use linguagem simples e direta
3. **Emojis com moderação**: Tornam mensagem amigável, mas não exagere
4. **Horário adequado**: Evite enviar mensagens de madrugada (configure para 24h)
5. **Mantenha conectado**: Verifique status da conexão diariamente
6. **Atualize telefones**: Mantenha números de pacientes sempre corretos
7. **Respeite LGPD**: Não envie mensagens não solicitadas

### ⚠️ O que NÃO fazer

❌ Enviar mensagens de marketing/propaganda  
❌ Usar WhatsApp pessoal (use número comercial)  
❌ Enviar muitas mensagens seguidas  
❌ Responder manualmente confirmações automáticas (confunde o sistema)  
❌ Compartilhar QR Code publicamente

---

## 📱 Usando no Celular

### Conectando

Você precisa estar no **computador** para escanear QR Code com celular.

### Verificando Status

Pelo celular, você pode:

- ✅ Ver status da conexão
- ✅ Ver histórico de mensagens
- ✅ Enviar mensagens manuais
- ❌ Não pode conectar/desconectar

---

## 🔐 Segurança

### Proteções

- ✅ Conexão criptografada
- ✅ QR Code expira em 60 segundos
- ✅ Apenas administradores configuram
- ✅ Histórico de envios registrado
- ✅ Números validados antes de enviar

### LGPD e WhatsApp

- ✅ Mensagens apenas para confirmação de serviço
- ✅ Paciente pode cancelar recebimento
- ✅ Dados não compartilhados com terceiros
- ✅ Histórico protegido por permissões

---

## 💰 Custos

### Evolution API

A Evolution API é gratuita (open source), mas pode ter custos de hospedagem dependendo de onde está instalada.

### WhatsApp Business API

Confirmações de consulta geralmente são **gratuitas** (mensagens de utilidade).

> 💡 Consulte a política de preços do WhatsApp Business para mais detalhes.

---

## 🛠️ Troubleshooting

### Conexão caiu

**Sintomas**:

- Status mostra DESCONECTADO
- Mensagens não estão saindo

**Solução**:

1. Clique em "Reconectar"
2. Escaneie novo QR Code
3. Se persistir, entre em contato com suporte

### Mensagens não processam respostas

**Sintomas**:

- Paciente responde "1" mas status não muda

**Solução**:

1. Verifique webhook no Evolution API
2. Entre em contato com suporte técnico
3. Pode precisar reconfigurar webhook

### QR Code expira antes de escanear

**Solução**:

1. Clique em "Gerar Novo QR Code"
2. Tenha WhatsApp aberto e pronto antes de gerar
3. Escaneie rapidamente (60 segundos)

---

## 📞 Suporte Técnico

### Problemas com Evolution API

Entre em contato com suporte técnico:

- 📧 Email: suporte@seudominio.com
- 💬 WhatsApp: (XX) XXXXX-XXXX

### Problemas com Configuração

Consulte este manual ou entre em contato conosco.

---

## 📚 Recursos Adicionais

### Documentação Evolution API

[https://doc.evolution-api.com/](https://doc.evolution-api.com/)

### Políticas WhatsApp Business

[https://www.whatsapp.com/legal/business-policy](https://www.whatsapp.com/legal/business-policy)

---

## ✅ Checklist de Configuração

Antes de começar a usar, verifique:

- [ ] Evolution API instalada e funcionando
- [ ] WhatsApp conectado (QR Code escaneado)
- [ ] Status mostra CONECTADO
- [ ] Templates de mensagens configurados
- [ ] Horário de envio definido (padrão: 24h)
- [ ] Envio automático ATIVADO
- [ ] Teste realizado com seu próprio número
- [ ] Números de pacientes verificados e corretos

---

**Próximo**: [Gerencie Usuários e Permissões →](Usuarios-Permissoes)
