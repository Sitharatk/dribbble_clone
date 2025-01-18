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

