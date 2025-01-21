import shotModel from "../models/shotModel.js";
import cloudinary from "../config/cloudinary.js";


export const uploadShot = async (req, res) => {

    if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    console.log('req.user:', req.user);

    const { title, tags } = req.body;

    // Validate title
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    const shotData = {
        title,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        user: req.user._id, // Ensure the shot is linked to the logged-in user
    };

    try {
        // Handle image upload if a file is provided
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'dribbble/shots',
            });
            shotData.image = result.secure_url; // Store the secure URL from Cloudinary
        }

        // Create a new shot with the user data attached
        const newShot = await shotModel.create(shotData);

        res.status(201).json({
            message: 'Shot uploaded successfully',
            shot: newShot,
        });
    } catch (error) {
        console.error('Error uploading shot:', error);
        res.status(500).json({
            message: 'Error uploading shot',
            error: error.message,
        });
    }
};

export const getShots = async (req, res) => {
    try {
        const shots = await shotModel.find({ user: req.user._id }); // Fetch shots for the logged-in user
        res.status(200).json({ shots });
    } catch (error) {
        console.error('Error fetching shots:', error);
        res.status(500).json({
            message: 'Error fetching shots',
            error: error.message,
        });
    }
};
