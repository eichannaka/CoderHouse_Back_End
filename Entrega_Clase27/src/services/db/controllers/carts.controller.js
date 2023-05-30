// import path from "path";
// import CartManager from "../services/filesystem/services/cartManager.js";
// import ProductManager from "../services/filesystem/services/productManager.js";
import CartService from "../services/carts.service.js";
import ProductService from "../services/products.service.js";

// const car = new CartManager(path.join(".", "files"));
const car = new CartService();

export async function createCart(req, res) {
  await car.addCart();
  res.status(200).send({
    status: "Success",
    message: `Se cargo el carrito`,
  });
}

export async function getAllCarts(req, res) {
  let carts = await car.getCarts();
  let limit = req.query.limit;

  res.status(200).send({
    status: "Success",
    message: !limit ? carts : carts.slice(0, limit),
  });
}

export async function getCartById(req, res) {
  let carts = await car.getCartById(req.params.cid);

  if (carts.length === 0) {
    res.status(202).send({
      status: "info",
      error: `No se encontró el carrito con ID: ${req.params.cid}`,
    });
  } else {
    res.status(200).send({ status: "Success", message: carts });
  }
}

export async function addProductInCartById(req, res) {
  let cid = req.params.cid;
  let pid = req.params.pid;

  let carts = await car.getCartById(cid);

  /* Verifico si existe el id del carrito */
  if (carts.length === 0) {
    res.status(202).send({
      status: "info",
      error: `No se encontró el carrito con Id: ${cid}`,
    });
  } else {
    let product = await new ProductService().getProductById(pid);
    /* Verifico si existe el id del producto en el maestro de productos  */
    if (product.length === 0) {
      res.status(202).send({
        status: "info",
        error: `Se encontró carrito con ID: ${cid} pero No se encontró el producto con Id: ${pid}`,
      });
    } else {
      /* Existe el id del carrito y el id del producto en el maestro de productos */
      car.addProductCar(cid, pid);

      res.status(200).send({
        status: "Success",
        message: `Se agrego-actualizó el producto Id: ${pid} en el carrito con Id: ${cid}`,
      });
    }
  }
}

export async function deleteAllProducts(req, res) {
  let carts = await car.deleteProducts(req.params.cid);

  if (carts.length === 0) {
    res.status(202).send({
      status: "info",
      error: `No se encontró el carrito con ID: ${req.params.cid}`,
    });
  } else {
    res.status(200).send({ status: "Success", message: carts });
  }
}

export async function deleteProductByIdCartId(req, res) {
  let cid = req.params.cid;
  let pid = req.params.pid;

  let carts = await car.deleteProductById(cid, pid);

  if (carts.length === 0) {
    res.status(202).send({
      status: "info",
      error: `No se encontró el carrito con ID: ${req.params.cid}`,
    });
  } else {
    res.status(200).send({ status: "Success", message: carts });
  }
}

export async function updateQuantityProductById(req, res) {
  let cid = req.params.cid;
  let pid = req.params.pid;
  let qty = req.body.quantity;

  let carts = await car.getCartById(cid);

  /* Verifico si existe el id del carrito */
  if (carts.length === 0) {
    res.status(202).send({
      status: "info",
      error: `No se encontró el carrito con Id: ${cid}`,
    });
  } else {
    let product = await new ProductService().getProductById(pid);
    /* Verifico si existe el id del producto en el maestro de productos  */
    if (product.length === 0) {
      res.status(202).send({
        status: "info",
        error: `Se encontró carrito con ID: ${cid} pero No se encontró el producto con Id: ${pid}`,
      });
    } else {
      /* Existe el id del carrito y el id del producto en el maestro de productos */
      car.updateQuantityProduct(cid, pid, qty);

      res.status(200).send({
        status: "Success",
        message: `Se actualizó el producto Id: ${pid} en el carrito con Id: ${cid}`,
      });
    }
  }
}

export async function addProductsByArray(req, res) {
  let cid = req.params.cid;
  let arr = req.body;

  let carts = await car.getCartById(cid);

  /* Verifico si existe el id del carrito */
  if (carts.length === 0) {
    res.status(202).send({
      status: "info",
      error: `No se encontró el carrito con Id: ${cid}`,
    });
  } else {
    car.updateProductByArray(cid, arr);
    res.status(200).send({
      status: "Success",
      message: `Se actualizó  el carrito con Id: ${cid}`,
    });
  }
}
