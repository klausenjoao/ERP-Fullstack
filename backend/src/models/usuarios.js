const connection = require('./connection')

const getAllUsuariosModel = async () =>{
    const [usuarios] = await connection.execute('SELECT * FROM usuarios')
    return usuarios;
}

module.exports ={
    getAllUsuariosModel
}