# 📋 Módulo Atendimentos

O módulo de Atendimentos é onde você registra todas as consultas, avaliações e planos de tratamento dos seus pacientes. É o histórico clínico completo!

---

## 🎯 O que você pode fazer

✅ Registrar atendimentos avulsos (consultas simples)  
✅ Criar avaliações (primeira consulta com diagnóstico)  
✅ Montar planos de tratamento com múltiplos procedimentos  
✅ Enviar plano para aprovação do paciente via WhatsApp  
✅ Acompanhar progresso dos tratamentos  
✅ Agendar procedimentos do plano  
✅ Fazer anotações clínicas  
✅ Visualizar histórico completo do paciente

---

## 📱 Acessando o Módulo

1. No menu lateral, clique em **"Atendimentos"**
2. Você verá a lista de todos os atendimentos registrados

---

## 📚 Tipos de Atendimento

O sistema trabalha com **3 tipos** de atendimento:

### 1️⃣ Atendimento Avulso

**O que é?**

- Consulta simples, pontual
- Não gera plano de tratamento
- Usado para consultas de rotina

**Quando usar?**

- Consultas de retorno
- Manutenções
- Atendimentos únicos

**Exemplo**: Paciente vem para limpeza dental

---

### 2️⃣ Avaliação

**O que é?**

- Primeira consulta detalhada
- Inclui diagnóstico
- Base para criar plano de tratamento

**Quando usar?**

- Primeira consulta do paciente
- Reavaliação após período
- Consultas de diagnóstico

**Exemplo**: Paciente novo vem para avaliação ortodôntica

**Fluxo**:

1. Criar Avaliação
2. Registrar diagnóstico e anotações
3. Gerar Plano de Tratamento a partir da avaliação
4. Enviar plano para aprovação do paciente

---

### 3️⃣ Plano de Tratamento

**O que é?**

- Sequência de procedimentos planejados
- Gerado a partir de uma Avaliação
- Requer aprovação do paciente

**Quando usar?**

- Tratamentos com múltiplas etapas
- Procedimentos que precisam de aprovação
- Acompanhamento de progresso

**Exemplo**: Plano de tratamento ortodôntico com 6 procedimentos

**Status do Plano**:

- 🟡 **PENDENTE**: Aguardando aprovação do paciente
- 🟢 **APROVADO**: Paciente aprovou, pode iniciar
- 🔴 **REPROVADO**: Paciente não aprovou

---

## ➕ Como Criar um Atendimento Avulso

### Passo a Passo

1. **Clique no botão** `+ Novo Atendimento`

2. **Selecione o tipo**: `Atendimento Avulso`

3. **Preencha as informações**:

   **Paciente** _(obrigatório)_

   - Selecione o paciente da lista
   - Ou clique em "Novo Paciente" para cadastrar

   **Profissional** _(obrigatório)_

   - Profissional que realizou o atendimento

   **Procedimento** _(obrigatório)_

   - Procedimento realizado
   - Ex: Consulta, Limpeza, Retorno

   **Agendamento** _(opcional)_

   - Vincule a um agendamento existente
   - Útil para manter histórico organizado

   **Anotações** _(opcional)_

   - Campo livre para observações clínicas
   - Descrição do que foi feito
   - Orientações ao paciente

4. **Clique em** `Salvar`

---

## 🔍 Como Criar uma Avaliação

### Passo a Passo

1. **Clique no botão** `+ Novo Atendimento`

2. **Selecione o tipo**: `Avaliação`

3. **Preencha as informações**:

   **Paciente** _(obrigatório)_
   **Profissional** _(obrigatório)_
   **Procedimento** _(obrigatório)_

   - Ex: "Avaliação Inicial", "Primeira Consulta"

   **Agendamento** _(opcional)_

   **Anotações da Avaliação** _(importante!)_

   - Diagnóstico detalhado
   - Queixas do paciente
   - Exame clínico
   - Necessidades identificadas

4. **Clique em** `Salvar`

### Após Salvar a Avaliação

A avaliação fica com status **PENDENTE** e você tem duas opções:

**Opção 1: Criar Plano de Tratamento**

