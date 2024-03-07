const controller = {};
const bcrypt = require('bcrypt');
const userService = require('../service/userService')

controller.createUser = async function(req, res){

    try{

        const {nome, email, senha}= req.body;
        if(!nome || !email || !senha) res.status(422).json({mensagem: "Devem ser informados campos de Nome, Email e Senha."})

        const hashedPassword = await bcrypt.hash(senha, 10);
        const novoUser = {nome, email, senha : hashedPassword};

        const userExistente = await userService.verifyUserExists(email);

        if(userExistente){

            res.status(409).json({"mensagem": `Já existe um usuário cadastrado com o email ${email}`});

        }else{

            const user = await userService.createUser(novoUser);

            if(user){

                res.status(201).json(user);
    
            }
            else{
    
                res.status(401).json({"mensagem": "Falha ao criar o usuário."});
    
            }
        }

    }catch(error){

        console.log(error);
        res.status(500).json({"mensagem":error});

    }

}

controller.loginUser = async function(req, res){

    try{

        const {email, senha} = req.body;
        if(!email || !senha) res.status(422).json({mensagem: "Devem ser informados o valor do email e senha."})

        const logarUsuario = {email, senha};
        const usuario = await userService.loginUser(logarUsuario);

        if(usuario === null){

            res.status(401).json({mensagem: "Usuário ou senha inválidos."})

        } else{
            
            res.status(200).json(usuario)

        }

    }catch(error){

        console.log(error);
        res.status(500).json({"mensagem":error});
        
    }

}

controller.resetPassword = async function(req, res){

    try{

        const {email, senhaAtual, senhaNova} = req.body;
        if(!email && !senhaAtual && !novaSenha) res.status(422).json({"mensagem":"Devem ser informados os campos de email, senha atual e nova senha."});

        const userResetSenha = {email, senhaAtual, senhaNova};
        const usuario = await userService.resetPassword(userResetSenha);

        if(usuario == null){

            res.status(401).json({mensagem: "Email ou senha atual inválidos."})

        } else{
            
            res.status(200).json(usuario)

        }
        

    }catch(error){

        console.log(error);
        res.status(500).json({"mensagem":error});
        
    }

}

module.exports= controller;