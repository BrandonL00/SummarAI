import AWS from 'aws-sdk';
import File from '../models/File.js';

// Configure AWS S3
const s3 = new AWS.S3();

export const deleteFile = async (req, res) => {
    const { fileKey } = req.body;
  
    if (!fileKey) {
      return res.status(400).json({ error: 'File key is required' });
    }
  
    try {
      // Step 1: Delete the file from S3
      const s3Params = {
        Bucket: process.env.AWS_BUCKET_NAME, // Use your bucket name from .env
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
  
      res.status(200).json({
        message: `File ${fileKey} deleted successfully from S3 and MongoDB`,
      });
    } catch (error) {
      console.error('Error deleting file:', error);
      res.status(500).json({ error: 'Failed to delete file', details: error.message });
    }
};
  

export const getFile = async (req, res) => {
    const fileKey = req.query.fileKey; // Extract fileKey from query parameter
  
    if (!fileKey) {
      return res.status(400).json({ error: 'File key is required' });
    }
  
    const params = {
      Bucket: 'summarai-pdfs', // Replace with your bucket name
      Key: fileKey,
      Expires: 60,
    };
  
    try {
      const signedUrl = await s3.getSignedUrlPromise('getObject', params);
      res.status(200).json({ url: signedUrl });
    } catch (error) {
      console.error('Error generating signed URL:', error);
      res.status(500).json({ error: 'Failed to generate URL', details: error.message });
    }
};
  
