function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = "/index.html";
    })
    .catch(() => {
      alert = "Erro ao fazer logout";
    });
}

async function atualizarIndicadorMovimentacao() {
  try {
      const campoTelaMovimentacao= document.getElementById('indicador')
      const resposta = await fetch("http://localhost:3333/entradasaidatotal");
      const dados = await resposta.json();

      const quantidade = dados.length > 0 ? dados[0].total : 0;

      campoTelaMovimentacao.textContent = `${quantidade}`;
  } catch (erro) {
      console.error("Erro ao buscar os dados:", erro);
      campoTelaMovimentacao.textContent = "Erro ao carregar";
  }
}

atualizarIndicadorMovimentacao();

setInterval(atualizarIndicadorMovimentacao, 30000);

async function atualizarIndicadorProdutos() {
  try {
      const campoTelaProdutos= document.getElementById('indicadorProdutos')
      const resposta = await fetch("http://localhost:3333/produtostotal");
      const dados = await resposta.json();

      const quantidade = dados.length > 0 ? dados[0].total : 0;

      campoTelaProdutos.textContent = `${quantidade}`;
  } catch (erro) {
      console.error("Erro ao buscar os dados:", erro);
      campoTelaProdutos.textContent = "Erro ao carregar";
  }
}

atualizarIndicadorProdutos();

setInterval(atualizarIndicadorProdutos, 30000);

async function atualizarIndicadorUsuario() {
  try {
      const campoTelaUsuario= document.getElementById('indicadorUsuarios')
      const resposta = await fetch("http://localhost:3333/usuariostotal");
      const dados = await resposta.json();

      const quantidade = dados.length > 0 ? dados[0].total : 0;

      campoTelaUsuario.textContent = `${quantidade}`;
  } catch (erro) {
      console.error("Erro ao buscar os dados:", erro);
      campoTelaUsuario.textContent = "Erro ao carregar";
  }
}

atualizarIndicadorUsuario();

setInterval(atualizarIndicadorUsuario, 30000);