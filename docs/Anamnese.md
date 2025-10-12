# 📝 Módulo Anamnese

O módulo de Anamnese permite criar formulários personalizados que os pacientes preenchem digitalmente antes da consulta. Nada de formulários em papel! 📱

---

## 🎯 O que você pode fazer

✅ Criar formulários de anamnese personalizados  
✅ Usar 11 tipos diferentes de campos  
✅ Gerar link único para o paciente preencher  
✅ Enviar link via WhatsApp automaticamente  
✅ Paciente preenche pelo celular antes da consulta  
✅ Visualizar respostas de forma organizada  
✅ Histórico de todas as anamneses do paciente  
✅ Duplicar formulários para economizar tempo

---

## 📱 Acessando o Módulo

### Para Criar/Gerenciar Formulários

1. No menu lateral, clique em **"Anamnese"**
2. Depois em **"Formulários"**

### Para Ver Respostas

1. Menu **"Anamnese"**
2. **"Anamneses Respondidas"**

---

## 📋 O que é um Formulário?

Um formulário é o **modelo/template** que você cria com as perguntas.

**Exemplo**: "Formulário de Avaliação Ortodôntica"

Você cria uma vez e usa para vários pacientes!

---

## ➕ Como Criar um Formulário

### Passo a Passo

1. **Clique no botão** `+ Novo Formulário`

2. **Informações Básicas**:

   **Nome do Formulário** _(obrigatório)_

   - Ex: "Anamnese Geral"
   - Ex: "Avaliação Fisioterápica"
   - Ex: "Anamnese Odontológica"
   - Ex: "Primeira Consulta Psicológica"

   **Descrição** _(opcional)_

   - Explique o objetivo do formulário
   - Ex: "Formulário para primeira consulta"

   **Profissional** _(opcional)_

   - Vincule a um profissional específico
   - Se não vincular, formulário fica disponível para todos

   **Status**

   - ✅ **Ativo**: Disponível para uso
   - ⭕ **Inativo**: Não aparece para criar links

3. **Adicione os Campos**:

   Para cada pergunta, clique em `+ Adicionar Campo`

4. **Configure cada campo** (detalhes abaixo)

5. **Organize a ordem**:

   - Arraste os campos para reorganizar
   - Numere na ordem que quer que apareçam

6. **Clique em** `Salvar Formulário`

---

## 🎨 Tipos de Campos Disponíveis

O sistema oferece **11 tipos diferentes** de campos:

### 1️⃣ TEXTO

**Para**: Respostas curtas de texto livre

**Exemplo**:

- Nome completo
- Cidade onde nasceu
- Profissão

**Configurações**:

- Label da pergunta
- Placeholder (texto de exemplo)
- Obrigatório: Sim/Não

---

### 2️⃣ TEXTO_LONGO

**Para**: Respostas longas, várias linhas

**Exemplo**:

- Descreva seus sintomas
- Histórico médico detalhado
- Medicamentos em uso

**Configurações**:

- Label da pergunta
- Placeholder
- Obrigatório: Sim/Não
- Área de texto com múltiplas linhas

---

### 3️⃣ NUMERO

**Para**: Valores numéricos

**Exemplo**:

- Idade
- Peso (kg)
- Altura (cm)
- Quantas horas dorme por dia?

**Configurações**:

- Label da pergunta
- Valor mínimo (opcional)
- Valor máximo (opcional)
- Obrigatório: Sim/Não

---

### 4️⃣ DATA

**Para**: Datas específicas

**Exemplo**:

- Data de nascimento
- Data da última consulta
- Início dos sintomas

**Configurações**:

- Label da pergunta
- Obrigatório: Sim/Não
- Calendário para seleção

---

### 5️⃣ EMAIL

**Para**: Endereços de e-mail

**Exemplo**:

- E-mail para contato
- E-mail profissional

**Configurações**:

- Label da pergunta
- Validação automática de formato
- Obrigatório: Sim/Não

---

### 6️⃣ TELEFONE

**Para**: Números de telefone

**Exemplo**:

- Telefone celular
- Telefone de emergência
- Telefone comercial

**Configurações**:

- Label da pergunta
- Validação de formato brasileiro
- Obrigatório: Sim/Não

---

### 7️⃣ SIM_NAO

**Para**: Perguntas de sim ou não

**Exemplo**:

- Tem diabetes?
- É fumante?
- Já fez tratamento similar?
- Pratica atividade física?

**Configurações**:

- Label da pergunta
- Obrigatório: Sim/Não
- Botões: SIM ou NÃO

---

### 8️⃣ RADIO (Escolha Única)

**Para**: Selecionar apenas UMA opção

**Exemplo**:

- **Estado civil**: Solteiro / Casado / Divorciado / Viúvo
- **Tipo sanguíneo**: A+ / A- / B+ / B- / AB+ / AB- / O+ / O-
- **Intensidade da dor**: Leve / Moderada / Forte / Muito Forte

**Configurações**:

