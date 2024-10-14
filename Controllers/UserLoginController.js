
const UserModel = require('../Models/UserLoginModel');
const jwt = require('jsonwebtoken');

function confereUsuarioExiste (nome){
    return new Promise((resolve, reject) =>{
        UserModel.usuarioExiste(nome, (err, result) => {
        if(err){
            console.error('Erro ao verificar usuário');
            return reject(err);
        }

        // se essa condição é cumprida, significa que o usuário existe
        if(result.length > 0){
            return resolve(true);
        }
        
        //retorna false caso não consiga encontrar o usuário 
        resolve(false);
        });
    });
}

function autenticaUsuario (nome, senha){
    return new Promise((resolve, reject) =>{
        UserModel.fazerLogin(nome, senha, (err, result) => {
            if (err){
                console.error('Erro ao autenticar');
                return reject(err);
            }

            //se encontrar o usuário que tem o nome e a senha corretos, significa que o usuário e senha estão corretos
            if (result.length > 0){
                return resolve(true);
            }

            resolve(false);
        });
    });
}

exports.fazerLogin = async (req, res) => {
    const {nome, senha} = req.body 

    //verifica se os campos estão preenchidos
    if (!nome || !senha) {
        return res.status(400).render('index', { error: 'Por favor, preencha todos os campos para fazer o login', success: null });
    }

    try{
        const usuarioExiste = await confereUsuarioExiste(nome);

        //se o valor de usuárioExiste for falso, ele não existe na base de dados 
        if (!usuarioExiste){
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
        const token = jwt.sign({ sub: nome }, process.env.TOKEN_KEY, { expiresIn: '10m' });

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