const controller = {}
const service = require('../service/dashboardService');

controller.getDashboard = async function (req, res) {
    try {
        
        const { dataInicial, dataFinal } = req.query;
        if (!dataInicial || !dataFinal) {
            return res.status(400).json({ "mensagem": "É necessário fornecer dataInicial e dataFinal na query." });
        }

        const dataInicialDate = new Date(converterDataFormato(dataInicial));
        const dataFinalDate = new Date(converterDataFormato(dataFinal));

        if (isNaN(dataInicialDate.getTime()) || isNaN(dataFinalDate.getTime())) {
            return res.status(400).json({ "mensagem": "Formato de data inválido. Use o formato 'DD/MM/YYYY'." });
        }

        dataFinalDate.setDate(dataFinalDate.getDate() + 1);

        const dados = await service.getDashboard(dataInicialDate, dataFinalDate);
        
        if(dados) return res.status(200).send(dados)
        else return res.status(404).json({"mensagem": "Nenhum dado encontrado"})


    } catch (error) {
        
        console.log(error);
        res.status(500).json({"mensagem": error});

    }
}

function converterDataFormato(dataString) {
    const partes = dataString.split('/');
    if (partes.length !== 3) {
        throw new Error("Formato de data inválido. Use o formato 'DD/MM/YYYY'.");
    }
    // Partes[0] é o dia, partes[1] é o mês e partes[2] é o ano
    return partes[1] + '/' + partes[0] + '/' + partes[2];
}

module.exports = controller;