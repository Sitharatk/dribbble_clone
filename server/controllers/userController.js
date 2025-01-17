import userModel from "../models/userModel.js";
import cloudinary from "../Config/cloudinary.js";

export const profileUpdate =async(req,res,next)=>{
    const { id } = req.params;

    try {
      const user = await userModel.findByIdAndUpdate(
        id,
        { profilePicture: req.file.path },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'Avatar updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error updating avatar', error: error.message });
    }
}



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

