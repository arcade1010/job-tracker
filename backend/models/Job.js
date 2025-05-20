// backend/models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  userEmail: { type: String, required: true }, 
  company: { type: String, required: true },
  position: { type: String, required: true },
  portalUsername: { type: String },
  portalEmail: { type: String },
  portalPassword: { type: String },
  notes: { type: String },

  timeline: [
    {
      type: { type: String }, // e.g., 'applied', 'email update', 'interview', etc.
      date: { type: Date },
      note: { type: String }
    }
  ],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);
