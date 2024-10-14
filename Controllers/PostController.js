const UserModel = require('../Models/PostModel');
const upload = require('../script.js');

exports.fazerPostagem = async (req, res) => {
    const {imagem, legenda} = req.body

    if (!imagem) {
        return res.status(400).render('index', { error: 'Não é possível fazer uma publicação sem uma imagem', success: null });
    }

    try{
    // Armazenar o caminho do arquivo
    upload.single('imagem')
    res.render('feed', {error: null, success: 'Imagem enviada!'});
    }catch{
        console.error('Erro no servidor:', error);
        res.status(500).render('index', { error: 'Erro no servidor', success: null });
    }
}