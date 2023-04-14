import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const URI = process.env.URI_MONGO;

mongoose.connect(URI, (error) => {
  if (error) {
    console.log("No se pudo conectar la base de datos");
  } else {
    console.log("DB conectada");
  }
});
