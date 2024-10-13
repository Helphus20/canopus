const UserModel = require('../Models/UserLoginModel');

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

            if (result.length > 0){
                return resolve(true);
            }

            resolve(false);
        });
    });
}

exports.fazerLogin = async (req, res) => {
    const {nome, senha} = req.body 

    if (!nome || !senha) {
        return res.status(400).render('index', { error: 'Por favor, preencha todos os campos para fazer o login', success: null });
    }

    try{
        const usuarioExiste = await confereUsuarioExiste(nome);

    if (!usuarioExiste){
        return res.status(400).render('index', {error: 'O usuário digitado não existe', success: null});
    }

    const usuarioSenha = await autenticaUsuario(nome, senha)

    if (!usuarioSenha){
        return res.status(400).render('index', {error: 'Usuário ou senha incorretos', success: null });
    }

    res.redirect('/feed')
    }catch(error){
        console.error('Erro no servidor:', error);
        res.status(500).render('login', { error: 'Erro no servidor', success: null });
    }
}