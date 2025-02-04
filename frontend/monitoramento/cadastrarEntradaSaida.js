const closeModalEspecificteste = (modalId) => {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
  }
};

const tbodyInserir = document.getElementById("tbody-modal-inserir");
const tbodyUsuarios = document.getElementById("tbody-modal-usuarios");
const inserirButton = document.getElementById("inserir-produtos"); // Botão para enviar os produtos selecionados

const fetchProdutos = async () => {
  const response = await fetch("http://localhost:3333/produtos");
  const produtos = await response.json();

  return produtos;
};

//ROTA QUE TRAZ OS USUARIOS
const fetchUsuario = async () => {
  const response = await fetch("http://localhost:3333/usuarios");
  const usuarios = await response.json();

  return usuarios;
};

const createUsuario = (usuarios) => {
  const { usu_id, usu_nome } = usuarios;

  const tr = document.createElement("tr");
  const tdCodigo = createElement("td", usu_id);
  const tdNome = createElement("td", usu_nome);

  const tdActions = createElement("td");

  tr.appendChild(tdCodigo);
  tr.appendChild(tdNome);
  tr.appendChild(tdActions);

  tbodyUsuarios.appendChild(tr);

  return tr;
};

const createProdutos = (produto) => {
  const { id, titulo, descricao } = produto;

  const tr = document.createElement("tr");
  const tdCodigo = createElement("td", id);
  const tdTitulo = createElement("td", titulo);
  const tdDescricao = createElement("td", descricao);
  const tdActions = createElement("td");

  // Checkbox para seleção
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = id;
  checkbox.classList.add("produto-checkbox");

  tdActions.appendChild(checkbox);
  tdActions.classList.add("acoes");

  tr.appendChild(tdCodigo);
  tr.appendChild(tdTitulo);
  tr.appendChild(tdDescricao);
  tr.appendChild(tdActions);

  tbodyInserir.appendChild(tr);

  return tr;
};

const enviarProdutosSelecionados = async () => {
  const checkboxes = document.querySelectorAll(".produto-checkbox:checked");
  const idsSelecionados = Array.from(checkboxes).map(
    (checkbox) => checkbox.value
  );
  const moi_mov_id = [];

  if (idsSelecionados.length === 0) {
    alert("Nenhum produto selecionado!");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:3333/entradasaida/enviarselecionados",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ moi_mov_id, moi_prod_id: idsSelecionados }),
      }
    );

    if (!response.ok) throw new Error("Erro ao enviar produtos selecionados");

    alert("Produtos selecionados enviados com sucesso!");

    closeModalEspecificteste("modal-mov");
    closeModalEspecificteste("modal-inserir");
    loadProduto();
  } catch (error) {
    console.error(error);
    alert("Erro ao enviar produtos.");
  }
};

// Event listener para o botão de inserir
inserirButton.addEventListener("click", enviarProdutosSelecionados);

const loadProduto = async () => {
  const produto = await fetchProdutos();

  tbodyInserir.innerHTML = "";

  produto.forEach((produto) => {
    const tr = createProdutos(produto);
    tbodyInserir.appendChild(tr);
  });
};

loadProduto();

const loadUsuario = async () => {
  const usuarios = await fetchUsuario();

  tbodyUsuarios.innerHTML = "";

  usuarios.forEach((usuarios) => {
    const tr = createUsuario(usuarios);
    tbodyUsuarios.appendChild(tr);
  });
};

loadUsuario();
