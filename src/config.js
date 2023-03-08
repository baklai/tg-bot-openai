const OPENAI_API_URL = 'https://api.openai.com/v1/completions';
const OPENAI_MODEL = 'text-davinci-003';
const OPENAI_MAX_TOKENS = 500;

module.exports = {
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_API_URL: process.env.OPENAI_API_URL || OPENAI_API_URL,
  OPENAI_MODEL: process.env.OPENAI_MODEL || OPENAI_MODEL,
  OPENAI_MAX_TOKENS: process.env.OPENAI_MAX_TOKENS
    ? Number(process.env.OPENAI_MAX_TOKENS)
    : OPENAI_MAX_TOKENS
};
