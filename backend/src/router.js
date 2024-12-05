const express = require('express');
const produtosController= require('./controllers/produtosController')
const produtosMiddleware= require('./middlewares/produtosMiddleware')
const usuariosMiddleware= require('./middlewares/usuariosMiddleware')
const usuariosController = require('./controllers/usuariosController')

const router = express.Router(); 

//produtos
router.get('/produtos', produtosController.getAll);
router.post('/produtos', produtosMiddleware.validateTitulo,produtosController.createProdutos);
router.get('/produtos/:id', produtosController.getProdutoEspecifico);
router.delete('/produtos/:id', produtosController.deleteProdutos);
router.put('/produtos/:id', produtosMiddleware.validateDescricao, 
    produtosMiddleware.validateTitulo, 
    produtosController.updatedProdutos)

//usuarios
router.get('/usuarios', usuariosController.getAllUsuarios);
router.post('/usuarios', usuariosController.createUsuarios);
router.get('/usuarios/:usu_id', usuariosController.getUsuariosEspecifico);
router.delete('/usuarios/:usu_id', usuariosController.deleteUsuarios);
router.put('/usuarios/:usu_id', usuariosController.updatedUsuario)

module.exports = router;