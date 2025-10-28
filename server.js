require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const app = express();

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: '*',
  credentials: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
const uploadDir = process.env.UPLOAD_DIR || './uploads';
const photosDir = path.join(__dirname, uploadDir, 'photos');
const cvsDir = path.join(__dirname, uploadDir, 'cvs');

// Ensure directories exist
const fs = require('fs');
if (!fs.existsSync(photosDir)) {
  fs.mkdirSync(photosDir, { recursive: true });
  console.log('Created photos directory:', photosDir);
}
if (!fs.existsSync(cvsDir)) {
  fs.mkdirSync(cvsDir, { recursive: true });
  console.log('Created CVs directory:', cvsDir);
}

// Serve photos and CVs with proper headers
app.use('/uploads/photos', express.static(photosDir, {
  setHeaders: (res, path) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Cache-Control', 'public, max-age=3600');
    res.header('Content-Type', 'image/jpeg');
    console.log('Serving photo:', path);
  }
}));

app.use('/uploads/cvs', express.static(cvsDir, {
  setHeaders: (res, path) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Cache-Control', 'public, max-age=3600');
    console.log('Serving CV:', path);
  }
}));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
