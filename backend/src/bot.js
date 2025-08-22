const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const Booking = require('./models/Booking');

bot.command('manage_users', async (ctx) => {
    if (!process.env.ADMIN_IDS.split(',').includes(ctx.from.id.toString())) return ctx.reply('Доступ запрещён');
    ctx.reply('Управление пользователями (в разработке)');
});

bot.command('moderate_bookings', async (ctx) => {
    if (!process.env.ADMIN_IDS.split(',').includes(ctx.from.id.toString())) return ctx.reply('Доступ запрещён');
    const pendings = await Booking.find({ status: 'pending' });
    pendings.forEach(b => {
        ctx.reply(`Бронь ${b._id}`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Approve', callback_data: `approve_${b._id}` }],
                    [{ text: 'Deny', callback_data: `deny_${b._id}` }]
                ]
            }
        });
    });
});

bot.on('callback_query', async (ctx) => {
    const [action, id] = ctx.callbackQuery.data.split('_');
    const booking = await Booking.findById(id);
    if (!booking) return ctx.reply('Бронь не найдена');
    if (action === 'approve') {
        booking.status = 'confirmed';
        await booking.save();
        ctx.reply('Подтверждено');
    } else if (action === 'deny') {
        booking.status = 'declined';
        await booking.save();
        ctx.reply('Отклонено');
    }
});

bot.launch();
module.exports = { bot };