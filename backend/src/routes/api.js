import express from 'express';
import { summarizeText } from '../controllers/gptController.js';

const router = express.Router();

// Summarization route
router.post('/summarize', summarizeText);

export default router;
