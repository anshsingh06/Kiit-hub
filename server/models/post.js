const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String], // e.g. ["#academics", "#internship"]
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Post', postSchema);
