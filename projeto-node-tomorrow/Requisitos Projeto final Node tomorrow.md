## Problema proposto:

- Faça um princípio de banco de dados de uma rede social, ao qual serão armazenados usuários e cada usuário tem uma lista de postagens. O banco de dados deverá ser em uma tabela SQL.
- Faça uma rota de registro a qual vai cadastrar um usuário novo no banco de dados. Caso o usuário já exista no banco retorne um erro.
- Faça uma rota de login que tentará fazer a conexão em uma conta já cadastrada. Retorne dois erros diferentes, um para caso o usuário não tenha sido encontrado, e outro se a senha estiver incorreta. Caso tudo esteja correto, o usuário deverá receber um JWT que expirará em 2 minutos dando acesso a ele adicionar ou deletar as suas próprias postagens.
- Faça um middleware que checa a validade do token, caso o token tenha expirado proíba todas as requisições que não forem de cadastramento ou login.
- Faça uma rota para adicionar um post no usuário conectado, não deverá ser possível adicionar um post em outro usuário.
- Faça uma rota para deletar um post no usuário conectado, não deverá ser possível deletar um post em outro usuário.
 - Faça uma rota de busca, que procura um usuário e caso encontre mostre todas as suas postagens. Caso não encontre retorne um erro.
 - Tudo que não for garantido de funcionar tem que ter tratamento de erros.

#### MODELO USUÁRIO:

- ID auto incrementável
- Nome
- Senha    
- Lista de postagens

#### MODELO POSTAGEM:

- UID
- Conteúdo da postagem
- Imagem?

### BAREMA:

- Rotas: 2.5
- Tratamento de Erros: 3.5
- Registro: 1.0
- Login: 1.0
- Middleware: 1.0
- JWT: 1.0

### Funcionalidades esperadas:

1. Página de apresentação 
	1. Seção de Login
	2. Seção de Cadastro 
	3. Seção esqueci minha senha
2. Página com feed de postagens
	1. Seção com postagens da própria rede social
	2. Seção de pesquisa de usuário
