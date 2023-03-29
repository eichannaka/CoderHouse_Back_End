import { Router } from "express";
import ProductManager from "../utils/ProductManager.js";
import { socketServer } from "../server.js";

const router = Router();
const manager = new ProductManager("Products.json");

// Devuelve el prodcto por limite (en caso de no aclarar limite devuelve todos los productos)
router.get("/", async (req, res) => {
  // este endpoint devuelve un arreglo [productos]
  const { limit } = req.query; // devuelve string
  try {
    const productSave = await manager.getProducts();

    const productosLimit = productSave.slice(0, parseInt(limit));
    if (limit) {
      res.status(200).send(productosLimit);
    } else {
      res.status(200).send(productSave);
    }
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: "El archivo no existe o no se puede leer",
    });
  }
});
// devuelve el producto por id por params
router.get("/:pid", async (req, res) => {
  // devuelve un arreglo de productos []
  const { pid } = req.params; // params son strings ""
  try {
    const getProductsById = await manager.getProductsById(parseInt(pid));
    if (getProductsById === null) {
      res.status(404).send("Producto no encontrado");
    }
    res.status(200).send(getProductsById); // devuelve {}
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      status: "Error",
      message: "El archivo no existe o no se puede leer",
    });
  }
});
// Agrega el producto con persistencia en archivo, devuelve {status:"", message:""}
router.post("/", async (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail,
  } = req.body;
  try {
    const addProduct = await manager.addProduct(
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail
    );
    if (addProduct === null) {
      res.status(400).send({
        status: "Error",
        message: "Faltan campos a rellenar",
      });
    } else {
      res.status(200).send({
        status: "Successful",
        message: "El producto a sido agregado correctamente",
      });
      // La instancia esta creada en server.js, solo utilizo este emit para poder actualizar los productos
      socketServer.emit("product.route:products", addProduct);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Error",
      message: "No se pudo agregar el producto",
    });
  }
});
// Actualiza un producto con el pid por params
router.put("/:pid", async (req, res) => {
  const { pid } = req.params; // params son strings ""
  const { productUdapted } = req.body;
  try {
    const udapteProduct = await manager.udapteProduct(
      parseInt(pid),
      productUdapted
    );
    res.status(200).send({
      status: "Successful",
      message: "El producto a sido actualizado correctamente",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "Error", message: "El proucto no se pudo actualizar" });
  }
});
// Elimina un producto con id por params
router.delete("/:pid", async (req, res) => {
  const { pid } = req.params; // params son strings ""
  try {
    const deleteProduct = await manager.deleteProduct(parseInt(pid));

    if (deleteProduct === null) {
      res.status(400).send({
        status: "Error",
        message: "Coloque el id a eliminar",
      });
    } else {
      res.status(200).send({
        status: "Successful",
        message: "El producto a sido eliminado correctamente",
      });
      // La instancia esta creada en server.js, solo utilizo este emit para poder actualizar los productos
      socketServer.emit("product.route:deleteProduct", deleteProduct);
    }
         
  } catch (error) {
    console.log(error);
    res.status(500).send("No se pudo eliminar el producto");
  }
});

export default router;
