const UserModel = require('../Models/UserModel');

//Criando função para retornar todos os usuários e enviando para a rota
exports.getAllUsers = (req, res) => {
  UserModel.getAll((err, users) => {
    console.log(users)
    if (err) {
      res.status(500).send('Erro ao buscar usuários');
    } else {
      res.status(200).send(users);
    }
  });
};


/*
  Depois de ser redirecionado pelo router, o controller chama o método cadastrarUsuario do arquivo definido para model,
  Executa a query e trata o resultado o erro
  Após isso, redireciona para a página de login
*/
exports.cadastrarUsuario = (req, res) => {
  const { nome, senha, confirmacao_senha } = req.body;

  if (!nome || !senha || !confirmacao_senha) {
    res.send('Por favor, preencha todos os campos')
  }

  if (senha != confirmacao_senha){
    res.send ('As senhas precisam ser iguais')
  }
  UserModel.cadastrarUsuario(nome, senha, (err, result) => {
    if (err) {
      res.send('Erro ao cadastrar usuário.');
      console.log('Erro ao cadastrar usuário')
    } else {
      console.log('Cadastro realizado')
      res.redirect('/'); // Redireciona para a página de login após sucesso
    }
  });
}
