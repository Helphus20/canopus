const db = require('../Config/db');

exports.usuarioExiste = (nome, callback) => {
  const queryString = 'SELECT nome FROM canopus.usuario WHERE nome = ?';

  db.query(queryString, [nome], (err, result) => {
    callback(err, result);
  });
}

// procura no banco o usuario que tem o nome e a senha passados na view
exports.fazerLogin = (nome, senha, callback) => {
    const queryString = 'SELECT * FROM canopus.usuario WHERE nome = ? AND senha = ?';

    db.query(queryString, [nome, senha], (err, result) => {
        callback(err, result);
    })
}