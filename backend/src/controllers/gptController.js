import { OpenAI } from 'openai';
import axios from 'axios';
import pdfParse from 'pdf-parse';
import { generateSignedUrl } from '../controllers/fileController.js';

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Summarize raw text using GPT
export const summarizeText = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Summarize the following text: ${text}` }],
    });

    res.status(200).json({ summary: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    res.status(500).json({ error: 'Failed to get a response from OpenAI' });
  }
};

// Fetch and parse PDF content from S3
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
    return pdfData.text;
  } catch (error) {
    console.error('Error fetching or parsing PDF:', error);
    throw new Error('Failed to fetch or parse PDF');
  }
};

// Parse a PDF file and return the raw extracted text
export const parsePDFfromURL = async (req, res) => {
  const { fileKey } = req.query;

  if (!fileKey) {
    return res.status(400).json({ error: 'File key is required' });
  }

  try {
    const extractedText = await fetchAndParsePDF(fileKey);
    res.status(200).json({ text: extractedText });
  } catch (error) {
    console.error('Error parsing PDF from URL:', error);
    res.status(500).json({ error: 'Failed to parse PDF', details: error.message });
  }
};

// Utility to chunk text
const chunkText = (text, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
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

    // Step 2: Chunk the extracted text
    const maxChunkSize = 3000; // Adjust as needed to fit within GPT's token limit
    const chunks = chunkText(extractedText, maxChunkSize);

    // Step 3: Summarize each chunk
    const chunkSummaries = await Promise.all(
      chunks.map(async (chunk) => {
        const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo', // Or gpt-4
          messages: [
            {
              role: 'user',
              content: `Summarize the following text: ${chunk}`,
            },
          ],
        });
        return response.choices[0].message.content.trim();
      })
    );

    // Step 4: Combine chunk summaries into a final summary
    const finalSummaryResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Combine the following summaries into a single cohesive summary: ${chunkSummaries.join(
            '\n\n'
          )}`,
        },
      ],
    });

    const finalSummary = finalSummaryResponse.choices[0].message.content.trim();

    // Step 5: Return the final summary
    res.status(200).json({ summary: finalSummary });
  } catch (error) {
    console.error('Error summarizing PDF:', error);
    res.status(500).json({ error: 'Failed to summarize PDF', details: error.message });
  }
};
