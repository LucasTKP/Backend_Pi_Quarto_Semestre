const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateToken = (req, res, next) =>{

    const token = req.header('Authorization');

    if(!token) res.status(401).json({mensagem:"Não foi informado o token no Header da requisição"});

    try {

        const decoded = jwt.verify(token, process.env.KEY_TOKEN);
        req.userId = decoded.userId;
        next();
        
    } catch (error) {
        
        res.status(401).json({mensagem: "Token inválido! " + error})

    }

}

module.exports = validateToken;