const NewsEvent = require('../models/newsevent');

const createNews = async (req, res) => {
  const { title, description, images, attachments, eventDate } = req.body;

  try {
    const news = new NewsEvent({
      title,
      description,
      images,
      attachments,
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
  try {
    const newsList = await NewsEvent.find()
      .populate('postedBy', 'name department')
      .sort({ createdAt: -1 });

    res.json(newsList);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching news' });
  }
};

module.exports = { createNews, getAllNews };
