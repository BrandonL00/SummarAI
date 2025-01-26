import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { deleteFile, getFile, getUserFileKeys, } from '../controllers/fileController.js';

const router = express.Router();

router.delete('/delete', deleteFile); // Route to delete a file
router.get('/getFile', getFile); // Route to get a file
router.get('/file-keys', protectRoute, getUserFileKeys); // Route to get file keys for the authenticated user

export default router;
