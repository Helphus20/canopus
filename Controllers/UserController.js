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