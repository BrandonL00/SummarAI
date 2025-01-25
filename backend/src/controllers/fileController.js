import AWS from 'aws-sdk';

// Configure AWS S3
const s3 = new AWS.S3();

export const deleteFile = async (req, res) => {
  const { fileKey } = req.body;

  if (!fileKey) {
    return res.status(400).json({ error: 'File key is required' });
  }

  const params = {
    Bucket: 'summarai-pdfs', // Replace with your bucket name
    Key: fileKey,
  };

  try {
    const result = await s3.deleteObject(params).promise();
    console.log('S3 Delete Response:', result); // Should log {}
    res.status(200).json({ message: `File ${fileKey} deleted successfully` });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Failed to delete file', details: error.message });
  }
};
