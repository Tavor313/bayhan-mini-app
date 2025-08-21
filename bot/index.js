const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

const sendNotification = async (userId, message, buttons) => {
  await bot.telegram.sendMessage(userId, message, { reply_markup: { inline_keyboard: buttons } });
};

bot.command('manage_users', (ctx) => {
  ctx.reply('Users: ...');
});

bot.command('add_property', (ctx) => {
  // Parse input, post to backend
});

bot.launch();
console.log('Bot running');