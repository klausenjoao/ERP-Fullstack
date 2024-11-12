const validateTitulo = (request, response, next) =>{
    const {body}= request;

if(body.titulo === undefined){
    return response.status(400).json({message:'O titulo é obrigatório'});
}

if(body.titulo === ''){
    return response.status(400).json({message:'O titulo não pode ser vazio'});
}
next();

}

const validateDescricao = (request, response, next) =>{
    const {body}= request;

if(body.descricao === undefined){
    return response.status(400).json({message:'O descricao é obrigatório'});
}

if(body.descricao === ''){
    return response.status(400).json({message:'A descricao não pode ser vazio'});
}

next();

}

module.exports ={
    validateTitulo,
    validateDescricao,
}