const express = require('express');
const {cadastrarUsuario} = require('../Controllers/UserController.js') //defino onde estão os métodos do arquivo de controller

const router = express.Router();

// Routes
router.get('/', (req, res) => {
    /*
        o método render é usado para processar templates dinâmicos, o sendfile não se aplicaria pq ele serve arquivos estáticos
        aqui é passado somente o nome index, pois em script.js eu defino qual é a pasta que o ejs (o motor de visualização que configurei para o express)
        vai usar para guardar as views. Nessa pasta, ele procura o arquivo index.ejs e renderiza
    */
    res.render('index');
});

router.get('/index', (req, res) => {
    res.render('index')
});

router.get('/cadastro', (req, res) => {
    //renderiza a pagina de cadastro
    res.render('cadastro', { 
        error: null,
        success: null
    }); 
});

/*
    Aqui eu defino que quando essa rota for requisitada, ela vai ser resolvida primeiramente para o controller, para o método cadastrarUsuario
*/ 
router.post('/cadastro', cadastrarUsuario)


module.exports = router;