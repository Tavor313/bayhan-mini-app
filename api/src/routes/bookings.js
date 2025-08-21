import { Router } from 'express';
import Booking from '../models/Booking.js';
import Property from '../models/Property.js';
import { requireAuth } from '../middleware/auth.js';
import { isEligibleByRotation, weekRange } from '../utils/rotation.js';

const r = Router();

r.get('/', requireAuth, async (req,res,next)=>{
  try {
    const { mine } = req.query;
    const q = mine ? { userTelegramId: req.user.telegramId } : {};
    const rows = await Booking.find(q).sort({ year: -1, week: -1 });
    res.json(rows);
  } catch(e){ next(e); }
});

r.post('/', requireAuth, async (req,res,next)=>{
  try {
    const { propertyId, year, week, comment } = req.body || {};
    const prop = await Property.findById(propertyId);
    if (!prop) return res.status(404).json({ error: 'Property not found' });
    if (!isEligibleByRotation(prop.rotationOrder, req.user.telegramId, year, week)) {
      return res.status(403).json({ error: 'Not eligible by rotation for this week' });
    }
    const { start, end } = weekRange(year, week);
    const isHoliday = (prop.priorityWeeks||[]).some(p=> p.year===year && p.week===week);
    const status = isHoliday ? 'pending' : 'confirmed';
    const row = await Booking.create({
      property: prop._id, userTelegramId: req.user.telegramId, year, week, startDate: start, endDate: end, status, isHoliday, comment
    });
    res.json(row);
  } catch(e){
    if (e?.code === 11000) return res.status(409).json({ error: 'Week already booked' });
    next(e);
  }
});

r.patch('/:id/cancel', requireAuth, async (req,res,next)=>{
  try {
    const row = await Booking.findById(req.params.id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    if (row.userTelegramId !== req.user.telegramId) return res.status(403).json({ error: 'Forbidden' });
    row.status = 'cancelled';
    await row.save();
    res.json(row);
  } catch(e){ next(e); }
});

export default r;
