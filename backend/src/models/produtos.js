const connection = require('./connection');


//Busca todos produtos no banco
const getAll = async () =>{
    const [produtos] = await connection.execute('SELECT*FROM produtos')
    return produtos;
};

//Busca um produto especifico com base no id
const getProdutoEspecifico = async (id) =>{
    const [getProduto] = await connection.execute('SELECT*FROM produtos where id=?',[id])
    return getProduto
}

//Traz a quantidade total de produtos cadastrados
const getTotal = async () =>{
    const [totalProdutos] = await connection.execute (`SELECT COUNT(*) AS total FROM produtos;`)
    return totalProdutos;
  }

//Inseri o produto
const createProdutos = async (produtos) =>{
    const { titulo, descricao } = produtos;

    const query = 'INSERT INTO produtos(titulo, descricao) values (?, ?)';

    const [createProdutos] = await connection.execute(query, [titulo, descricao]);

    return {insertId:createProdutos.insertId};
}

//Deleta o produto baseado no id
const deleteProdutos = async(id)=>{
    const removedProdutos = await connection.execute('DELETE FROM produtos WHERE id=?',[id]);
    return removedProdutos;
}

//Atualiza o produto, edita
const updateProdutos = async(id, produtos)=>{
    const {titulo, descricao}= produtos;

    const query = 'UPDATE produtos SET titulo=?, descricao=? WHERE id=?';

    const updatedProdutos = await connection.execute(query, [titulo, descricao, id]);
    return updatedProdutos;
}

module.exports = {
    getAll,
    createProdutos,
    deleteProdutos,
    updateProdutos,
    getProdutoEspecifico,
    getTotal
};