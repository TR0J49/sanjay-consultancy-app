const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    passportNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    ppType: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },
    village: {
      type: String,
      required: true,
      trim: true,
    },
    photoPath: {
      type: String,
      required: true,
    },
    cvPath: {
      type: String,
      required: true,
    },
    remark: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

// Index for faster search
userSchema.index({ name: 'text', mobileNumber: 'text' });

module.exports = mongoose.model('User', userSchema);