- Clique no botão `Criar Plano de Tratamento`
- Adicione os procedimentos necessários
- Envie para aprovação do paciente

**Opção 2: Apenas Registrar**

- Se não precisa de plano, deixe como está
- A avaliação fica registrada no histórico

---

## 📋 Como Criar um Plano de Tratamento

### Passo a Passo

1. **A partir de uma Avaliação**:

   - Abra a avaliação
   - Clique em `Criar Plano de Tratamento`

   OU

2. **Diretamente** (sem avaliação prévia):

   - Clique em `+ Novo Atendimento`
   - Selecione tipo: `Plano de Tratamento`

3. **Preencha as informações básicas**:

   - Paciente
   - Profissional
   - Agendamento (opcional)
   - Anotações gerais do plano

4. **Adicione os Procedimentos do Plano**:

   Para cada procedimento:

   **Procedimento** _(obrigatório)_

   - Selecione da lista de procedimentos cadastrados

   **Ordem** _(obrigatório)_

   - Sequência de execução (1, 2, 3...)
   - Define a ordem lógica do tratamento

   **Valor Praticado** _(opcional)_

   - Valor específico para este paciente
   - Se deixar em branco, usa o valor cadastrado no procedimento

   **Observações** _(opcional)_

   - Notas específicas sobre este procedimento
   - Ex: "Aguardar 7 dias após procedimento anterior"

5. **Clique em** `Salvar Plano`

### Após Criar o Plano

O plano fica com status **PENDENTE** (aguardando aprovação)

**Próximos passos**:

1. Enviar para aprovação do paciente (via WhatsApp)
2. Aguardar resposta do paciente
3. Se aprovado: Começar a agendar procedimentos
4. Se reprovado: Ajustar plano e reenviar

---

## ✉️ Enviando Plano para Aprovação

### Como Funciona

O sistema gera um **link único** para o paciente visualizar e aprovar o plano de tratamento.

### Passo a Passo

1. **Abra o Plano de Tratamento** que deseja enviar

2. **Clique no botão** `Gerar Link de Aprovação`

3. **Configure** (opcional):
   - Validade do link (padrão: 7 dias)
4. **Envie ao paciente**:

   **Opção 1: Via WhatsApp** (recomendado)

   - Clique em `Enviar via WhatsApp`
   - Sistema envia automaticamente

   **Opção 2: Copiar Link**

   - Clique em `Copiar Link`
   - Envie manualmente (WhatsApp, SMS, Email)

### O que o Paciente Vê

O paciente recebe um link que abre uma página com:

- ✅ Nome da clínica
- ✅ Nome do profissional
- ✅ Lista de procedimentos do plano
- ✅ Valores (se cadastrados)
- ✅ Valor total do tratamento
- ✅ Botões: **APROVAR** ou **REPROVAR**

### Aprovação do Paciente

**Se APROVAR**:

- ✅ Status muda para **APROVADO** automaticamente
- ✅ Você pode começar a agendar os procedimentos
- ✅ Paciente recebe confirmação

**Se REPROVAR**:

- ❌ Status muda para **REPROVADO**
- ❌ Sistema solicita motivo (opcional)
- ❌ Você pode ajustar o plano e reenviar

---

## 📅 Agendando Procedimentos do Plano

Após o plano ser **APROVADO**, você agenda cada procedimento:

### Passo a Passo

1. **Abra o Plano de Tratamento aprovado**

2. **Na lista de procedimentos**, localize o que deseja agendar

   - Verá status: 🟡 Não Iniciado

3. **Clique no botão** `Agendar` ao lado do procedimento

4. **Você será direcionado à Agenda**:
   - Paciente já estará selecionado
   - Procedimento já estará selecionado
   - Profissional já estará selecionado
5. **Escolha apenas**:

   - Data
   - Horário

6. **Salve o agendamento**

7. **O procedimento é vinculado**:
   - Status muda para: 🔵 Agendado
   - Mostra data do agendamento
   - Link para o agendamento na agenda

### Status dos Procedimentos

