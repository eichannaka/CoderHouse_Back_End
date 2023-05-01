import { cartsModel } from "../models/carts.model.js";
export default class CartsManager {
  // Obtiene los carritos creados
  async getCarts() {
    try {
      const cart = await cartsModel.find();
      return cart;
    } catch (error) {
      console.log("ERROR getCarts", error);
      throw new Error({
        status: "error",
        message: "No hay carritos o no se pudo acceder a la base de datos",
      });
    }
  }
  // obtiene el producto segun el id pasado
  async getCartsById(id) {
    const populate = { path: "products" };
    try {
      const cartById = await cartsModel.findById(id).populate("products");
      // console.log(cartById);
      return cartById;
    } catch (error) {
      console.log("ERROR getCartsById", error);
      throw new Error({
        status: "error",
        message: "No hay carritos o no se pudo acceder a la base de datos",
      });
    }
  }
  // Crea un carro sin nececidad de pasarle ningun parametro
  async createCart() {
    try {
      const createCart = await cartsModel.create({});
      return createCart;
    } catch (error) {
      console.log("ERROR createCart", error);
      throw new Error("No se pudo crear el carrito");
    }
  }
  // primero el id del producto desp el id del cart en el endpoint
  async addProductToCart(cid, pid) {
    if (!cid || !pid) {
      throw new Error("Faltan rellenar campos");
    }
    try {
      const cartById = await cartsModel.findById(cid);
      const filter = cartById.products.find((element) => element._id == pid);
      if (filter === undefined) {
        cartById.products.push(pid);
      } else {
        filter.quantity++;
      }
      cartById.save();
      return cartById;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // Elimina un el producto por el id del carrito
  async deleteProductToCart(cid, pid) {
    if (!cid || !pid) {
      throw new Error("Faltan rellenar campos");
    }
    const cartById = await cartsModel.findById(cid);
    const indexToProductDelete = cartById.products.findIndex(
      (element) => element.id == pid
    );
    if (indexToProductDelete === -1) {
      return null; // throw new Error() q seria bloqueante
    } else {
      cartById.products.splice(indexToProductDelete, 1);
      cartById.save();
      return cartById;
    }
  }
  // Actualiza el carrito entero
  async udapteCart(cid, pUdapted) {
    const cartById = await cartsModel.findByIdAndUpdate(cid, {
      products: pUdapted,
    });
    return cartById;
  }
  // Actualiza la cantidad  del producto por body
  async udapteProductToCart(cid, pid, quantity) {
    const cartById = await cartsModel.findById(cid);
    const quantityUdapte = cartById.products.filter(
      (element) => element.id == pid
    );
    if (quantityUdapte.length === 0) {
      return null; // throw new Error() q seria bloqueante
    } else {
      quantityUdapte.forEach((element) => {
        element.quantity = quantity;
      });
      cartById.save();
      return cartById;
    }
  }
  // Elimina todos los productos del carrito
  async deleteAllProductToCart(cid) {
    const deleteProducts = await cartsModel.findByIdAndUpdate(cid, {
      products: [],
    });
    deleteProducts.save();
    return deleteProducts;
  }
}
