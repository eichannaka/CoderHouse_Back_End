import { Router } from "express";
import CartsManager from "../dao/fileManager/CartsManager.js";
const router = Router();
const carts = new CartsManager("Carts.json");

// Crea un carro sin nececidad de pasarle ningun parametro
router.post("/", async (req, res) => {
  try {
    const newCart = await carts.createCart();
    res.status(200).send({
      status: "Successful",
      message: "El carrito a sido creado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("No se pudo crear el carrito");
  }
});
//Agregar producto con Cart id y Product id
router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params; // son Strings
  const cidNumber = parseInt(cid);
  const pidNumber = parseInt(pid);

  try {
    const addProductToCart = await carts.addProductToCart(pidNumber, cidNumber);
    if (addProductToCart === null) {
      res.status(404).send({ status: error, message: "Carrito no encontrado" });
    } else {
      res.status(200).send({
        status: "Successful",
        message: "Producto añadido correctamente",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("No se pudo agregar el producto");
  }
});
// Ver los carritos por id y buscar a todos los carritos
router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const getCartById = await carts.getCartsById(parseInt(cid));
    if (getCartById === null) {
      res
        .status(404)
        .send({ status: "Errror", message: "Carrito no encontrado" });
    } else {
      res
        .status(200)
        .send({ stsatus: "Successful", products: getCartById.products }); // devuelve {}
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ status: "Error", message: "No se pudo obtener el carrito" });
  }
});

export default router;
