const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const Repo = require("../models/repos-model");
router.post(
  "/postRepo",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Repo.findOne({ repoName: req.body.repoName })
      .then(repo => {
        if (repo) {
          res
            .status(404)
            .json({ repoExists: "Repo under this name already exists" });
        } else {
          const newRepo = new Repo({
            userId: req.user.id,
            repoName: req.body.repoName,
            githubLink: req.body.githubLink,
            repoDescription: req.body.repoDescription
          });
          newRepo
            .save()
            .then(repo => {
              res.json(repo);
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
);

//////private account repos
router.get(
  "/getRepos",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Repo.find({ userId: req.user.id })
      .sort({ date: -1 })
      .then(repos => res.json(repos))
      .catch(err => res(status(404).json({ error: "No soup for you" })));
  }
);
module.exports = router;
