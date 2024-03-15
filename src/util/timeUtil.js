const getHoraAtual = () => {

    const dataAtual = new Date();
    const hora = dataAtual.getHours() - 3;
    const minuto = dataAtual.getMinutes();
    const minutoAtt = minuto < 10 ? '0' : '';
    const horaFormatada = `${hora}:${minutoAtt}${minuto}`;

    return horaFormatada;

}

module.exports = {getHoraAtual};