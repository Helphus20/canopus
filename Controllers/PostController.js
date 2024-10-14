const UserModel = require('../Models/PostModel');
const upload = require('../script.js');

function criaPostagem (usuario_id, legenda, caminho_img, horario_post){
    return new Promise((resolve, reject) => {
        //INSERT into postagem(usuario_id, legenda, caminho_img, horario_post) VALUES(?, ?, ?, ?);
        UserModel.fazerPostagem(usuario_id, legenda, caminho_img, horario_post, (err, result) => {
            if (err) {
                console.log('Erro ao fazer postagem ;(');
                return reject(err)
              } else {
                return resolve(result);
                //resolve('feed', {error: null, success: 'Imagem enviada!'});
              }
        });
    });
}

function getCurrentDatetime() {
    return new Date().toISOString().replace('T', ' ').substring(0, 19);
}

exports.fazerPostagem = async (req, res) => {
    const {legenda} = req.body
    const imagem = req.file;
    const horario_post = getCurrentDatetime();

    if (!imagem) {
        return res.status(400).render('newPost', { error: 'Não é possível fazer uma publicação sem uma imagem', success: null });
    }

    try{
        const caminho_img = req.file.path;
        console.log(caminho_img);
        const usuario_id = req.user.subId; // Acessando o ID do usuário aqui
        const post = await criaPostagem(usuario_id, legenda, caminho_img, horario_post);

        if (!post){
            return res.status(400).render('newPost', {error: 'Não foi possível realizar a publicação', success: null });
        }

        res.render('feed', {erro: null, success: 'Post enviado com sucesso!'});
    }catch(error) {
        console.error('Erro no servidor:', error);
        res.status(500).render('feed', { error: 'Erro no servidor', success: null });
    }
}
