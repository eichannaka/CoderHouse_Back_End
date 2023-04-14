import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  products: {
    type: Array,
    require: true,
  },
});
export const cartsModel = mongoose.model("Carts", cartsSchema);
