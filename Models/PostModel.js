const db = require('../Config/db');

exports.fazerPostagem = (usuario_id, legenda, caminho_img, horario_post, callback) => {
  const queryString = 'INSERT into postagem(usuario_id, legenda, caminho_img, horario_postagem) VALUES(?, ?, ?, ?);'
  db.query(queryString, [usuario_id, legenda, caminho_img, horario_post], (err, result) => {
    callback(err, result);
  });
}

exports.confereUsuario = (nome, callback) => {
  const queryString = 'SELECT nome, id FROM canopus.usuario WHERE nome = ?'

  db.query(queryString, [nome], (err, result) => {
    callback(err, result);
  });
}