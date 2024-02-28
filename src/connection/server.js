const express = require('express');
const cors = require('cors');
const db = require('../database/connectDb');
const routes = require('../routes/indexRouter');

const server = express();

server.use(cors());
server.use(express.json());

server.use(
    express.urlencoded({
        extended: true
    })
);

server.use(routes);

const initServer = ()=> {
    db.connectDatabase();
    server.listen(process.env.PORT || 3001,()=> console.log("Rodando na porta 3001"));
}

module.exports={initServer};