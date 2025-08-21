const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middlewares/auth');

// GET user's bookings
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate('propertyId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST create booking
router.post('/create', auth, async (req, res) => {
  const { propertyId, startDate, endDate } = req.body;
  try {
    const booking = new Booking({
      userId: req.user.id,
      propertyId,
      dates: { start: startDate, end: endDate },
      status: 'pending'
    });
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;