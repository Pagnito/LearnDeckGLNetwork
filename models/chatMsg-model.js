const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatMsgSchema = new Schema({
  userName: {
    type: String
    //required: true
  },
  message: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: String,
    default: Date.now()
  }
});
module.exports = ChatMsg = mongoose.model("chat", ChatMsgSchema);
