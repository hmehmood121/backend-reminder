const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reminder_id: String,
  phone_number: String,
  time: Date,
  location: String,
  notes: String,
});

module.exports = mongoose.model('Reminder', reminderSchema);
