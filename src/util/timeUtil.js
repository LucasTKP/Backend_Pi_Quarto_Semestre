const getHoraAtual = () => {

    const dataAtual = new Date();
    const hora = dataAtual.getHours();
    const minuto = dataAtual.getMinutes();
    const horaFormatada = `${hora}:${minuto}`

    return horaFormatada;

}

module.exports = {getHoraAtual};