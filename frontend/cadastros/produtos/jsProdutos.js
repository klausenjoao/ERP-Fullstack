const openModal = () =>{
  document.getElementById("modal-cadastrar").classList.add("active");
  document.querySelector('.btnSalvarAlteracoes').style.display='none'
}

  const openModalEdit = () =>{
    document.getElementById("modal-cadastrar").classList.add("active");
    document.querySelector('.btnSalvar').style.display='none';
    document.querySelector('.produto-id').style.pointerEvents='none'
    document.querySelector('.produto-id-label').style.pointerEvents='none'
  }

const closeModal = () => {
  document.getElementById("modal-cadastrar").classList.remove("active");
};

const addForm = document.querySelector(".form-produto");
const inputDescricao = document.querySelector('.descricao')
const inputProduto = document.querySelector('.titulo') 
const tbody = document.querySelector("tbody");

const fetchProdutos = async () => {
  const response = await fetch("http://localhost:3333/produtos");
  const produtos = await response.json();

  return produtos;
};

const addProduto = async (event) => {
  event.preventDefault();

  const produto= {titulo: inputProduto.value, descricao: inputDescricao.value};


  await fetch("http://localhost:3333/produtos", { 
    method: 'post',
    headers:{'content-type':'application/json'},
    body: JSON.stringify(produto)
});

closeModal();
loadProduto();
};

addForm.addEventListener("submit", addProduto);

const deleteProduto = async(id) =>{
  await fetch(`http://localhost:3333/produtos/${id}`, {
    method:'delete',
  })
  loadProduto();
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
  deleteButton.addEventListener('click', () => deleteProduto(id))
  editButton.addEventListener('click', openModalEdit)
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

const loadProduto = async () => {
  const produto = await fetchProdutos();

  tbody.innerHTML='';

  produto.forEach((produto) => {
    const tr = createProdutos(produto);
    tbody.appendChild(tr);
  });
};

loadProduto();
