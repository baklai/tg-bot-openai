const TelegramBot = require('node-telegram-bot-api');

const openaiAPI = require('./openai');

const { TELEGRAM_TOKEN } = require('./config');

process.env.NTBA_FIX_319 = 1;
process.env.NTBA_FIX_350 = 1;

const bot = new TelegramBot(TELEGRAM_TOKEN, {
  polling: {
    interval: 600,
    autoStart: true,
    params: { timeout: 10 }
  }
});

const commands = [
  { command: 'help', description: 'довідка по роботі з ботом' },
  { command: 'about', description: 'про бот і його можливості' }
];

bot
  .setMyCommands(commands)
  .then(() => {
    console.info('Telegram Bot is running...');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

bot.onText(/\/help/, (msg) => {
  const { id } = msg.chat;
  const message = 'Задайте мені питання і я спробую вам допомогти!';
  bot.sendMessage(id, message, { parse_mode: 'HTML' });
});

bot.onText(/\/about/, (msg) => {
  const { id } = msg.chat;
  const message =
    "HDGuruBot - Телеграм бот технічної підтримки, розроблений на базі OpenAI! Він може допомогти вам з різними технічними питаннями та проблемами, пов'язаними з програмним забезпеченням, апаратним забезпеченням, мережевими проблемами та багатьма іншими технічними проблемами.";
  bot.sendMessage(id, message, { parse_mode: 'HTML' });
});

bot.on('message', async (msg) => {
  const { id } = msg.chat;
  const { text, entities } = msg;

  try {
    if (entities === undefined) {
      bot.sendMessage(id, 'Трохи зачекай, зараз все буде...', { parse_mode: 'HTML' });
      const data = await openaiAPI(text);
      const [message] = data.choices;
      bot.sendMessage(id, message.text, { parse_mode: 'HTML' });
    }
  } catch (err) {
    bot.sendMessage(id, 'Упс! Помилка, щось пішло не так!', { parse_mode: 'HTML' });
  }
});
