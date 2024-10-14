const express = require('express');
const {cadastrarUsuario} = require('../Controllers/UserCadastroController.js'); //defino onde estão os métodos do arquivo de controller
const {fazerLogin} = require('../Controllers/UserLoginController.js');
const {fazerPostagem} = require('../Controllers/PostController.js');
const router = express.Router();
const {authentication} = require('../script.js'); // Importa o upload configurado no script.js

/*
    o método render é usado para processar templates dinâmicos, o sendfile não se aplicaria pq ele serve arquivos estáticos
    aqui é passado somente o nome index, pois em script.js eu defino qual é a pasta que o ejs (o motor de visualização que configurei para o express)
    vai usar para guardar as views. Nessa pasta, ele procura o arquivo index.ejs e renderiza
*/
router.get('/', (req, res) => {
    res.render('index', {
        error: null,
        success: null
    });
});

router.get('/index', (req, res) => {
    res.render('index', {
        error: null,
        success: null
    });
});

router.get('/cadastro', (req, res) => {
    //renderiza a pagina de cadastro
    res.render('cadastro', { 
        error: null,
        success: null
    }); 
});

// Aqui adiciono o middleware de autenticação diretamente na rota
router.get('/feed', authentication, (req, res) => {
    res.render('feed', {
        error: null,
        success: null
    });
});

router.get('/newPost', authentication, (req, res) => {
    res.render('newPost', {
        error: null,
        success: null
    });
});

/*
    quando essa rota é requisitada, chama nessa ordem: o middleware que garante que o usuário está autenticado, a constante upload 
    no arquivo script.js, que salva a imagem num caminho e com um nome específico.

*/
    router.post('/newPost', authentication, upload.single('imagem'), fazerPostagem);
/*
    Aqui eu defino que, quando essa rota for requisitada, ela vai ser resolvida primeiramente para o controller, para o método cadastrarUsuario
*/ 
router.post('/cadastro', cadastrarUsuario);

router.post('/feed', fazerLogin);

module.exports = router;