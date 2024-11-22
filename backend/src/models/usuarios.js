const connection = require('./connection')

const getAllUsuarios = async () =>{
    const [usuarios] = await connection.execute('SELECT * FROM usuarios')
    return usuarios;
}

const createUsuarios = async (usuarios) =>{
    const {usu_nome, usu_login, usu_senha} = usuarios;
    const dateFormatted = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const query = 'INSERT INTO usuarios(usu_nome, usu_login, usu_senha, usu_datahoracadastro) values (?, ?, ?, ?)';

    const [createUsuarios] = await connection.execute(query, [usu_nome, usu_login, usu_senha, dateFormatted]);

    return {insertId:createUsuarios.insertId};
}

module.exports ={
    getAllUsuarios,
    createUsuarios
}