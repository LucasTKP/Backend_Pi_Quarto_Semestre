const Umidade = require('../models/umidade')
const umidadeService = {}

umidadeService.createUmidade = async (umidade) =>{
    
    try{

        const umid = await Umidade.create(umidade);
        return umid;

    }catch(error){

        console.log(error);
        return error;

    }

}

umidadeService.getUmidadeHistorico = async () =>{

    try{

        const umid = await Umidade.find();
        return umid;

    }catch(error){

        console.log(error);
        return error;

    }

}

umidadeService.getUmidadeAtual = async () =>{

    try{

        const umid = await Umidade.findOne({},{},{
            sort:{ 'criado': -1}
        });
        return umid;

    }catch(error){

        console.log(error);
        return error;

    }

}

module.exports = umidadeService;