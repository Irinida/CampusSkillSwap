const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');
const studentRoutes = require('./routes/studentRoutes');
const skillRoutes = require('./routes/skillRoutes');
const requestRoutes = require('./routes/requestRoutes');

const app = express();
const allowedOrigins = [
  'http://localhost:4200',
  'http://127.0.0.1:4200',
  'http://localhost:4300',
  'http://127.0.0.1:4300'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin not allowed by CORS: ${origin}`));
  }
}));
app.use(express.json());
app.use(requestLogger);
app.get('/api/health', (req, res) => res.json({ message: 'Campus SkillSwap API is running' }));
app.use('/api/students', studentRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/requests', requestRoutes);
app.use((req, res) => res.status(404).json({ message: 'API route not found' }));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/campus_skillswap';
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB: campus_skillswap');
    app.listen(PORT, () => console.log(`Campus SkillSwap API listening on http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    console.error('Check that MongoDB is running and MONGODB_URI is correct.');
    process.exit(1);
  });
