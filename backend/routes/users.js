const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middlewares/auth');

// GET user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findOne({ telegramId: req.user.telegramId });
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// PUT update user profile
router.put('/update', auth, async (req, res) => {
  const { name, email, phone, language, notifications } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { telegramId: req.user.telegramId },
      { name, email, phone, language, notifications },
      { new: true }
    );
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;