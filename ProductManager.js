const fs = require("fs");

class ProductManager {
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
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }
    // obtiene el producto segun el id pasado
    async getProductsById(id) {
        const productSave = await this.getProducts();
        const foundId = productSave.find((product) => product.id === id);
        if (foundId === undefined) {
            console.log("Not Found");
            return null;
        } else {
            console.log("producto encontrado");
            return foundId;
        }
    }
    // agrega un producto
    async addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error("Faltan rellenar campos");
        }
        try {
            const productSave = await this.getProducts();
            const product = {
                id: await this.#idAutoIncremental(),
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };
            productSave.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(productSave));
            return productSave;
        } catch (error) {
            console.log(error);
        }
    }
    // elimina un productos
    async deleteProduct(id) {
        if (!id) {
            throw new Error("Indica el id del producto a eliminar");
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
                console.log(productSave);
                await fs.promises.writeFile(this.path, JSON.stringify(productSave));
                return productSave;
            }
        } catch (error) {
            console.log(error);
        }
    }
    // modifica un producto con el id que se indique y el campo que quiera modificar o el producto entero (sin modificar el id)
    async udapteProduct(id, elementudapte) {
        if (!id || !elementudapte) {
            console.error("Faltan rellenar campos");
            return null;
        }
        try {
            const productSave = await this.getProducts();
            let indexToRemove = id;

            for (let i = 0; i < productSave.length; i++) {
                if (productSave[i].id === indexToRemove) {
                    productSave[i].id = id;
                    productSave[i].title = elementudapte.title;
                    productSave[i].description = elementudapte.description;
                    productSave[i].price = elementudapte.price;
                    productSave[i].thumbnail = elementudapte.thumbnail;
                    productSave[i].code = elementudapte.code;
                    productSave[i].stock = elementudapte.stock;
                    break;
                }
            }
            await fs.promises.writeFile(this.path, JSON.stringify(productSave));
            return productSave;
        } catch (error) {
            console.log("No se pudo modificar el producto", error);
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
            console.log(error);
        }
    }
}
const manager = new ProductManager("Products.json");

async function prueba() {
    // const getProducts = await manager.getProducts();
    // const getProductsById = await manager.getProductsById(1);
    // const deleteProduct = await manager.deleteProduct(2);
    // const udapteProduct = await manager.udapteProduct(5, {
    //   title: "titulo modificado sin modificar el id",
    //   description: "descripcion modificada",
    //   price: 200,
    //   thumbnail: "URL image meodificada",
    //   code: 300,
    //   stock: 10,
    // });
    // const addProduct = await manager.addProduct(
    //   "Titulo5",
    //   "descripcion5",
    //   40,
    //   "URL image5",
    //   100,
    //   40
    // );
    // console.log(addProduct);
    // console.log(getProducts);
    // console.log(getProductsById);
    // console.log(udapteProduct);
    // console.log(deleteProduct);
}

prueba();