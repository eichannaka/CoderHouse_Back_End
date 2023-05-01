// Elementos
// const email = document.getElementById("email_login");
// const password = document.getElementById("password_login");
const formLogin = document.getElementById("form_login");
let currentName;

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("LOGIN");
  const user = {
    email: e.target[0].value,
    password: e.target[1].value,
  };
  fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "Error") {
        Toastify({
          text: data.message,
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(147deg, #ffc53b 0%, #FF2525 74%)",
          },
        }).showToast();
      }

      if (data.status === "Successful") {
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

