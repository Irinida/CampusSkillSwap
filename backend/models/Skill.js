const mongoose = require('mongoose');
const skillSchema = new mongoose.Schema({
  studentName: { type: String, required: true, trim: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', default: null },
  department: { type: String, default: 'Not specified' },
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  level: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  description: { type: String, required: true, trim: true },
  availableDay: { type: String, required: true },
  availableTime: { type: String, required: true },
  exchangeFor: { type: String, required: true, trim: true }
}, { timestamps: true });
module.exports = mongoose.model('Skill', skillSchema);
