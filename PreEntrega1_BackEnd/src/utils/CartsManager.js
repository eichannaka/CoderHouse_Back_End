import fs from "fs";
import { get } from "http";
import ProductManager from "../utils/ProductManager.js";
const manager = new ProductManager("Products.json");
export default class CartsManager {
  constructor(path) {
    this.carts = {};
    this.idCounter = 0;
    this.path = path;
  }
  // Obtiene los carritos creados
  async getCarts() {
    if (fs.existsSync(this.path)) {
      try {
        const carts = await fs.promises.readFile(this.path, "utf-8");
        const cartsParse = JSON.parse(carts);
        return cartsParse;
      } catch (error) {
        throw new Error("message: El archivo no existe o no se puede leer");
      }
    } else {
      console.log("no hay carritos que devolver");
      return [];
    }
  }
  // obtiene el producto segun el id pasado
  async getCartsById(id) {
    const cartSave = await this.getCarts();
    const found = cartSave.find((cart) => cart.id === id);
    if (found === undefined) {
      console.log("Not Found");
      return null;
    }
    return found;
  }
  // Crea un carro sin nececidad de pasarle ningun parametro y genera un id autoincremental como en ProductManager.js
  async createCart() {
    try {
      const getCarts = await this.getCarts();
      const id = await this.#generateId();
      const newCart = (this.carts[id] = {
        id: id,
        products: [],
      });
      getCarts.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(getCarts));
      return getCarts;
    } catch (err) {
      throw new Error("No se pudo crear el carrito");
    }
  }
  // primero el id del producto desp el id del cart en el endpoint
  async addProductToCart(cid, pid) {
    if (!cid || !pid) {
      throw new Error("Faltan rellenar campos");
    }
    try {
      const getCarts = await this.getCarts();
      const cart = getCarts.find((cart) => cart.id === cid);
      if (cart) {
        const productInCart = cart.products.find(
          (producto) => producto.product === pid
        );
        console.log(productInCart);
        if (productInCart === undefined) {
          cart.products.push({
            product: pid,
            quantity: 1,
          });
        } else {
          productInCart.quantity++;
        }
      } else {
        console.log("Carrito no existente");
        return null; // throw new Error() q seria bloqueante
      }

      await fs.promises.writeFile(this.path, JSON.stringify(getCarts));
      return getCarts;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async #generateId() {
    let id = 1;
    try {
      const cartsSave = await this.getCarts();
      if (cartsSave.length !== 0) {
        id = cartsSave[cartsSave.length - 1].id + 1;
      }

      return id;
    } catch (error) {
      throw new Error("No se pudo crear el id del carrito");
    }
  }
}
