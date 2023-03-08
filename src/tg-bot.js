const TelegramBot = require('node-telegram-bot-api');

const { APP_URL, TELEGRAM_TOKEN } = require('./config');

const TG_OPTIONS =
  process.env.NODE_ENV === 'production'
    ? {
        webHook: {
          port: process.env.PORT
        }
      }
    : {
        filepath: false,
        polling: {
          interval: 600,
          autoStart: true,
          params: { timeout: 10 }
        }
      };

const bot = new TelegramBot(TELEGRAM_TOKEN, TG_OPTIONS);

if (process.env.NODE_ENV === 'production') {
  bot.setWebHook(`${APP_URL}/bot${TELEGRAM_TOKEN}`);
}

if (process.env.NODE_ENV === 'development') {
  bot.on('polling_error', (err) => {
    console.error(err);
  });
}

module.exports = bot;
