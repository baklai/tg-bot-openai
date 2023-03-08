const axios = require('axios');

const { OPENAI_API_URL, OPENAI_API_KEY, OPENAI_MODEL, OPENAI_MAX_TOKENS } = require('./config');

module.exports = async (prompt) => {
  try {
    const { data, status } = await axios.post(
      OPENAI_API_URL,
      {
        prompt,
        model: OPENAI_MODEL,
        max_tokens: OPENAI_MAX_TOKENS,
        temperature: 0,
        stream: false
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`
        }
      }
    );
    if (status !== 200) throw new Error('Opps error!');
    return data;
  } catch (err) {
    return err.message;
  }
};
