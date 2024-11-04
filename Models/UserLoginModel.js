const db = require('../Config/db');

exports.usuarioExiste = (nome) => {
  return new Promise((resolve,reject) =>{
    const queryString = 'SELECT nome, id FROM canopus.usuario WHERE nome = ?';
  
    db.query(queryString, [nome], (err, result) => {
      if (err) return reject (err);
      resolve(result);
    });
  });
};

// procura no banco o usuario que tem o nome e a senha passados na view
exports.fazerLogin = (nome) => {
  return new Promise ((resolve, reject) => {
    const queryString = 'SELECT * FROM canopus.usuario WHERE nome = ?';
  
    db.query(queryString, [nome], (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};