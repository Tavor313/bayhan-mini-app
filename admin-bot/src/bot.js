import dotenv from 'dotenv'; dotenv.config();
import { Telegraf, Markup } from 'telegraf';
import axios from 'axios';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const API = process.env.BASE_URL || 'http://api:4000';
const admins = (process.env.ADMIN_TELEGRAM_IDS||'').split(',').map(s=>s.trim()).filter(Boolean);

function isAdmin(ctx){ return admins.includes(String(ctx.from?.id)); }

bot.start((ctx)=> ctx.reply('Bayhan Admin Bot. Доступные: /users /seed'));

bot.command('users', async (ctx)=>{
  if (!isAdmin(ctx)) return ctx.reply('Forbidden');
  try {
    const { data } = await axios.get(API + '/api/users', { headers: { Authorization: 'Bearer ' + process.env.JWT_SECRET } });
    if (!data.length) return ctx.reply('Пусто');
    const lines = data.slice(0,50).map(u=> `#${u.telegramId} ${u.firstName||''} ${u.lastName||''}`);
    ctx.reply(lines.join('\n'));
  } catch(e){ ctx.reply('Ошибка: ' + e.message); }
});

bot.command('seed', async (ctx)=>{
  if (!isAdmin(ctx)) return ctx.reply('Forbidden');
  try {
    const { data } = await axios.post(API + '/api/admin/seed');
    ctx.reply('Seed ok: ' + JSON.stringify(data));
  } catch(e){ ctx.reply('Ошибка: ' + e.message); }
});

bot.launch().then(()=> console.log('Admin bot started'));
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
