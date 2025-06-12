const Comment = require('../models/comment');
const Post = require('../models/post');

const createComment = async (req, res) => {
  const { text } = req.body;
  const { postId } = req.params;

  try {
    const comment = new Comment({
      postId,
      authorId: req.user.userId,
      text
    });

    await comment.save();

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: comment._id }
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Error creating comment' });
  }
};

module.exports = { createComment };
