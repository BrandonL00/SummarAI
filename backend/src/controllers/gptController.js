import { OpenAI, } from 'openai';

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// TESTING API CALLS
export const summarizeText = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Ensure you're using the correct model
      messages: [
        { role: 'user', content: `Summarize the following text: ${text}` },
      ],
    });

    res.status(200).json({ summary: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    res.status(500).json({ error: 'Failed to get a response from OpenAI' });
  }
};

