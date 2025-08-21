import { Router } from 'express';
import { requireAdmin } from '../middleware/auth.js';
import Property from '../models/Property.js';
import User from '../models/User.js';
import Booking from '../models/Booking.js';

const r = Router();

r.post('/seed', async (req,res,next)=>{
  try {
    if (process.env.NODE_ENV === 'production') return res.status(403).json({ error: 'Seed disabled in production' });
    await Promise.all([Property.deleteMany({}), User.deleteMany({}), Booking.deleteMany({})]);
    const prop = await Property.create({
      title: 'Bayhan Villa A', description: 'Sea view', address: 'Coastal road, 1',
      location: { lat: 36.7, lng: 31.6 }, country: 'TR', capacity: 6, rooms: 3, area: 120,
      gallery: ['https://picsum.photos/800/500?1','https://picsum.photos/800/500?2'],
      shareDenominator: 8, rotationOrder: [111,222,333,444,555,666,777,888],
      priorityWeeks: [{year: 2025, week: 1, label: 'NY'}],
      managerContact: { name: 'Manager', phone: '+90 555 000 00 00', telegram: '@manager' }
    });
    await User.create({ telegramId: 111, firstName: 'Demo', lastName: 'Owner', properties: [prop._id] });
    res.json({ ok: true });
  } catch(e){ next(e); }
});

export default r;
