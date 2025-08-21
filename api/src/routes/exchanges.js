import { Router } from 'express';
import Exchange from '../models/Exchange.js';
import Booking from '../models/Booking.js';
import Property from '../models/Property.js';
import { requireAuth } from '../middleware/auth.js';

const r = Router();

r.get('/', requireAuth, async (req,res,next)=>{
  try {
    const mine = await Exchange.find({ $or: [{ requesterTelegramId: req.user.telegramId }, { targetTelegramId: req.user.telegramId }] }).sort({ createdAt: -1 });
    res.json(mine);
  } catch(e){ next(e); }
});

r.post('/', requireAuth, async (req,res,next)=>{
  try {
    const { requesterBookingId, targetPropertyId, year, week, message, targetTelegramId } = req.body || {};
    const myBooking = await Booking.findById(requesterBookingId);
    if (!myBooking || myBooking.userTelegramId !== req.user.telegramId) return res.status(400).json({ error: 'Invalid requester booking' });
    const prop = await Property.findById(targetPropertyId);
    if (!prop) return res.status(404).json({ error: 'Target property not found' });
    const ex = await Exchange.create({ requesterTelegramId: req.user.telegramId, targetTelegramId, requesterBooking: myBooking._id, target: { property: prop._id, year, week }, message });
    res.json(ex);
  } catch(e){ next(e); }
});

r.post('/:id/accept', requireAuth, async (req,res,next)=>{
  try {
    const ex = await Exchange.findById(req.params.id).populate('requesterBooking');
    if (!ex) return res.status(404).json({ error: 'Not found' });
    if (ex.targetTelegramId !== req.user.telegramId) return res.status(403).json({ error: 'Forbidden' });
    if (ex.status !== 'waiting') return res.status(400).json({ error: 'Already decided' });
    const requesterBooking = ex.requesterBooking;
    requesterBooking.year = ex.target.year;
    requesterBooking.week = ex.target.week;
    await requesterBooking.save();
    ex.status = 'confirmed'; await ex.save();
    res.json(ex);
  } catch(e){ next(e); }
});

r.post('/:id/decline', requireAuth, async (req,res,next)=>{
  try {
    const ex = await Exchange.findById(req.params.id);
    if (!ex) return res.status(404).json({ error: 'Not found' });
    if (ex.targetTelegramId !== req.user.telegramId) return res.status(403).json({ error: 'Forbidden' });
    ex.status = 'declined'; await ex.save();
    res.json(ex);
  } catch(e){ next(e); }
});

export default r;
