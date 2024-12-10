const { request } = require('express');
const connection = require('../models/connection');
const entradaSaida= require('../models/entradaSaida');

const getAllEntradasSaidas = async (request, response) =>{
    const todasEntradasSaidas = await entradaSaida.getAllEntradasSaidas();
    return response.status(200).json(todasEntradasSaidas);
};


module.exports = {
    getAllEntradasSaidas
}