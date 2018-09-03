const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReposSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  repoName: {
    type: String,
    required: true
  },
  repoDescription: {
    type: String,
    required: true
  },
  githubLink: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: Date.now()
  }
});
module.exports = Repo = mongoose.model("repos", ReposSchema);
