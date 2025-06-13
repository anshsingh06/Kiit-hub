const express = require('express');
const router = express.Router();
const { createNews, getAllNews } = require('../controllers/newsController');
const authenticateToken = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// GET all news
router.get('/', getAllNews);

// POST a news/event (protected)
router.post(
  '/',
  authenticateToken,
  upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'attachments', maxCount: 3 }
  ]),
  createNews
);


module.exports = router;