- Label da pergunta
- Lista de opções (mínimo 2)
- Obrigatório: Sim/Não
- Paciente escolhe apenas uma

---

### 9️⃣ CHECKBOX (Múltipla Escolha)

**Para**: Selecionar VÁRIAS opções

**Exemplo**:

- **Sintomas** (marque todos que se aplicam):
  - [ ] Dor de cabeça
  - [ ] Náusea
  - [ ] Tontura
  - [ ] Febre

**Configurações**:

- Label da pergunta
- Lista de opções
- Obrigatório: Sim/Não
- Paciente pode marcar múltiplas

---

### 🔟 SELECAO (Dropdown/Lista)

**Para**: Escolher UMA opção de lista grande

**Exemplo**:

- **Estado**: Lista de todos os estados
- **Medicamento**: Lista de medicamentos comuns
- **Convênio**: Lista de convênios aceitos

**Configurações**:

- Label da pergunta
- Lista de opções
- Obrigatório: Sim/Não
- Menu dropdown

---

### 1️⃣1️⃣ MULTIPLA_ESCOLHA

**Para**: Selecionar VÁRIAS opções de lista grande

**Exemplo**:

- **Alergias conhecidas** (selecione todas):
  - Penicilina
  - Dipirona
  - Látex
  - Anestésicos
  - Outras

**Configurações**:

- Label da pergunta
- Lista de opções
- Obrigatório: Sim/Não
- Permite múltiplas seleções

---

## 📝 Exemplo Prático: Anamnese Odontológica

FORMULÁRIO: Anamnese Odontológica Completa
Campo 1 - TEXTO
Pergunta: "Qual o motivo da sua consulta?"
Obrigatório: Sim
Campo 2 - TEXTO_LONGO
Pergunta: "Descreva seus sintomas ou queixas"
Obrigatório: Não
Campo 3 - SIM_NAO
Pergunta: "Já realizou tratamento odontológico anteriormente?"
Obrigatório: Sim
Campo 4 - SIM_NAO
Pergunta: "Tem medo de dentista?"
Obrigatório: Sim
Campo 5 - RADIO
Pergunta: "Com que frequência escova os dentes?"
Opções:

1 vez ao dia
2 vezes ao dia
3 ou mais vezes ao dia
Raramente
Obrigatório: Sim

Campo 6 - CHECKBOX
Pergunta: "Marque os problemas de saúde que você tem:"
Opções:

Diabetes
Hipertensão
Problemas cardíacos
Hepatite
HIV
Nenhum
Obrigatório: Sim

Campo 7 - TEXTO_LONGO
Pergunta: "Lista de medicamentos que você usa regularmente:"
Obrigatório: Não
Campo 8 - CHECKBOX
Pergunta: "Alergias conhecidas:"
Opções:

Penicilina
Anestésicos locais
Látex
Dipirona
Não tenho alergias
Obrigatório: Sim

Campo 9 - SIM_NAO
Pergunta: "Está grávida ou amamentando?"
Obrigatório: Não
Campo 10 - NUMERO
Pergunta: "Qual sua idade?"
Min: 0, Max: 120
Obrigatório: Sim

---

## 🔗 Gerando Link para o Paciente

Após criar o formulário, você gera links para pacientes preencherem:

### Passo a Passo

1. **Acesse** "Anamnese" > "Criar Link"

2. **Selecione**:

   - **Paciente**: Quem vai preencher
   - **Formulário**: Qual formulário usar
   - **Agendamento** (opcional): Vincular a uma consulta

3. **Clique em** `Gerar Link`

4. **Envie ao paciente**:

   **Opção 1: WhatsApp** (recomendado)

   - Clique em `Enviar via WhatsApp`
   - Mensagem automática é enviada

   **Opção 2: Copiar Link**

   - Clique em `Copiar Link`
   - Envie por SMS, email ou outro meio

### Validade do Link

- 🕐 Link válido por **7 dias** (padrão)
- ✅ Pode ser preenchido **uma única vez**
- ⚠️ Após preenchido, link expira

---

## 📱 Como o Paciente Preenche

### Experiência do Paciente

1. **Recebe o link** (WhatsApp, SMS ou email)

2. **Clica no link**

   - Abre no navegador do celular/computador
   - Design responsivo e fácil de usar

3. **Vê a tela inicial** com:

   - Nome da clínica
   - Nome do formulário
   - Instruções

4. **Preenche as perguntas**

   - Uma por vez ou todas juntas
   - Validação automática de campos obrigatórios

5. **Revisa as respostas**

   - Pode voltar e corrigir

6. **Clica em** `Enviar Respostas`

7. **Recebe confirmação**
   - "Anamnese enviada com sucesso!"
   - Link expira automaticamente

---

## 👁️ Visualizando Respostas

### Onde Ver

1. **Menu** "Anamnese" > "Anamneses Respondidas"

OU

2. **No cadastro do paciente** > Aba "Anamneses"

### O que Você Vê

Para cada anamnese preenchida:

