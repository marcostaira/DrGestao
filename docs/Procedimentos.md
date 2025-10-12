# 💊 Módulo Procedimentos

O módulo de Procedimentos permite cadastrar todos os tipos de serviços/tratamentos que sua clínica oferece, com valores e duração.

> 🔑 **Acesso**: Apenas **Administradores** têm acesso a este módulo

---

## 🎯 O que você pode fazer

✅ Cadastrar procedimentos/serviços oferecidos  
✅ Definir duração de cada procedimento  
✅ Configurar valores (opcional)  
✅ Editar procedimentos existentes  
✅ Excluir procedimentos não utilizados  
✅ Organizar lista de procedimentos

---

## 📱 Acessando o Módulo

1. No menu lateral, clique em **"Procedimentos"**
2. Você verá a lista de todos os procedimentos cadastrados

---

## ➕ Como Cadastrar um Novo Procedimento

### Passo a Passo

1. **Clique no botão** `+ Novo Procedimento`

2. **Preencha as informações**:

   **Nome do procedimento** _(obrigatório)_

   - Digite o nome do serviço/tratamento
   - Ex: "Consulta", "Limpeza", "Extração", "Sessão de Fisioterapia"

   **Duração em minutos** _(obrigatório)_

   - Tempo médio necessário para realizar o procedimento
   - Ex: 30, 45, 60, 90, 120
   - ⚠️ **Importante**: Esta duração é usada para calcular horário de término dos agendamentos

   **Valor** _(opcional)_

   - Preço cobrado pelo procedimento
   - Pode deixar em branco se não quiser registrar valores
   - Ex: R$ 150,00, R$ 350,00

3. **Clique em** `Salvar`

---

## ⏰ Duração do Procedimento

### Como Funciona na Agenda

A duração definida aqui é **fundamental** para o sistema:

**Exemplo**:

- Procedimento: "Consulta Inicial"
- Duração: **60 minutos**
- Agendamento: **14:00**
- Sistema calcula fim: **15:00** automaticamente

### Como Definir a Duração Correta?

**Dicas**:

1. **Conte o tempo total**: Desde entrada até saída do paciente
2. **Inclua preparação**: Tempo de setup/limpeza entre pacientes
3. **Considere intervalos**: Se necessário, crie procedimento "Intervalo"
4. **Arredonde para cima**: Melhor sobrar tempo que faltar

**Exemplos por Área**:

| Área             | Procedimento      | Duração Sugerida |
| ---------------- | ----------------- | ---------------- |
| **Odontologia**  | Consulta inicial  | 60 minutos       |
|                  | Limpeza           | 45 minutos       |
|                  | Restauração       | 90 minutos       |
|                  | Extração          | 60 minutos       |
| **Fisioterapia** | Sessão padrão     | 60 minutos       |
|                  | Avaliação         | 90 minutos       |
| **Psicologia**   | Sessão terapia    | 50 minutos       |
|                  | Primeira consulta | 90 minutos       |
| **Nutrição**     | Consulta          | 60 minutos       |
|                  | Retorno           | 30 minutos       |

---

## 💰 Valores dos Procedimentos

### Para que Servem?

Os valores cadastrados são usados para:

- ✅ Registro nos planos de tratamento
- ✅ Controle financeiro (futuro)
- ✅ Relatórios de faturamento (futuro)

### Valor é Obrigatório?

**Não!** O campo de valor é **opcional**.

**Quando deixar em branco**:

- Se não quer registrar valores no sistema
- Se valores variam muito por paciente
- Se prefere controlar financeiro em outro lugar

**Quando preencher**:

- Se quer controle financeiro integrado
- Se valores são tabelados
- Para facilitar criação de planos de tratamento

---

## ✏️ Como Editar um Procedimento

1. **Na lista de procedimentos**, clique sobre o nome
   OU clique no ícone de lápis ✏️

2. **Altere as informações** desejadas:

   - Nome
   - Duração
   - Valor

3. **Clique em** `Salvar Alterações`

> ⚠️ **Atenção**: Alterar duração afeta apenas **novos agendamentos**. Agendamentos existentes mantêm a duração original.

---

## 🗑️ Como Excluir um Procedimento

1. Na lista, clique no ícone de **lixeira** 🗑️
2. **Confirme a exclusão**

### ⚠️ Importante sobre Exclusão

**Não é possível excluir** um procedimento que possui:

- Agendamentos vinculados
- Atendimentos registrados
- Planos de tratamento vinculados

**O que fazer?**:

- Procedimentos com histórico não podem ser excluídos
- Isso garante integridade dos registros
- Considere renomear o procedimento se necessário

---

## 📊 Informações Exibidas na Lista

Para cada procedimento, você vê:

| Informação       | Descrição                                           |
| ---------------- | --------------------------------------------------- |
| **Nome**         | Nome do procedimento                                |
| **Duração**      | Tempo em minutos                                    |
| **Valor**        | Preço (se cadastrado) ou "-"                        |
| **Agendamentos** | Quantidade de agendamentos usando este procedimento |
| **Ações**        | Botões de editar e excluir                          |

---

## 🔍 Buscar e Filtrar

### Busca Rápida

- Digite o nome do procedimento na caixa de busca
- Resultados aparecem instantaneamente

### Filtros Disponíveis

**Por duração**:

- Rápidos (até 30 min)
- Médios (30-60 min)
- Longos (mais de 60 min)

**Por valor**:

- Com valor cadastrado
- Sem valor cadastrado

**Ordenação**:

- A-Z (ordem alfabética)
- Por duração (crescente/decrescente)
- Por valor (crescente/decrescente)
- Mais usados primeiro

---

## 💡 Exemplos de Configuração

