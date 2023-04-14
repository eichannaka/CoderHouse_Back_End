import { Router } from "express";
import MessageManager from "../dao/mongoManager/MessageManager.js";
import { socketServer } from "../app.js";
const router = Router();
const messageManager = new MessageManager();
const usersConected = [];

router.get("/", async (req, res) => {
  const allMessages = await messageManager.getMessages();

  socketServer.on("connection", async (socket) => {
    socket.on("disconnect", () => {
      console.log("Usuario desconectado");
    });

    socket.on("nuevoUsuario", (usuario) => {
      usersConected.push(usuario);
      socket.broadcast.emit("server:usersConected",usersConected);
    });
    socket.on("client:msg", async (data) => {
      await messageManager.saveMessage(data);
      const msgsSaved = await messageManager.getMessages();
      socketServer.emit("server:msg", msgsSaved);
    });
    socketServer.emit("server:msg", allMessages);
  });
  res.render("chat");
});

export default router;
