import { signup, login, logout, checkAuth } from "../controllers/authController.js";
import express from 'express';
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router();

// Signup Route
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

router.get('/check', protectRoute, checkAuth);

export default router
