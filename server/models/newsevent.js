const mongoose = require('mongoose');

const newsEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  images: [String],        // for URLs of uploaded images
  attachments: [String],   // for file links or names
  eventDate: Date,         // optional: future date of event
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NewsEvent', newsEventSchema);