### Clínica Odontológica

Procedimento: Consulta Inicial
Duração: 60 minutos
Valor: R$ 150,00
Procedimento: Limpeza
Duração: 45 minutos
Valor: R$ 200,00
Procedimento: Restauração
Duração: 90 minutos
Valor: R$ 350,00
Procedimento: Extração
Duração: 60 minutos
Valor: R$ 300,00
Procedimento: Canal (sessão)
Duração: 90 minutos
Valor: R$ 500,00
Procedimento: Clareamento
Duração: 60 minutos
Valor: R$ 800,00

### Consultório de Fisioterapia

Procedimento: Avaliação Inicial
Duração: 90 minutos
Valor: R$ 200,00
Procedimento: Sessão Fisioterapia
Duração: 60 minutos
Valor: R$ 100,00
Procedimento: RPG
Duração: 60 minutos
Valor: R$ 120,00
Procedimento: Pilates
Duração: 60 minutos
Valor: R$ 80,00

### Consultório de Psicologia

Procedimento: Primeira Consulta
Duração: 90 minutos
Valor: R$ 300,00
Procedimento: Sessão Individual
Duração: 50 minutos
Valor: R$ 200,00
Procedimento: Terapia de Casal
Duração: 90 minutos
Valor: R$ 350,00
Procedimento: Avaliação Psicológica
Duração: 120 minutos
Valor: R$ 500,00

---

## 📋 Procedimentos Especiais

### Bloqueio de Horário

Crie um procedimento para bloquear horários na agenda:
Nome: Bloqueio / Horário Reservado
Duração: 60 minutos (ou qualquer duração)
Valor: (deixar em branco)

**Uso**: Ao agendar, selecione este procedimento e não vincule paciente

### Intervalos

Para pausas/almoço:
Nome: Intervalo
Duração: 60 minutos
Valor: (deixar em branco)

### Retornos

Se retorno tem duração diferente:
Nome: Retorno / Revisão
Duração: 30 minutos
Valor: (pode ser menor ou zero)

---

## ⚠️ Situações Comuns

### "Duração não está aparecendo correta"

**Problema**: Agendamento já existente antes de alterar duração  
**Solução**: Duração só afeta novos agendamentos. Edite manualmente os existentes.

### "Não consigo excluir procedimento"

**Problema**: Procedimento tem histórico de uso  
**Solução**: Procedimentos usados não podem ser excluídos (integridade de dados)

### "Valor não aparece no agendamento"

**Problema**: Valores são apenas informativos no agendamento  
**Solução**: Valores são registrados nos atendimentos e planos de tratamento

### "Preciso ajustar duração de vários agendamentos"

**Problema**: Alterou duração mas agendamentos existentes não mudaram  
**Solução**: Altere manualmente ou entre em contato com suporte para ajuste em lote

---

## 💡 Boas Práticas

### ✅ Recomendações

1. **Seja específico**: "Restauração 1 Face" em vez de apenas "Restauração"
2. **Duração realista**: Inclua tempo de preparação e limpeza
3. **Atualize valores**: Revise preços periodicamente
4. **Padronize nomes**: Use convenção clara (ex: sempre iniciar com maiúscula)
5. **Organize por categoria**: Use prefixos se necessário (ex: "Preventivo - Limpeza")

### ⚡ Produtividade

- **Cadastre completo no início**: Evite ficar cadastrando durante atendimentos
- **Revise durações**: Ajuste se perceber que procedimentos demoram mais/menos
- **Templates úteis**: Crie procedimentos genéricos úteis (Consulta, Retorno, etc)

---

## 🧮 Cálculo de Horários na Agenda

### Como o Sistema Calcula

**Exemplo 1**:

- Agendamento: 09:00
- Procedimento: Consulta (60 min)
- Sistema calcula: 09:00 às **10:00**

**Exemplo 2**:

- Agendamento: 14:30
- Procedimento: Limpeza (45 min)
- Sistema calcula: 14:30 às **15:15**

**Exemplo 3**:

- Agendamento: 10:00
- Procedimento: Restauração (90 min)
- Sistema calcula: 10:00 às **11:30**

### Validação de Conflitos

O sistema usa a duração para verificar conflitos:

❌ **Conflito detectado**:

- 09:00 - 10:00: Consulta (60 min)
- 09:30 - 10:30: Limpeza (60 min) ← **ERRO: Sobreposição!**

✅ **Sem conflito**:

- 09:00 - 10:00: Consulta (60 min)
- 10:00 - 11:00: Limpeza (60 min) ← **OK!**

---

## 📱 Usando no Celular

No celular, a lista de procedimentos aparece em **cards** com:

- 💊 Nome do procedimento
- ⏰ Duração em minutos
- 💰 Valor (se cadastrado)
- 📊 Quantidade de usos
- ✏️ Botões de ação

**Toque no card** para editar

---

## 🔐 Permissões

### Quem pode acessar?

| Ação              | Administrador | Secretária |
| ----------------- | ------------- | ---------- |
| Ver procedimentos | ✅ Sim        | ❌ Não     |
| Cadastrar novo    | ✅ Sim        | ❌ Não     |
| Editar            | ✅ Sim        | ❌ Não     |
| Excluir           | ✅ Sim        | ❌ Não     |

> 💡 **Nota**: Secretárias veem os procedimentos ao criar agendamentos, mas não acessam este módulo

---

## 🆘 Precisa de Ajuda?

- **Dúvidas sobre configuração**: Entre em contato com o suporte
- **Problemas técnicos**: suporte@seudominio.com
- **Sugestões de procedimentos**: Compartilhe conosco!

---

**Próximo**: [Aprenda sobre Atendimentos →](Atendimentos)
