const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const {
  addAnswer,
  createPost,
  deleteAnswer,
  deletePost,
  getAllPosts,
} = require('../controllers/postController');

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', authenticateToken, createPost);
router.post('/:id/answers', authenticateToken, addAnswer);
router.delete('/:id/answers/:answerId', authenticateToken, deleteAnswer);
router.delete('/:id', authenticateToken, deletePost);

module.exports = router;
