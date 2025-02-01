import shotModel from "../models/shotModel.js";
import userModel from "../models/userModel.js";

export const follow = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userModel.findById(id);
      const currentUser = await userModel.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Update the followers of the target user
      if (!user.followers.includes(req.user.id)) {
        user.followers.push(req.user.id);
        await user.save();
      }
      
      // Update the following list of the current user
      if (!currentUser.following.includes(id)) {
        currentUser.following.push(id);
        await currentUser.save();
      }
      
      res.status(200).json({ 
        message: 'Followed successfully',
        user: currentUser // Return the updated current user
      });
    } catch (error) {
      console.error('Error following user:', error);
      res.status(500).json({ message: 'Error following user', error: error.message });
    }
  };

export const unfollow = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.findById(id);
        const currentUser = await userModel.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Remove from target user's followers
        user.followers = user.followers.filter(followerId => 
            followerId.toString() !== req.user.id.toString()
        );
        await user.save();
        
        // Remove from current user's following
        currentUser.following = currentUser.following.filter(followingId => 
            followingId.toString() !== id.toString()
        );
        await currentUser.save();
        
        res.status(200).json({ 
            message: 'Unfollowed successfully',
            user: currentUser  // Return updated current user
        });
    } catch (error) {
        console.error('Error unfollowing user:', error);
        res.status(500).json({ message: 'Error unfollowing user', error: error.message });
    }
}