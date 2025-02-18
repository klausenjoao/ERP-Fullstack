const usuarios = require('../models/usuarios');

const getAllUsuarios = async (request, response) => {
    const usuariosModel = await usuarios.getAllUsuarios();
    return response.status(200).json(usuariosModel);
}

const getTotal = async (request, response) =>{
    const totalUsuarios = await usuarios.getTotal();
    return response.status(200).json(totalUsuarios);
};

const createUsuarios = async(request, response) =>{
    const createdUsuarios = await usuarios.createUsuarios(request.body);
    return response.status(201).json(createdUsuarios);
};

const getUsuariosEspecifico = async (request, response) => {
    const {usu_id} = request.params;
    const usuario = await usuarios.getlUsuarioEspecifico(usu_id);
    return response.status(200).json(usuario);
}

const deleteUsuarios = async(request, response)=>{
    const {usu_id} = request.params;
    await usuarios.deleteUsuarios(usu_id);
    return response.status(204).json();
}

const updatedUsuario = async(request, response)=>{
    const {usu_id} = request.params;

    await usuarios.updateUsuario(usu_id, request.body);
    return response.status(204).json();
}

module.exports = {
    getAllUsuarios,
    createUsuarios,
    getUsuariosEspecifico,
    deleteUsuarios,
    updatedUsuario,
    getTotal
}