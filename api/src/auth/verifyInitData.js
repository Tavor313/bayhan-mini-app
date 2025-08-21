import crypto from 'crypto';
export function verifyTelegramInitData(initData) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) return { ok: false, reason: 'BOT_TOKEN missing' };
    const secret = crypto.createHash('sha256').update(botToken).digest();
    const params = new URLSearchParams(initData);
    const hash = params.get('hash');
    params.delete('hash');
    const arr = [];
    params.sort();
    params.forEach((v,k)=> arr.push(`${k}=${v}`));
    const check = arr.join('\n');
    const hmac = crypto.createHmac('sha256', secret).update(check).digest('hex');
    return { ok: hmac === hash, reason: hmac === hash ? 'ok' : 'hash_mismatch', payload: Object.fromEntries(params) };
  } catch(e){ return { ok:false, reason:e.message }; }
}
