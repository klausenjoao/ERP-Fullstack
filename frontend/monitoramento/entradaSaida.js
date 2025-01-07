const openModal = () =>{
  document.getElementById("modal-cadastrar").classList.add("active");
  document.querySelector('.btnSalvarAlteracoes').style.display='none'
}

const openModalInserir = () =>{
  document.getElementById("modal-inserir").classList.add("active");
}

const closeModal = () => {
  document.getElementById("modal-cadastrar").classList.remove("active");
  document.getElementById("modal-inserir").classList.remove("active");
};

const tbodyEntradaSaida = document.querySelector("tbody");
const tbodyProdutosEntradaSaida = document.getElementById("tbody-modal");
  
  //ROTA QUE TRAZ OS USUARIOS
  const fetchEntradasSaidas = async () => {
    const response = await fetch("http://localhost:3333/entradasaida");
    const entradaSaida = await response.json();
  
    return entradaSaida;
  };

  //ROTA QUE TRAZ OS PRODUTOS DA MOVIMENTAÇÃO
const fetchProdutosEntradasSaidas = async (mov_id) => {
  const response = await fetch(`http://localhost:3333/entradasaida/produtos/${mov_id}`);
  const entradaSaida = await response.json();

  return entradaSaida;
};

  const formatDate = (dateFormatted) => {
    const options = { dateStyle: 'long', timeStyle: 'short' };
    const date = new Date(dateFormatted).toLocaleString('pt-br', options);
    return date;
  }

  const createElement = (tag, innerText = "", innerHTML = "") => {
    const element = document.createElement(tag);
  
    if (innerText) {
      element.innerText = innerText;
    }
  
    if (innerHTML) {
      element.innerHTML = innerHTML;
    }
    return element;
  };

  const createEntradaSaida = (entradaSaida) =>{
    const {mov_id, mov_tipo, mov_data, quantidade_itens, usu_nome} = entradaSaida;

    const tr = document.createElement("tr");
    const tdCodigo = createElement("td", mov_id);

    const tdActions = createElement("td");

    const editButton = createElement(
      "button",
      "",
      '<span class="material-symbols-outlined">edit</span>'
    );


  // Define a cor da linha com base no tipo de movimento
  if (mov_tipo.toLowerCase() === "entrada") {
    tr.style.backgroundColor = "#d4f8d4"; // Verde claro
  } else if (mov_tipo.toLowerCase() === "saida") {
    tr.style.backgroundColor = "#f8d4d4"; // Vermelho claro
  }
    const tdTipo = createElement("td", mov_tipo);
    const tdDataHoraCadastro = createElement("td", formatDate(mov_data));
    const tdQuantidade = createElement("td", quantidade_itens);
    const tdUsuarioNome = createElement("td", usu_nome)

  editButton.classList.add("btnacao");
  tdActions.classList.add("acoes");
  editButton.addEventListener('click', async () => {
    const produtosentradaSaida = await fetchProdutosEntradasSaidas(mov_id);
  
    tbodyProdutosEntradaSaida.innerHTML = ""; // Limpa a tabela
  
    produtosentradaSaida.forEach((produto) => {
      createProdutosEntradaSaida(produto, mov_id);
    });
  
    openModal(); // Abre o modal após carregar os produtos
  });

  tdActions.appendChild(editButton);
  tr.appendChild(tdCodigo);
  tr.appendChild(tdTipo);
  tr.appendChild(tdDataHoraCadastro);
  tr.appendChild(tdQuantidade);
  tr.appendChild(tdUsuarioNome);
  tr.appendChild(tdActions);

  tbodyEntradaSaida.appendChild(tr);

  return tr;
  }

  const createProdutosEntradaSaida = async (produtosentradaSaida, mov_id) => {
    openModal();
    const { id, titulo, quantidade_produtos } = produtosentradaSaida;

  const tr = document.createElement("tr");
  const tdCodigo = createElement("td", id);
  const tdTitulo = createElement("td", titulo);
  const tdQuantidade = createElement("td", quantidade_produtos);

  tr.appendChild(tdCodigo);
  tr.appendChild(tdTitulo);
  tr.appendChild(tdQuantidade);

  tbodyProdutosEntradaSaida.appendChild(tr);

  return tr;
};

  const loadEntradaSaida = async () => {
    const entradaSaida = await fetchEntradasSaidas();
  
    tbodyEntradaSaida.innerHTML='';
  
    entradaSaida.forEach((entradaSaida) => {
      const tr = createEntradaSaida(entradaSaida);
      tbodyEntradaSaida.appendChild(tr);
    });
  };

  loadEntradaSaida();