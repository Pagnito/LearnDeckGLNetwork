const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();
//const User = require("../models/user");
const Post = require("../models/posts-model");
const validatePostInput = require("../validation/posts-validation");
const validateCommentInput = require("../validation/comments-validation");
///get single post//public
router.get("/post/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ error: "No post for you" }));
});

///get posts//public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ error: "No posts for you" }));
});

///create post
router.post(
  "/post",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = await new Post({
      text: req.body.text,
      topic: req.body.topic,
      description: req.body.description,
      userName: req.body.userName,
      avatar: req.body.avatar,
      userId: req.user.id
    });
    await newPost.save();
    Post.find()
      .sort({ date: -1 })
      .then(posts => res.json(posts));
  }
);

////delete post
router.delete(
  "/deletePost/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ error: "wow buddy what you think you doing" });
      }
      await post.remove();
      Post.find().then(posts => {
        res.json(posts);
      });
    } catch (err) {
      res.status(404).json({ error: "no post" });
    }
  }
);

//api///post//like/
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let post = await Post.findById(req.params.id);

      if (
        post.likes.filter(like => like.userId.toString() === req.user.id)
          .length > 0
      ) {
        res.status(400).json({ error: "Already liked" });
      } else {
        post.likes.push({ userId: req.user.id });
      }
      await post.save();
      Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts));
    } catch (err) {
      res.status(404).json({ error: "no post" });
    }
  }
);

///unlike post
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let post = await Post.findById(req.params.id);

      if (
        post.likes.filter(like => like.userId.toString() === req.user.id)
          .length === 0
      ) {
        res.status(400).json({ error: "You have not liked this post" });
      }
      post.likes.map(like => {
        if (like.userId.toString() === req.user.id) {
          post.likes.splice(post.likes.indexOf(like), 1);
        }
      });

      await post.save();
      Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts));
    } catch (err) {
      res.status(404).json({ error: "no post" });
    }
  }
);

///api post///add commet//:// Id
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);
    if (!isValid) {
      return res.status(404).json(errors);
    }
    try {
      let post = await Post.findById(req.params.id);
      let newComment = {
        userId: req.user.id,
        text: req.body.text,
        userName: req.user.userName,
        avatar: req.user.avatar
      };

      post.comments.unshift(newComment);

      await post.save();
      res.json(post);
    } catch (err) {
      res.status(404).json({ error: "No post to comment on" });
    }
  }
);

////delete a comments
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let post = await Post.findById(req.params.id);

      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res.status(404).json({ error: "No comment to delete" });
      }

      post.comments.map((comment, ind) => {
        if (comment._id.toString() === req.params.comment_id) {
          post.comments.splice(ind, 1);
        }
      });

      await post.save();
      res.json(post);
    } catch (err) {
      res.status(404).json({ error: "No post to delete" });
    }
  }
);
module.exports = router;
