const connection = require('./connection')

//Traz todos usuarios cadastrados
const getAllUsuarios = async () =>{
    const [usuarios] = await connection.execute('SELECT*FROM usuarios')
    return usuarios;
}

//Traz a quantidade total de usarios
const getTotal = async () =>{
    const [totalUsuarios] = await connection.execute (`SELECT COUNT(*) AS total FROM usuarios;`)
    return totalUsuarios;
  }

//Cria o usuario no banco
const createUsuarios = async (usuarios) =>{
    const {usu_nome, usu_login, usu_senha, usu_ativo} = usuarios;
    const dateFormatted = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const query = 'INSERT INTO usuarios(usu_nome, usu_login, usu_senha, usu_ativo, usu_datahoracadastro) values (?, ?, ?, ?, ?)';

    const [createUsuarios] = await connection.execute(query, [usu_nome, usu_login, usu_senha, usu_ativo, dateFormatted]);

    return {insertId:createUsuarios.insertId};
}

//Traz o usuario baseado no id
const getlUsuarioEspecifico = async (usu_id) =>{
    const [getUsuario] = await connection.execute('SELECT*FROM usuarios where usu_id=?',[usu_id])
    return getUsuario
}

//deleta o usuario baseado no id
const deleteUsuarios = async (usu_id) =>{
    const removedUsuarios = await connection.execute('DELETE from usuarios where usu_id=?',[usu_id])
    return removedUsuarios
}

//Atualiza o usuario, editar
const updateUsuario = async(usu_id, usuarios)=>{
    const {usu_nome, usu_login, usu_senha, usu_ativo}= usuarios;

    const query = 'UPDATE usuarios SET usu_nome=?, usu_login=?, usu_senha=?, usu_ativo=? WHERE usu_id=?';

    const updateUsuario = await connection.execute(query, [usu_nome, usu_login, usu_senha, usu_ativo, usu_id]);
    return updateUsuario;
}

module.exports ={
    getAllUsuarios,
    createUsuarios,
    getlUsuarioEspecifico,
    deleteUsuarios,
    updateUsuario,
    getTotal
}