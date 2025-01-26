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

export const fetchAndParsePDF = async (fileKey) => {
  if (!fileKey) {
    throw new Error('File key is required');
  }

  try {
    // Step 1: Generate signed URL
    const fileUrl = await generateSignedUrl(fileKey);

    // Step 2: Fetch the PDF file
    const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
    const pdfBuffer = Buffer.from(response.data);

    // Step 3: Parse the PDF
    const pdfData = await pdfParse(pdfBuffer);
    return pdfData.text; // Return the raw extracted text
  } catch (error) {
    console.error('Error fetching or parsing PDF:', error);
    throw new Error('Failed to fetch or parse PDF');
  }
};

export const parsePDFfromURL = async (req, res) => {
  const { fileKey } = req.query;

  if (!fileKey) {
    return res.status(400).json({ error: 'File key is required' });
  }

  try {
    // Use the utility to fetch and parse the PDF
    const extractedText = await fetchAndParsePDF(fileKey);

    // Return the extracted text
    res.status(200).json({ text: extractedText });
  } catch (error) {
    console.error('Error parsing PDF from URL:', error);
    res.status(500).json({ error: 'Failed to parse PDF', details: error.message });
  }
};

export const summarizePDF = async (req, res) => {
  const { fileKey } = req.query;

  if (!fileKey) {
    return res.status(400).json({ error: 'File key is required' });
  }

  try {
    // Step 1: Extract text from the PDF
    const extractedText = await fetchAndParsePDF(fileKey);

    if (!extractedText) {
      return res.status(500).json({ error: 'Failed to extract text from PDF' });
    }

    // Step 2: Summarize the extracted text using GPT
    const gptResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Or gpt-4 depending on your preference
      messages: [
        {
          role: 'user',
          content: `Summarize the following text: ${extractedText}`,
        },
      ],
    });

    // Step 3: Extract the summary from GPT's response
    const summary = gptResponse.choices[0].message.content.trim();

    // Step 4: Return the summary
    res.status(200).json({ summary });
  } catch (error) {
    console.error('Error summarizing PDF:', error);
    res.status(500).json({ error: 'Failed to summarize PDF', details: error.message });
  }
};

