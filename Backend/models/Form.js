// backend/models/Form.js
const mongoose = require('mongoose');

// This defines the structure of an individual field (text, dropdown, etc.)
const FieldSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, required: true }, // e.g., 'text', 'dropdown'
  label: { type: String, required: true },
  required: { type: Boolean, default: false },
  options: [{ type: String }] // Only used if type is dropdown/radio
});

// This defines the whole form
const FormSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, default: 'Untitled Form' },
  description: { type: String },
  fields: [FieldSchema], // An array of the fields defined above
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Form', FormSchema);