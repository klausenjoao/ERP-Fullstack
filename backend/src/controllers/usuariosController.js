const usuariosModel = require('../models/usuarios')

const getAllUsuarios = async (request, response) => {

    const usuarios = await usuariosModel.getAllUsuariosModel()

    return response.status(200).json(usuarios);
}

module.exports = {
    getAllUsuarios
}