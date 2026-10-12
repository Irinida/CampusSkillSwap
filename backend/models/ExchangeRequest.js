const mongoose = require('mongoose');
const requestSchema = new mongoose.Schema({
  requesterName: { type: String, required: true, trim: true },
  skillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  skillTitle: { type: String, required: true },
  skillOwner: { type: String, required: true },
  message: { type: String, required: true, trim: true },
  offeredSkill: { type: String, required: true, trim: true },
  preferredTime: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected', 'Completed'], default: 'Pending' }
}, { timestamps: true });
module.exports = mongoose.model('ExchangeRequest', requestSchema, 'exchangerequests');
