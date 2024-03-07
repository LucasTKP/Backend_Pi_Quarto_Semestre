const mongoose = require('mongoose');

const User = mongoose.model('User', {
    nome : {type:String, required : true},
    email : {type: String, required: true, unique: true},
    senha : {type: String, required: true},
    ultimoLogin: {type: Date, default: Date.now() - 3*60*60*1000 },
    criado: {type: Date, default: Date.now() - 3*60*60*1000 }
});

module.exports = User;