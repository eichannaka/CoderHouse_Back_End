import { messageModel } from "../models/messages.model.js";

export default class MessageManager {
  async getMessages() {
    try {
      const messages = await messageModel.find()
       return messages;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async saveMessage(data) {
    try {
      const messages = await messageModel.create(data);
      return messages;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
