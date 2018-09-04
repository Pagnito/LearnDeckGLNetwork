const mongoose = require("mongoose");
const ChatMsg = require("../models/chatMsg-model");
module.exports = io => {
  const chatUsers = [];
  const connections = [];
  const messages = [];
  io.on("connection", socket => {
    connections.push(socket);
    console.log("connected: %s sockets connected", connections.length);
    ChatMsg.find()
      .sort({ date: -1 })
      .then(data => io.emit("messages", data));

    /////disconnect
    socket.on("disconnect", () => {
      connections.splice(connections.indexOf(socket));
      io.emit("user disconnected");
      console.log("disconnected: %s sockets connected", connections.length);
    });
    ////send messege
    socket.on("message", data => {
      io.emit("new message", { message: data });
      messages.push(data);
      const newMsg = new ChatMsg({
        userName: data.userName,
        message: data.message,
        avatar: data.avatar
      });
      newMsg.save();
    });
  });
};
