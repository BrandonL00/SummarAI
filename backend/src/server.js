import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import uploadRoutes from './routes/upload.js'; // Import the upload router
import cookieParser from 'cookie-parser';
import fileRoutes from './routes/fileRoutes.js';
import gptRoutes from './routes/gptRoutes.js';
import cors from 'cors';
import userRoutes from './routes/user.js';

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes); // Use the upload router
app.use('/api/files', fileRoutes);
app.use('/api/gpt', gptRoutes);
app.use('/api/user', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
