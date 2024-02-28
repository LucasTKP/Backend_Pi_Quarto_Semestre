const mongoose = require('mongoose');

const Umidade = mongoose.model('Umidade',{
    umidade: String,
    unidadeMedida: String,
    data: String,
    hora: String,
    criado: {type: Date, default: Date.now() - 3*60*60*1000 }
});

module.exports = Umidade;