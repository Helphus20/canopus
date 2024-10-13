const UserModel = require('../Models/UserCadastroModel');

/*
  Depois de ser redirecionado pelo router, o controller chama o método cadastrarUsuario do arquivo definido para model,
  Executa a query e trata o resultado o erro
  Após isso, redireciona para a página de login
*/

//Função para conferir se o usuário já existe no banco

function confereUsuario(req, res, nome){
  return new Promise((resolve, reject) => {
    UserModel.confereUsuario(nome, (err, result) => {
      if(err){
        console.error('Erro ao verificar o usuário:', err);
        return reject(err); // Rejeita a promessa em caso de erro
      }     

      if (result.length > 0){
        return resolve(true); // Resolve com true se o usuário já existe
      }

      resolve(false); // Resolve com false se o usuário não existe
    });
  });
}

/*
  async indica que se trata de uma função assíncrona, ou seja, uma função que não bloqueia o fluxo de execução do programa.
  Toda função com async sempre retorna uma promise, neste sentido, o await usado abaixo vai esperar o retorno dessa promisse para prosseguir

*/
 exports.cadastrarUsuario = async (req, res) => {
  const { nome, senha, confirmacao_senha } = req.body; // sintaxe de desestruturação

    /*
    Caso o usuário não tenha preenchido os 3 campos, retorna o código http 400.
    Esse código (400) indica que o servidor não pode ou não irá processar a requisição devido a alguma coisa que foi entendida como um erro 
    do lado do cliente. Junto com o código http, o método render irá renderizar a página cadastro, localizada em Views,
    e envia um objeto contendo o atributo error, que será a mensagem a ser exibida no front
  */
  if (!nome || !senha || !confirmacao_senha) {
    return res.status(400).render('cadastro', { error: 'Por favor, preencha todos os campos', success: null });
  }

  try {
    // Verifica se o usuário já existe, avisando para o interpretador só prosseguir com as próximas linhas depois do retorno da Promise
    const usuarioExistente = await confereUsuario(req, res, nome);

    if (usuarioExistente) {
      return res.status(400).render('cadastro', { error: 'Esse usuário já existe, digite outro nome de usuário', success: null });
    }

    if (senha !== confirmacao_senha){
      return res.status(400).render('cadastro', { error: 'As senhas precisam ser iguais', success: null });
    }

    // Se tudo estiver ok, cadastrar o usuário
    UserModel.cadastrarUsuario(nome, senha, (err, result) => {
      if (err) {
        console.log('Erro ao cadastrar usuário');
        return res.status(400).render('cadastro', { error: 'Erro ao cadastrar usuário.', success: null });
      } else {
        res.status(200).render('cadastro', { success: "Usuário cadastrado, redirecionando para a página de Login", error: null });
      }
    });

  } catch (error) {
    console.error('Erro no servidor:', error);
    return res.status(500).render('cadastro', { error: 'Erro no servidor', success: null });
  }
}