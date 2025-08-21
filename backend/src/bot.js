const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.start((ctx) => ctx.reply('Welcome to Bayhan Bot'));
bot.launch();
console.log('Telegram bot running');