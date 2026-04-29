const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const authMiddleware = require('../middleware/authMiddleware');

// 1. CREATE a new form (PROTECTED)
router.post('/', authMiddleware, async (req, res) => {
  try {
    // We merge the frontend data with the logged-in user's ID
    const newForm = new Form({
      ...req.body,
      userId: req.user.id 
    }); 
    const savedForm = await newForm.save();
    
    res.status(201).json({ message: 'Form saved successfully', form: savedForm });
  } catch (error) {
    console.error('Error saving form:', error);
    res.status(500).json({ error: 'Failed to save form' });
  }
});

// 2. GET ALL forms (For the Admin Dashboard) (PROTECTED)
router.get('/', authMiddleware, async (req, res) => {
  try {
    // ONLY fetch forms that belong to the currently logged-in user
    const forms = await Form.find({ userId: req.user.id }).select('title createdAt'); 
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch forms' });
  }
});

// 3. GET A SINGLE form by ID (For the Public Live View) (PUBLIC - NO MIDDLEWARE)
router.get('/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ error: 'Form not found' });
    
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch form details' });
  }
});

// 4. DELETE a form (PROTECTED & SECURED)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    // We check BOTH the form ID and the User ID to ensure they own it before deleting
    const deletedForm = await Form.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    
    if (!deletedForm) return res.status(404).json({ error: 'Form not found or unauthorized' });
    
    res.status(200).json({ message: 'Form deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete form' });
  }
});

// 5. UPDATE an existing form (PROTECTED & SECURED)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    // We check BOTH the form ID and the User ID to ensure they own it before updating
    const updatedForm = await Form.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true } // Return the newly updated document
    );
    
    if (!updatedForm) return res.status(404).json({ error: 'Form not found or unauthorized' });
    
    res.status(200).json({ message: 'Form updated successfully', form: updatedForm });
  } catch (error) {
    console.error('Error updating form:', error);
    res.status(500).json({ error: 'Failed to update form' });
  }
});

module.exports = router;