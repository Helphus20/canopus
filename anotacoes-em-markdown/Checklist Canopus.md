
## 1. Prototipação do Banco de Dados
- [x] Criar e configurar as tabelas principais: [[DDL Banco em Postgresql]]
  - [x] **Tabela `usuario`**: `id`, `nome`, `senha`
  - [x] **Tabela `postagem`**: `id`, `conteudo`, `usuario_id`
- [x] Definir as relações entre as tabelas (`usuario` e `postagem`).

## 2. Criação de Template HTML para Todas as Páginas do Sistema

### 2.1 Página Inicial
- [x] Criar estrutura básica com EJS para a página inicial. [[O que é EJS]]
  - [x] Criar uma seção de **Cadastro** (view):
    - [x] Tratar erro de senhas diferentes, e campos não preenchidos (controller)
    - [x] Tratar erro de usuário existente ou inválido (controller).
    - [x] Redirecionar para a página de login em caso de sucesso.
  - [x] Criar uma seção de **Login**:
    - [x] Tratar erro caso o usuário não exista.
    - [x] Tratar erro caso a senha esteja incorreta.
    - [ ] Gerar JWT de 2 minutos em caso de login bem-sucedido.
    - [x] Redirecionar para o feed após o login.

## 3. Criação de Rotas de Cadastro e Login
- [x] Desenvolver rota de **Cadastro**:
  - [x] Verificar se o usuário já existe no banco.
  - [x] Retornar erro adequado se o usuário já estiver cadastrado.
- [x] Desenvolver rota de **Login**:
  - [x] Verificar se o usuário existe.
  - [x] Retornar erro adequado se o usuário não existir.
  - [x] Validar a senha e retornar erro caso esteja incorreta.
  - [ ] Gerar JWT de 2 minutos para autenticação.

## 4. Middleware de Autenticação
- [ ] Implementar middleware para verificar validade do JWT.
  - [ ] Bloquear rotas que não sejam de cadastro ou login caso o JWT expire.
  - [ ] Garantir que o middleware seja executado para cada requisição.

## 5. Desenvolvimento do Feed
- [ ] Criar **painel esquerdo** com botão para adicionar uma postagem:
  - [ ] Implementar funcionalidade para adicionar uma nova postagem.
  - [ ] Garantir que a postagem seja vinculada ao usuário conectado.
  - [ ] Exibir nova postagem no topo do feed.
  - [ ] Adicionar opção de deletar a postagem.
- [ ] Implementar **funcionalidade de pesquisa** de usuários:
  - [ ] Adicionar campo de busca para encontrar usuários.
  - [ ] Tratar erro se o usuário buscado não for encontrado.
  - [ ] Exibir todas as postagens do usuário encontrado.

## 6. Tratamento de Erros e Testes
- [ ] Testar todas as rotas e funcionalidades do sistema:
  - [ ] Verificar fluxo de cadastro e login de usuários.
  - [ ] Testar adição e deleção de postagens.
  - [ ] Testar middleware de validação de token JWT.
  - [ ] Garantir que todos os erros sejam tratados adequadamente.

## 7. Melhorias e Refinamentos
- [ ] Revisar a experiência do usuário (UX/UI) em cada página.
- [ ] Otimizar consultas ao banco de dados, se necessário.
- [ ] Revisar o uso de componentes reutilizáveis com EJS para simplificar as views.

