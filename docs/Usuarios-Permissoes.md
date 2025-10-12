# 🔐 Módulo Usuários e Permissões

O módulo de Usuários e Permissões permite gerenciar quem tem acesso ao sistema e o que cada pessoa pode fazer.

> 🔑 **Acesso**: Apenas **Administradores** têm acesso a este módulo

---

## 🎯 O que você pode fazer

✅ Cadastrar novos usuários (secretárias)  
✅ Definir tipo de usuário (Admin ou Secretária)  
✅ Configurar permissões detalhadas por módulo  
✅ Ativar/Desativar usuários  
✅ Redefinir senhas  
✅ Visualizar histórico de acessos  
✅ Gerenciar equipe completa

---

## 👥 Tipos de Usuário

### 🔑 Administrador

**Acesso total ao sistema**, incluindo:

- ✅ Todas as funcionalidades
- ✅ Configurações
- ✅ Gestão de usuários
- ✅ Cadastro de profissionais
- ✅ Cadastro de procedimentos
- ✅ Configuração do WhatsApp
- ✅ Relatórios completos

**Quantidade**: Pode ter múltiplos administradores

---

### 👩‍💼 Secretária

**Acesso configurável**, geralmente:

- Agendamentos
- Pacientes
- Visualização de atendimentos
- As permissões específicas são definidas pelo Administrador

**Quantidade**: Conforme plano contratado (Plano Básico: até 2 usuários totais)

---

## 📱 Acessando o Módulo

1. No menu lateral, clique em **"Usuários"**
2. Você verá a lista de todos os usuários

---

## ➕ Como Cadastrar um Novo Usuário

### Passo a Passo

1. **Clique no botão** `+ Novo Usuário`

2. **Preencha as informações**:

   **Nome completo** _(obrigatório)_

   - Nome da pessoa que vai usar o sistema
   - Ex: "Maria Silva", "João Santos"

   **E-mail** _(obrigatório)_

   - E-mail único no sistema
   - Será usado para login
   - Ex: "maria@clinica.com"

   **Senha** _(obrigatório)_

   - Mínimo 6 caracteres
   - Recomendado: Letras, números e caracteres especiais
   - Ex: "Senha@123"

   **Confirmar senha** _(obrigatório)_

   - Digite a senha novamente

   **Tipo de usuário** _(obrigatório)_

   - 🔑 **Administrador**: Acesso total
   - 👩‍💼 **Secretária**: Acesso configurável

3. **Se for Secretária**, configure permissões (ver seção abaixo)

4. **Clique em** `Salvar`

5. **Usuário receberá e-mail** (se configurado) com credenciais

---

## 🔐 Sistema de Permissões

### Como Funciona

O sistema tem **permissões granulares** por módulo. Para cada módulo, você define:

| Permissão         | O que permite                |
| ----------------- | ---------------------------- |
| **Visualizar**    | Ver informações do módulo    |
| **Criar/Alterar** | Cadastrar e editar registros |
| **Cancelar**      | Cancelar/excluir registros   |

---

### Módulos Disponíveis

#### 📅 AGENDA

**Visualizar**:

- Ver agendamentos no calendário
- Ver detalhes de compromissos

**Criar/Alterar**:

- Criar novos agendamentos
- Editar agendamentos existentes
- Alterar status (Marcado, Confirmado, etc)
- Reagendar compromissos

**Cancelar**:

- Cancelar agendamentos

---

#### 👥 PACIENTES

**Visualizar**:

- Ver lista de pacientes
- Ver detalhes de cada paciente
- Ver histórico de atendimentos

**Criar/Alterar**:

- Cadastrar novos pacientes
- Editar informações de pacientes
- Atualizar dados cadastrais

**Cancelar**:

- Excluir pacientes (se sem histórico)
- Desativar pacientes

---

#### 👨‍⚕️ PROFISSIONAIS

**Visualizar**:

- Ver lista de profissionais
- Ver detalhes dos profissionais

**Criar/Alterar**:

- Cadastrar novos profissionais
- Editar informações
- Ativar/desativar profissionais

**Cancelar**:

- Excluir profissionais (se sem histórico)

> 💡 **Nota**: Geralmente apenas Administradores têm acesso a este módulo

---

#### 💊 PROCEDIMENTOS

**Visualizar**:

- Ver lista de procedimentos
- Ver valores e durações

**Criar/Alterar**:

