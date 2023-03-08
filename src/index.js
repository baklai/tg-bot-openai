const bot = require('./tg-bot');
const openaiAPI = require('./openai');

let BOTNAME = 'bot_username';

const COMMANDS = [
  { command: 'help', description: 'довідка по роботі з ботом' },
  { command: 'about', description: 'про бот і його можливості' }
];

bot
  .setMyCommands(COMMANDS)
  .then(() => {
    console.info('Telegram Bot is running...');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

bot.getMe().then((res) => {
  const { username } = res;
  BOTNAME = `@${username}`;
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

bot.onText(/^(?!\/).*$/, async (msg) => {
  const { id, type } = msg.chat;
  const { text } = msg;

  if (type === 'private') {
    try {
      if (text.length > 30) {
        bot.sendMessage(id, 'Трохи зачекай, зараз все буде...', { parse_mode: 'HTML' });
      }
      const data = await openaiAPI(text);
      const [message] = data.choices;
      bot.sendMessage(id, message.text, { parse_mode: 'HTML' });
    } catch (err) {
      console.log('private', err);
      bot.sendMessage(id, 'Упс! Помилка, щось пішло не так!', { parse_mode: 'HTML' });
    }
  } else if (type === 'group' || type === 'supergroup') {
    if (text.includes(BOTNAME)) {
      try {
        const newText = text?.replaceAll(BOTNAME, '')?.trim() || '';
        const data = await openaiAPI(newText);
        const [message] = data.choices;
        bot.sendMessage(id, message.text, { parse_mode: 'HTML' });
      } catch (err) {
        console.log('group', err);
        bot.sendMessage(id, 'Упс! Помилка, щось пішло не так!', { parse_mode: 'HTML' });
      }
    }
  }
});
