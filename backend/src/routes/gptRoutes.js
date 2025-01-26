import { Router } from 'express';
import { parsePDFfromURL } from '../controllers/gptController.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { summarizeText } from '../controllers/gptController.js';

const router = Router();

// Summarization route
router.post('/summarize', summarizeText);
router.get('/parsePDF', protectRoute, parsePDFfromURL); // New route to parse PDF from URL

export default router;
