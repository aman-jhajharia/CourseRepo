const express = require('express');
const { getPapers, getPaper, uploadPaper } = require('../controllers/paperController');
const { upload } = require('../config/cloudinary');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .get(getPapers);

router.route('/:id')
  .get(getPaper);

// Admin upload route: Accepts multipart/form-data for 'file'
router.route('/upload-paper')
  .post(protect, upload.single('file'), uploadPaper);

module.exports = router;
