const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/postroutes');

const app = express();
app.use(express.json());
app.use('/api/posts', postRoutes);


app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to DB');
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server running...');
    });
  })
  .catch(err => console.log('MongoDB connection error:', err));


