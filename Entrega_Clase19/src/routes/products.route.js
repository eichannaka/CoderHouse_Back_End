import { Router } from "express";
// import ProductManager from "../dao/fileManager/ProductManager.js";
import ProductManager from "../dao/mongoManager/ProductsManager.js";
import { socketServer } from "../app.js";

const router = Router();
const manager = new ProductManager();

// Devuelve el prodcto por los filtros:
// sort(ordena de forma acendente "asc", o descendente "desc" el precio)
// limit(da el limite de productos que necesitas que te devuelvan)
// page(la pagina a la que necesitas ir)
// query(te trae los elementos por la categora o por el estado del producto segun el stock)
//(en caso de no aclarar limite devuelve todos los productos)
router.get("/", async (req, res) => {
  // este endpoint devuelve un arreglo [productos]
  const { limit = 10, page = 1, sort, ...query } = req.query; // devuelve string
  try {
    const products = await manager.getProducts(
      parseInt(limit),
      parseInt(page),
      query,
      sort
    );
    const resJson = {
      status: products.docs.length === 0 ? "error" : "succses",
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.hasPrevPage
        ? `http://localhost:8080/api/products?page=${products.prevPage}`
        : null,
      nextLink: products.hasNextPage
        ? `http://localhost:8080/api/products?page=${products.nextPage}`
        : null,
    };
    res.status(200).json(resJson);
  } catch (error) {
    console.log(error);
    res.status(500).json({
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
    // const getProductsById = await manager.getProductsById(parseInt(pid));
    // mongoose son numeber y sring el id
    const getProductsById = await manager.getProductsById(pid);
    if (getProductsById === null) {
      res.status(404).send("Producto no encontrado");
    }
    s;
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
  const product = req.body;
  try {
    const addProduct = await manager.addProduct(product);
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
  const productUdapted = req.body;
  try {
    // const udapteProduct = await manager.udapteProduct(
    //   parseInt(pid),
    //   productUdapted
    // );
    // El pid para mongoose es number/string
    const udapteProduct = await manager.udapteProduct(pid, productUdapted);

    res.status(200).send({
      status: "Successful",
      message: "El producto a sido actualizado correctamente",
      data: udapteProduct,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ status: "Error", message: "El proucto no se pudo actualizar" });
  }
});
// Elimina un producto con id por params
router.delete("/:pid", async (req, res) => {
  const { pid } = req.params; // params son strings ""
  try {
    // const deleteProduct = await manager.deleteProduct(parseInt(pid));
    // Mongo son numbers y string el id
    const deleteProduct = await manager.deleteProduct(pid);

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
