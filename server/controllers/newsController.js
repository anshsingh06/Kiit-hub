const NewsEvent = require('../models/newsevent');

const createNews = async (req, res) => {
  const { title, description, images, attachments, eventDate } = req.body;
// Extract file names from uploaded files
  const imageFiles = req.files['images'] || [];
  const attachmentFiles = req.files['attachments'] || [];

  const uploadedImages = imageFiles.map(file => file.filename);
  const uploadedAttachments = attachmentFiles.map(file => file.filename);

try {
    const news = new NewsEvent({
      title,
      description,
      images: uploadedImages,
      attachments: uploadedAttachments,
      eventDate,
     postedBy: req.user.id
    });

    await news.save();
    res.status(201).json(news);
  } catch (err) {
    res.status(500).json({ message: 'Error creating news event' });
  }
};

const getAllNews = async (req, res) => {
  const page = parseInt(req.query.page) || 1;       // default: page 1
  const limit = parseInt(req.query.limit) || 5;     // default: 5 items per page

  const skip = (page - 1) * limit;

  try {
    const total = await NewsEvent.countDocuments();
    const newsList = await NewsEvent.find()
      .populate('postedBy', 'name department')
      .sort({ createdAt: -1 }) // latest first
      .skip(skip)
      .limit(limit);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      news: newsList
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching news' });
  }
};

// DELETE /api/news/:id
const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await NewsEvent.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'News not found' });
    res.json({ message: 'News deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting news' });
  }
};

// PUT /api/news/:id
const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await NewsEvent.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'News not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating news' });
  }
};

module.exports = {
  createNews,
  getAllNews,
  deleteNews,
  updateNews
};
