// backend/models/Response.js
const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  // We save the Form ID so we know which form these answers belong to
  formId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Form', 
    required: true 
  },
  // 'Mixed' allows us to store an object with any dynamic keys and values
  answers: { 
    type: mongoose.Schema.Types.Mixed, 
    required: true 
  },
  submittedAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Response', ResponseSchema);