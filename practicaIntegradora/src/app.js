import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import { __dirname } from "./utils.js";
import { join } from "path";
import realTimeProducts from "./routes/realTimeProducts.route.js";
import cartRoute from "./routes/cart.route.js";
import productsRoute from "./routes/products.route.js";
import home from "./routes/home.route.js";
import chat from "./routes/messages.route.js";
// Mongo DB
import "./dao/dbConfig.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// archivos estaticos
app.use(express.static(__dirname + "/public"));

// Motor de plantillas
app.set("views", join(__dirname, "views"));
// config de hadlebars
const hbs = handlebars.create({
  defaultLayout: "main",
  layoutsDir: join(app.get("views"), "layouts"),
  partialsDir: join(app.get("views"), "partials"),
  extname: ".hbs",
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

//Rutas
app.use("/", home);
app.use("/chat", chat);
app.use("/realtimeproducts", realTimeProducts);
app.use("/api/products", productsRoute);
app.use("/api/carts", cartRoute);

const httpServer = app.listen(8080, () => {
  console.log("Escuchando al puerto", 8080);
});

// websocket

export const socketServer = new Server(httpServer);


