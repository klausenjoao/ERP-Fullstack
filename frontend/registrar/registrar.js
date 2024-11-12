const form = {
  email: () => document.getElementById("email"),
  password: () => document.getElementById("password"),
  registerButton: () => document.getElementById('cadastrarUsuario')
};

function registrar() {
  const email = form.email().value;
  const password = form.password().value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "../index.html";
    })
    .cath((error) => {
      alert(getErrorMessage(error));
    });
}

function getErrorMessage(error){
    return error.message;
}

firebase.auth().onAuthStateChanged(user=> {
  if (user) {
    window.location.href = "../home/homeinicial.html";
  }
});