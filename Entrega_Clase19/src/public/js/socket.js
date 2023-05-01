const socket = io();

// Elmentos DOM
const listProducts = document.getElementById("listporducts");
const form = document.getElementById("form");
const formDelete = document.getElementById("form-delete");
const formUdapted = document.getElementById("form_udapte");

// Listado de productos ya guardados
// Me suscribo al evento "realtimeproduct.route:oldProducts", que me devuelve [{},{}] de productos
// hago un forEach para ingresar a cada elemento y los agrego al dom como un li con el id correspondiente
// al producto para indentificar cada elemento
socket.on("realtimeproduct.route:oldProducts", (oldProducts) => {
  oldProducts.forEach((products) => {
    const li = document.createElement("li");
    li.setAttribute("id", products.id ? products.id : products._id);
    li.innerHTML = `<h1>Title: ${products.title}</h1><h2>Category: ${
      products.category
    }</h2><p>Description: ${products.description}</p><p>Code: ${
      products.code
    }</p><p>Id: ${products.id ? products.id : products._id}</p><p>Price: ${
      products.price
    }</p><p>Status: ${products.status}</p><p>Stock: ${
      products.stock
    }</p><p>Image: ${products.thumbnail}</p>`;
    listProducts.appendChild(li);
  });
});

// New Product real time creo el elemento
// con el producto que se agrego el cual me devuelve la suscripcion al topico "product.route:products"
socket.on("product.route:products", (products) => {
  const li = document.createElement("li");
  // seteo un id para poder indentificar el elemento y eliminarlo mongoManager
  li.setAttribute("id", products.id ? products.id : products._id);
  li.innerHTML += `<h1>Title: ${products.title}</h1><h2>Category: ${
    products.category
  }</h2><p>Description: ${products.description}</p><p>Code: ${
    products.code
  }</p><p>Id: ${products.id ? products.id : products._id}</p><p>Price: ${
    products.price
  }</p><p>Status: ${products.status}</p><p>Stock: ${
    products.stock
  }</p><p>Image: ${products.thumbnail}</p>`;
  listProducts.appendChild(li);
});
// Agrego un producto haciendo una peticion a mi ruta
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const producto = {
    title: e.target[0].value,
    description: e.target[1].value,
    code: e.target[2].value,
    price: e.target[3].value,
    status: e.target[4].checked,
    stock: e.target[5].value,
    category: e.target[6].value,
    thumbnail: e.target[7].value,
  };
  fetch(`${url}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
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
      if (res.status === 500) {
        Toastify({
          text: "No se pudo agregar el producto",
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
          text: "Producto agregado correctamente",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
          },
        }).showToast();
      }
    })
    .catch((e) => console.log("*** ERROR ***", e));
});
// En el form capturo en numero de Id para eliminar el producto y hago la peticion a la url
// correspondiente
formDelete.addEventListener("submit", (e) => {
  e.preventDefault();
  const idToDelete = e.target[0].value;
  // en caso de que me devuelva el res.status === 200 elimino el producto del dom y como ya se mando
  // la oeticion en la persistencia en archivo ya se modifico, en caso de que algo falle lanzo un error
  // para poder debuggear lo necesario
  fetch(`${url}/api/products/${idToDelete}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 404) {
        Toastify({
          text: "Indique un Id a eliminar",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
          },
        }).showToast();
      }
      if (res.status === 500) {
        Toastify({
          text: "No se pudo eliminar el producto indicado",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
          },
        }).showToast();
      } else {
        Toastify({
          text: "Producto eliminado correctamente",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
          },
        }).showToast();
        document.getElementById(`${idToDelete}`).remove();
      }
    })
    .catch((e) => console.log(e));
  // vacio el input
  e.target[0].value = "";
});
// Capturo el pid y le hago un fetch para modificar la DB
formUdapted.addEventListener("submit", (e) => {
  e.preventDefault();
  const idToUdapted = e.target[0].value;
  fetch(`${url}/api/products/${idToUdapted}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: e.target[1].value,
      description: e.target[2].value,
      code: e.target[3].value,
      price: e.target[4].value,
      status: e.target[5].checked,
      stock: e.target[6].value,
      category: e.target[7].value,
      thumbnail: e.target[8].value,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.status === "Successful") {
        Toastify({
          text: "Producto actualizado",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
          },
        }).showToast();
      } else {
        Toastify({
          text: "No se pudo actualizar el producto",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
          },
        }).showToast();
      }
    })
    .catch((err) => console.log(err));
});
