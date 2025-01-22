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

export const getAllShots = async (req, res) => {
    try {
        const shots = await shotModel.find();
        res.status(200).json({ shots });
    } catch (error) {
        console.error('Error fetching shots:', error);
        res.status(500).json({
            message: 'Error fetching shots',
            error: error.message,
        });
    }
}
export const deleteShot = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedShot = await shotModel.findByIdAndDelete(id);
        if (!deletedShot) {
            return res.status(404).json({ message: 'Shot not found' });
        }
        res.status(200).json({ message: 'Shot deleted successfully' });
    } catch (error) {
        console.error('Error deleting shot:', error);
        res.status(500).json({
            message: 'Error deleting shot',
            error: error.message,
        });
    }
};

export const updateShot = async (req, res) => {
    const { id } = req.params;
    const { title, tags } = req.body;

    try {
        const updatedShot = await shotModel.findByIdAndUpdate(
            id,
            { title, tags },
            { new: true }
        );
        if (!updatedShot) {
            return res.status(404).json({ message: 'Shot not found' });
        }
        res.status(200).json({ message: 'Shot updated successfully', shot: updatedShot });
    } catch (error) {
        console.error('Error updating shot:', error);
        res.status(500).json({  
            message: 'Error updating shot',
            error: error.message,
        });
    }
}

export const likeShot = async (req, res) => {
    const { shotId } = req.params;

    try {
        const shot = await shotModel.findById(shotId);
        if (!shot) {
            return res.status(404).json({ message: 'Shot not found' });
        }

        // Check if the user has already liked the shot
        if (shot.likes.includes(req.user.id)) {
            return res.status(400).json({ message: 'You have already liked this shot' });
        }

        // Add the user's ID to the likes array
        shot.likes.push(req.user.id);
        await shot.save();        

        res.status(200).json({ message: 'Shot liked successfully' });
    } catch (error) {
        console.error('Error liking shot:', error);
        res.status(500).json({
            message: 'Error liking shot',
            error: error.message,
        });
    }
};

export const deleteLike = async (req, res) => {
    const { shotId } = req.params;

    try {
        const shot = await shotModel.findById(shotId);
        if (!shot) {
            return res.status(404).json({ message: 'Shot not found' });
        }

        // Remove the user's ID from the likes array
        shot.likes = shot.likes.filter(id => id !== req.user.id);
        await shot.save();

        res.status(200).json({ message: 'Like deleted successfully' });
    } catch (error) {
        console.error('Error deleting like:', error);
        res.status(500).json({
            message: 'Error deleting like',
            error: error.message,
        });
    }
};
export const addToCollections = async (req, res) => {
    const { shotId } = req.params;

    try {
        const shot = await shotModel.findById(shotId);
        if (!shot) {
            return res.status(404).json({ message: 'Shot not found' });
        }        
        shot.collections.push(req.user.id);
        await shot.save();        
        res.status(200).json({ message: 'Shot added to collections successfully' });
    } catch (error) {
        console.error('Error adding shot to collections:', error);
        res.status(500).json({
            message: 'Error adding shot to collections',
            error: error.message,
        });
    }
};


export const deleteFromCollections = async (req, res) => {
    const { shotId } = req.params;

    try {
        const shot = await shotModel.findById(shotId);
        if (!shot) {
            return res.status(404).json({ message: 'Shot not found' });
        }
        shot.collections = shot.collections.filter(id => id !== req.user.id);
        await shot.save();
        res.status(200).json({ message: 'Shot removed from collections successfully' });
    } catch (error) {
        console.error('Error removing shot from collections:', error);
        res.status(500).json({
            message: 'Error removing shot from collections',
            error: error.message,
        });
    }
};
