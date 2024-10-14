const express = require('express');
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser");
const app = express();
require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// aqui eu estou dizendo ao express que estou usando o ejs como motor de visualização (engine view)
app.set('view engine', 'ejs');// para posteriormente transformar os arquivos ejs em um html dinâmico
app.set('views', './Views'); // defino em qual pasta o express deve procurar pelas views (templates ejs)

app.use(express.static('public')); // Para servir arquivos estáticos como CSS, imagens, etc.

function authentication(req, res, next) {
  const token =  req.cookies.token;
  const cookie = req.cookies;
  // Código HTTP 403 = Proibido
  if (!cookie) return res.status(403).send({ message: "Alguma coisa deu errado." });

  if (!token) {
    return res.status(401).send({ error: "Token não fornecido ou inválido", success: null });
  }

  // verifica se a assinatura do token é válida, de acordo com o TOKEN_KEY
    jwt.verify(token, process.env.TOKEN_KEY, res, (err, user) => {
      if (err) {
        if (err.message === "jwt expired"){
          return res.render('index', {error: "Token expirado, realize o login novamente", success: null});
        }
        return res.status(401).send(err);
      }
      next();
    });
  }

  module.exports = authentication;

  const userRoutes = require('./Routes/UserRoutes.js');
  //módulo de rotas
  app.use(userRoutes);

  // aqui eu defino que essa rota tem que ser conferida para saber se o usuário tem o token
  //app.use('/feed', authentication);


  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });