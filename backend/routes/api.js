const express = require('express');
const router = express.Router();
const { summarizeText } = require('../controllers/gptController');

// Summarization route
router.post('/summarize', summarizeText);

module.exports = router;
