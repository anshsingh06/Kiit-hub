const express = require('express');
const router = express.Router();
const { createNews, getAllNews } = require('../controllers/newsController');
const authenticateToken = require('../middleware/authMiddleware');

// GET all news
router.get('/', getAllNews);

// POST a news/event (protected)
router.post('/', authenticateToken, createNews);

module.exports = router;
