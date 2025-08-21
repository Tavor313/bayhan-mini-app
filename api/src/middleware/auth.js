import jwt from 'jsonwebtoken';
import { verifyTelegramInitData } from '../auth/verifyInitData.js';

export function requireAuth(req, res, next){
  // 1) JWT path (dev fallback)
  const auth = req.headers.authorization;
  if (auth?.startsWith('Bearer ')){
    try {
      const payload = jwt.verify(auth.slice(7), process.env.JWT_SECRET);
      req.user = payload;
      return next();
    } catch(e){ /* ignore */ }
  }
  // 2) Telegram initData path
  const initData = req.header('X-TG-Init-Data');
  if (initData){
    const { ok, payload } = verifyTelegramInitData(initData);
    if (ok){
      const tgUser = payload && payload.user ? JSON.parse(payload.user) : null;
      req.user = { telegramId: tgUser?.id, first_name: tgUser?.first_name, last_name: tgUser?.last_name };
      return next();
    }
  }
  return res.status(401).json({ error: 'Unauthorized' });
}

export function requireAdmin(req, res, next){
  const ids = (process.env.ADMIN_TELEGRAM_IDS||'').split(',').map(s=>s.trim()).filter(Boolean);
  if (req.user?.telegramId && ids.includes(String(req.user.telegramId))) return next();
  return res.status(403).json({ error: 'Forbidden' });
}
