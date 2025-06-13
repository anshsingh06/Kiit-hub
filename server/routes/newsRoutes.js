const express = require('express');
const router = express.Router();
const { createNews, getAllNews } = require('../controllers/newsController');
const authenticateToken = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const NewsEvent = require('../models/newsevent');
const { deleteNews, updateNews } = require('../controllers/newsController');



// GET all news
router.get('/', getAllNews);

// POST a news/event (protected)
router.post(
  '/',
  authenticateToken,
   adminMiddleware, 
  upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'attachments', maxCount: 3 }
  ]),
  createNews
);

// GET single news/event by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const news = await NewsEvent.findById(id).populate('postedBy', 'name department');
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching news by ID' });
  }
});


// DELETE news (admin only)
router.delete('/:id', authenticateToken, adminMiddleware, deleteNews);

// PUT update news (admin only)
router.put('/:id', authenticateToken, adminMiddleware, updateNews);



module.exports = router;
