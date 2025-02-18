const { request } = require('express');
const connection = require('../models/connection');
const entradaSaida= require('../models/entradaSaida');

const getAllEntradasSaidas = async (request, response) =>{
    const todasEntradasSaidas = await entradaSaida.getAllEntradasSaidas();
    return response.status(200).json(todasEntradasSaidas);
};

const getTotal = async (request, response) =>{
    const totalEntradasSaidas = await entradaSaida.getTotal();
    return response.status(200).json(totalEntradasSaidas);
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

const createEntradasSaidas = async(request, response) =>{
    const createdEntradasSaidas = await entradaSaida.createEntradaSaida(request.body);
    return response.status(201).json(createdEntradasSaidas);
};

const createEntradasSaidasSelecionados = async(request, response) =>{
    const createdEntradasSaidasSelecionados = await entradaSaida.createEntradasSaidasSelecionados(request.body);
    return response.status(201).json(createdEntradasSaidasSelecionados);
};

module.exports = {
    getAllEntradasSaidas,
    getAllEntradasSaidasEspecifico,
    getAllProdutosEntradasSaidas,
    createEntradasSaidas,
    createEntradasSaidasSelecionados,
    getTotal
}