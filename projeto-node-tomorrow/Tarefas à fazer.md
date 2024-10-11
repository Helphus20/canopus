- [x]   Prototipação do banco de dados [[DDL Banco em Postgresql]] 
- [ ] Criação de template HTML para todas as páginas do sistema
1. Criação de página inicial
	1. Seção de Cadastro
		1. Tratar caso seja um usuário que já exista ou inválido
		2. Em caso de sucesso no cadastro, redirecionar para a página de login
	2. Seção de login
		1. Tratar caso usuário digitado não exista ou esteja incorreto
		2. Se o usuário digitado existir, verificar se a senha está incorreta e avisar
		3. Caso esteja tudo certo, libera um JWT de 2 min  dando acesso a ele adicionar ou deletar as suas próprias postagens e direciona para o feed

2. Middleware em execução enquanto conectado
		1. Quando o JWT expirar, bloquear todas as rotas que não sejam de cadastro e login
3. Feed
	1. Adicionar no painel esquerdo um botão para adicionar uma postagem		
		1. A postagem obrigatoriamente vai ser para o usuário conectado
		2. Uma vez postada, a postagem vai aparecer no topo do feed, junto com a opção de deletar
	2. Adicionar em baixo a opção de pesquisar (pesquisa somente de usuários)
			1. Caso o usuário digitado não seja encontrado, mostrar um erro
			2. Caso seja encontrado, mostrar todas as suas postagens

 
