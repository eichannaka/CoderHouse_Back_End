const currentName = document.getElementById("first_name");
const currentLastName = document.getElementById("last_name");
const currentAge = document.getElementById("current_age");
const currentEmail = document.getElementById("current_email");
fetch("http://localhost:8080/api/auth/profile", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    currentName.innerText = `${data.data.firstName}`;
    currentLastName.innerText = `${data.data.lastName}`;
    currentEmail.innerText = `${data.data.email}`;
    currentAge.innerText = `${data.data.age}`;
  });
