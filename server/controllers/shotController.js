import shotModel from "../models/shotModel.js";
import cloudinary from "../config/cloudinary.js";


export const uploadShot = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    console.log('req.user:', req.user);

    const { title, tags } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

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
            user: req.user.id, 
            image: result.secure_url 
        };

       
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
        const shots = await shotModel.find({ user: req.user.id })
        .populate({
            path: 'user',
            select: 'name username profilePicture', 
          }); 
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
        const shots = await shotModel.find()
        .populate({
            path: 'user',
            select: 'name username profilePicture ', // Only select the fields you need
          });
      
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
      // Log to check incoming data
      console.log('Request Body:', req.body);
      
      const updateData = {
        title,

        tags: tags ? JSON.parse(tags) : [] 
      };
  
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'dribbble/shots'
        });
        updateData.image = result.secure_url;
      }
  
      const updatedShot = await shotModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );
      
      console.log("Updated shot from DB:", updatedShot);
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
  };
  
  export const likeShot = async (req, res) => { 
    const { shotId } = req.params; 
    const userId = req.user.id;  // Ensure this matches how you're setting req.user in authentication middleware

    try { 
        const shot = await shotModel.findById(shotId); 
        if (!shot) { 
            return res.status(404).json({ message: 'Shot not found' }); 
        } 
 
        // Ensure shot.likes exists and is an array
        if (!shot.likes) {
            shot.likes = [];
        }

        // Check if the user has already liked the shot 
        if (shot.likes.includes(userId)) { 
            return res.status(200).json({ message: 'Already liked', shot }); 
        }
        
 
        // Add the user's ID to the likes array 
        shot.likes.push(userId); 
        await shot.save();         
 
        res.status(200).json({ message: 'Shot liked successfully', shot }); 
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
        if (!shot.likes.includes(req.user.id)) {
            return res.status(200).json({ message: 'Like not found', shot });
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

export const shotViews = async (req, res) => {
    const { shotId } = req.params;

    try {
        const shot = await shotModel.findById(shotId);
        if (!shot) {
            return res.status(404).json({ message: 'Shot not found' });
        }
        shot.views += 1;
        await shot.save();
        res.status(200).json({ message: 'Shot views updated successfully' });
    } catch (error) {
        console.error('Error updating shot views:', error);
        res.status(500).json({
            message: 'Error updating shot views',
            error: error.message,
        });
    }
};

export const commment= async (req, res) => {
    const { shotId } = req.params;
    const {comment}= req.body;

    try {
        const shot = await shotModel.findById(shotId);
        if (!shot) {
            return res.status(404).json({ message: 'Shot not found' }); 
        }
        shot.comments.push(comment);
        await shot.save();
        res.status(200).json({ message: 'Comment added successfully', shot });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({  
            message: 'Error adding comment',    

            error: error.message,
        });
    }
};