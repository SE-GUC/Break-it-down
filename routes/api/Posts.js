const express = require("express");
const router = express.Router();
const validator = require("../../Validations/validations");
const Post = require("../../models/posts");
const jwt = require("jsonwebtoken");
const tokenKey = require("../../config/keys").secretOrKey;
var store = require("store");

router.post("/createPost", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      //res.json({ error: "forbidden", status: "403" });
      res.sendStatus(403);
    } else {
      const { title, content } = req.body;

      const newPost = new Post({
        title,
        content,
        likes: 0,
        userID: authorizedData.id,
        likedBy: [],
        name: authorizedData.name
      });
      console.log(newPost);

      newPost
        .save()
        .then(post => res.json({ data: post }))
        .catch(err => {
          console.log(err);
          res.json({ error: "Can not create post" });
        });
      console.log("SUCCESS: Connected to protected route y");
    }
  });
});

router.get("/getPost", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      //res.json({ error: "forbidden", status: "403" });
      res.sendStatus(403);
    } else {
      const userID = authorizedData.id;
      const results = await Post.find({ userID: userID });
      res.json({ data: results });
    }
  });
});

router.get("/getPost/:id", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      //res.json({ error: "forbidden", status: "403" });
      res.sendStatus(403);
    } else {
      const userID = req.params.id;
      const results = await Post.find({ userID: userID });
      res.json({ data: results });
    }
  });
});

router.delete("/deletePost/:id", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      //res.json({ error: "forbidden", status: "403" });
      res.sendStatus(403);
    } else {
      try {
        const id = req.params.id;
        const deletedPost = await Post.findByIdAndRemove(id);
        res.json({ msg: "Post was deleted successfully", data: deletedPost });
      } catch (error) {
        console.log(error);
      }
    }
  });
});

router.put("/editPost/:id", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      //res.json({ error: "forbidden", status: "403" });
      res.sendStatus(403);
    } else {
      try {
        const id = req.params.id;
        const post = await Post.findOne({ _id: id });
        if (!post)
          return res.status(404).send({ error: "Post does not exist" });
        const isValidated = validator.updatePostValidation(req.body);
        if (isValidated.error)
          return res
            .status(400)
            .send({ error: isValidated.error.details[0].message });
        const updatedPost = await Post.update(
          { _id: id },
          { $set: { content: req.body.content, title: req.body.title } }
        );
        res.json({ msg: "Post updated successfully" });
      } catch (error) {
        console.log(error);
      }
    }
  });
});

router.put("/like/:postID", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      //res.json({ error: "forbidden", status: "403" });
      res.sendStatus(403);
    } else {
      try {
        const id = req.params.postID;
        const userID = authorizedData.id;
        const post = await Post.findOne({ _id: id });
        if (!post)
          return res.status(404).send({ error: "Post does not exist" });
        const isValidated = validator.updatePostValidation(req.body);
        const user = post.likedBy.find(x => x === userID);
        if (!user) res.send("Already liked");
        else {
          console.log(post.likes);
          post.updateOne({
            likes: post.likes++,
            likedBy: post.likedBy.push(userID)
          });
          await Post.updateOne(post);
          res.json({ msg: "Post updated successfully" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
});

module.exports = router;
