import express from 'express';
import { deleteFile } from '../controllers/fileController.js';

const router = express.Router();

router.delete('/deleteFile', deleteFile);

export default router;
