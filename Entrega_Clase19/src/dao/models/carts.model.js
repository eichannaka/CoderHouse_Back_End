import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number, default: 1 },
    },
  ],
});

cartsSchema.pre("find", function () {
  this.populate("products");
});

export const cartsModel = mongoose.model("Carts", cartsSchema);
