import { porductsModel } from "../models/products.model.js";

export default class ProductManager {
  async getProducts(limit, page, query, sort) {
    // console.log("LIMIT:", limit, "PAGE:", page, "QUERY", query, "SORT:", sort);
    const filtro = {
      limit,
      page,
      sort: sort ? { price: sort } : {},
    };

    try {
      const filterProducts = await porductsModel.paginate(query, filtro);
      return filterProducts;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async getProductsById(id) {
    try {
      const productById = await porductsModel.findById(id);
      return productById;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async addProduct(product) {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    } = product;
    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !status ||
      !stock ||
      !category
    ) {
      return null;
    }
    // Normalizo el producto colocando todo en minuscula para que en las consultas por querys y params no haya confusiones
    const productNormalize = {
      title: title.toLowerCase(),
      description: description.toLowerCase(),
      code,
      price,
      status,
      stock,
      category: category.toLowerCase(),
      thumbnail,
    };
    try {
      const newProduct = await porductsModel.create(productNormalize);
      return newProduct;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async deleteProduct(id) {
    try {
      const deleteProduct = await porductsModel.findByIdAndDelete(id);
      return deleteProduct;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async udapteProduct(id, productUdapted) {
    const productId = id;
    const productOld = this.getProductsById(productId);
    const {
      title,
      price,
      description,
      code,
      status,
      stock,
      category,
      thumbnail,
    } = productUdapted;
    try {
      const productUdapted = await porductsModel.findByIdAndUpdate(productId, {
        title: title ? title : productOld.title,
        description: description ? description : productOld.description,
        code: code ? code : productOld.code,
        price: price ? price : productOld.price,
        status: status ? status : productOld.status,
        stock: stock ? stock : productOld.stock,
        category: category ? category : productOld.category,
        thumbnail: thumbnail ? thumbnail : productOld.thumbnail,
      });
      return productUdapted;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
// .paginate({}, { limit, page });
