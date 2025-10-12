# 👨‍⚕️ Módulo Profissionais

O módulo de Profissionais permite cadastrar e gerenciar os profissionais que realizam atendimentos na clínica ou consultório.

> 🔑 **Acesso**: Apenas **Administradores** têm acesso a este módulo

---

## 🎯 O que você pode fazer

✅ Cadastrar profissionais da clínica  
✅ Definir especialidade de cada profissional  
✅ Escolher cor de identificação na agenda  
✅ Ativar/Desativar profissionais  
✅ Editar informações cadastrais  
✅ Adicionar observações

---

## ⚠️ Regra Importante: 1 Profissional Ativo

### Limitação do Plano Básico

No plano básico, você pode ter:

- ✅ **1 profissional ATIVO** por vez
- ✅ Vários profissionais cadastrados (inativos)
- ✅ Trocar qual profissional está ativo quando necessário

> 💡 **Exemplo**: Consultório tem 2 dentistas, mas apenas 1 atende por vez. Cadastre os dois, mas mantenha apenas 1 ativo.

---

## 📱 Acessando o Módulo

1. No menu lateral, clique em **"Profissionais"**
2. Você verá a lista de profissionais cadastrados

---

## ➕ Como Cadastrar um Novo Profissional

### Passo a Passo

1. **Clique no botão** `+ Novo Profissional`

2. **Preencha as informações**:

   **Nome completo** _(obrigatório)_

   - Digite o nome do profissional
   - Ex: "Dr. João Silva", "Dra. Maria Santos"

   **Especialidade** _(opcional)_

   - Área de atuação do profissional
   - Ex: "Odontologia", "Fisioterapia", "Psicologia"

   **Cor de identificação** _(obrigatório)_

   - Escolha uma cor para identificar o profissional na agenda
   - Cada profissional deve ter uma cor diferente
   - Cores ajudam a visualizar rapidamente quem atende cada horário

   **Observações** _(opcional)_

   - Campo livre para anotações
   - Ex: "Atende apenas terças e quintas", "Especialista em implantes"

   **Status**

   - ✅ **Ativo**: Profissional pode receber agendamentos
   - ⭕ **Inativo**: Profissional não aparece para novos agendamentos

3. **Clique em** `Salvar`

---

## 🎨 Cores na Agenda

### Para que servem?

As cores ajudam a **identificar visualmente** qual profissional está em cada horário da agenda.

### Como escolher cores?

**Boas práticas**:

- 🔵 Use cores diferentes para cada profissional
- 🎯 Cores contrastantes facilitam a visualização
- 🌈 Evite cores muito claras (difícil de ler)

**Sugestões**:

