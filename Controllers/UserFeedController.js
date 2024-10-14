


function confereCookies (req, res){
    return new Promise((resolve, reject) => {
        if(err){
            console.error('Erro ao autenticar');
            return reject(err);
        }
    
        const cookie = req.cookies;
        if (!cookie){
            res.status(403);
            return res.render('index', { error: "Erro nos cookies", success: null });
        } 
    });
}