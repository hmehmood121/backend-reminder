const express = require('express');
const Reminder = require('../models/Reminder');
const auth = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// POST /addReminder
router.post('/addReminder', auth, async (req, res) => {
  const { phone_number, time, location, notes } = req.body;
  try {
    const newReminder = await Reminder.create({
      user: req.userId,
      reminder_id: uuidv4(),
      phone_number,
      time,
      location,
      notes,
    });
    res.status(201).json(newReminder);
  } catch (err) {
    res.status(500).json({ message: 'Error creating reminder' });
  }
});

// GET /getReminders
router.get('/getReminders', auth, async (req, res) => {
  try {
    const reminders = await Reminder.find({ user: req.userId }).select('-user -__v -_id');
    res.status(200).json(reminders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reminders' });
  }
});

router.put('/updateReminder/:reminder_id', auth, async (req, res) => {
    const { reminder_id } = req.params;
    const { phone_number, time, location, notes } = req.body;
  
    try {
      const updated = await Reminder.findOneAndUpdate(
        { user: req.userId, reminder_id },
        { phone_number, time, location, notes },
        { new: true }
      );
  
      if (!updated) return res.status(404).json({ message: 'Reminder not found' });
  
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ message: 'Error updating reminder' });
    }
  });

  // Add to routes/reminder.js
router.delete('/deleteReminder/:reminder_id', auth, async (req, res) => {
    const { reminder_id } = req.params;
  
    try {
      const deleted = await Reminder.findOneAndDelete({
        user: req.userId,
        reminder_id,
      });
  
      if (!deleted) return res.status(404).json({ message: 'Reminder not found' });
  
      res.status(200).json({ message: 'Reminder deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting reminder' });
    }
  });
  

module.exports = router;
