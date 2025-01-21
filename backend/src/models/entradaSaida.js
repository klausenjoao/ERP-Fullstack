const connection = require('./connection');

const getAllEntradasSaidas = async () =>{
    const [entradasSaidas] = await connection.execute (`SELECT mov_id, mov_tipo, mov_data,usu_nome,
COALESCE(COUNT(mov_id), 0) AS quantidade_itens from movimentacaoAlmoxarifado
left JOIN movimentacao_item on mov_id=moi_mov_id
INNER JOIN usuarios on mov_usu_id=usu_id
GROUP BY mov_id;`)
    return entradasSaidas;
}

const getAllEntradasSaidasEspecifico = async (mov_id) =>{
    const [getEAespecifico] = await connection.execute('SELECT*FROM movimentacaoAlmoxarifado where mov_id=?',[mov_id])
    return getEAespecifico
}

const getAllProdutosEntradasSaidas = async (mov_id) =>{
    const [getProdutosEntadasSaidas] = await connection.execute(`
        SELECT
        id, titulo,
        COALESCE(COUNT(moi_prod_id), 0) AS quantidade_produtos
        from movimentacao_item
        INNER join movimentacaoAlmoxarifado on moi_mov_id=mov_id
        INNER JOIN produtos on moi_prod_id=id
        where mov_id=?
        GROUP BY moi_prod_id;
        `, [mov_id])
        return getProdutosEntadasSaidas;
}


const createEntradaSaida = async (entradasSaidas) =>{
        const { mov_tipo, mov_quantidade, mov_usu_id} = entradasSaidas;
    
        const query = 'INSERT INTO movimentacaoAlmoxarifado(mov_tipo, mov_quantidade, mov_usu_id) values (?, ?, ?)';
    
        const [createEntradaSaida] = await connection.execute(query, [mov_tipo, mov_quantidade, mov_usu_id]);
    
        return {insertId:createEntradaSaida.insertId};
}

module.exports = {
    getAllEntradasSaidas,
    getAllEntradasSaidasEspecifico,
    getAllProdutosEntradasSaidas,
    createEntradaSaida
}