- Cadastrar novos procedimentos
- Editar procedimentos existentes
- Alterar valores e durações

**Cancelar**:

- Excluir procedimentos (se sem uso)

> 💡 **Nota**: Geralmente apenas Administradores têm acesso a este módulo

---

#### 📋 ATENDIMENTOS

**Visualizar**:

- Ver lista de atendimentos
- Ver detalhes de consultas
- Ver avaliações e planos de tratamento
- Ver anotações clínicas

**Criar/Alterar**:

- Registrar novos atendimentos
- Criar avaliações
- Criar planos de tratamento
- Editar anotações
- Gerar links de aprovação
- Enviar links via WhatsApp
- Marcar procedimentos como concluídos

**Cancelar**:

- Cancelar atendimentos
- Cancelar planos de tratamento

---

#### 📝 ANAMNESE (incluído em ATENDIMENTOS)

**Visualizar**:

- Ver formulários criados
- Ver anamneses respondidas
- Ver respostas dos pacientes

**Criar/Alterar**:

- Criar formulários de anamnese
- Editar formulários
- Gerar links para pacientes
- Enviar links via WhatsApp
- Duplicar formulários

**Cancelar**:

- Excluir formulários (se sem uso)
- Desativar formulários

---

#### 💬 WHATSAPP

**Visualizar**:

- Ver status da conexão
- Ver histórico de mensagens
- Ver templates configurados

**Criar/Alterar**:

- Conectar/desconectar WhatsApp
- Configurar templates
- Definir horários de envio
- Ativar/desativar automação
- Enviar mensagens manuais

**Cancelar**:

- (Não aplicável)

> 💡 **Nota**: Geralmente apenas Administradores têm acesso a este módulo

---

#### 👤 USUÁRIOS

**Visualizar**:

- Ver lista de usuários
- Ver permissões de cada usuário

**Criar/Alterar**:

- Cadastrar novos usuários
- Editar usuários existentes
- Configurar permissões
- Redefinir senhas
- Ativar/desativar usuários

**Cancelar**:

- Excluir usuários (se sem histórico)

> 🔒 **Restrito**: Apenas Administradores têm acesso

---

## 🎭 Perfis Pré-Configurados

### Perfil: Secretária Completa

Permissões sugeridas para secretária com acesso amplo:

| Módulo            | Visualizar | Criar/Alterar | Cancelar |
| ----------------- | ---------- | ------------- | -------- |
| **AGENDA**        | ✅ Sim     | ✅ Sim        | ✅ Sim   |
| **PACIENTES**     | ✅ Sim     | ✅ Sim        | ❌ Não   |
| **PROFISSIONAIS** | ❌ Não     | ❌ Não        | ❌ Não   |
| **PROCEDIMENTOS** | ❌ Não     | ❌ Não        | ❌ Não   |
| **ATENDIMENTOS**  | ✅ Sim     | ✅ Sim        | ❌ Não   |
| **WHATSAPP**      | ✅ Sim     | ❌ Não        | ❌ Não   |
| **USUÁRIOS**      | ❌ Não     | ❌ Não        | ❌ Não   |

---

### Perfil: Secretária Básica

Permissões sugeridas para secretária com acesso restrito:

| Módulo            | Visualizar | Criar/Alterar | Cancelar |
| ----------------- | ---------- | ------------- | -------- |
| **AGENDA**        | ✅ Sim     | ✅ Sim        | ❌ Não   |
| **PACIENTES**     | ✅ Sim     | ✅ Sim        | ❌ Não   |
| **PROFISSIONAIS** | ❌ Não     | ❌ Não        | ❌ Não   |
| **PROCEDIMENTOS** | ❌ Não     | ❌ Não        | ❌ Não   |
| **ATENDIMENTOS**  | ✅ Sim     | ❌ Não        | ❌ Não   |
| **WHATSAPP**      | ❌ Não     | ❌ Não        | ❌ Não   |
| **USUÁRIOS**      | ❌ Não     | ❌ Não        | ❌ Não   |

---

### Perfil: Recepcionista

Permissões sugeridas para recepção:

