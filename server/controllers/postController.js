const Post = require('../models/post');
const Answer = require('../models/answer');

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



const addAnswer = async (req, res) => {
  const { id, text } = req.body;

exports.addAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const answer = new Answer({
      text,
      // postedBy: req.user?.id, 
    });

    await answer.save();

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push(answer._id);
    await post.save();

    res.status(201).json(answer);
  } catch (err) {
    console.error("Error adding answer:", err);
    res.status(500).json({ message: "Server error adding answer" });
  }
};
}






module.exports = { createPost, getAllPosts, addAnswer };
