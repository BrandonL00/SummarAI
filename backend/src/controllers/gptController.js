import { OpenAI } from 'openai';
import { fetchAndParsePDF, fetchAndParsePDFWithPdfLib, chunkText, fetchAndParsePDFWithPdfJs } from '../utils/gptUtils.js';


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

// Parse a PDF file and return the raw extracted text using pdf-lib
export const parsePDFfromURLWithPdfLib = async (req, res) => {
  const { fileKey } = req.query;

  if (!fileKey) {
    return res.status(400).json({ error: 'File key is required' });
  }

  try {
    // Use the fetchAndParsePDFWithPdfLib utility
    const extractedText = await fetchAndParsePDFWithPdfLib(fileKey);
    res.status(200).json({ text: extractedText });
  } catch (error) {
    console.error('Error parsing PDF from URL using pdf-lib:', error);
    res.status(500).json({ error: 'Failed to parse PDF using pdf-lib', details: error.message });
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

export const summarizePDFWithPdfLib = async (req, res) => {
  const { fileKey } = req.query;

  if (!fileKey) {
    return res.status(400).json({ error: 'File key is required' });
  }

  try {
    // Step 1: Extract text from the PDF using pdf-lib
    const extractedText = await fetchAndParsePDFWithPdfLib(fileKey);

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
    console.error('Error summarizing PDF using pdf-lib:', error);
    res.status(500).json({ error: 'Failed to summarize PDF using pdf-lib', details: error.message });
  }
};

export const parsePDFfromURLWithPdfJs = async (req, res) => {
  const { fileKey } = req.query;

  if (!fileKey) {
    return res.status(400).json({ error: 'File key is required' });
  }

  try {
    // Use the fetchAndParsePDFWithPdfJs utility
    const extractedText = await fetchAndParsePDFWithPdfJs(fileKey);
    res.status(200).json({ text: extractedText });
  } catch (error) {
    console.error('Error parsing PDF from URL using pdfjs-dist:', error);
    res.status(500).json({ error: 'Failed to parse PDF using pdfjs-dist', details: error.message });
  }
};

export const summarizePDFWithPdfjs = async (req, res) => {
  const { fileKey } = req.query;

  if (!fileKey) {
    return res.status(400).json({ error: 'File key is required' });
  }

  try {
    // Step 1: Extract text from the PDF using pdf-lib
    const extractedText = await fetchAndParsePDFWithPdfJs(fileKey);

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
    console.error('Error summarizing PDF using pdf-lib:', error);
    res.status(500).json({ error: 'Failed to summarize PDF using pdf-lib', details: error.message });
  }
};

export const summarizeUpTo = async (req, res) => {
  const { fileKey, pageLimit } = req.query;

  if (!fileKey) {
    return res.status(400).json({ error: 'File key is required' });
  }

  try {
    // Step 1: Extract text from the PDF using pdfjs-dist
    const extractedText = await fetchAndParsePDFWithPdfJs(fileKey);

    if (!extractedText) {
      return res.status(500).json({ error: 'Failed to extract text from PDF' });
    }

    // Step 2: Extract only text up to the specified page limit
    const pageTexts = extractedText.split('--- Page '); // Assuming page markers are present
    const targetPageLimit = parseInt(pageLimit, 10) || pageTexts.length; // Default to all pages if no page limit is specified
    const limitedText = pageTexts
      .slice(0, targetPageLimit + 1) // Include only up to the target page
      .join('--- Page '); // Rejoin with the marker

    // Step 3: Chunk the extracted text
    const maxChunkSize = 3000; // Adjust as needed to fit within GPT's token limit
    const chunks = chunkText(limitedText, maxChunkSize);

    // Step 4: Summarize each chunk
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

    // Step 5: Combine chunk summaries into a final summary
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

    // Step 6: Return the final summary
    res.status(200).json({ summary: finalSummary });
  } catch (error) {
    console.error('Error summarizing PDF using pdfjs-dist:', error);
    res.status(500).json({ error: 'Failed to summarize PDF using pdfjs-dist', details: error.message });
  }
};