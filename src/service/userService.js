const User = require('../models/user');
const userService = {};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

userService.createUser = async (user)=> {

    try {

        const usuario = await User.create(user);
        var usuarioCriado;

        if(usuario){

            const token = jwt.sign({userId: usuario._id}, process.env.KEY_TOKEN,{
                expiresIn: '1800s'
            });

            usuarioCriado = {
                "nome": usuario.nome,
                "email": usuario.email,
                "token": token
            }
        }

        return usuarioCriado;
        
    } catch (error) {
        
        console.log(error);
        return error;

    }

}

userService.loginUser = async (user)=> {

    try {

        const {email, senha} = user;
        const usuario = await User.findOne({email});
        var usuarioLogado = null;
        
        if(usuario){

            const matchPassword = await bcrypt.compare(senha, usuario.senha)

            if(matchPassword){

                await User.findByIdAndUpdate(usuario._id, {
                    ultimoLogin :Date.now() - 3*60*60*1000
                },{
                    new: true,
                    returnOriginal: false
                })

                const token = jwt.sign({userId: usuario._id}, process.env.KEY_TOKEN,{
                    expiresIn: '1800s'
                })

                
                usuarioLogado ={
                    nome: usuario.nome,
                    email: usuario.email,
                    token : token
                }

            }
        }

        return usuarioLogado;
        
    } catch (error) {
        
        console.log(error);
        return error;

    }

}

userService.resetPassword = async (user)=> {

    try {

        const {email, senhaAtual, senhaNova}= user;
        const usuario = await User.findOne({email});
        var usuarioResetSenha = null;

        if(usuario){

            const matchPassword =  bcrypt.compare(senhaAtual, usuario.senha);
            const hashedPassword = await bcrypt.hash(senhaNova, 10);

            if(matchPassword){

                await User.findOneAndUpdate(usuario._id, {
                    senha: hashedPassword
                },{
                    new: true,
                    returnOriginal: false
                });

                const token = jwt.sign({userId: usuario._id}, process.env.KEY_TOKEN,{
                    expiresIn: '1800s'
                })

                
                usuarioResetSenha ={
                    nome: usuario.nome,
                    email: usuario.email,
                    token : token
                }

            }

        }

        return usuarioResetSenha;
        
    } catch (error) {
        
        console.log(error);
        return error;

    }
    
}

userService.verifyUserExists = async function (email){

    try {
        
        const usuario = await User.findOne({email});
        return usuario;

    } catch (error) {
        
        console.log(error);
        return error;

    }

}

module.exports = userService;