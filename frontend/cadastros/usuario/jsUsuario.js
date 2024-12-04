const openModal = () =>{
    document.getElementById("modal-cadastrar").classList.add("active");
    document.querySelector('.btnSalvarAlteracoes').style.display='none'
  }
  const openModalEdit = () =>{
    document.getElementById("modal-cadastrar").classList.add("active");
    document.querySelector('.btnSalvar').style.display='none'
  }

  const closeModal = () => {
    document.getElementById("modal-cadastrar").classList.remove("active");
  };
    
  const addForm = document.querySelector(".form-usuarios .btnSalvar");
  const inputNome = document.querySelector('.nome')
  const inputLogin = document.querySelector('.login')
  const inputSenha = document.querySelector('.senha')
  const inputAtivo = document.querySelector('.ativo')
  const tbodyUsuarios = document.querySelector("tbody");

  //ROTA QUE TRAZ OS USUARIOS
  const fetchUsuario = async () => {
    const response = await fetch("http://localhost:3333/usuarios");
    const usuarios = await response.json();
  
    return usuarios;
  };

  //DELETA O USUARIO BASEADO NO ID
  const deleteUsuarios = async(usu_id) =>{
    await fetch(`http://localhost:3333/usuarios/${usu_id}`, {
      method:'delete',
    })
    loadUsuario();
  }

  //PUXA AS INFORMAÇOES DO USUARIO BASEADO NO ID
  const editUsuario = async (usu_id) =>{
    const getUsuario =  await fetch(`http://localhost:3333/usuarios/${usu_id}`)
    console.log(getUsuario)
    const [usuario] = await getUsuario.json();
    console.log(usuario)

    inputNome.value = usuario.usu_nome;
    inputLogin.value = usuario.usu_login;
    inputSenha.value = usuario.usu_senha;
    inputAtivo.checked = usuario.usu_ativo === 1;

    console.log(editUsuario)
    
    openModalEdit()
  }

  const updateUsuarios = async (usu_nome, usu_login, usu_senha, usu_ativo) =>{

    await fetch(`http://localhost:3333/usuarios/${usu_id}`,{
    method:'put',
    headers:{'content-type':'application/json'},
    body: JSON.stringify({usu_nome, usu_login, usu_senha, usu_ativo})
  })
  loadUsuario();
  closeModal();
  }

//ADICIONA O USUARIO NO BANCO
  const addUsuarios = async (event) => {
    event.preventDefault();
  
    const usuarios= {usu_nome: inputNome.value, usu_login: inputLogin.value, 
      usu_senha: inputSenha.value, usu_ativo: inputAtivo.checked};

  
    await fetch("http://localhost:3333/usuarios", { 
      method: 'post',
      headers:{'content-type':'application/json'},
      body: JSON.stringify(usuarios)
  });

  closeModal();
  loadUsuario();
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

const formatDate = (dateFormatted) => {
  const options = { dateStyle: 'long', timeStyle: 'short' };
  const date = new Date(dateFormatted).toLocaleString('pt-br', options);
  return date;
}

  const createUsuario = (usuarios) =>{
    const {usu_id, usu_nome, usu_login, usu_senha, usu_datahoracadastro, usu_ativo} = usuarios;

    const tr = document.createElement("tr");
    const tdCodigo = createElement("td", usu_id);
    const tdNome = createElement("td", usu_nome);
    const tdLogin = createElement("td", usu_login);
    const tdDataHoraCadastro = createElement("td", formatDate(usu_datahoracadastro));
    
    //Senha
    const tdsenha = createElement("td");
    const exibicaoSenha = document.createElement("input");
    exibicaoSenha.type = "password";
    exibicaoSenha.value = usu_senha;
    exibicaoSenha.readOnly = true;
    tdsenha.appendChild(exibicaoSenha);

    //Checkbox
    const tdAtivo = createElement("td")
    const checkbox = createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = usu_ativo === 1;
    tdAtivo.appendChild(checkbox);

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
    editButton.addEventListener('click', () => editUsuario(usu_id));
    exibicaoSenha.classList.add("input-senha")
    deleteButton.addEventListener('click', () => deleteUsuarios(usu_id))
    tdActions.classList.add("acoes");


  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  tr.appendChild(tdCodigo);
  tr.appendChild(tdNome);
  tr.appendChild(tdLogin);
  tr.appendChild(tdsenha);
  tr.appendChild(tdDataHoraCadastro);
  tr.appendChild(tdAtivo);
  tr.appendChild(tdActions);


  tbodyUsuarios.appendChild(tr);

  return tr;
  }

  const loadUsuario = async () => {
    const usuarios = await fetchUsuario();
  
    tbodyUsuarios.innerHTML='';
  
    usuarios.forEach((usuarios) => {
      const tr = createUsuario(usuarios);
      tbodyUsuarios.appendChild(tr);
    });
  };
  
  addForm.addEventListener("click", addUsuarios);

  loadUsuario();