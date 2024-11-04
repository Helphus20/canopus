
const UserModel = require('../Models/UserLoginModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function confereUsuarioExiste (nome){
    try{
        const result = await UserModel.usuarioExiste(nome);
        if(result.length > 0){
            const usuario = {
                usuarioExiste: true,
                id : result[0].id
            }
            return usuario;
        }else{
            return {usuarioExiste: false};
        }


    }catch(err){
        console.error('Erro ao verificar usuário');
        throw err;
    }
    
}

async function autenticaUsuario(nome, senha) {
    try{
        const result = await UserModel.fazerLogin(nome);
        if (!result || result.length === 0) {
            throw new Error('Usuário não encontrado');
        }

        const senhaNoBanco = result[0].senha;

        const senhaCorreta = await comparaSenha(senha, senhaNoBanco);
        return senhaCorreta;
    }catch(err){
        console.error('Erro ao autenticar');
        throw err;
    }
}

async function comparaSenha(senha, hashSenhaBanco) {
    /*
        Esta função irá pegar a senha, transformar em um hash usando a mesma técnica do hash e o salts, 
        da senha que já está armazenada e comparar, para saber se os hashs finais são iguais.
        Obrigatoriamente, um hash sempre irá retornar um mesmo resultado, se a sua entrada, salts e método de hash
        forem os mesmos
    */
    try {
        if (!senha) {
            throw new Error('A Senha não pode estar vazia');
        }
        
        if (!senha || !hashSenhaBanco) {
            throw new Error("Senha e hash são obrigatórios para a comparação.");
        }

        //compare é uma função assíncrona, por isso await para aguardar a resolução da sua promise
        const senhaComHash = await bcrypt.compare(senha, hashSenhaBanco);
        return senhaComHash;
    } catch (error) {
        console.error('Erro ao comparar senhas: ', error)
        throw error;
    }
}

exports.fazerLogin = async (req, res) => {
    const {nome, senha} = req.body //recebe o nome e senha do formulário de login

    //verifica se os campos estão preenchidos
    if (!nome || !senha) {
        return res.status(400).render('index', { error: 'Por favor, preencha todos os campos para fazer o login', success: null });
    }

    try{
        const usuario = await confereUsuarioExiste(nome);

        //se o valor de usuárioExiste for falso, ele não existe na base de dados 
        if (usuario.usuarioExiste == false){
            return res.status(400).render('index', {error: 'O usuário digitado não existe', success: null});
        }

        // verifica se o usuário e senha do banco estão corretos
        const usuarioSenha = await autenticaUsuario(nome, senha)
        if (!usuarioSenha){
            return res.status(400).render('index', {error: 'Usuário ou senha incorretos', success: null });
        }

        //se todos os tratamentos de erro acima não forem cumpridos, significa que o usuário foi autenticado e será redirecionado para o seu feed
        
        /*
            jwt.sign vai gerar um token com subject no payload do jwt, armazenando o nome do usuário.
            TOKEN_KEY é uma string aleatória que vai ser usada para assinar o token e verificar a assinatura, para saber se n foi corrompido
            O último parâmetro indica que o token vai expirar em 2 minutos. Ou seja a próxima requisição que meu middleware receber vai 
            perceber que após o tempo de expiração, o token não será mais válido, não permitindo acesso à algumas partes do sistema
        */
        const token = jwt.sign({ sub: nome, subId: usuario.id }, process.env.TOKEN_KEY, { expiresIn: '10m' });

        /*
            armazena um cookie com nome token, e armazenando nesse cookie o token recém gerado. 
            Dentro do 3° arg. impede que o cookie seja acessado do lado do cliente, habilita o envio de cookies por HTTP 
            e define a duração máxima do cookie, no mesmo tempo que o token
        */
        res.cookie('token', token);
        return res.render('feed', { error: null, success: null });

    }catch(error){
        console.error('Erro no servidor:', error);
        res.status(500).render('index', { error: 'Erro no servidor', success: null });
    }
}