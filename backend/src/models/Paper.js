const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: 1,
    max: 4,
  },
  semester: {
    type: Number,
    required: [true, 'Semester is required'],
    min: 1,
    max: 8,
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: ['midterm', 'endterm', 'assignment'],
  },
  fileUrl: {
    type: String,
    required: [true, 'File URL is required'],
  },
  cloudinaryId: {
    type: String,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Paper', paperSchema);
