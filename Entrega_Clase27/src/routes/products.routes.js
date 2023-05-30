import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
} from "../services/db/controllers/products.controller.js";

const router = Router();

/***   Obtiene Todos los productos ***/
router.get("/", getAllProducts);

/***   Obtiene producto por ID ***/
router.get("/:pid", getProductById);

/***   Carga producto ***/
router.post("/", addProduct);

/*** Actualiza producto por ID ***/
router.put("/:pid", updateProductById);

/***   Elimina producto por ID ***/
router.delete("/:pid", deleteProductById);

export default router;
