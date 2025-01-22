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

    // Validate if image file exists
    if (!req.file) {
        return res.status(400).json({ message: 'Image is required' });
    }

    try {
        // Handle image upload first
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'dribbble/shots',
        });

        const shotData = {
            title,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            user: req.user.id, // Changed from req.user._id to req.user.id
            image: result.secure_url // Add image URL from Cloudinary
        };

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
        const shots = await shotModel.find({ user: req.user.id }); // Fetch shots for the logged-in user
        res.status(200).json({ shots });
    } catch (error) {
        console.error('Error fetching shots:', error);
        res.status(500).json({
            message: 'Error fetching shots',
            error: error.message,
        });
    }
};
