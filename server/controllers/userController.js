import userModel from "../models/userModel.js";
import cloudinary from "../config/cloudinary.js";
import shotModel from "../models/shotModel.js";
export const profileUpdate = async (req, res, next) => {
  const { id } = req.params;
  const { location } = req.body;

  try {                                         
    const updateData = {};
  if (req.file) {
      updateData.profilePicture = req.file.path;
    }
  if (location) {
      updateData.location = location;
    }

    const user = await userModel.findByIdAndUpdate(
      id, updateData,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};


export const updateExistingProfile = async (req, res) => {
  const { id } = req.params;
  const { name, location,bio } = req.body;

  
  try {
    let updateData = {
      name,
      location,
      bio
    };

    // Handle avatar upload if a file is provided
    if (req.file) {
      // If there's an existing profile picture, delete it from Cloudinary
      const existingUser = await userModel.findById(id);
      if (existingUser.profilePicture) {
        const publicId = existingUser.profilePicture.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`dribbble/${publicId}`);
      }

      // Add the new profile picture URL to updateData
      updateData.profilePicture = req.file.path;
    }

    const user = await userModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, select: '-password' }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({
      message: 'Error updating profile',
      error: error.message
    });
  }
};

export const deleteAvatar = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.profilePicture) {
      // Extract public ID from the Cloudinary URL
      const publicId = user.profilePicture.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`dribbble/${publicId}`);
    }

    user.profilePicture = '';
    await user.save();

    res.status(200).json({
      message: 'Avatar deleted successfully',
      user
    });
  } catch (error) {
    console.error('Error deleting avatar:', error);
    res.status(500).json({
      message: 'Error deleting avatar',
      error: error.message
    });
  }
};

export const getUserByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    // Find the user
    const user = await userModel.findOne({ username })
      .populate("followers", "name username profilePicture") 
      .populate("following", "name username profilePicture");
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find all shots created by this user
    const userShots = await shotModel.find({ user: user._id });
    
    // Calculate total likes received across all shots
    const totalLikesReceived = userShots.reduce((total, shot) => {
      return total + (shot.likes ? shot.likes.length : 0);
    }, 0);

    // Get the user's liked shots count
    const likedShotsCount = user.likedShots ? user.likedShots.length : 0;

    // Return user data with the additional metrics
    const userResponse = {
      ...user.toObject(),
      totalLikesReceived,
      shotsCount: userShots.length,
      likedShotsCount
    };

    res.status(200).json(userResponse);
  } catch (error) {
    console.error('Error fetching user by username:', error);
    res.status(500).json({
      message: 'Error fetching user by username',
      error: error.message
    });
  }
};



// In blockController.js
export const blockUser = async (req, res) => {
  const { id } = req.params;
  const { block } = req.body;

  try {
    const user = await userModel.findById(id);
    const currentUser = await userModel.findById(req.user.id)
      .populate('blockedUsers', 'name username profilePicture');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (block) {
      // Block the user
      if (!currentUser.blockedUsers.some(blockedUser => 
        blockedUser._id.toString() === id.toString())) {
        currentUser.blockedUsers.push(id);
      }
      
      // Remove from current user's following
      currentUser.following = currentUser.following.filter(followingId => 
        followingId.toString() !== id.toString()
      );
    } else {
      // Unblock the user
      currentUser.blockedUsers = currentUser.blockedUsers.filter(blockedUserId => 
        blockedUserId.toString() !== id.toString()
      );
    }

    await currentUser.save();

    res.status(200).json({
      message: block ? 'User blocked successfully' : 'User unblocked successfully',
      user: currentUser
    });
  } catch (error) {
    console.error('Error blocking/unblocking user:', error);
    res.status(500).json({
      message: 'Error blocking/unblocking user',
      error: error.message
    });
  }
};