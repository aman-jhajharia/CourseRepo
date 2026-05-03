const Paper = require('../models/Paper');

// @desc    Get all papers (with filtering)
// @route   GET /api/papers
exports.getPapers = async (req, res) => {
  try {
    const { year, semester, subject, type } = req.query;
    
    // Build query object
    let query = {};
    if (year) query.year = year;
    if (semester) query.semester = semester;
    if (subject) query.subject = { $regex: subject, $options: 'i' }; // Case-insensitive search
    if (type) query.type = type;

    // Check if MongoDB is connected, otherwise return mock data for testing
    if (require('mongoose').connection.readyState !== 1) {
       console.log("Returning mock data since DB is not connected.");
       return res.status(200).json({
          success: true,
          count: 2,
          data: [
             { _id: '1', title: 'Data Structures Midterm 2023', subject: 'Data Structures', year: 2, semester: 3, type: 'midterm', fileUrl: '#' },
             { _id: '2', title: 'Algorithms Endterm 2022', subject: 'Algorithms', year: 2, semester: 4, type: 'endterm', fileUrl: '#' }
          ]
       });
    }

    const papers = await Paper.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: papers.length,
      data: papers
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get single paper
// @route   GET /api/papers/:id
exports.getPaper = async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({ success: false, error: 'Paper not found' });
    }

    res.status(200).json({ success: true, data: paper });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Upload paper (metadata + file to Cloudinary)
// @route   POST /api/upload-paper
exports.uploadPaper = async (req, res) => {
  try {
    const { title, subject, year, semester, type } = req.body;
    let fileUrl = req.body.fileUrl; // In case they provide URL directly
    let cloudinaryId = null;

    if (req.file) {
      fileUrl = req.file.path;
      cloudinaryId = req.file.filename;
    }

    if (!fileUrl) {
      return res.status(400).json({ success: false, error: 'Please provide a file or file URL' });
    }

    // Check DB connection
    if (require('mongoose').connection.readyState !== 1) {
        return res.status(201).json({
            success: true,
            data: { title, subject, year, semester, type, fileUrl, cloudinaryId, _mock: true }
        });
    }

    const paper = await Paper.create({
      title,
      subject,
      year: parseInt(year),
      semester: parseInt(semester),
      type,
      fileUrl,
      cloudinaryId
    });

    res.status(201).json({
      success: true,
      data: paper
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
