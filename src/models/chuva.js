const mongoose = require('mongoose');

const Chuva = mongoose.model('analise',{
    temperatura: Number,
    umidade: Number,
    data: Date,
    hora: String,
    choveu: Boolean
});

module.exports = Chuva;