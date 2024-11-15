const addForm = document.querySelector(".form-produto");
const inputProduto = document.querySelector('.titulo') 

const fetchProdutos = async () => {
    const response = await fetch("http://localhost:3333/produtos");
    const produtos = await response.json();
  
    return produtos;
  };

const addProduto = async (event) => {
    event.preventDefault();
  
    alert('teste')
    const produto= {titulo: inputProduto.value};
    console.log("Produto criado:", produto);
  
    await fetch("http://localhost:3333/produtos", { 
      method: 'post',
      headers:{'content-type':'application/json'},
      body: JSON.stringify(produto)
  });
  };

addForm.addEventListener("submit", addProduto);
