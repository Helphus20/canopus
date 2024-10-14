const UserModel = require('../Models/PostModel');
const upload = require('../script.js');

exports.fazerPostagem = async (req, res) => {
    const { legenda} = req.body
    const imagem = req.file;

    if (!imagem) {
        return res.status(400).render('newPost', { error: 'Não é possível fazer uma publicação sem uma imagem', success: null });
    }

    try{
        const caminhoImg = req.file.path;
        console.log(caminhoImg); // Caminho completo do arquivo salvo

        
        res.render('feed', {error: null, success: 'Imagem enviada!'});
    }catch{
        console.error('Erro no servidor:', error);
        res.status(500).render('feed', { error: 'Erro no servidor', success: null });
    }
}