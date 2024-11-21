const connection = require('../models/connection');
const produtos= require('../models/produtos');

const getAll = async (request, response) =>{
    const produtostask = await produtos.getAll();
    return response.status(200).json(produtostask);
};

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
    updatedProdutos
};