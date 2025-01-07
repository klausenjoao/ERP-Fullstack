const tbodyInserir = document.getElementById("tbody-modal-inserir");

const fetchProdutos = async () => {
    const response = await fetch("http://localhost:3333/produtos");
    const produtos = await response.json();
  
    return produtos;
  };
  
  const createProdutos = (produto) => {
    const { id, titulo, descricao } = produto;
  
    const tr = document.createElement("tr");
    const tdCodigo = createElement("td", id);
    const tdTitulo = createElement("td", titulo);
    const tdDescricao = createElement("td", descricao);
    const tdActions = createElement("td");
  
    const selecioneButton = createElement(
      "checkbox",
      "");

    tdActions.appendChild(selecioneButton);
    tdActions.classList.add("acoes");
  
    tr.appendChild(tdCodigo);
    tr.appendChild(tdTitulo);
    tr.appendChild(tdDescricao);
    tr.appendChild(tdActions);
  
    tbodyInserir.appendChild(tr);
  
    return tr;
  };
  
  const loadProduto = async () => {
    const produto = await fetchProdutos();
  
    tbodyInserir.innerHTML='';
  
    produto.forEach((produto) => {
      const tr = createProdutos(produto);
      tbodyInserir.appendChild(tr);
    });
  };
  
  loadProduto();
  