import { userModel } from "../models/user.model.js";
import { comparePasswords } from "../../utils.js";
export default class UserManager {
  // Obtiene todos los usuarios
  async getAllUsers() {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      console.log("ERROR getAllUsers", error);
      throw new Error({
        status: "error",
        message: "No hay users o no se pudo acceder a la base de datos",
      });
    }
  }
  async getUserById(uid) {
    try {
      const user = await userModel.findById(uid);
      return user;
    } catch (error) {
      console.log("ERROR getUserById", error);
      throw new Error({
        status: "error",
        message: "No existe el usuario o no se pudo acceder a la base de datos",
      });
    }
  }
  async createUser(user) {
    const { firstName, lastName, age, email, password } = user;
    if (!firstName || !lastName || !age || !email || !password) {
      return null; // throw new Error() q seria bloqueante
    }
    try {
      const createUser = await userModel.create({
        firstName,
        lastName,
        age,
        email,
        password,
      });
      return createUser;
    } catch (error) {
      console.log("ERROR createUser", error);
      throw new Error("No se pudo crear el usuario");
    }
  }
  async loginUser(user) {
    const { email, password } = user;
    try {
      const user = await userModel.findOne({ email });
      if (user) {
        const isPassword = await comparePasswords(password, user.password);
        console.log(isPassword);
        if (isPassword) {
          return user;
        }
      }
      return null;
    } catch (error) {
      console.log("ERROR loginUser", error);
      throw new Error("No se pudo encontrar el usuario");
    }
  }
}
