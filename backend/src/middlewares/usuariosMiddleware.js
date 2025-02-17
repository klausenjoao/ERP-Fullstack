const validateNome = (request, response, next) =>{
    const {body}= request;

if(body.usu_nome === undefined){
    return response.status(400).json({message:'O titulo é obrigatório'});
}

if(body.usu_nome === ''){
    return response.status(400).json({message:'O titulo não pode ser vazio'});
}
next();

}

module.exports ={
    validateNome,
}