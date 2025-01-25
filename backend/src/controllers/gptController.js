const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Your API key from .env
});

const summarizeText = async (req, res) => {
  const { text } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Summarize the following text: ${text}` }],
    });

    res.json({ summary: response.choices[0].message.content.trim() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { summarizeText };