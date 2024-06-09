const Chuva = require('../models/chuva');
const dashboardService = {}

dashboardService.getAll = async function(){
    try {
        return await Chuva.find({});
    } catch (error) {
        console.log(error);
        return error;
    }
}

dashboardService.getDashboard = async function(dataInicial, dataFinal){

    try {

        const dados =  await Chuva.find({
            data: {
                $gte: dataInicial,
                $lt: dataFinal
            }
        });

        const valoresTemperatura = dados.map(temp => temp.temperatura);
        const valoresUmidade = dados.map(temp => temp.umidade);

        const jsonTemperatura = {
                "media": (valoresTemperatura.reduce((acc, curr) => acc + curr, 0) / valoresTemperatura.length).toFixed(2),
                "moda": calcularModa(valoresTemperatura),
                "mediana": calcularMediana(valoresTemperatura),
                "assimetria": calcularAssimetria(valoresTemperatura),
                "desvioPadrao": calcularDesvioPadrao(valoresTemperatura),
                "previsaoFutura": calcularPrevisaoFuturaTemperatura(dados)
        }

        const jsonsUmidade = {
            "media": (valoresUmidade.reduce((acc, curr) => acc + curr, 0) / valoresUmidade.length).toFixed(2),
            "moda": calcularModa(valoresUmidade),
            "mediana": calcularMediana(valoresUmidade),
            "assimetria": calcularAssimetria(valoresUmidade),
            "desvioPadrao": calcularDesvioPadrao(valoresUmidade),
            "previsaoFutura": calcularPrevisaoFuturaUmidade(dados)
        }

        const json = {
            "temperatura" : jsonTemperatura,
            "umidade": jsonsUmidade
        }

        return json;
        
    } catch (error) {
        console.log(error);
        return error;
    }

}


function calcularModa(valores) {
    const counts = {};
    valores.forEach(valor => {
        counts[valor] = (counts[valor] || 0) + 1;
    });
    let maxCount = 0;
    let moda = null;
    for (const [valor, count] of Object.entries(counts)) {
        if (count > maxCount) {
            maxCount = count;
            moda = valor;
        }
    }
    return moda;
}

// Função para calcular a mediana
function calcularMediana(valores) {
    const sorted = valores.sort((a, b) => a - b);
    const meio = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
        return ((sorted[meio - 1] + sorted[meio]) / 2).toFixed(2);
    } else {
        return sorted[meio].toFixed(2);
    }
}

// Função para calcular o desvio padrão
function calcularDesvioPadrao(valores) {
    const media = valores.reduce((acc, curr) => acc + curr, 0) / valores.length;
    const diffSquare = valores.map(val => Math.pow(val - media, 2));
    const avgSquareDiff = diffSquare.reduce((acc, curr) => acc + curr, 0) / diffSquare.length;
    return Math.sqrt(avgSquareDiff).toFixed(2);
}

// Função para calcular a assimetria
function calcularAssimetria(valores) {
    const media = valores.reduce((acc, curr) => acc + curr, 0) / valores.length;
    const n = valores.length;
    const sumCubedDiff = valores.reduce((acc, curr) => acc + Math.pow(curr - media, 3), 0);
    const desvioPadrao = Math.sqrt(valores.reduce((acc, curr) => acc + Math.pow(curr - media, 2), 0) / n);
    const assimetria = (n / ((n - 1) * (n - 2))) * (sumCubedDiff / Math.pow(desvioPadrao, 3));
    return assimetria.toFixed(2); 
}

function calcularPrevisaoFuturaTemperatura(temperaturas) {
    const x = [];
    const y = [];
    temperaturas.forEach(temp => {
        x.push(new Date(temp.data).getTime());
        y.push(temp.temperatura);
    });
    const n = x.length;
    const xAvg = x.reduce((acc, curr) => acc + curr, 0) / n;
    const yAvg = y.reduce((acc, curr) => acc + curr, 0) / n;
    let num = 0;
    let den = 0;
    for (let i = 0; i < n; i++) {
        num += (x[i] - xAvg) * (y[i] - yAvg);
        den += Math.pow((x[i] - xAvg), 2);
    }
    const slope = num / den;
    const intercept = yAvg - slope * xAvg;

    // Calcular a previsão para 1 dia no futuro
    const ultimaData = new Date(x[n - 1]);
    ultimaData.setDate(ultimaData.getDate() + 1);
    const previsao = (slope * ultimaData.getTime() + intercept).toFixed(2);
    return previsao;
}

function calcularPrevisaoFuturaUmidade(temperaturas) {
    const x = [];
    const y = [];
    temperaturas.forEach(temp => {
        x.push(new Date(temp.data).getTime());
        y.push(temp.umidade);
    });
    const n = x.length;
    const xAvg = x.reduce((acc, curr) => acc + curr, 0) / n;
    const yAvg = y.reduce((acc, curr) => acc + curr, 0) / n;
    let num = 0;
    let den = 0;
    for (let i = 0; i < n; i++) {
        num += (x[i] - xAvg) * (y[i] - yAvg);
        den += Math.pow((x[i] - xAvg), 2);
    }
    const slope = num / den;
    const intercept = yAvg - slope * xAvg;

    // Calcular a previsão para 1 dia no futuro
    const ultimaData = new Date(x[n - 1]);
    ultimaData.setDate(ultimaData.getDate() + 1);
    const previsao = (slope * ultimaData.getTime() + intercept).toFixed(2);
    return previsao;
}

module.exports = dashboardService