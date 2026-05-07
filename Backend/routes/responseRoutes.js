// backend/routes/responseRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Response = require('../models/Response');


const fs = require('fs');
const uploadDir = 'uploads/';

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


// Configure how files are stored
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// 1. POST: Save a new user response (Now supports File Uploads)
// .any() allows us to capture dynamic field IDs as file keys
router.post('/', upload.any(), async (req, res) => {
  try {
    const { formId } = req.body;
    
    // In a multipart request, non-file fields are in req.body
    // Files are in req.files
    let combinedAnswers = { ...req.body };
    delete combinedAnswers.formId; // Keep only actual answers

    // If files were uploaded, add their paths to the answers object
    if (req.files) {
      req.files.forEach(file => {
        combinedAnswers[file.fieldname] = file.path; 
      });
    }
    
    const newResponse = new Response({ 
      formId, 
      answers: combinedAnswers 
    });
    
    await newResponse.save();
    res.status(201).json({ message: 'Response saved successfully!' });
  } catch (error) {
    console.error('Error saving response:', error);
    res.status(500).json({ error: 'Failed to save response' });
  }
});

// 2. GET: Fetch all responses for a specific form
router.get('/:formId', async (req, res) => {
  try {
    // Adding the index check for better performance during your internship
    const responses = await Response.find({ formId: req.params.formId }).sort({ submittedAt: -1 });
    res.status(200).json(responses);
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({ error: 'Failed to fetch responses' });
  }
});

module.exports = router;