const socketClient = io();

// Elementos del DOM
const formMessage = document.getElementById("send-msg");
const setUser = document.getElementById("userBtn");
const viewMsg = document.getElementById("view-msg");
const userName = document.getElementById("userName");
const usersConnected = document.getElementById("usersConnected");
let usuario = null;
if (!usuario) {
  Swal.fire({
    title: "Welcome to Chat E-Commerce",
    text: "Log in with your email",
    color: "#2c3e50",
    allowOutsideClick: false,
    allowEscapeKey: false,
    background: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
    input: "text",
    inputValidator: (value) => {
      if (!value) {
        return "Necesitas ingresar tu correo";
      }
    },
  }).then((username) => {
    usuario = username.value;
    userName.innerText = usuario;
    socketClient.emit("nuevoUsuario", usuario);
    socketClient.on("server:usersConected", (users) => {
      users.map((user) => {
        const li = document.createElement("li");
        li.setAttribute("class", "user");
        li.innerHTML = `<p class="userN"><strong>${user}</strong> connected</p>`;
        usersConnected.appendChild(li);
      });
    });
  });
}

socketClient.on("server:msg", (data) => {
  const chatRender = data
    .map((msg) => {
      return `<p><strong>${msg.user}: </strong>${msg.message}</p>`;
    })
    .join(" ");
  viewMsg.innerHTML = chatRender;
});

formMessage.onsubmit = (e) => {
  e.preventDefault();
  const infoUser = {
    user: usuario,
    message: e.target[0].value,
  };
  socketClient.emit("client:msg", infoUser);
  e.target[0].value = "";
};
