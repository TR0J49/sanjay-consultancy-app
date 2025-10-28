const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const uploadDir = process.env.UPLOAD_DIR || './uploads';
const photosDir = path.join(uploadDir, 'photos');
const cvsDir = path.join(uploadDir, 'cvs');

if (!fs.existsSync(photosDir)) {
  fs.mkdirSync(photosDir, { recursive: true });
}
if (!fs.existsSync(cvsDir)) {
  fs.mkdirSync(cvsDir, { recursive: true });
}

// Storage configuration for photos
const photoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, photosDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'photo-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Storage configuration for CVs
const cvStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, cvsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'cv-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter for photos
const photoFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG and PNG files are allowed for photos'), false);
  }
};

// File filter for CVs
const cvFilter = (req, file, cb) => {
  const allowedMimes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and DOC/DOCX files are allowed for CV'), false);
  }
};

// Create combined multer instance for both photo and CV
const uploadFiles = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === 'photo') {
        cb(null, photosDir);
      } else if (file.fieldname === 'cv') {
        cb(null, cvsDir);
      }
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'photo') {
      photoFilter(req, file, cb);
    } else if (file.fieldname === 'cv') {
      cvFilter(req, file, cb);
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
}).fields([
  { name: 'photo', maxCount: 1 },
  { name: 'cv', maxCount: 1 },
]);

module.exports = {
  uploadFiles,
  photosDir,
  cvsDir,
};
