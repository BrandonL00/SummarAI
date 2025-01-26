import { OpenAI, } from 'openai';
import axios from 'axios';
import pdfParse from 'pdf-parse';
import { generateSignedUrl } from '../controllers/fileController.js'; // Import your existing getFile function

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

export const parsePDFfromURL = async (req, res) => {
  const { fileKey } = req.query;

  if (!fileKey) {
    return res.status(400).json({ error: 'File key is required' });
  }

  try {
    // Step 1: Get the signed URL from the refactored getFile
    const fileUrl = await generateSignedUrl( fileKey );

    // Step 2: Fetch the PDF file from the signed URL
    const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
    const pdfBuffer = Buffer.from(response.data);

    // Step 3: Parse the PDF content
    const pdfData = await pdfParse(pdfBuffer);
    const extractedText = pdfData.text;

    // Step 4: Return the extracted text
    res.status(200).json({ text: extractedText });
  } catch (error) {
    console.error('Error parsing PDF from URL:', error);
    res.status(500).json({ error: 'Failed to parse PDF', details: error.message });
  }
};
