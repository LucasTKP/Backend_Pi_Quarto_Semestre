const mongoose = require('mongoose');

const Chuva = mongoose.model('resumo',{
    temperatura: Number,
    umidade: Number,
    data: Date,
    hora: String,
    choveu: Number
});

module.exports = Chuva;