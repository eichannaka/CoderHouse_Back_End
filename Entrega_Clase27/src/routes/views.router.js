import { Router } from "express";

import {
  getProductsByCart,
  getProducts,
  getHome,
  auth,
} from "../services/db/controllers/views.controller.js";

const router = Router();

router.get("/", getHome);

/***  Obtiene Todos los productos y los muestra por navegador  ***/
router.get("/products", auth, getProducts);

/***  Obtiene Todos los productos del Carrito indicado y los muestra por navegador  ***/
router.get("/carts/:cid", auth, getProductsByCart);

/*********************/
/*        SESSION         */
/*********************/

// router.get("/session", (req, res) => {
//   if (req.session.counter) {
//     req.session.counter++;
//     res.send(
//       `Bienvenido nuevamente, usted ingreso: ${req.session.counter} veces.`
//     );
//   } else {
//     req.session.counter = 1;
//     res.send(`Bienvenido, es la primera vez que usted ingresa.`);
//   }
// });

// router.get("/login", (req, res) => {
//   const { username, pass } = req.query;

//   if (username !== "pepe" && pass !== "123") {
//     res.send("Usuario o contraseña incorrecta");
//   } else {
//     req.session.user = username;
//     req.session.admin = true;
//     res.send(`Bienvenido: ${username}`);
//   }

// });

// router.get("/logout", (req, res) => {
//   const user = req.session.user;
//   req.session.destroy((err) => {
//     if (err) {
//       return res.json({ status: "Error", body: err });
//     }
//     res
//       .clearCookie("connect.sid")
//       .send(`session finalizada correctamente ${user}.`);
//   });
// });

// router.get("/private", auth, (req, res) => {
//   res.send(
//     `Puedes acceder al sector privado porque ya te logueaste ${req.session.user}`
//   );
// });

/*********************/
/*    FIN   SESSION    */
/*********************/

export default router;
