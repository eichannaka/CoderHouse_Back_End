import express from "express";

import cartRoute from "./routes/cart.route.js";
import productsRoute from "./routes/products.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // Rutas
app.use("/api/products", productsRoute);
app.use("/api/carts", cartRoute);

app.listen(8080, () => {
  console.log("Escuchando al puerto", 8080);
});
