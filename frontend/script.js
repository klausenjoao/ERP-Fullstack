/*Validaçao campos de email e senha*/

function validateFields() {
  const emailValid = isEmailValid();
  document.getElementById("recovery-password").disabled = !emailValid;
  document.getElementById("password").disabled = !emailValid;

  const passwordValid = isPassowordValid();
  document.getElementById("login").disabled = !emailValid || !passwordValid;
}

function isEmailValid() {
  const email = document.getElementById("email").value;
  if (!email) {
    return false;
  }
  return validateEmail(email);
}

function isPassowordValid() {
  const password = document.getElementById("password").value;
  if (!password) {
    return false;
  }
  return true;
}

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

/*Redirecionamento*/

function loginSistema() {
  firebase
    .auth()
    .signInWithEmailAndPassword(form.email().value, form.password().value)
    .then((response) => {
      window.location.href = "./frontend/home/homeinicial.html";
    })
    .catch((error) => {
      alert(getErrorMessage(error));
    });
}

function redirecionamentoRegistrarSistema() {
  window.location.href = "./frontend/registrar/registrar.html";
}

function recoverPassword() {
  firebase
    .auth()
    .sendPasswordResetEmail(form.email().value)
    .then(() => {
      alert("Email enviado com sucesso");
    })
    .catch((error) => {
      alert(getErrorMessage(error));
    });
}

/*Alertas sistema*/

function getErrorMessage(error) {
  if (error.code == "auth/invalid-credential") {
    return "Usuário ou senha inválido";
  }
  return error.message;
}

const form = {
  email: () => document.getElementById("email"),
  password: () => document.getElementById("password"),
};

firebase.auth().onAuthStateChanged(user=> {
  if (user) {
    window.location.href = "./frontend/home/homeinicial.html";
  }
});