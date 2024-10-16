const express = require('express');
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser");
const app = express();
require('dotenv').config();
const multer = require('multer');// uma biblioteca que facilita a manipulação de uploads de arquivos
const path = require('path');

/* 
  Configurando a pasta onde os uploads de imagens serão armazenados
  O multer faz 3 coisas: 1° ele salva o arquivo como configurado no meu servidor, 
  2° transforma o arquivo em um objeto chamado req.file para conseguir manipular melhor no meu controller
*/
const storage = multer.diskStorage({ //método de multer que define como e onde os arquivos serão armazenados
  destination: function (req, file, callback) {
      callback(null, 'uploads/'); // Defina a pasta onde os arquivos serão armazenados
  },
  filename: function (req, file, callback) {
      // Renomeia o arquivo para evitar conflitos, adicionando a data/hora atual e o nome original do arquivo
      callback(null, Date.now() + path.extname(file.originalname));
  }
});

// Criando o middleware de upload com as configurações acima
const upload = multer({ storage: storage });

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
  if (!cookie) return res.status(403).render('index', { error: 'Alguma coisa deu errado.', success: null });

  if (!token) {
    return res.status(401).render('index', { error: "Token não fornecido ou inválido", success: null });
  }

  // verifica se a assinatura do token é válida, de acordo com o TOKEN_KEY
    jwt.verify(token, process.env.TOKEN_KEY, res, (err, user) => {
      if (err) {
        if (err.message === "jwt expired"){
          return res.render('index', {error: "Token expirado, realize o login novamente", success: null});
        }
        return res.status(401).send(err);
      }

      usuarioId = user.subId

      if (!usuarioId){
        return res.status(401).send({ error: "ID do usuário não encontrado no token", success: null });
      }

      req.user = user;
      next();
    });
  }

  module.exports = { upload, authentication };

  const userRoutes = require('./Routes/UserRoutes.js');
  //módulo de rotas
  app.use(userRoutes);

  // aqui eu defino que essa rota tem que ser conferida para saber se o usuário tem o token
  //app.use('/feed', authentication);


  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });