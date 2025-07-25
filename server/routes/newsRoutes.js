// routes/newsRoutes.js
const express = require('express');
const router = express.Router();
const NewsEvent = require('../models/newsevent');
const upload = require('../middleware/uploadMiddleware');
const authenticateToken = require("../middleware/authMiddleware");


// GET all news and events
router.get('/', async (req, res) => {
  try {
    const news = await NewsEvent.find().populate('postedBy', 'name department');
    res.json(news);
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// CREATE news or event (public)
router.post(
  "/",
  upload.single("image"), // Accept ONE image file field named "image"
  async (req, res) => {
    try {
      console.log("Received body:", req.body);
      console.log("Received file:", req.file);

      const newsEvent = new NewsEvent({
        title: req.body.title,
        description: req.body.description,
        eventDate: req.body.eventDate,
        images: req.file ? [(req.file.filename)] : [],
      });

      await newsEvent.save();
      res.status(201).json(newsEvent);
    } catch (err) {
      console.error("Error creating news/event:", err);
      res.status(500).json({ error: "Failed to create news/event" });
    }
  }
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
    console.error("Error fetching news by ID:", err);
    res.status(500).json({ message: 'Error fetching news by ID' });
  }
});

// UPDATE news/event (public)
router.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await NewsEvent.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error("Error updating news/event:", err);
    res.status(500).json({ message: 'Error updating news/event' });
  }
});

// DELETE news/event (public)
router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await NewsEvent.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json({ message: 'News deleted successfully' });
  } catch (err) {
    console.error("Error deleting news/event:", err);
    res.status(500).json({ message: 'Error deleting news/event' });
  }
});

module.exports = router;
