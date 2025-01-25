import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  fileName: { type: String, required: true },
  fileKey: { type: String, required: true },
  fileUrl: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
});

export default mongoose.model('File', FileSchema);

