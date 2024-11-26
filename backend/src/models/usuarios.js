const connection = require('./connection')

const getAllUsuarios = async () =>{
    const [usuarios] = await connection.execute('SELECT*FROM usuarios')
    return usuarios;
}

const createUsuarios = async (usuarios) =>{
    const {usu_nome, usu_login, usu_senha} = usuarios;
    const dateFormatted = new Date().toISOString().slice(0, 19).replace('T', ' ');

    console.log("Data formatada para inserção no banco:", dateFormatted);


    const query = 'INSERT INTO usuarios(usu_nome, usu_login, usu_senha, usu_datahoracadastro) values (?, ?, ?, ?)';

    const [createUsuarios] = await connection.execute(query, [usu_nome, usu_login, usu_senha, dateFormatted]);

    return {insertId:createUsuarios.insertId};
}

const deleteUsuarios = async (usu_id) =>{
    const removedUsuarios = await connection.execute('DELETE from usuarios where usu_id=?',[usu_id])
    return removedUsuarios
}

module.exports ={
    getAllUsuarios,
    createUsuarios,
    deleteUsuarios
}