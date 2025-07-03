const Post = require('../models/post');

// Create a new post
const createPost = async (req, res) => {
  const { title, content, tags } = req.body;

  try {
    const post = new Post({
      title,
      content,
      tags,
      //authorId: req.user.id     
      // from token middleware
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('authorId', 'name department year').sort({ timestamp: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createPost, getAllPosts };
