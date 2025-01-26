import AWS from 'aws-sdk';
import fs from 'fs/promises';
import path from 'path';
import File from '../models/File.js';
import { OpenAI } from 'openai';
import { protectRoute } from '../middleware/auth.middleware.js';
import User from '../models/User.js';

// Configure AWS S3
const s3 = new AWS.S3();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Delete file from S3 and MongoDB
export const deleteFile = async (req, res) => {
  const { fileKey } = req.body;

  if (!fileKey) {
    return res.status(400).json({ error: 'File key is required' });
  }

  try {
    // Step 1: Delete the file from S3
    const s3Params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
    };

    await s3.deleteObject(s3Params).promise();
    console.log(`S3: File ${fileKey} deleted successfully`);

    // Step 2: Delete the file metadata from MongoDB
    const deletedFile = await File.findOneAndDelete({ fileKey });

    if (!deletedFile) {
      console.warn(`MongoDB: No file found with key ${fileKey}`);
      return res.status(404).json({ message: 'File not found in database' });
    }

    console.log(`MongoDB: File metadata for ${fileKey} deleted successfully`);
    // Step 3: Remove fileKey from User
    await User.findByIdAndUpdate(deletedFile.userId, { $pull: { fileKeys: fileKey } });
    
    res.status(200).json({
      message: `File ${fileKey} deleted successfully from S3 and MongoDB`,
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Failed to delete file', details: error.message });
  }
};

// Generate a signed URL for S3 file retrieval
export const getFile = async (req, res) => {
  const fileKey = req.query.fileKey; // Extract fileKey from query parameter

  if (!fileKey) {
    return res.status(400).json({ error: 'File key is required' });
  }

  try {
    // Use the generateSignedUrl utility function
    const signedUrl = await generateSignedUrl(fileKey);
    res.status(200).json({ url: signedUrl });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    res.status(500).json({ error: 'Failed to generate URL', details: error.message });
  }
};

export const generateSignedUrl = async (fileKey) => {
  if (!fileKey) {
    throw new Error('File key is required');
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey,
    Expires: 60, // URL expiration time
  };

  try {
    const signedUrl = await s3.getSignedUrlPromise('getObject', params);
    return signedUrl; // Return the signed URL
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw new Error('Failed to generate signed URL');
  }
};



// Get file keys for the authenticated user
export const getUserFileKeys = async (req, res) => {
  try {
    const userId = req.user._id; // Use `req.user` populated by `protectRoute`
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ fileKeys: user.fileKeys });
  } catch (error) {
    console.error('Error retrieving file keys:', error);
    res.status(500).json({ error: 'Failed to retrieve file keys', details: error.message });
  }
};