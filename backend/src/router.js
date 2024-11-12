const express = require('express');
const produtosController= require('./controllers/produtosController')
const produtosMiddleware= require('./middlewares/produtosMiddleware')

const router = express.Router(); 

router.get('/produtos', produtosController.getAll);
router.post('/produtos', produtosMiddleware.validateTitulo,produtosController.createProdutos);
router.delete('/produtos/:id', produtosController.deleteProdutos);
router.put('/produtos/:id', produtosMiddleware.validateDescricao, 
    produtosMiddleware.validateTitulo, 
    produtosController.updatedProdutos)

module.exports = router;