const openModal = () =>
    document.getElementById("modal-cadastrar").classList.add("active");
  
  const closeModal = () => {
    document.getElementById("modal-cadastrar").classList.remove("active");
  };
    
  const addForm = document.querySelector(".form-usuarios");
  const inputNome = document.querySelector('.nome')
  const inputLogin = document.querySelector('.login')
  const inputSenha = document.querySelector('.senha')
  const inputAtivo = document.querySelector('.ativo')
  const tbodyUsuarios = document.querySelector("tbody");

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

  addForm.addEventListener("submit", addUsuarios);

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
    const tdCodigo = createElement("td", usu_id);
    const tdNome = createElement("td", usu_nome);
    const tdLogin = createElement("td", usu_login);
    const tdsenha = createElement("td", usu_senha)
    const tdDataHoraCadastro= createElement("td", usu_dataHoraCadastro);
    const tdAtivo = createElement("td", usu_ativo)
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

  console.log(tr);

  tbodyUsuarios.appendChild(tr);

  return tr;
  }

  loadUsuario = async () => {
    const usuarios = await fetchUsuario();
  
    tbodyUsuarios.innerHTML='';
  
    usuarios.forEach((usuarios) => {
      const tr = createUsuario(usuarios);
      tbodyUsuarios.appendChild(tr);
    });
  };
  
  loadUsuario();