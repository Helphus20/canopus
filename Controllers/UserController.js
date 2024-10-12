const UserModel = require('../Models/UserModel');

/*
  Depois de ser redirecionado pelo router, o controller chama o método cadastrarUsuario do arquivo definido para model,
  Executa a query e trata o resultado o erro
  Após isso, redireciona para a página de login
*/
exports.cadastrarUsuario = (req, res) => {
  const { nome, senha, confirmacao_senha } = req.body;

  /*
    Caso o usuário não tenha preenchido os 3 campos, retorna o código http 400.
    Esse código indica que o servidor não pode ou não irá processar a requisição devido a alguma coisa que foi entendida como um erro 
    do lado do cliente. Junto com o código http, o método render irá renderizar a página cadastro, localizada em Views,
    e envia um objeto contendo o atributo error, que será a mensagem a ser exibida no front
  */
  if (!nome || !senha || !confirmacao_senha) {
    return res.status(400).render('cadastro', { error: 'Por favor, preencha todos os campos', success: null });
  }

  if (senha != confirmacao_senha){
    return res.status(400).render('cadastro', { error: 'As senhas precisam ser iguais', success: null});
  }

  UserModel.cadastrarUsuario(nome, senha, (err, result) => {
    if (err) {
      console.log('Erro ao cadastrar usuário')
      return res.status(400).render('cadastro', {error: 'Erro ao cadastrar usuário.', success: null});
    } else {
      res.status(200).render('cadastro', {success: "Usuário cadastrado, redirecionando para a página de Login", error: null });
      //res.redirect('/index'); // Redireciona para a página de login após sucesso
    }
  });
}
