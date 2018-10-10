var express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const keys = require("./config/keys");
const repos = require("./routes/repos");
const users = require("./routes/users");
const posts = require("./routes/posts");
const PORT = process.env.PORT || 5000;
require("./models/user");
require("./models/repos-model");
require("./models/posts-model");
require("./models/chatMsg-model");
require("./routes/chat")(io);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose
  .connect(
    keys.mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log(" Connected To Mongo"))
  .catch(err => console.log(err));
app.use(passport.initialize());
require("./services/passport")(passport);
app.use("/api/users", users);
app.use("/api/repos", repos);
app.use("/api/posts", posts);
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

server.listen(PORT, () => console.log(` Server running on port ${PORT}`));
