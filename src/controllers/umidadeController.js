const controller = {};
const umidadeService = require('../service/umidadeService')

const {getDataAtual} = require('../util/dateUtil');
const {getHoraAtual} = require('../util/timeUtil');

controller.getUmidadeAtual = async function(req, res){
    
    try {
        
        const umid = await umidadeService.getUmidadeAtual();
        res.status(200).json(umid)

    } catch (error) {
        
        console.log(error);
        res.status(500).json({"erro":error})

    }

}

controller.getUmidadeHistorico = async function(req, res){
    
    try {
        
        const umid = await umidadeService.getUmidadeHistorico();
        res.status(200).json(umid)

    } catch (error) {
        
        console.log(error);
        res.status(500).json({"erro":error})

    }

}

controller.createUmidadeIOT = async function(req, res){

    const {umidade, unidadeMedida} = req.query;
    const data = getDataAtual();
    const hora = getHoraAtual();

    if(!umidade && !unidadeMedida) return res.status(422).json({"erro": "Dever ser informado o valor da umidade e a unidade de medida."});

    const umidadeObj ={
        umidade,
        unidadeMedida,
        data,
        hora
    }

    try{

        const umid = await umidadeService.createUmidade(umidadeObj);
        res.status(201).json(umid);

    }catch(error){

        console.log(error);
        res.status(500).json({"erro": error});

    }

}

module.exports = controller;