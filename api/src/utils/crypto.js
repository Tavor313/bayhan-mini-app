import crypto from 'crypto';
const KEY_HEX = process.env.DATA_ENC_KEY || '0'*64;
const KEY = Buffer.from(KEY_HEX, 'hex');

export function encryptField(plain) {
  if (!plain) return plain;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', KEY, iv);
  const enc = Buffer.concat([cipher.update(String(plain), 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, enc]).toString('base64');
}
export function decryptField(payload) {
  if (!payload) return payload;
  const b = Buffer.from(payload, 'base64');
  const iv = b.subarray(0,12);
  const tag = b.subarray(12,28);
  const data = b.subarray(28);
  const decipher = crypto.createDecipheriv('aes-256-gcm', KEY, iv);
  decipher.setAuthTag(tag);
  const dec = Buffer.concat([decipher.update(data), decipher.final()]);
  return dec.toString('utf8');
}
