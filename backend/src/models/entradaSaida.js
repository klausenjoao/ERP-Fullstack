const connection = require('./connection');

const getAllEntradasSaidas = async () =>{
    const [entradasSaidas] = await connection.execute (`SELECT mov_id, mov_tipo, mov_data,usu_nome,
COALESCE(COUNT(mov_id), 0) AS quantidade_itens from movimentacaoAlmoxarifado
left JOIN movimentacao_item on mov_id=moi_mov_id
left JOIN usuarios on mov_usu_id=usu_id
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
        const { mov_tipo} = entradasSaidas;
    
        const query = 'INSERT INTO movimentacaoAlmoxarifado(mov_tipo) values (?)';
    
        const [createEntradaSaida] = await connection.execute(query, [mov_tipo]);
    
        return {insertId:createEntradaSaida.insertId};
}

//INSERE OS PRODUTOS JUNTO COM O ID DA MOVIMENTACAO NA MOVIMENTACAO_ITEM
const createEntradasSaidasSelecionados = async (entradasSaidas) => {
    const { moi_prod_id } = entradasSaidas;
  
    if (!Array.isArray(moi_prod_id)) {
      throw new Error("O campo 'moi_prod_id' deve ser um array.");
    }
  
    const query2 = 'SELECT mov_id FROM movimentacaoAlmoxarifado ORDER BY mov_id DESC LIMIT 1';
    const [movimentacao] = await connection.execute(query2);

    const moi_mov_id = movimentacao[0].mov_id;

  
    const query = 'INSERT INTO movimentacao_item (moi_mov_id, moi_prod_id) VALUES (?, ?)';

  
    // Loop para inserir um ou mai produtos na movimentacao_item
    const insertResults = await Promise.all(
      moi_prod_id.map(async (moi_prod_id) => {
        const [result] = await connection.execute(query, [moi_mov_id, moi_prod_id]);
        return result.insertId; 
      })
    );
    return { insertIds: insertResults }; 
  };
  

module.exports = {
    getAllEntradasSaidas,
    getAllEntradasSaidasEspecifico,
    getAllProdutosEntradasSaidas,
    createEntradaSaida,
    createEntradasSaidasSelecionados
}