- Profissional 1: Azul (#3B82F6)
- Profissional 2: Verde (#10B981)
- Profissional 3: Roxo (#8B5CF6)
- Profissional 4: Laranja (#F59E0B)

---

## ✏️ Como Editar um Profissional

1. **Na lista de profissionais**, clique sobre o nome
   OU clique no ícone de lápis ✏️

2. **Altere as informações** desejadas

3. **Clique em** `Salvar Alterações`

---

## 🔄 Ativando/Desativando Profissionais

### Como Ativar

1. Localize o profissional inativo na lista
2. Clique no botão **"Ativar"** (ícone de check verde ✅)
3. Confirme a ação

> ⚠️ **Atenção**: Se já houver 1 profissional ativo, ele será automaticamente desativado ao ativar outro

### Como Desativar

1. Localize o profissional ativo na lista
2. Clique no botão **"Desativar"** (ícone de pause ⏸️)
3. Confirme a ação

### O que acontece ao desativar?

- ❌ Profissional não aparece mais em novos agendamentos
- ✅ Agendamentos futuros existentes são mantidos
- ✅ Histórico permanece intacto
- ✅ Pode ser reativado a qualquer momento

---

## 🗑️ Como Excluir um Profissional

1. Na lista de profissionais, clique no ícone de **lixeira** 🗑️
2. **Confirme a exclusão**

### ⚠️ Importante sobre Exclusão

**Não é possível excluir** um profissional que possui:

- Agendamentos vinculados
- Atendimentos registrados
- Pacientes vinculados

**Solução**: Desative o profissional em vez de excluir

---

## 📊 Informações Exibidas na Lista

Para cada profissional, você vê:

| Informação        | Descrição                                   |
| ----------------- | ------------------------------------------- |
| **Nome**          | Nome completo do profissional               |
| **Especialidade** | Área de atuação                             |
| **Cor**           | Bolinha colorida de identificação           |
| **Status**        | 🟢 Ativo ou ⭕ Inativo                      |
| **Pacientes**     | Quantidade de pacientes vinculados          |
| **Agendamentos**  | Quantidade de agendamentos                  |
| **Ações**         | Botões de editar, ativar/desativar, excluir |

---

## 🔍 Buscar e Filtrar

### Busca Rápida

- Digite o nome do profissional na caixa de busca
- Resultados aparecem instantaneamente

### Filtros Disponíveis

**Por Status**:

- ✅ Apenas ativos
- ⭕ Apenas inativos
- 📋 Todos

**Ordenação**:

- A-Z (ordem alfabética)
- Mais recentes primeiro
- Mais antigos primeiro

---

## 💼 Gestão de Múltiplos Profissionais

### Cenário: Clínica com Vários Profissionais

Se sua clínica tem mais de um profissional mas apenas um atende por vez:

**Estratégia Recomendada**:

1. **Cadastre todos os profissionais** como inativos
2. **Ative o profissional** que está atendendo no período
3. **Troque quando necessário**:
   - Segunda a Quarta: Dr. João (ativo)
   - Quinta a Sexta: Dra. Maria (ativar na quinta)

### Alternando Profissionais

**Exemplo Prático**:

**Semana 1** - Dr. João atende:

1. Dr. João está ATIVO ✅
2. Dra. Maria está INATIVA ⭕

**Semana 2** - Dra. Maria atende:

1. Ative Dra. Maria → Dr. João fica inativo automaticamente
2. Dra. Maria está ATIVA ✅
3. Dr. João está INATIVO ⭕

---

## 🔗 Vinculação com Pacientes

### Quando um Paciente é Vinculado

Ao cadastrar ou editar um paciente, você pode vinculá-lo a um profissional específico.

**Vantagens**:

- 📊 Acompanhar carteira de pacientes por profissional
- 🎯 Filtrar agendamentos por profissional
- 📈 Gerar estatísticas individuais (futuro)

**Como ver pacientes vinculados**:

1. Na lista de profissionais
2. Coluna "Pacientes" mostra quantidade
3. Clique no profissional para ver detalhes

---

## ⚠️ Situações Comuns

### "Não consigo ativar outro profissional"

**Problema**: Já existe 1 profissional ativo  
**Solução**: O sistema desativa automaticamente o outro ao ativar um novo. Apenas confirme a ação.

### "Não consigo excluir profissional"

**Problema**: Profissional tem agendamentos ou pacientes vinculados  
**Solução**: Desative o profissional em vez de excluir

### "Cor não aparece na agenda"

**Problema**: Profissional está inativo  
**Solução**: Apenas profissionais ativos aparecem na agenda

### "Preciso de mais profissionais ativos"

**Problema**: Limitação do plano básico  
**Solução**: Entre em contato para upgrade de plano

---

## 💡 Boas Práticas

### ✅ Recomendações

1. **Cores contrastantes**: Use cores bem diferentes entre profissionais
2. **Especialidade clara**: Defina especialidade para facilitar identificação
3. **Observações úteis**: Anote horários de atendimento, particularidades
4. **Mantenha atualizado**: Atualize informações quando mudar
5. **Desative inativos**: Se profissional não atende mais, desative

### ⚡ Produtividade

- **Troque no dia anterior**: Ao alternar profissionais, faça isso no final do dia anterior
- **Avisos na equipe**: Comunique mudanças de profissional ativo
- **Use observações**: Anote detalhes que ajudem a secretária

---

## 📱 Usando no Celular

No celular, a lista de profissionais aparece em **cards** com:

- 👨‍⚕️ Nome do profissional
- 🎨 Bolinha colorida de identificação
- 🏥 Especialidade
- 🟢/⭕ Status (Ativo/Inativo)
- 📊 Quantidade de pacientes e agendamentos
- ✏️ Botões de ação

**Toque no card** para ver detalhes e editar

---

## 🔐 Permissões

### Quem pode acessar?

| Ação              | Administrador | Secretária |
| ----------------- | ------------- | ---------- |
| Ver profissionais | ✅ Sim        | ❌ Não     |
| Cadastrar novo    | ✅ Sim        | ❌ Não     |
| Editar            | ✅ Sim        | ❌ Não     |
| Ativar/Desativar  | ✅ Sim        | ❌ Não     |
| Excluir           | ✅ Sim        | ❌ Não     |

> 💡 **Nota**: Secretárias veem os profissionais ao criar agendamentos, mas não acessam este módulo

---

## 🆘 Precisa de Ajuda?

- **Dúvidas sobre planos**: Entre em contato para upgrade
- **Problemas técnicos**: suporte@seudominio.com
- **Sugestões**: Adoramos seu feedback!

---

**Próximo**: [Aprenda sobre Procedimentos →](Procedimentos)
