const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { uploadFiles } = require('../config/multer');
const path = require('path');
const fs = require('fs');

// POST /api/users - Create a new user with file uploads
router.post('/', uploadFiles, async (req, res) => {
  try {
    const {
      name,
      passportNumber,
      dateOfBirth,
      designation,
      ppType,
      mobileNumber,
      village,
      remark,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !passportNumber ||
      !dateOfBirth ||
      !designation ||
      !ppType ||
      !mobileNumber ||
      !village
    ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!req.files || !req.files.photo || !req.files.cv) {
      // Clean up uploaded files if one is missing
      if (req.files) {
        if (req.files.photo) req.files.photo.forEach(f => fs.unlinkSync(f.path));
        if (req.files.cv) req.files.cv.forEach(f => fs.unlinkSync(f.path));
      }
      return res.status(400).json({ error: 'Photo and CV files are required' });
    }

    // Check if passport number already exists
    const existingUser = await User.findOne({ passportNumber });
    if (existingUser) {
      // Clean up uploaded files
      fs.unlinkSync(req.files.photo[0].path);
      fs.unlinkSync(req.files.cv[0].path);
      return res.status(400).json({ error: 'Passport number already exists' });
    }

    const user = new User({
      name,
      passportNumber,
      dateOfBirth: new Date(dateOfBirth),
      designation,
      ppType,
      mobileNumber,
      village,
      photoPath: req.files.photo[0].filename,
      cvPath: req.files.cv[0].filename,
      remark: remark || '',
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    // Clean up uploaded files on error
    if (req.files) {
      if (req.files.photo) req.files.photo.forEach(f => fs.unlinkSync(f.path));
      if (req.files.cv) req.files.cv.forEach(f => fs.unlinkSync(f.path));
    }
    res.status(500).json({ error: err.message });
  }
});

// GET /api/users/search - Search by name or mobile number
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    // Search by name or mobile number (case-insensitive)
    const users = await User.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { mobileNumber: { $regex: q, $options: 'i' } },
      ],
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/users/:id - Get full user details
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/users/:id/cv - Download CV (protected)
router.get('/:id/cv', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const cvPath = path.join(process.env.UPLOAD_DIR || './uploads', 'cvs', user.cvPath);

    if (!fs.existsSync(cvPath)) {
      return res.status(404).json({ error: 'CV file not found' });
    }

    res.download(cvPath, `${user.name}-CV${path.extname(user.cvPath)}`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
