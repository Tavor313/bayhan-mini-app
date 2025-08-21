const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const auth = require('../middlewares/auth');

// GET all properties
router.get('/', auth, async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST add property (admin only)
router.post('/add', auth, async (req, res) => {
  // Add admin check here
  const { name, location, rooms, area, photos, shares } = req.body;
  try {
    const property = new Property({ name, location, rooms, area, photos, shares });
    await property.save();
    res.json(property);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;