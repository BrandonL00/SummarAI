import { PDFDocument } from 'pdf-lib';
import axios from 'axios';
import pdfParse from 'pdf-parse';
import { generateSignedUrl } from '../controllers/fileController.js';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.min.mjs';




// Fetch and parse PDF content from S3 using pdf-lib and pdf-parse
export const fetchAndParsePDFWithPdfLib = async (fileKey) => {
    if (!fileKey) {
      throw new Error('File key is required');
    }
  
    try {
      // Step 1: Generate signed URL
      const fileUrl = await generateSignedUrl(fileKey);
  
      // Step 2: Fetch the PDF file
      const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
      const pdfBuffer = Buffer.from(response.data);
  
      // Step 3: Load the PDF with pdf-lib
      const pdfDoc = await PDFDocument.load(pdfBuffer);
  
      // Step 4: Use pdf-parse to extract text
      const parsedData = await pdfParse(pdfBuffer);
      const fullText = parsedData.text;
  
      // Optional: Add page markers
      const pagesText = [];
      const numPages = pdfDoc.getPageCount();
      const textByLines = fullText.split('\n');
      let currentPage = 1;
  
      for (const line of textByLines) {
        if (line.trim().startsWith(`Page ${currentPage}`)) {
          pagesText.push(`--- Page ${currentPage} ---`);
          currentPage++;
        }
        pagesText.push(line);
      }
  
      return pagesText.join('\n');
    } catch (error) {
      console.error('Error fetching or parsing PDF:', error);
      throw new Error('Failed to fetch or parse PDF');
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

export const fetchAndParsePDFWithPdfJs = async (fileKey) => {
    if (!fileKey) {
      throw new Error('File key is required');
    }
  
    try {
      // Step 1: Generate signed URL
      const fileUrl = await generateSignedUrl(fileKey);
  
      // Step 2: Fetch the PDF file
      const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
  
      // Step 3: Convert Buffer to Uint8Array
      const pdfData = new Uint8Array(response.data);
  
      // Step 4: Load the PDF with pdfjs-dist
      const loadingTask = getDocument({ data: pdfData });
      const pdfDoc = await loadingTask.promise;
  
      // Step 5: Extract text page by page
      const pagesText = [];
      for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(' ');
        pagesText.push(`--- Page ${i} ---\n${pageText}`);
      }
  
      return pagesText.join('\n');
    } catch (error) {
      console.error('Error fetching or parsing PDF:', error);
      throw new Error('Failed to fetch or parse PDF');
    }
};

// Utility to chunk text
export const chunkText = (text, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.slice(i, i + chunkSize));
    }
    return chunks;
};