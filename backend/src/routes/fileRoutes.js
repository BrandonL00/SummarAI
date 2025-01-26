import express from 'express';
import { deleteFile, getFile, } from '../controllers/fileController.js';

const router = express.Router();

router.delete('/delete', deleteFile); // Route to delete a file
router.get('/getFile', getFile); // Route to get a file

export default router;
