import shotModel from "../models/shotModel.js";
import cloudinary from "../Config/cloudinary.js";

export const uploadShot = async (req, res) => {
    const { id } = req.params; // Assuming the shot ID is passed in the URL
    const { title, tags } = req.body;

    try {
        // Prepare the shot data
        let shotData = {
            title,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            user: req.user._id, // Assuming req.user contains the logged-in user
        };

        // Validate title
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        // Handle image upload if a file is provided
        if (req.file) {
            // Upload image to Cloudinary (or use local path if not using Cloudinary)
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'dribbble/shots',
            });
            shotData.image = result.secure_url; // Store the secure URL from Cloudinary
        }

        // Update the shot if it exists, otherwise create a new one
        const updatedShot = await shotModel.findOneAndUpdate(
            { _id: id, user: req.user._id }, // Check if shot exists for the logged-in user
            { $set: shotData }, // Update the shot data
            { new: true, upsert: true } // `new` returns the updated document, `upsert` creates a new one if not found
        );

        // Send response
        res.status(200).json({
            message: 'Shot uploaded/updated successfully',
            shot: updatedShot,
        });
    } catch (error) {
        console.error('Error uploading shot:', error);
        res.status(500).json({
            message: 'Error uploading shot',
            error: error.message,
        });
    }
};
