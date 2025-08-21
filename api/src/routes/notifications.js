import { Router } from 'express';
import axios from 'axios';
import { requireAuth } from '../middleware/auth.js';

const r = Router();

r.post('/send', requireAuth, async (req,res,next)=>{
  try {
    const { chatId, text, buttons } = req.body || {};
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const payload = { chat_id: chatId, text, parse_mode: 'HTML', reply_markup: buttons ? { inline_keyboard: [buttons] } : undefined };
    const { data } = await axios.post(url, payload);
    res.json({ ok:true, data });
  } catch(e){ next(e); }
});

export default r;
