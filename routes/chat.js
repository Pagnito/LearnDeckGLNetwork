const mongoose = require("mongoose");
const ChatMsg = require("../models/chatMsg-model");
module.exports = io => {
  const chatUsers = [];
  const connections = [];
  const messages = [];
  io.on("connection", socket => {
    /////newUser
    socket.on("newUser", data => {
      chatUsers.push(data);
      io.emit("chatUsers", chatUsers);
    });
    console.log("connected: %s sockets connected", connections.length);
    ChatMsg.find()
      .sort({ date: 1 })
      .then(data => {
        if (data.length > 100) {
          data = data.splice(100, data.length - 1);
          data.save();
        }
        io.emit("messages", data);
      });

    /////disconnect
    socket.on("disconnect", () => {
      connections.splice(connections.indexOf(socket));
      chatUsers.splice(chatUsers.indexOf(socket));
      io.emit("userDisconnected", chatUsers);
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
