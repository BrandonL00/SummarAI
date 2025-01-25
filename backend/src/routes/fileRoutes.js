import express from 'express';
import { deleteFile, getFile } from '../controllers/fileController.js';

const router = express.Router();

router.delete('/deleteFile', deleteFile);
router.get('/getFile', getFile);

export default router;