| Módulo            | Visualizar | Criar/Alterar | Cancelar |
| ----------------- | ---------- | ------------- | -------- |
| **AGENDA**        | ✅ Sim     | ✅ Sim        | ❌ Não   |
| **PACIENTES**     | ✅ Sim     | ✅ Sim        | ❌ Não   |
| **PROFISSIONAIS** | ❌ Não     | ❌ Não        | ❌ Não   |
| **PROCEDIMENTOS** | ❌ Não     | ❌ Não        | ❌ Não   |
| **ATENDIMENTOS**  | ❌ Não     | ❌ Não        | ❌ Não   |
| **WHATSAPP**      | ❌ Não     | ❌ Não        | ❌ Não   |
| **USUÁRIOS**      | ❌ Não     | ❌ Não        | ❌ Não   |

---

## ⚙️ Configurando Permissões

### Para Novo Usuário

1. Ao criar usuário tipo "Secretária"
2. Sistema mostra lista de módulos
3. Para cada módulo, marque as permissões:
   - [ ] Visualizar
   - [ ] Criar/Alterar
   - [ ] Cancelar
4. Clique em `Salvar`

### Para Usuário Existente

1. Na lista de usuários
2. Clique no botão **"Permissões"** ⚙️
3. Ajuste as permissões
4. Clique em `Salvar Alterações`

---

## 🔄 Editando Usuários

### Como Editar

1. Na lista de usuários
2. Clique no nome do usuário OU no ícone de lápis ✏️
3. Altere as informações:
   - Nome
   - E-mail
   - Tipo (se não for o próprio usuário)
4. Clique em `Salvar Alterações`

> ⚠️ **Atenção**: Não é possível alterar e-mail se já existir outro usuário com o mesmo e-mail

---

## 🔑 Redefinindo Senha

### Como Administrador (para outro usuário)

1. Na lista de usuários
2. Clique no botão **"Redefinir Senha"** 🔑
3. Digite a nova senha
4. Confirme a senha
5. Clique em `Salvar`
6. Informe a nova senha ao usuário

### Como Usuário (sua própria senha)

1. No menu do usuário (canto superior direito)
2. Clique em **"Meu Perfil"**
3. Clique em **"Alterar Senha"**
4. Digite:
   - Senha atual
   - Nova senha
   - Confirmação da nova senha
5. Clique em `Salvar`

---

## ✅ Ativando/Desativando Usuários

### Como Desativar

1. Na lista de usuários
2. Clique no botão **"Desativar"** ⏸️
3. Confirme a ação

**O que acontece**:

- ❌ Usuário não pode mais fazer login
- ✅ Histórico permanece intacto
- ✅ Pode ser reativado a qualquer momento

### Como Reativar

1. Na lista de usuários
2. Ative filtro "Mostrar inativos"
3. Localize o usuário
4. Clique no botão **"Ativar"** ▶️
5. Usuário volta a ter acesso

---

## 🗑️ Excluindo Usuários

### Como Excluir

1. Na lista de usuários
2. Clique no botão **"Excluir"** 🗑️
3. Confirme a ação

### ⚠️ Não é possível excluir se:

- Usuário tem histórico de ações no sistema
- Usuário é o único administrador

**Solução**: Desative o usuário em vez de excluir

---

## 📊 Informações Exibidas

Para cada usuário, você vê:

| Campo             | Descrição                                                              |
| ----------------- | ---------------------------------------------------------------------- |
| **Nome**          | Nome completo                                                          |
| **E-mail**        | E-mail de login                                                        |
| **Tipo**          | 🔑 Admin ou 👩‍💼 Secretária                                              |
| **Status**        | 🟢 Ativo ou ⭕ Inativo                                                 |
| **Último acesso** | Data/hora do último login                                              |
| **Ações**         | Botões: Editar, Permissões, Redefinir Senha, Ativar/Desativar, Excluir |

---

## 🔍 Buscar e Filtrar

### Busca Rápida

- Digite nome ou e-mail na caixa de busca

### Filtros Disponíveis

**Por tipo**:

- Apenas Administradores
- Apenas Secretárias
- Todos

**Por status**:

- ✅ Apenas ativos
- ⭕ Apenas inativos
- Todos

**Ordenação**:

- A-Z (nome)
- Último acesso (mais recente primeiro)
- Data de cadastro

---

## 📜 Histórico de Acessos

### Como Ver

1. **Usuários** > **Histórico de Acessos** (futuro)

### Informações Disponíveis

- Data e hora de cada login
- Endereço IP
- Dispositivo usado
- Ações realizadas

> 💡 **Em desenvolvimento**: Este recurso será implementado em breve

---

## ⚠️ Situações Comuns

### "Não consigo cadastrar novo usuário"

