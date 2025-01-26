import User from '../models/User.js';

import User from "../models/User.js"; // Adjust the path to your User model as needed

export const toggleHasRead = async (req, res) => {
  const { userId, fileKey } = req.body;

  try {
    // Validate inputs
    if (!userId || !fileKey) {
      return res.status(400).json({ success: false, message: "Missing userId or fileKey" });
    }

    // Find the user by ID and check if the fileKey exists
    const user = await User.findOne({ _id: userId, "fileKeys.key": fileKey });

    if (!user) {
      return res.status(404).json({ success: false, message: "User or file key not found" });
    }

    // Find the specific fileKey in the array and toggle its hasRead value
    const fileKeyItem = user.fileKeys.find((item) => item.key === fileKey);
    if (fileKeyItem) {
      fileKeyItem.hasRead = !fileKeyItem.hasRead;
      await user.save(); // Save the updated user document
      return res.status(200).json({
        success: true,
        message: "Toggled successfully",
        data: fileKeyItem,
      });
    }

    return res.status(404).json({ success: false, message: "File key not found in user's fileKeys" });
  } catch (error) {
    console.error("Error toggling hasRead:", error);
    return res.status(500).json({ success: false, message: "An error occurred", error: error.message });
  }
};
