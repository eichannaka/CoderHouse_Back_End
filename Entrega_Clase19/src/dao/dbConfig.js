import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const URI = process.env.URI_MONGO;

try {
  await mongoose.connect(URI);
  console.log("DB conectada");
} catch (error) {
  console.log("No se pudo conectar la base de datos", error);
}