**Problema**: Limite do plano atingido  
**Solução**: Plano Básico permite 2 usuários totais. Para mais usuários, faça upgrade do plano.

### "E-mail já está em uso"

**Problema**: Já existe usuário com este e-mail  
**Solução**: Cada e-mail é único no sistema. Use outro e-mail ou verifique se usuário já existe.

### "Secretária não vê módulo"

**Problema**: Permissão não configurada  
**Solução**: Configure permissões do usuário para dar acesso ao módulo.

### "Não consigo excluir usuário"

**Problema**: Usuário tem histórico  
**Solução**: Desative em vez de excluir.

### "Esqueci minha senha"

**Problema**: Não lembra a senha  
**Solução**: Na tela de login, clique em "Esqueci minha senha" e siga instruções (se configurado). Ou peça ao administrador para redefinir.

---

## 💡 Boas Práticas

### ✅ Recomendações de Segurança

1. **Senhas fortes**: Mínimo 8 caracteres, letras, números e símbolos
2. **Não compartilhe senhas**: Cada pessoa deve ter seu próprio acesso
3. **Revise permissões**: Dê apenas as permissões necessárias
4. **Desative usuários inativos**: Se funcionário saiu, desative imediatamente
5. **Troque senhas periodicamente**: A cada 3-6 meses
6. **Monitore acessos**: Revise quem está acessando o sistema
7. **Use e-mails corporativos**: Evite e-mails pessoais

### ⚡ Produtividade

- **Crie perfis padrão**: Use perfis pré-configurados para agilizar
- **Nomeie claramente**: Use nome completo, não apelidos
- **Documente mudanças**: Anote quando alterar permissões e porquê
- **Treine usuários**: Ensine cada pessoa suas responsabilidades

---

## 🎯 Exemplo Prático: Configurando Equipe

### Cenário: Clínica Odontológica

**Equipe**:

- Dr. João (Proprietário/Dentista)
- Dra. Maria (Dentista)
- Ana (Recepcionista)
- Carlos (Secretário)

**Configuração**:

**1. Dr. João**

- Tipo: 🔑 Administrador
- Todas as permissões
- Gerencia sistema completo

**2. Dra. Maria**

- Tipo: 🔑 Administrador
- Todas as permissões
- Registra atendimentos

**3. Ana (Recepcionista)**

- Tipo: 👩‍💼 Secretária
- Permissões:
  - AGENDA: ✅ Ver, ✅ Criar/Alterar, ❌ Cancelar
  - PACIENTES: ✅ Ver, ✅ Criar/Alterar, ❌ Cancelar
  - ATENDIMENTOS: ✅ Ver, ❌ Criar/Alterar, ❌ Cancelar

**4. Carlos (Secretário)**

- Tipo: 👩‍💼 Secretária
- Permissões:
  - AGENDA: ✅ Ver, ✅ Criar/Alterar, ✅ Cancelar
  - PACIENTES: ✅ Ver, ✅ Criar/Alterar, ❌ Cancelar
  - ATENDIMENTOS: ✅ Ver, ✅ Criar/Alterar, ❌ Cancelar
  - WHATSAPP: ✅ Ver, ❌ Criar/Alterar, ❌ Cancelar

---

## 📱 Usando no Celular

### Gerenciamento de Usuários

Pelo celular, você pode:

- ✅ Ver lista de usuários
- ✅ Editar usuários
- ✅ Configurar permissões
- ✅ Ativar/Desativar
- ✅ Redefinir senhas

### Login no Sistema

Todos os usuários podem fazer login pelo celular e usar o sistema normalmente (com as permissões configuradas).

---

## 🔐 Segurança e LGPD

### Proteções Implementadas

- ✅ Senhas hasheadas (bcrypt)
- ✅ JWT tokens com expiração
- ✅ Sessões seguras
- ✅ Controle de acesso granular
- ✅ Histórico de ações registrado
- ✅ Dados isolados por tenant

### Conformidade LGPD

- ✅ Controle de quem acessa dados
- ✅ Registro de todas as ações
- ✅ Direito de exclusão respeitado
- ✅ Senhas nunca expostas

---

## 🆘 Precisa de Ajuda?

- **Dúvidas sobre permissões**: Entre em contato com o suporte
- **Problemas de acesso**: suporte@seudominio.com
- **Upgrade de plano**: Fale conosco para mais usuários

---

**Próximo**: [Perguntas Frequentes (FAQ) →](FAQ)
