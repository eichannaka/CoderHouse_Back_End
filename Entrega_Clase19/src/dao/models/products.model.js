import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// El producto que se ingrese va a necesiar si o si de las porpiedades
// que se detallan en el schema
const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  code: {
    type: Number,
    require: true,
    unique: true,
  },
  price: {
    type: Number,
    require: true,
  },
  status: {
    type: Boolean,
    default: false,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  thumbnail: {
    type: Array,
  },
});
productsSchema.plugin(mongoosePaginate);

export const porductsModel = mongoose.model("Products", productsSchema);
