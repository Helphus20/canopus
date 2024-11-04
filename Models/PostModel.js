const db = require('../Config/db');

exports.fazerPostagem = (usuario_id, legenda, caminho_img, horario_post) => {
  return new Promise((resolve, reject) => {
    const queryString = 'INSERT into postagem(usuario_id, legenda, caminho_img, horario_postagem) VALUES(?, ?, ?, ?);'

    db.query(queryString, [usuario_id, legenda, caminho_img, horario_post], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

exports.confereUsuario = (nome) => {
  return new Promise((resolve, reject) => {
    const queryString = 'SELECT nome, id FROM canopus.usuario WHERE nome = ?'

    db.query(queryString, [nome], (err, result) => {
      if (err) return reject (err);
      resolve(result);
    });
  });
};