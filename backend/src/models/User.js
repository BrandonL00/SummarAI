import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fileKeys: [
    {
      key: { type: String, required: true }, // The key (e.g., file identifier)
      hasRead: { type: Boolean, default: false }, // Whether the file has been read
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
