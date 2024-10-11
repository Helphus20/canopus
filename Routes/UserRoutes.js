const express = require('express');
const path = require('path')
const { getAllUsers } = require('../Controllers/UserController');

const router = express.Router();

// Routes
router.get('/', (req, res) => {
    res.render('index'); // o método render é usado para processar templates dinâmicos, o sendfile não se aplicaria pq ele serve arquivos estáticos

});

router.get('/cadastro', (req, res) => {
    res.render('cadastro');
})

router.get('/users', getAllUsers);

module.exports = router;