const db = require('../Config/db');

exports.getAll = (callback) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    callback(err, results);
  });
};

exports.cadastrarUsuario = (nome, senha, callback) => {
  const queryString = 'INSERT into usuario(nome, senha) VALUES(?, ?)'
  db.query(queryString, [nome, senha], (err, result) => {
    callback(err, result);
  });
}

exports.confereUsuario = (callback) => {
  const queryString = 'SELECT * FROM canopus.usuario WHERE nome = ?'
  
  db.query(queryString), [nome], (err, result) => {
    callback(err, result);
  }
}