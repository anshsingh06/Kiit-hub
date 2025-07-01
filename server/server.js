const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/postroutes');
const commentRoutes = require('./routes/commentRoutes');
const newsRoutes = require('./routes/newsRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to DB');
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server running...');
    });
  })
  .catch(err => console.log('MongoDB connection error:', err));