| Status           | Cor        | Significado            |
| ---------------- | ---------- | ---------------------- |
| **NÃO_INICIADO** | 🟡 Amarelo | Aguardando agendamento |
| **EM_ANDAMENTO** | 🔵 Azul    | Procedimento agendado  |
| **CONCLUÍDO**    | 🟢 Verde   | Procedimento realizado |

---

## ✅ Concluindo Procedimentos do Plano

Após realizar o procedimento:

### Passo a Passo

1. **Abra o Plano de Tratamento**

2. **Localize o procedimento realizado**

3. **Clique no botão** `Marcar como Concluído`

4. **Adicione observações** (opcional):

   - Como foi o procedimento
   - Intercorrências
   - Orientações pós-procedimento

5. **Salve**

6. **Status muda para**: 🟢 Concluído

### Progresso do Plano

O sistema mostra automaticamente:

- 📊 **X de Y procedimentos concluídos**
- 📈 **Percentual de progresso**
- 🎯 **Próximos procedimentos a agendar**

---

## 📝 Anotações Clínicas

### Campo de Anotações

Disponível em todos os tipos de atendimento:

**Use para registrar**:

- 📋 Diagnóstico
- 💊 Medicamentos prescritos
- 🏥 Procedimentos realizados
- 👤 Queixas do paciente
- 📝 Observações importantes
- 🔄 Evolução do tratamento
- 📅 Próximos passos

### Boas Práticas

✅ **Seja detalhado**: Quanto mais informação, melhor o histórico  
✅ **Use linguagem clara**: Outros profissionais podem ler  
✅ **Registre data importante**: Facilita acompanhamento  
✅ **Anote prescrições**: Medicamentos e dosagens  
✅ **Descreva evolução**: Importante para tratamentos longos

---

## 📊 Visualizando Histórico

### Histórico por Paciente

1. **Acesse o módulo Pacientes**
2. **Clique no paciente**
3. **Aba "Atendimentos"**

Você verá:

- Todos os atendimentos (avulsos, avaliações, planos)
- Data de cada atendimento
- Profissional que atendeu
- Procedimentos realizados
- Status (se for plano)

### Filtros Disponíveis

- **Por tipo**: Avulsos, Avaliações, Planos
- **Por status**: Pendente, Aprovado, Reprovado
- **Por período**: Data inicial e final
- **Por profissional**: Filtrar por quem atendeu
- **Incluir cancelados**: Mostrar ou ocultar cancelados

---

## 🔄 Editando Atendimentos

### Atendimento Avulso

1. Abra o atendimento
2. Clique em `Editar`
3. Altere as informações
4. Salve

### Avaliação

1. Abra a avaliação
2. Clique em `Editar`
3. Altere anotações, procedimento, etc
4. Salve

**⚠️ Importante**: Se já gerou plano a partir da avaliação, edições não afetam o plano (são independentes)

### Plano de Tratamento

**Antes da Aprovação**:

- ✅ Pode editar livremente
- ✅ Pode adicionar/remover procedimentos
- ✅ Pode alterar valores e observações

**Após Aprovação**:

- ⚠️ Edições limitadas (apenas observações)
- ❌ Não pode alterar procedimentos
- ❌ Não pode alterar valores
- 💡 Se precisar alterar muito, crie novo plano

---

## ❌ Cancelando Atendimentos

### Como Cancelar

1. Abra o atendimento
2. Clique em `Cancelar`
3. Confirme a ação

### O que Acontece

- Status muda para **CANCELADO**
- Atendimento não é excluído (mantém histórico)
- Não aparece nas listagens principais (use filtro "incluir cancelados")
- Pode ser reativado se necessário

### Cancelar Plano de Tratamento

Se cancelar um plano:

- ❌ Todos os procedimentos pendentes são cancelados
- ✅ Procedimentos já concluídos permanecem no histórico
- ✅ Agendamentos futuros são mantidos (mas desvinculados)

---

## 💡 Fluxos de Trabalho Práticos

### Fluxo 1: Paciente Novo (com plano de tratamento)

Paciente agenda primeira consulta
↓
Criar AVALIAÇÃO no dia da consulta

Registrar diagnóstico
Fazer anotações detalhadas
↓

Gerar PLANO DE TRATAMENTO

Adicionar todos os procedimentos necessários
Definir ordem de execução
↓

