const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Create Post
router.post("/create", async (req, res) => {
  try {
    const { userId, text, image } = req.body;

    if (!text && !image) {
      return res.status(400).json({ msg: "Text or Image required" });
    }

    const post = new Post({
      userId,
      text,
      image
    });

    await post.save();

    res.json(post);

  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Feed
router.get("/feed", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "email")
      .populate("comments.userId", "email")
      .sort({ createdAt: -1 });

    res.json(posts);

  } catch (err) {
    res.status(500).json(err);
  }
});

// Like / Unlike
router.put("/like/:postId", async (req, res) => {
  try {
    const { userId } = req.body;

    const post = await Post.findById(req.params.postId);

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.json({ likes: post.likes.length });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Comment
router.post("/comment/:postId", async (req, res) => {
  try {
    const { userId, text } = req.body;

    const post = await Post.findById(req.params.postId);

    post.comments.push({ userId, text });

    await post.save();

    res.json(post.comments);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;