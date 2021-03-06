const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const User = require("../models/user");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const validateRegisterInput = require("../validation/register-validation");
const validateLoginInput = require("../validation/login-validation");
router.get("/test", (req, res) => {
  res.send("hello");
});

//////register
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json({ errors });
  }
  errors.errors = { userName: "" };

  User.findOne({ userName: req.body.userName }).then(user => {
    if (user) {
      errors.errors.userName = "User name already exists";
      return res.status(400).json(errors);
    } else {
      User.findOne({ email: req.body.email }).then(user => {
        if (user) {
          const errors = {
            errors: {
              email: "Email already exists"
            }
          };
          return res.status(400).json(errors);
        } else {
          const avatar = gravatar.url(req.body.email, {
            s: "200", //size
            d: "mm" //Default
          });

          const newUser = new User({
            userName: req.body.userName,
            email: req.body.email.toLowerCase(),
            avatar,
            password: req.body.password
          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) {
                console.log(err);
              }
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  res.json(user);
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });
});
///////login
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(404).json({ errors });
  }
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then(user => {
    if (!user) {
      const errors = {
        errors: {
          email: "User Not Found"
        }
      };

      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          userName: user.userName,
          avatar: user.avatar
        };
        jwt.sign(
          payload,
          keys.jwtSecret,
          { expiresIn: "12h" },
          (err, token) => {
            res.json({
              succes: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        const errors = {
          errors: {
            password: "Password incorrect"
          }
        };
        return res.status(404).json(errors);
      }
    });
  });
});
/////change pic
router.post(
  "/updatePic",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ email: req.user.email }).then(user => {
      user.avatar = req.body.avatar;
      user.save().then(user => {
        res.json(user);
      });
    });
  }
);
///////get current user
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user._id,
      userName: req.user.userName,
      avatar: req.user.avatar,
      date: req.user.date,
      email: req.user.email
    });
  }
);
router.get("/getAllUsers", (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ notFound: "No users found" }));
});
/////get specific user
router.get("/getUser/:id", (req, res) => {
  User.findOne({ _id: req.params.id })
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ notFound: "No users found" }));
});
module.exports = router;
