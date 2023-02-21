class ProductManager {
    constructor(title, description, price, thumbnail, code, stock, id) {
        this.products = [];
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = id;
    }
    addProduct(product) {
        for (const element of this.products) {
            if (product.stock < 0 || product.price < 0 || product.code === "" || product.title === "" || product.description === "" || product.thumbnail === "") {
                return { error: "All fields are required" }
            }
            else
                if (element.code === product.code) {
                    return { error: "This product already exists." }

                }
        }
        product.id = Math.random().toString(9);
        this.products.push(product)
        return this.products
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        for (const element of this.products) {
            if (element.id === id) {
                return element.title
            }
        }
        return { error: "Not Found" }
    }
}


//Test

const productManager = new ProductManager

console.log("Lista Vacia");
console.log(productManager.getProducts);

console.log("AgregoProducto");
console.log(productManager.addProduct({ title: "Remera", description: "alguna descripcion", price: 1300, thumbnail: "una imagen", code: "abc123", stock: 15 }));


console.log("Lista con un producto");
console.log(productManager.getProducts());


console.log("Agrego un Producto con el mismo codigo");
console.log(productManager.addProduct({ title: "Remera", description: "alguna descripcion", price: 1300, thumbnail: "una imagen", code: "abc123", stock: 15 }));

console.log("Agrego un producto con un campo vacio");
console.log(productManager.addProduct({ title: "", description: "alguna descripcion", price: 1300, thumbnail: "una imagen", code: "abc123", stock: 15 }));

console.log("Busco Producto por Id y funcionma");
console.log(productManager.getProductById(productManager.products[0].id));

console.log("Busco un producto por id y no funciona");
console.log(productManager.getProductById("123"));
