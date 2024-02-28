const Temperatura = require('../models/temperatura');
const temperaturaService= {}

temperaturaService.createTemperatura = async (temperatura) =>{
    
    try{

        const temp = await Temperatura.create(temperatura);
        return temp;

    }catch(error){

        console.log(error);
        return error;

    }

}

temperaturaService.getTemperaturaHistorico = async () =>{

    try{

        const temp = await Temperatura.find();
        return temp;

    }catch(error){

        console.log(error);
        return error;

    }

}

temperaturaService.getTemperaturaAtual = async () =>{

    try{

        const temp = await Temperatura.findOne({},{},{
            sort:{ 'criado': -1}
        });
        return temp;

    }catch(error){

        console.log(error);
        return error;

    }

}

module.exports = temperaturaService;