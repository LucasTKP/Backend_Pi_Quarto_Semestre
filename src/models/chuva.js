const mongoose = require('mongoose');

const Chuva = mongoose.model('analise_chuva',{
    temperatura: Number,
    umidade: Number,
    data: Date,
    hora: String,
    choveu: Boolean
});

module.exports = Chuva;
