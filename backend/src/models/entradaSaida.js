const connection = require('./connection');

const getAllEntradasSaidas = async () =>{
    const [entradasSaidas] = await connection.execute ('select*from movimentacaoAlmoxarifado')
    return entradasSaidas;
}

module.exports = {
    getAllEntradasSaidas
}