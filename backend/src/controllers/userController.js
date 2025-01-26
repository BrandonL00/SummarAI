import User from '../models/User.js';

export const toggleHasRead = async (req, res) => {
    const userId = req.user._id;
    const { fileKey } = req.body;

    try {
        // Validate inputs
        if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is missing" });
        }

        if (!fileKey || typeof fileKey !== "string") {
        return res.status(400).json({ success: false, message: "Invalid or missing file key" });
        }

        // Retrieve the user and ensure fileKey exists
        const user = await User.findById(userId);

        if (!user) {
        return res
            .status(404)
            .json({ success: false, message: "User not found" });
        }

        // Find the specific fileKey in the fileKeys array
        const fileKeyItem = user.fileKeys.find((item) => item.key === fileKey);

        if (!fileKeyItem) {
        return res
            .status(404)
            .json({ success: false, message: "File key not found in user's fileKeys" });
        }

        // Toggle the hasRead value
        fileKeyItem.hasRead = !fileKeyItem.hasRead;

        // Save the updated user document
        await user.save();

        return res.status(200).json({
        success: true,
        message: "Toggled successfully",
        data: fileKeyItem,
        });
    } catch (error) {
        console.error("Error toggling hasRead:", error);
        return res.status(500).json({ success: false, message: "An error occurred", error: error.message });
    }
};