- 📋 Nome do formulário usado
- 👤 Nome do paciente
- 📅 Data de preenchimento
- 👨‍⚕️ Profissional (se vinculado)
- 📝 **Todas as respostas** organizadas por pergunta

### Formato das Respostas

As respostas aparecem de forma clara:
Pergunta: Qual o motivo da sua consulta?
Resposta: Dor no dente da frente
Pergunta: Tem medo de dentista?
Resposta: Sim
Pergunta: Problemas de saúde:
Resposta:
✓ Diabetes
✓ Hipertensão

---

## ✏️ Editando Formulários

### Você pode editar:

✅ Nome e descrição do formulário  
✅ Adicionar novos campos  
✅ Remover campos existentes  
✅ Alterar ordem dos campos  
✅ Modificar configurações dos campos  
✅ Ativar/Desativar formulário

### ⚠️ Atenção

- Edições afetam apenas **novos links**
- Anamneses já preenchidas **não são alteradas**
- Isso garante integridade do histórico

---

## 📋 Duplicando Formulários

Para economizar tempo ao criar formulários similares:

### Passo a Passo

1. Na lista de formulários
2. Clique no ícone **"Duplicar"** 📋
3. Sistema cria cópia com nome "(Cópia) [Nome Original]"
4. Edite a cópia conforme necessário

**Exemplo de uso**:

- Formulário básico de anamnese
- Duplicar e ajustar para especialidade específica

---

## 🗑️ Excluindo Formulários

### Como Excluir

1. Na lista de formulários
2. Clique no ícone **"Excluir"** 🗑️
3. Confirme a ação

### ⚠️ Não é possível excluir se:

- Formulário tem anamneses preenchidas
- Formulário tem links ativos pendentes

**Solução**: Desative o formulário em vez de excluir

---

## 💡 Exemplos de Formulários por Área

### Odontologia

Anamnese Geral Odontológica
Avaliação Ortodôntica
Anamnese Pediátrica
Avaliação para Implantes
Anamnese para Clareamento

### Fisioterapia

Anamnese Ortopédica
Avaliação de Coluna
Anamnese Neurológica
Avaliação Pós-Operatória
Anamnese Esportiva

### Psicologia

Anamnese Inicial Adulto
Anamnese Infantil
Anamnese para Terapia de Casal
Avaliação Psicológica
Questionário de Ansiedade/Depressão

### Nutrição

Anamnese Nutricional
Recordatório Alimentar 24h
Questionário de Hábitos Alimentares
Avaliação de Alergias/Intolerâncias

---

## ⚠️ Situações Comuns

### "Paciente não consegue abrir o link"

**Problema**: Link expirado ou já usado  
**Solução**: Gere novo link para o paciente

### "Paciente preencheu errado"

**Problema**: Informações incorretas  
**Solução**: Não pode editar resposta. Gere novo link e peça para preencher novamente

### "Não aparece formulário para selecionar"

**Problema**: Formulário está inativo  
**Solução**: Ative o formulário antes de criar link

### "Link não envia no WhatsApp"

**Problema**: WhatsApp não configurado ou telefone incorreto  
**Solução**: Verifique configuração do WhatsApp e número do paciente

---

## 💡 Boas Práticas

### ✅ Recomendações

1. **Seja claro nas perguntas**: Evite ambiguidade
2. **Marque obrigatórios**: Apenas o essencial
3. **Não exagere**: Formulários muito longos desestimulam
4. **Teste antes**: Preencha você mesmo para ver experiência
5. **Use tipos corretos**: CHECKBOX para múltiplas, RADIO para única
6. **Organize logicamente**: Agrupe perguntas relacionadas
7. **Envie com antecedência**: Pelo menos 24h antes da consulta

### ⚡ Produtividade

- **Crie biblioteca**: Tenha formulários padrão prontos
- **Duplique e ajuste**: Economize tempo
- **Envie no agendamento**: Logo após agendar, já envie o link
- **Configure WhatsApp**: Automatiza envio

---

## 📱 Usando no Celular

### Criando Formulários

Interface mobile-friendly:

- Formulário em etapas
- Fácil adicionar/remover campos
- Arraste para reordenar

### Preenchimento pelo Paciente

Otimizado para mobile:

- Design responsivo
- Teclado correto para cada tipo de campo
- Salvamento automático de progresso
- Botões grandes e fáceis de tocar

---

## 🔐 Segurança e Privacidade

### Proteções

- ✅ Link único por paciente/formulário
- ✅ Expira após uso único
- ✅ Validade de 7 dias
- ✅ HTTPS obrigatório
- ✅ Dados criptografados
- ✅ Acesso controlado às respostas

### LGPD

- Dados sensíveis protegidos
- Acesso apenas para equipe autorizada
- Histórico de acesso registrado
- Dados isolados por tenant

---

## 🆘 Precisa de Ajuda?

- **Dúvidas sobre formulários**: Entre em contato com o suporte
- **Problemas técnicos**: suporte@seudominio.com
- **Sugestões de campos**: Adoramos feedback!

---

**Próximo**: [Configure o WhatsApp →](WhatsApp)
