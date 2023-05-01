import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }
  // obtiene todos los productos
  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        const productsParse = JSON.parse(products);
        return productsParse;
      } else {
        console.log("no hay productos que devolver");
        return [];
      }
    } catch (error) {
      console.log("message:", error.message, "Reason:", error.name);
      throw new Error("message: El archivo no existe o no se puede leer");
    }
  }
  // obtiene el producto segun el id pasado
  async getProductsById(id) {
    // devuelve null o un elemento {}
    const productSave = await this.getProducts();

    const found = productSave.find((product) => product.id === id);

    if (found === undefined) {
      console.log("Not Found");
      return null;
    }
    return found;
  }
  // agrega un producto
  async addProduct(
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail
  ) {
    //devuelve el prducto entero {} y si salta al cathch devuelve null para manejarlo en el cliente
    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !code ||
      !status ||
      !stock
    ) {
      return null;
      // throw new Error("Faltan rellenar campos");
    }
    try {
      const productSave = await this.getProducts();
      const product = {
        id: await this.#idAutoIncremental(),
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail,
      };
      productSave.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(productSave));
      return product;
    } catch (error) {
      throw new Error("message: No se pudo guardar el producto");
    }
  }
  // elimina un productos
  async deleteProduct(id) {
    if (!id) {
      return null;
      // throw new Error("Indica el id del producto a eliminar");
    }
    try {
      const productSave = await this.getProducts();
      const indexToProductDelete = productSave.findIndex(
        (element) => element.id === id
      );
      if (indexToProductDelete === -1) {
        throw new Error("El id indicado no se encotro");
      } else {
        productSave.splice(indexToProductDelete, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(productSave));
        return productSave;
      }
    } catch (error) {
      console.log("message:", error.message, "Reason:", error.name); //no retorno un thorw new Error porque getProduct ya retorna un throw y directamente sale en el mensaje en consola para el dessarrollador en cambio en el cliente le va a aparecer null
      return null;
    }
  }
  // modifica un producto con el id que se indique y el campo que quiera modificar o el producto entero (sin modificar el id)
  async udapteProduct(id, productUdapted) {
    // devuelve todos los productos con el producto modificado [{},{},{}]
    if (!id || !productUdapted) {
      throw new Error("Falta campos a rellenar");
    }
    try {
      const productSave = await this.getProducts();
      let indexToRemove = id;

      for (let i = 0; i < productSave.length; i++) {
        if (productSave[i].id === indexToRemove) {
          productSave[i].id = id;
          productSave[i].title = productUdapted.title;
          productSave[i].status = productUdapted.status;
          productSave[i].category = productUdapted.category;
          productSave[i].description = productUdapted.description;
          productSave[i].price = productUdapted.price;
          productSave[i].thumbnail = productUdapted.thumbnail;
          productSave[i].code = productUdapted.code;
          productSave[i].stock = productUdapted.stock;
          break;
        }
      }
      await fs.promises.writeFile(this.path, JSON.stringify(productSave));
      return productSave;
    } catch (error) {
      throw new Error("No se pudo modificar el producto");
    }
  }
  // ID autoincremetal para cada producto agregado
  async #idAutoIncremental() {
    let id = 1;
    try {
      const productsParse = await this.getProducts();
      if (productsParse.length !== 0) {
        id = productsParse[productsParse.length - 1].id + 1;
      }

      return id;
    } catch (error) {
      console.log("message:", error.message, "Reason:", error.name);
      return null;
    }
  }
}