Enviar link de aprovação via WhatsApp
↓
Aguardar aprovação do paciente
↓
Se aprovado: Começar a agendar procedimentos
↓
Conforme realiza: Marcar como concluído

### Fluxo 2: Consulta de Rotina

Paciente agenda consulta
↓
No dia: Criar ATENDIMENTO AVULSO

Selecionar procedimento (ex: Limpeza)
Fazer anotações
Salvar
↓

Fim!

### Fluxo 3: Retorno de Plano

Paciente com plano aprovado vem para procedimento
↓
Abrir o PLANO DE TRATAMENTO
↓
Localizar procedimento agendado para hoje
↓
Marcar como CONCLUÍDO
↓
Adicionar observações sobre como foi
↓
Agendar próximo procedimento do plano

---

## ⚠️ Situações Comuns

### "Não consigo editar plano aprovado"

**Problema**: Plano aprovado tem edições limitadas  
**Solução**: Crie novo plano se mudanças forem grandes

### "Paciente não recebeu link de aprovação"

**Problema**: WhatsApp não configurado ou telefone incorreto  
**Solução**: Verifique configuração do WhatsApp e telefone do paciente

### "Procedimento não aparece para agendar"

**Problema**: Status ainda é "Não Iniciado"  
**Solução**: Isso é normal, clique em "Agendar" ao lado do procedimento

### "Plano sumiu da lista"

**Problema**: Plano foi cancelado  
**Solução**: Ative filtro "Incluir cancelados"

### "Não consigo criar plano a partir de avaliação"

**Problema**: Avaliação foi cancelada ou já tem plano vinculado  
**Solução**: Verifique status da avaliação

---

## 💡 Boas Práticas

### ✅ Recomendações

1. **Use avaliação para novos pacientes**: Crie histórico desde o início
2. **Seja detalhado nas anotações**: Futuro você agradece
3. **Aprove antes de iniciar**: Sempre envie plano para aprovação
4. **Atualize progresso**: Marque procedimentos como concluídos
5. **Registre tudo**: Mesmo consultas simples merecem registro
6. **Organize por ordem**: Numere procedimentos do plano logicamente

### ⚡ Produtividade

- **Crie templates**: Use procedimentos padrão para agilizar
- **Reaproveite avaliações**: Base para planos futuros
- **Anotações durante**: Registre enquanto atende (não depois)
- **Revise histórico**: Antes de cada consulta, veja histórico do paciente

---

## 📱 Usando no Celular

### Criando Atendimentos

Interface simplificada com:

- Formulário em etapas
- Campos grandes e fáceis de tocar
- Salvamento automático de rascunho

### Visualizando Planos

Cards com:

- Status colorido
- Progresso visual (barra)
- Procedimentos pendentes destacados
- Botões de ação rápida

### Aprovação pelo Paciente

Link mobile-friendly:

- Design responsivo
- Botões grandes
- Carregamento rápido
- Funciona em qualquer dispositivo

---

## 🔐 Permissões

### Quem pode fazer o quê?

| Ação                  | Administrador | Secretária                     |
| --------------------- | ------------- | ------------------------------ |
| Ver atendimentos      | ✅ Sim        | ✅ Sim (se tiver permissão)    |
| Criar atendimento     | ✅ Sim        | ✅ Sim (se tiver permissão)    |
| Editar atendimento    | ✅ Sim        | ✅ Sim (se tiver permissão)    |
| Cancelar atendimento  | ✅ Sim        | ❌ Não (ou se tiver permissão) |
| Gerar link aprovação  | ✅ Sim        | ✅ Sim (se tiver permissão)    |
| Marcar como concluído | ✅ Sim        | ✅ Sim (se tiver permissão)    |

> 💡 **Nota**: Permissões são configuradas em [Usuários e Permissões](Usuarios-Permissoes)

---

## 🆘 Precisa de Ajuda?

- **Dúvidas sobre fluxo**: Entre em contato com o suporte
- **Problemas técnicos**: suporte@seudominio.com
- **Sugestões**: Adoramos receber feedback!

---

**Próximo**: [Aprenda sobre Anamnese Digital →](Anamnese)
