const express = require("express");
const router = express.Router();
const validator = require("../../Validations/validations");
const Post = require("../../models/posts");

router.post("/createPost", async (req, res) => {
  const { title, content, userID } = req.body;

  const isValidated = validator.createPostValidation(req.body);

  if (isValidated.error)
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });

  const newPost = new Post({
    title,
    content,
    likes: 0,
    userID,
    likedBy: []
  });

  newPost
    .save()
    .then(post => res.json({ data: post }))
    .catch(err => res.json({ error: "Can not create post" }));
});

router.get("/getPost/:userID", async (req, res) => {
  const userID = req.params.userID;
  const results = await Post.find({ userID: userID });
  res.json({ data: results });
});

router.delete("/deletePost/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPost = await Post.findByIdAndRemove(id);
    res.json({ msg: "Post was deleted successfully", data: deletedPost });
  } catch (error) {
    console.log(error);
  }
});

router.put("/editPost/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findOne({ _id: id });
    if (!post) return res.status(404).send({ error: "Post does not exist" });
    const isValidated = validator.updatePostValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const updatedPost = await Post.updateOne(req.body);
    res.json({ msg: "Post updated successfully" });
  } catch (error) {
    console.log(error);
  }
});

router.put("/like/:postID/:likedByID", async (req, res) => {
  try {
    const id = req.params.postID;
    const userID = req.params.likedByID;
    const post = await Post.findOne({ _id: id });
    if (!post) return res.status(404).send({ error: "Post does not exist" });
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
});

module.exports = router;
