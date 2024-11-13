const tbody = document.querySelector("tbody");
const addForm = document.querySelector("form-produto");

const fetchProdutos = async () => {
  const response = await fetch("http://localhost:3333/produtos");
  const produtos = await response.json();

  return produtos;
};

const addProduto = async (event) => {
  event.preventDefault();

  const produto= {}

  await fetch("http://localhost:3333/produtos", { 
    method: "post",
    headers:{'content-type':'aplication/json'},
    body:{titulo, }
});
};

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

const createProdutos = (produto) => {
  const { id, titulo, descricao } = produto;

  const tr = document.createElement("tr");
  const tdCodigo = createElement("td", id);
  const tdTitulo = createElement("td", titulo);
  const tdDescricao = createElement("td", descricao);
  const tdActions = createElement("td");

  const editButton = createElement(
    "button",
    "",
    '<span class="material-symbols-outlined">edit</span>'
  );
  const deleteButton = createElement(
    "button",
    "",
    '<span class="material-symbols-outlined">delete</span>'
  );

  editButton.classList.add("btnacao");
  deleteButton.classList.add("btnacao");
  tdActions.classList.add("acoes");

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  tr.appendChild(tdCodigo);
  tr.appendChild(tdTitulo);
  tr.appendChild(tdDescricao);
  tr.appendChild(tdActions);

  tbody.appendChild(tr);

  return tr;
};

loadProduto = async () => {
  const produto = await fetchProdutos();

  produto.forEach((produto) => {
    const tr = createProdutos(produto);
    tbody.appendChild(tr);
  });
};

addForm.addEventListener("submit", addProduto);

loadProduto();
