const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'aluno',
  password: 'aluno',
  database: 'canopus'
});

/*
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'canopus'
});
*/
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar com database: ', err);
    return;
  }
  console.log('Conectado com sucesso!');
});
module.exports = connection;