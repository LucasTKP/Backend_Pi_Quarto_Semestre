const mongoose = require('mongoose');

require('dotenv').config()

const connectDatabase = () =>{
    mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nnrk6ri.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`
        )
        .then(()=>{
            console.log("Conexao efetuada com sucesso");
        })
        .catch((err)=>{
            console.log(err);
        })
}

module.exports={connectDatabase};
