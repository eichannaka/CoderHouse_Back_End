import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import session from "express-session";
import cookieParser from "cookie-parser";
import FileStore from "session-file-store";
//passport
import passport from "passport";
import "./passport/passportStrategies.js";

import { __dirname } from "./utils.js";
import { join } from "path";
import realTimeProducts from "./routes/realTimeProducts.route.js";
import cartRoute from "./routes/cart.route.js";
import productsRoute from "./routes/products.route.js";
import userRoute from "./routes/user.route.js";
import view from "./routes/views.router.js";
import chat from "./routes/messages.route.js";
// Mongo DB
import "./dao/dbConfig.js";
import mongoStore from "connect-mongo";
//DOTENV
import dotenv from "dotenv";
dotenv.config();

const app = express();
const cookieKey = "CookieFirmadaUser";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(cookieKey));

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

// mongo session
app.use(
  session({
    store: new mongoStore({
      mongoUrl: process.env.URI_MONGO,
    }),
    secret: "ecommerceKey",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 360000 },
  })
);

// passport
//inicializar passport
app.use(passport.initialize());
// passport va a guardar la informacion de session
app.use(passport.session());

//Rutas
app.use("/", view);
app.use("/chat", chat);
app.use("/realtimeproducts", realTimeProducts);
app.use("/api/products", productsRoute);
app.use("/api/carts", cartRoute);
app.use("/api/auth", userRoute);

const httpServer = app.listen(8080, () => {
  console.log("Escuchando al puerto", 8080);
});

// websocket

export const socketServer = new Server(httpServer);
