const { request } = require('express');
const connection = require('../models/connection');
const produtos= require('../models/produtos');

const getAll = async (request, response) =>{
    const todospProdutos = await produtos.getAll();
    return response.status(200).json(todospProdutos);
};

const getProdutoEspecifico = async (request, response) =>{
    const {id} = request.params;
    const produtoEspecifico = await produtos.getProdutoEspecifico(id);
    return response.status(200).json(produtoEspecifico);
}

const createProdutos = async(request, response) =>{
    const createdProdutos = await produtos.createProdutos(request.body);
    return response.status(201).json(createdProdutos);
};

const deleteProdutos = async(request, response)=>{
    const {id} = request.params;
    await produtos.deleteProdutos(id);
    return response.status(204).json();
}

const updatedProdutos = async(request, response)=>{
    const {id} = request.params;

    await produtos.updateProdutos(id, request.body);
    return response.status(204).json();
}

module.exports={
    getAll,
    createProdutos,
    deleteProdutos,
    updatedProdutos,
    getProdutoEspecifico
};