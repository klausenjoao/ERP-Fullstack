const usuarios = require('../models/usuarios');

const getAllUsuarios = async (_request, response) => {
    const usuariosModel = await usuarios.getAllUsuarios();
    return response.status(200).json(usuariosModel);
}

const createUsuarios = async(request, response) =>{
    const createdUsuarios = await usuarios.createUsuarios(request.body);
    return response.status(201).json(createdUsuarios);
};

const deleteUsuarios = async(request, response)=>{
    const {usu_id} = request.params;
    await usuarios.deleteUsuarios(usu_id);
    return response.status(204).json();
}

module.exports = {
    getAllUsuarios,
    createUsuarios,
    deleteUsuarios
}