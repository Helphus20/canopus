const express = require('express');
const app = express();
const userRoutes = require('./Routes/UserRoutes.js');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//módulo de rotas
app.use(userRoutes);

// aqui eu estou dizendo ao express que estou usando o ejs como motor de visualização (engine view)
app.set('view engine', 'ejs');// para posteriormente transformar os arquivos ejs em um html dinâmico
app.set('views', './Views'); // defino em qual pasta o express deve procurar pelas views (templates ejs)

app.use(express.static('public')); // Para servir arquivos estáticos como CSS, imagens, etc.


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});