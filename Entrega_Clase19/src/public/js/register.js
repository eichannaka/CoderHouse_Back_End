// Elementos
// const firstName = document.getElementById("firs_name");
// const lastName = document.getElementById("last_name");
// const email = document.getElementById("email");
// const age = document.getElementById("age");
// const password = document.getElementById("password");
const formRegister = document.getElementById("form_register");

// console.log(user);
formRegister.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("AUTENTICANDO");
  const user = {
    firstName: e.target[0].value,
    lastName: e.target[1].value,
    age: e.target[2].value,
    email: e.target[3].value,
    password: e.target[4].value,
  };
  fetch("http://localhost:8080/api/auth/registro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      if (res.status === 400) {
        Toastify({
          text: "Faltan campos a rellenar",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(147deg, #ffc53b 0%, #FF2525 74%)",
          },
        }).showToast();
      }
      if (res.status === 404) {
        Toastify({
          text: "Error no se puede autenticar",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(147deg, #ffc53b 0%, #FF2525 74%)",
          },
        }).showToast();
      }
      if (res.status === 500) {
        console.log("Error 500", res.statusText, "Pruebe de vuelta");
        Toastify({
          text: "No se pudo crear el usuario",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
          },
        }).showToast();
      }
      if (res.status === 200) {
        Toastify({
          text: "Redireccionando",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
          },
        }).showToast();
        location.assign("http://localhost:8080/home");
      }
    })
    .catch((e) => console.log("*** ERROR ***", e));
});
