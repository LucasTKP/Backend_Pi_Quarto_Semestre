const controller = {};
const temperaturaService = require('../service/temperaturaService');

const {getDataAtual} = require('../util/dateUtil');
const {getHoraAtual} = require('../util/timeUtil');

controller.getTemperaturaAtual = async function(req, res){
    
    try{

        const temp = await temperaturaService.getTemperaturaAtual();
        res.status(200).json(temp)

    }catch(error){

        console.log(error);
        res.status(500).json({"erro:": error});

    }

}

controller.getTemperaturaHistorico = async function(req, res){

    try{

        const temp = await temperaturaService.getTemperaturaHistorico();
        res.status(200).json(temp)

    }catch(error){

        console.log(error);
        res.status(500).json({"erro:": error});

    }
}

controller.createTemperaturaIOT = async function (req, res){

    const {temperatura, unidadeMedida} = req.query;
    const data = getDataAtual();
    const hora = getHoraAtual();

    if(!temperatura && !unidadeMedida) return res.status(422).json({"erro": "Dever ser informado o valor da temperatura e a unidade de medida."});

    const temperaturaObj ={
        temperatura,
        unidadeMedida,
        data,
        hora
    }

    try{

        const temp = await temperaturaService.createTemperatura(temperaturaObj);
        res.status(201).json(temp);

    }catch(error){

        console.log(error);
        res.status(500).json({"erro": error});

    }

}

module.exports = controller;