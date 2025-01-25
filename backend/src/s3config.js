import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config(); // Load environment variables from .env file

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Your AWS access key ID
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Your AWS secret access key
  region: process.env.AWS_REGION, // Your AWS S3 bucket region
});

// Configure multer for handling file uploads
const upload = multer({
  storage: multer.memoryStorage(), // Temporarily store files in memory
});

export { s3, upload };
