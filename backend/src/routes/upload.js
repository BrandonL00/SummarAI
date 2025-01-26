import express from 'express';
import { s3, upload } from '../s3Config.js'; // AWS S3 configuration
import File from '../models/File.js'; // File schema/model for MongoDB
import { protectRoute } from '../middleware/auth.middleware.js'; // Authentication middleware
import User from '../models/User.js'; // User schema/model for MongoDB

const router = express.Router();

/**
 * POST /api/upload
 * Upload a PDF file for the authenticated user and store metadata in MongoDB.
 */
router.post('/', protectRoute, upload.single('pdf'), async (req, res) => {
  try {
    const userId = req.user._id; // Use `req.user` populated by `protectRoute`

    // Ensure a file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Access the uploaded file
    const file = req.file;
    const fileKey = `${userId}/${Date.now()}-${file.originalname}`; // Organized by user in S3

    // S3 upload parameters
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    // Upload the file to S3
    const result = await s3.upload(params).promise();

    // Save file metadata to MongoDB
    const newFile = new File({
      userId, // User ID from the authenticated user
      fileName: file.originalname, // Original file name
      fileKey, // S3 file key
      fileUrl: result.Location, // S3 file URL
    });

    // Save fileKey to User
    await User.findByIdAndUpdate(userId, { $push: { fileKeys: fileKey } });
    await newFile.save(); // Save metadata to MongoDB

    res.status(200).json({
      message: 'File uploaded successfully',
      fileUrl: result.Location,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});
 export default router;