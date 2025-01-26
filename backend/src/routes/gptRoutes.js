import { Router } from 'express';
import { parsePDFfromURL } from '../controllers/gptController.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { summarizeText, summarizePDF, summarizePDFWithPdfLib, parsePDFfromURLWithPdfLib, 
    parsePDFfromURLWithPdfJs, summarizePDFWithPdfjs, summarizeUpTo, generateFlashCards } from '../controllers/gptController.js';

const router = Router();

// Summarization route
router.post('/summarize', summarizeText);
router.get('/parsePDF', protectRoute, parsePDFfromURL); // New route to parse PDF from URL
router.get('/parsePDF-lib', protectRoute, parsePDFfromURLWithPdfLib)
router.get('/parsePDF-pdfjs', protectRoute, parsePDFfromURLWithPdfJs)
router.post('/summarizePDF', summarizePDF);
router.post('/summarizePDF-lib', summarizePDFWithPdfLib)
router.post('/summarizePDF-pdfjs', summarizePDFWithPdfjs)
router.post('/summarizeUpTo', summarizeUpTo)
router.post('/generateFlashCards', generateFlashCards)

export default router;
