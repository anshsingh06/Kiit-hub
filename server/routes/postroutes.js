const express = require('express');
const router = express.Router();
// const authenticateToken = require('../middleware/authMiddleware');
const { createPost, getAllPosts } = require('../controllers/postController');
const { addAnswer } = require('../controllers/postController');

// Create a new post
router.post('/', createPost);

// Get all posts
router.get('/', getAllPosts);

// Add an answer to a post
router.post('/', addAnswer);

module.exports = router;
