const UserModel = require('../Models/PostModel');
const upload = require('../script.js');

async function criaPostagem(usuario_id, legenda, caminho_img, horario_post) {
    try {
        await UserModel.fazerPostagem(usuario_id, legenda, caminho_img, horario_post)
        return true;
    } catch (err) {
        console.error('Erro ao fazer postagem', err);
        throw err;
    }
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

        res.render('feed', {error: null, success: 'Post enviado com sucesso!'});
    }catch(error) {
        console.error('Erro no servidor:', error);
        res.status(500).render('feed', { error: 'Erro no servidor', success: null });
    }
}
