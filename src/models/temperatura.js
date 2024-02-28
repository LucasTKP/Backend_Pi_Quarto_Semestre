const mongoose = require('mongoose');

const Temperatura = mongoose.model('Temperatura',{
    temperatura: String,
    unidadeMedida: String,
    data: String,
    hora: String,
    criado: {type: Date, default: Date.now() - 3*60*60*1000 }
});

module.exports = Temperatura;