// backend/models/Form.js
const mongoose = require('mongoose');
const FieldSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['text', 'dropdown', 'checkbox', 'radio', 'email', 'file', 'date'] // Updated types
  },
  label: { type: String, required: true },
  placeholder: { type: String }, // For text and email inputs
  required: { type: Boolean, default: false },
  options: [{ type: String }],
  
  // Specific config for file uploads (max size, allowed extensions)
  fileConfig: {
    maxSize: { type: Number, default: 5 }, // in MB
    acceptedTypes: { type: String, default: '.pdf,.jpg,.png' }
  }
});

const FormSchema = new mongoose.Schema({
  // Based on your recent selection at BM Infotrade, ensuring robust data structure
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, default: 'Untitled Form' },
  description: { type: String },
  fields: [FieldSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Form', FormSchema);