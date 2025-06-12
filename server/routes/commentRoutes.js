const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const { createComment } = require('../controllers/commentController');

// Add a comment to a post
router.post('/:postId', authenticateToken, createComment);

module.exports = router;
