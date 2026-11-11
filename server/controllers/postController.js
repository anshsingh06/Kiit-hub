const mongoose = require('mongoose');
const Answer = require('../models/answer');
const Comment = require('../models/comment');
const Post = require('../models/post');

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const canManage = (document, user) =>
  user.role === 'admin' ||
  (document.authorId && document.authorId.toString() === user.id);

const createPost = async (req, res) => {
  const { title, content, tags = [] } = req.body;

  if (typeof title !== 'string' || !title.trim() ||
      typeof content !== 'string' || !content.trim()) {
    return res.status(400).json({ message: 'A title and question are required.' });
  }

  try {
    const post = await Post.create({
      title: title.trim(),
      content: content.trim(),
      tags: Array.isArray(tags) ? tags : [],
      authorId: req.user.id,
    });
    const populatedPost = await Post.findById(post._id)
      .populate('authorId', 'name department year')
      .populate({ path: 'answers', populate: { path: 'postedBy', select: 'name' } });

    res.status(201).json(populatedPost);
  } catch (err) {
    console.error('Error creating discussion post:', err);
    res.status(500).json({ message: 'Could not create the question.' });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('authorId', 'name department year')
      .populate({ path: 'answers', populate: { path: 'postedBy', select: 'name' } })
      .sort({ timestamp: -1 });
    res.json(posts);
  } catch (err) {
    console.error('Error fetching discussion posts:', err);
    res.status(500).json({ message: 'Could not load discussion questions.' });
  }
};

const addAnswer = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!isValidId(id)) {
    return res.status(400).json({ message: 'Invalid question ID.' });
  }
  if (typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ message: 'An answer cannot be empty.' });
  }

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Question not found.' });

    const answer = await Answer.create({
      text: text.trim(),
      postedBy: req.user.id,
    });

    post.answers.push(answer._id);
    try {
      await post.save();
    } catch (err) {
      await Answer.findByIdAndDelete(answer._id);
      throw err;
    }

    const populatedAnswer = await Answer.findById(answer._id)
      .populate('postedBy', 'name');
    res.status(201).json(populatedAnswer);
  } catch (err) {
    console.error('Error adding discussion answer:', err);
    res.status(500).json({ message: 'Could not add your answer.' });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json({ message: 'Invalid question ID.' });
  }

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Question not found.' });
    if (!canManage(post, req.user)) {
      return res.status(403).json({ message: 'You can only delete your own question.' });
    }

    await Promise.all([
      Answer.deleteMany({ _id: { $in: post.answers } }),
      Comment.deleteMany({ postId: post._id }),
    ]);
    await post.deleteOne();

    res.json({ message: 'Question deleted.' });
  } catch (err) {
    console.error('Error deleting discussion post:', err);
    res.status(500).json({ message: 'Could not delete the question.' });
  }
};

const deleteAnswer = async (req, res) => {
  const { id, answerId } = req.params;

  if (!isValidId(id) || !isValidId(answerId)) {
    return res.status(400).json({ message: 'Invalid question or answer ID.' });
  }

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Question not found.' });

    if (!post.answers.some((item) => item.toString() === answerId)) {
      return res.status(404).json({ message: 'Answer not found on this question.' });
    }

    const answer = await Answer.findById(answerId);
    if (!answer) {
      post.answers.pull(answerId);
      await post.save();
      return res.status(404).json({ message: 'Answer not found.' });
    }

    const canDelete =
      req.user.role === 'admin' ||
      (answer.postedBy && answer.postedBy.toString() === req.user.id);
    if (!canDelete) {
      return res.status(403).json({ message: 'You can only delete your own answer.' });
    }

    post.answers.pull(answerId);
    await post.save();
    await answer.deleteOne();
    res.json({ message: 'Answer deleted.' });
  } catch (err) {
    console.error('Error deleting discussion answer:', err);
    res.status(500).json({ message: 'Could not delete the answer.' });
  }
};

module.exports = { createPost, getAllPosts, addAnswer, deletePost, deleteAnswer };
