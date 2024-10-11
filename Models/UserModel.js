const db = require('../Config/db');

exports.getAll = (callback) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    callback(err, results);
  });
};