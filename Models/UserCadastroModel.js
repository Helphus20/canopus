const db = require('../Config/db');

exports.cadastrarUsuario = (nome, senha, callback) => {
  const queryString = 'INSERT into usuario(nome, senha) VALUES(?, ?)'
  db.query(queryString, [nome, senha], (err, result) => {
    callback(err, result);
  });
}

exports.confereUsuario = (nome, callback) => {
  const queryString = 'SELECT nome FROM canopus.usuario WHERE nome = ?'

  db.query(queryString, [nome], (err, result) => {
    callback(err, result);
  });
}