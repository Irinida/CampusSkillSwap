const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  department: { type: String, required: true, trim: true },
  year: { type: String, required: true },
  teachSkill: { type: String, required: true, trim: true },
  learnSkill: { type: String, required: true, trim: true }
}, { timestamps: true });
module.exports = mongoose.model('Student', studentSchema);
