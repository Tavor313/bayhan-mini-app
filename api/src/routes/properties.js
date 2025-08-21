import { Router } from 'express';
import Property from '../models/Property.js';
import Booking from '../models/Booking.js';
import { requireAuth } from '../middleware/auth.js';
import { isEligibleByRotation } from '../utils/rotation.js';

const r = Router();

r.get('/mine', requireAuth, async (req,res,next)=>{
  try {
    const props = await Property.find({ rotationOrder: { $in: [req.user.telegramId] } });
    res.json(props);
  } catch(e){ next(e); }
});

r.get('/:id', requireAuth, async (req,res,next)=>{
  try {
    const prop = await Property.findById(req.params.id);
    if (!prop) return res.status(404).json({ error: 'Not found' });
    const year = new Date().getFullYear();
    const bookings = await Booking.find({ property: prop._id, year: { $gte: year-1 } });
    res.json({ property: prop, bookings });
  } catch(e){ next(e); }
});

r.get('/:id/eligibility', requireAuth, async (req,res,next)=>{
  try {
    const { year, week } = req.query;
    const prop = await Property.findById(req.params.id);
    if (!prop) return res.status(404).json({ error: 'Not found' });
    const eligible = isEligibleByRotation(prop.rotationOrder, req.user.telegramId, Number(year), Number(week));
    res.json({ eligible });
  } catch(e){ next(e); }
});

export default r;
