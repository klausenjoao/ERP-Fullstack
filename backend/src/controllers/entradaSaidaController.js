const { request } = require('express');
const connection = require('../models/connection');
const entradaSaida= require('../models/entradaSaida');

const getAllEntradasSaidas = async (request, response) =>{
    const todasEntradasSaidas = await entradaSaida.getAllEntradasSaidas();
    return response.status(200).json(todasEntradasSaidas);
};

const getAllEntradasSaidasEspecifico = async (request, response) =>{
    const {mov_id} = request.params;
    const todasEntradasSaidas = await entradaSaida.getAllEntradasSaidasEspecifico(mov_id);
    return response.status(200).json(todasEntradasSaidas);
};

const getAllProdutosEntradasSaidas = async (request, response) =>{
    const {mov_id} = request.params;
    const produtosEntradasSaidas = await entradaSaida.getAllProdutosEntradasSaidas(mov_id);
    return response.status(200).json(produtosEntradasSaidas);

}

module.exports = {
    getAllEntradasSaidas,
    getAllEntradasSaidasEspecifico,
    getAllProdutosEntradasSaidas
}