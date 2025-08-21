const express = require('express');
const router = express.Router();
const Exchange = require('../models/Exchange');
const auth = require('../middlewares/auth');

// POST create exchange request
router.post('/request', auth, async (req, res) => {
  const { fromBookingId, toBookingId, message } = req.body;
  try {
    const exchange = new Exchange({
      fromUserId: req.user.id,
      toBookingId,
      fromBookingId,
      message,
      status: 'pending'
    });
    await exchange.save();
    // Trigger notification via bot
    res.json(exchange);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// PUT accept exchange
router.put('/accept/:id', auth, async (req, res) => {
  try {
    const exchange = await Exchange.findByIdAndUpdate(
      req.params.id,
      { status: 'confirmed' },
      { new: true }
    );
    if (!exchange) return res.status(404).json({ msg: 'Exchange not found' });
    // Update bookings and notify via socket.io
    res.json(exchange);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;