const openModal = () =>
    document.getElementById("modal-cadastrar").classList.add("active");
  
  const closeModal = () => {
    document.getElementById("modal-cadastrar").classList.remove("active");
  };

  const tbody = document.querySelector("tbody");
  const addForm = document.querySelector(".form-usuarios");
  const inputNome = document.querySelector('.nome')
  const inputLogin = document.querySelector('.login')
  const inputSenha = document.querySelector('.senha')
  const inputAtivo = document.querySelector('.ativo')

  const fetchUsuario = async () => {
    const response = await fetch("http://localhost:3333/usuarios");
    const usuarios = await response.json();
  
    return usuarios;
  };

  const addUsuarios = async (event) => {
    event.preventDefault();
  
    const usuarios= {usu_nome: inputNome.value, usu_login: inputLogin.value, 
      usu_senha: inputSenha.value, usu_ativo: inputAtivo.value};
    closeModal();
    loadUsuario();
  
    await fetch("http://localhost:3333/usuarios", { 
      method: 'post',
      headers:{'content-type':'application/json'},
      body: JSON.stringify(usuarios)
  });
  };

  addForm.addEventListener("submit", addUsuarios);x

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

  const createUsuario = (usuarios) =>{
    const {usu_id, usu_nome, usu_login, usu_senha, usu_dataHoraCadastro, usu_ativo} = usuarios;

    const tr = document.createElement("tr");
    const tdCodigo = document.createElement("td", usu_id);
    const tdNome = document.createElement("td", usu_nome);
    const tdLogin = document.createElement("td", usu_login);
    const tdsenha = document.createElement("td", usu_senha)
    const tdDataHoraCadastro= document.createElement("td", usu_dataHoraCadastro);
    const tdAtivo = document.createElement("td", usu_ativo)
    const tdActions = document.createElement("td");

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
    //deleteButton.addEventListener('click', () => deleteProduto(id))
    editButton.addEventListener('click', openModal)
    tdActions.classList.add("acoes");


  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  tr.appendChild(tdCodigo);
  tr.appendChild(tdNome);
  tr.appendChild(tdLogin);
  tr.appendChild(tdDataHoraCadastro);
  tr.appendChild(tdAtivo);
  tr.appendChild(tdActions);

  tbody.appendChild(tr);

  return tr;
  }

  loadUsuario = async () => {
    const usuarios = await fetchUsuario();
  
    tbody.innerHTML='';
  
    usuarios.forEach((usuarios) => {
      const tr = createUsuario(usuarios);
      tbody.appendChild(tr);
    });
  };
  
  loadUsuario();