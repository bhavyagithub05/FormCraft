// backend/routes/responseRoutes.js
const express = require('express');
const router = express.Router();
const Response = require('../models/Response');

// 1. POST: Save a new user response
router.post('/', async (req, res) => {
  try {
    const { formId, answers } = req.body;
    
    const newResponse = new Response({ formId, answers });
    await newResponse.save();
    
    res.status(201).json({ message: 'Response saved successfully!' });
  } catch (error) {
    console.error('Error saving response:', error);
    res.status(500).json({ error: 'Failed to save response' });
  }
});

// 2. GET: Fetch all responses for a specific form (For Admin Analytics)
router.get('/:formId', async (req, res) => {
  try {
    const responses = await Response.find({ formId: req.params.formId }).sort({ submittedAt: -1 });
    res.status(200).json(responses);
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({ error: 'Failed to fetch responses' });
  }
});

module.exports = router;