import { Router } from 'express';
import User from '../models/User.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const r = Router();

r.get('/me', requireAuth, async (req,res,next)=>{
  try {
    const me = await User.findOne({ telegramId: req.user.telegramId }).populate('properties');
    res.json(me);
  } catch(e){ next(e); }
});

r.patch('/me', requireAuth, async (req,res,next)=>{
  try {
    const { email, phone, language, notifications, guests } = req.body || {};
    const me = await User.findOneAndUpdate({ telegramId: req.user.telegramId }, { email, phone, language, notifications, guests }, { new: true });
    res.json(me);
  } catch(e){ next(e); }
});

r.get('/', requireAuth, requireAdmin, async (req,res,next)=>{
  try {
    const users = await User.find().limit(500).sort({ createdAt: -1 });
    res.json(users);
  } catch(e){ next(e); }
});

export default r;
