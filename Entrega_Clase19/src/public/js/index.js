const url = "http://localhost:8080";

//elementos
const product = document.getElementById("products");

// Datos del user
const currentFirst = document.getElementById("current_first");
const currentLast = document.getElementById("current_last");
fetch("http://localhost:8080/api/auth/profile", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    currentFirst.innerText = `${data.data.firstName}`;
    currentLast.innerText = `${data.data.lastName}`;
  });

// Producctos hasta el momento
const products = fetch(`${url}/api/products`)
  .then((res) => res.json())
  .then((data) => {
    const listOfProducts = data.payload;
    listOfProducts.forEach((element) => {
      product.innerHTML += `<ul class="listado"><li><h1>Title: ${
        element.title
      }</h1><h2>Category: ${element.category}</h2><p>Description: ${
        element.description
      }</p><p>Code: ${element.code}</p><p>Id: ${
        element.id ? element.id : element._id
      }</p><p>Price: ${element.price}</p><p>Status: ${
        element.status
      }</p><p>Stock: ${element.stock}</p><p>Image: ${
        element.thumbnail
      }</p></li></ul>`;
    });
  })
  .catch((err) => {
    console.error(err);
  });
