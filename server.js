var express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const keys = require("./config/keys");
const repos = require("./routes/repos");
const users = require("./routes/users");
const posts = require("./routes/posts");
require("./models/user");
require("./models/repos-model");
require("./models/posts-model");
const PORT = process.env.PORT || 5000;
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
    res.send(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
