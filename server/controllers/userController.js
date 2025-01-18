import userModel from "../models/userModel.js";
import cloudinary from "../Config/cloudinary.js";

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


// export const updateExistingProfile = async (req, res) => {
//   const { id } = req.params;
//   const { name, location, bio } = req.body;

//   try {
//     let updateData = {
//       name,
//       location,
//       bio
//     };

//     // Handle avatar upload if a file is provided
//     if (req.file) {
//       // If there's an existing profile picture, delete it from Cloudinary
//       const existingUser = await userModel.findById(id);
//       if (existingUser.profilePicture) {
//         const publicId = existingUser.profilePicture.split('/').pop().split('.')[0];
//         await cloudinary.uploader.destroy(`dribbble/${publicId}`);
//       }

//       // Add the new profile picture URL to updateData
//       updateData.profilePicture = req.file.path;
//     }

//     const user = await userModel.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, select: '-password' }
//     );

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({
//       message: 'Profile updated successfully',
//       user
//     });
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     res.status(500).json({
//       message: 'Error updating profile',
//       error: error.message
//     });
//   }
// };

// export const deleteAvatar = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await userModel.findById(id);
    
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     if (user.profilePicture) {
//       // Extract public ID from the Cloudinary URL
//       const publicId = user.profilePicture.split('/').pop().split('.')[0];
//       await cloudinary.uploader.destroy(`dribbble/${publicId}`);
//     }

//     user.profilePicture = '';
//     await user.save();

//     res.status(200).json({
//       message: 'Avatar deleted successfully',
//       user
//     });
//   } catch (error) {
//     console.error('Error deleting avatar:', error);
//     res.status(500).json({
//       message: 'Error deleting avatar',
//       error: error.message
//     });
//   }
// };

// export const profileDelete =async(req,res,next)=>{
//     const { id } = req.params;

//     try {
//       const user = await userModel.findByIdAndUpdate
//       (
//         id,
//         { profilePicture: '' },
//         { new: true }
//       );

//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }

//       res.status(200).json({ message: 'Avatar deleted successfully', user });

//     } catch (error) {
//       res.status(500).json({ message: 'Error deleting avatar', error: error.message });
//     }

// }

