const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const Repo = require("../models/repos-model");
const validateRepoInput = require("../validation/repo-validation");
router.post(
  "/postRepo",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateRepoInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Repo.findOne({ repoName: req.body.repoName })
      .then(repo => {
        if (repo) {
          const errors = {};
          errors.repo = "Repo under this name already exists";
          res.status(404).json(errors);
        } else {
          const newRepo = new Repo({
            userId: req.user.id,
            repoName: req.body.repoName,
            githubLink: req.body.githubLink,
            repoDescription: req.body.repoDescription
          });
          newRepo
            .save()
            .then(() => {
              Repo.find().then(repos => {
                res.json(repos);
              });
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
);
////public getRepos
router.get(
  "/showRepos/:id",

  (req, res) => {
    Repo.find({ userId: req.params.id })
      .sort({ date: -1 })
      .then(repos => res.json(repos))
      .catch(err => res(status(404).json({ error: "No soup for you" })));
  }
);
//////private account repos
router.get(
  "/getRepos/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Repo.find({ userId: req.user.id })
      .sort({ date: -1 })
      .then(repos => res.json(repos))
      .catch(err => res(status(404).json({ error: "No soup for you" })));
  }
);
////delete repo

router.delete(
  "/deleteRepo/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Repo.findOne({ _id: req.params.id }).then(repo => {
      repo.remove().then(() => {
        Repo.find({ userId: req.user.id })
          .sort({ date: -1 })
          .then(repos => res.json(repos));
      });
    });
  }
);
module.exports = router;
