import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { toggleHasRead } from "../controllers/userController.js";

const router = express.Router();

router.post('/toggle-has-read', protectRoute, toggleHasRead);

export default router;