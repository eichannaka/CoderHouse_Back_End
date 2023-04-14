import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});
export const messageModel = mongoose.model("Message", messagesSchema);
