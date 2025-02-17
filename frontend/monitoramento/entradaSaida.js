//ABERTURA E FECHAMENTO DE TELAS
const openModal = () => {
  document.getElementById("modal-cadastrar").classList.add("active");
  document.querySelector(".btnSalvarAlteracoes").style.display = "none";
};

const openModalInserir = () => {
  document.getElementById("modal-mov").classList.add("active");
};

const closeModal = () => {
  document.getElementById("modal-cadastrar").classList.remove("active");
  document.getElementById("modal-inserir").classList.remove("active");
  document.getElementById("modal-mov").classList.remove("active");
};

const closeModalEspecifico = (modalId) => {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
  }
};

const abrirModalEspecifico = (modalId) => {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
  }
};

//------------------------------

const tbodyEntradaSaida = document.querySelector("tbody");
const tbodyProdutosEntradaSaida = document.getElementById("tbody-modal");
const inputTipo = document.getElementById("tipo-movimentacao");
const botaoMovimentacao = document.getElementById("gravarMovimentacao");

//ROTA QUE TRAZ AS MOVIMENTAÇOES
const fetchEntradasSaidas = async () => {
  const response = await fetch("http://localhost:3333/entradasaida");
  const entradaSaida = await response.json();

  return entradaSaida;
};

//------------------------------

//ROTA QUE TRAZ OS PRODUTOS CONTIDOS NA MOVIMENTAÇÃO AO CLICAR EM EDITAR
const fetchProdutosEntradasSaidas = async (mov_id) => {
  const response = await fetch(
    `http://localhost:3333/entradasaida/produtos/${mov_id}`
  );
  const entradaSaida = await response.json();

  return entradaSaida;
};

//------------------------------

//ROTA QUE CRIA A MOVIMENTAÇÃO A DEPENDER DO TIPO

const addMovimentacao = async (event) => {
  event.preventDefault();

  const tipoSelecionado = document.querySelector(
    'input[name="tipo-movimentacao"]:checked'
  );

  const usuSelecionado = document.querySelector(".usuario-checkbox:checked");
  const idUsuSelecionado = usuSelecionado ? parseInt(usuSelecionado.value, 10) : null;


  const entradaSaida = { mov_tipo: tipoSelecionado.value, mov_usu_id: idUsuSelecionado};

  await fetch("http://localhost:3333/entradasaida", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(entradaSaida),
  });
};

botaoMovimentacao?.addEventListener("click", (event) => {
  addMovimentacao(event);
  abrirModalEspecifico("modal-inserir");
});

//FORMATAÇÃO DA DATA. EX: 01 de Janeiro de 2025 as 23:59
const formatDate = (dateFormatted) => {
  const options = { dateStyle: "long", timeStyle: "short" };
  const date = new Date(dateFormatted).toLocaleString("pt-br", options);
  return date;
};

//------------------------------

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

//Cria a linha do banco na tela
const createEntradaSaida = (entradaSaida) => {
  const { mov_id, mov_tipo, mov_data, quantidade_itens, usu_nome } =
    entradaSaida;

  const tr = document.createElement("tr");
  const tdCodigo = createElement("td", mov_id);

  const tdActions = createElement("td");

  const editButton = createElement(
    "button",
    "",
    '<span class="material-symbols-outlined">edit</span>'
  );

  // Define a cor da linha com base no tipo de movimentacao
  if (mov_tipo.toLowerCase() === "entrada") {
    tr.style.backgroundColor = "#d4f8d4"; //Verde
  } else if (mov_tipo.toLowerCase() === "saida") {
    tr.style.backgroundColor = "#f8d4d4"; //Vermelho
  }
  const tdTipo = createElement("td", mov_tipo);
  const tdDataHoraCadastro = createElement("td", formatDate(mov_data));
  const tdQuantidade = createElement("td", quantidade_itens);
  const tdUsuarioNome = createElement("td", usu_nome);

  editButton.classList.add("btnacao");
  tdActions.classList.add("acoes");
  editButton.addEventListener("click", async () => {
    const produtosentradaSaida = await fetchProdutosEntradasSaidas(mov_id);

    tbodyProdutosEntradaSaida.innerHTML = "";

    produtosentradaSaida.forEach((produto) => {
      createProdutosEntradaSaida(produto, mov_id);
    });

    openModal();
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
};

//------------------------------

//MOSTRA NA TELA OS PRODUTOS CONTIDOS NA MOVIMENTAÇÃO
const createProdutosEntradaSaida = async (produtosentradaSaida) => {
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
//------------------------------

//ATUALIZA AS MOVIMENTACOES NA TELA
const loadEntradaSaida = async () => {
  const entradaSaida = await fetchEntradasSaidas();

  tbodyEntradaSaida.innerHTML = "";

  entradaSaida.forEach((entradaSaida) => {
    const tr = createEntradaSaida(entradaSaida);
    tbodyEntradaSaida.appendChild(tr);
  });
};

loadEntradaSaida();
