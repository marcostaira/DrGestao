# 📅 Módulo Agenda

A Agenda é o coração do sistema! Aqui você visualiza todos os agendamentos, cria novos compromissos e gerencia a rotina da clínica.

---

## 🎯 O que você pode fazer

✅ Visualizar todos os agendamentos em calendário  
✅ Criar novos agendamentos  
✅ Editar ou cancelar compromissos existentes  
✅ Filtrar por profissional, status ou período  
✅ Alterar status dos agendamentos  
✅ Verificar conflitos de horário automaticamente

---

## 📱 Acessando a Agenda

1. No menu lateral, clique em **"Agenda"**
2. Você verá o calendário com todos os agendamentos

### Visualizações Disponíveis

**No computador**: Calendário em grade semanal/mensal  
**No celular**: Cards verticais com informações resumidas

---

## ➕ Como Criar um Novo Agendamento

### Passo a Passo

1. **Clique no botão** `+ Novo Agendamento`

2. **Preencha os dados obrigatórios**:

   - **Paciente**: Selecione da lista ou crie um novo
   - **Profissional**: Escolha quem irá atender
   - **Procedimento**: Selecione o tipo de atendimento
   - **Data**: Escolha o dia da consulta
   - **Horário**: Defina o horário inicial

3. **(Opcional) Adicione observações**: Use este campo para anotações importantes

4. **Clique em** `Salvar`

### 💡 Dicas Importantes

- ⏰ **Duração automática**: O sistema calcula o horário de término baseado na duração do procedimento
- ⚠️ **Conflitos**: Se já houver agendamento no mesmo horário para o profissional, você será avisado
- 📝 **Sem paciente**: Você pode criar agendamentos sem paciente para bloquear horários

---

## 🎨 Entendendo os Status

### Status Disponíveis

| Status         | Cor         | Quando Usar                                            |
| -------------- | ----------- | ------------------------------------------------------ |
| **MARCADO**    | 🟡 Amarelo  | Agendamento criado, aguardando confirmação             |
| **CONFIRMADO** | 🟢 Verde    | Paciente confirmou presença (via WhatsApp ou telefone) |
| **COMPARECEU** | 🔵 Azul     | Paciente chegou e foi atendido                         |
| **FALTOU**     | 🔴 Vermelho | Paciente não compareceu                                |
| **CANCELADO**  | ⚫ Cinza    | Agendamento foi cancelado                              |
| **REAGENDAR**  | 🟠 Laranja  | Precisa remarcar para nova data                        |

### Como Alterar o Status

**Opção 1: Clique direto no agendamento**

1. Clique sobre o compromisso na agenda
2. Selecione o novo status
3. Confirme a alteração

**Opção 2: Menu de ações**

1. Clique nos três pontinhos (...) do agendamento
2. Escolha "Alterar Status"
3. Selecione o status desejado

---

## ✏️ Como Editar um Agendamento

1. **Clique sobre o agendamento** que deseja editar
2. **Altere as informações** necessárias:
   - Data e horário
   - Profissional
   - Procedimento
   - Observações
3. **Clique em** `Salvar Alterações`

> ⚠️ **Atenção**: Se alterar data/horário, o sistema verificará novamente conflitos de agenda

---

## ❌ Como Cancelar um Agendamento

1. **Clique sobre o agendamento** que deseja cancelar
2. **Clique no botão** `Cancelar Agendamento` (vermelho)
3. **Confirme a ação**

> 💡 **Importante**: Agendamentos cancelados ficam marcados em cinza e não são excluídos (mantém histórico)

---

## 🔍 Filtrando Agendamentos

Use os filtros para facilitar a visualização:

### Por Profissional

- Selecione um profissional específico
- Veja apenas os agendamentos dele

### Por Status

- Filtre por status específico
- Útil para ver apenas confirmados, por exemplo

### Por Período

- Escolha data inicial e final
- Visualize agendamentos de um período específico

### Busca Rápida

- Digite o nome do paciente
- Encontre rapidamente um compromisso

---

## 📋 Agendamento em Lote (Avançado)

Para criar múltiplos agendamentos de uma vez:

1. **Clique em** `Agendamento em Lote`
2. **Configure**:
   - Paciente
   - Profissional
   - Procedimento
   - Dia da semana (ex: todas as terças)
   - Horário
   - Período (data início e fim)
3. **Visualize pré-visualização** dos agendamentos que serão criados
4. **Clique em** `Criar Todos`

> 💡 **Exemplo de Uso**: Paciente faz fisioterapia toda terça e quinta às 14h durante 2 meses

---

## 🔔 Confirmações Automáticas

Se o módulo WhatsApp estiver configurado:

- 📱 **24 horas antes**: Sistema envia mensagem automática ao paciente
- ✅ **Paciente responde "1"**: Status muda para CONFIRMADO automaticamente
- ❌ **Paciente responde "2"**: Status muda para CANCELADO automaticamente

[Saiba mais sobre WhatsApp →](WhatsApp)

---

## ⚠️ Situações Comuns

### "Horário já ocupado"

**Problema**: Tentou agendar em horário que já tem compromisso  
**Solução**: Escolha outro horário ou verifique se pode mover o agendamento existente

### "Não consigo ver agendamentos antigos"

**Problema**: Filtro de data ativo  
**Solução**: Limpe os filtros ou ajuste o período

### "Agendamento sumiu"

**Problema**: Pode estar com status CANCELADO  
**Solução**: Ative a opção "Mostrar cancelados" nos filtros

---

## 💡 Dicas de Produtividade

### ✅ Boas Práticas

1. **Atualize status diariamente**: Marque quem compareceu e quem faltou
2. **Use cores a seu favor**: Visualize rapidamente a situação da agenda
3. **Observações são úteis**: Anote detalhes importantes (ex: "paciente pediu janela")
4. **Confirme manualmente**: Mesmo com WhatsApp, confirme por telefone pacientes importantes
5. **Revise agenda no dia anterior**: Evite surpresas

### ⚡ Atalhos Úteis

- **Clique duplo**: Abre rapidamente um agendamento
- **Setas do teclado**: Navegue entre dias
- **Esc**: Fecha janelas de edição

---

## 📱 Usando no Celular

### Cards de Agendamento

No celular, os agendamentos aparecem como **cards coloridos** com:

- 🎨 Cor do status (amarelo, verde, azul, vermelho, cinza)
- 👤 Nome do paciente
- 🕐 Horário
- 👨‍⚕️ Profissional
- 💊 Procedimento
- ✏️ Botões de ação (editar, cancelar, alterar status)

### Navegação

- **Arraste para os lados**: Mude de dia
- **Toque no card**: Veja detalhes
- **Menu ≡**: Acesse filtros e opções

---

## 🆘 Precisa de Ajuda?

- **Dúvidas sobre agenda**: Entre em contato com o suporte
- **Problemas técnicos**: Reporte pelo e-mail suporte@seudominio.com
- **Sugestões**: Adoramos receber feedback!

---

**Próximo**: [Aprenda a gerenciar Pacientes →](Pacientes)
