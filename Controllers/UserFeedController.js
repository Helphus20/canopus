const UserModel = require('../Models/FeedModel');


function confereCookie(req, res) {
    try {
        const token = req
    
        if (token) {
            console.error('Erro ao autenticar');
            return new Error;
        }

        console.log(req);

    } catch (err) {
        console.error(err);
        throw err
    }
}

exports.exibirFeed = async (req, res) => {
    await confereCookie();
}