const connection = require('./connection');

const getAll = async () =>{
    const [produtos] = await connection.execute('SELECT*FROM produtos')
    return produtos;
};

const createProdutos = async (produtos) =>{
    const { titulo, descricao } = produtos;

    const query = 'INSERT INTO produtos(titulo, descricao) values (?, ?)';

    const [createProdutos] = await connection.execute(query, [titulo, descricao]);

    return {insertId:createProdutos.insertId};
}

const deleteProdutos = async(id)=>{
    const removedProdutos = await connection.execute('DELETE FROM produtos WHERE id=?',[id]);
    return removedProdutos;
}


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
    updateProdutos
};