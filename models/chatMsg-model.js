const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatMsgSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
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
    type: Date,
    default: Date.now
  }
});
module.exports = ChatMsg = mongoose.model("chat", ChatMsgSchema);
