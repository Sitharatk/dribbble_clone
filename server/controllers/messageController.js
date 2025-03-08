import messageModel from "../models/messageModel.js";
import userModel from "../models/userModel.js";

// Get all messages for a user (inbox)
export const getInbox = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming this comes from your auth middleware
    
    const messages = await messageModel.find({
      recipient: userId,
      archived: false
    })
    .populate('sender', 'username name profilePicture')
    .sort({ createdAt: -1 });
    
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inbox', error: error.message });
  }
};

// Get archived messages
export const getArchive = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const messages = await messageModel.find({
      recipient: userId,
      archived: true
    })
    .populate('sender', 'username name profilePicture')
    .sort({ createdAt: -1 });
    
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching archived messages', error: error.message });
  }
};

// Send a message
export const sendMessage = async (req, res) => {
  const { recipientId, content } = req.body;
  const senderId = req.user.id;
  
  if (!content) {
    return res.status(400).json({ message: 'Message content is required' });
  }
  
  try {
    // Check if recipient exists
    const recipient = await userModel.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }
    
    const newMessage = new messageModel({
      sender: senderId,
      recipient: recipientId,
      content
    });
    
    await newMessage.save();
    
    // Update recipient's unread count and last message time
    await userModel.findByIdAndUpdate(recipientId, {
      $inc: { unreadMessages: 1 },
      lastMessageAt: new Date()
    });
    
    // Populate sender info for front-end use
    await newMessage.populate('sender', 'username name profilePicture');
    
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
};

// Mark message as read
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const message = await messageModel.findById(id);
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    // Check if user is the recipient
    if (message.recipient.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized - not the recipient' });
    }
    
    if (!message.read) {
      message.read = true;
      await message.save();
      
      // Decrement unread count
      await userModel.findByIdAndUpdate(userId, {
        $inc: { unreadMessages: -1 }
      });
    }
    
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error marking message as read', error: error.message });
  }
};

// Archive/unarchive message
export const toggleArchive = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const message = await messageModel.findById(id);
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    // Check if user is the recipient
    if (message.recipient.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized - not the recipient' });
    }
    
    message.archived = !message.archived;
    await message.save();
    
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling archive status', error: error.message });
  }
};

// Delete message
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const message = await messageModel.findById(id);
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    // Check if user is the sender or recipient
    if (message.sender.toString() !== userId && 
        message.recipient.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized - not sender or recipient' });
    }
    
    await messageModel.findByIdAndDelete(id);
    
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message', error: error.message });
  }
};

// Get conversation between two users
export const getConversation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { otherUserId } = req.params;
    
    // Get messages where user is either sender or recipient
    const messages = await messageModel.find({
      $or: [
        { sender: userId, recipient: otherUserId },
        { sender: otherUserId, recipient: userId }
      ]
    })
    .populate('sender', 'username name profilePicture')
    .sort({ createdAt: 1 }); // Ascending order for conversations
    
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching conversation', error: error.message });
  }
};

// Get list of conversations
export const getConversationList = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find all messages where user is either sender or recipient
    const messages = await messageModel.find({
      $or: [{ sender: userId }, { recipient: userId }]
    })
    .sort({ createdAt: -1 });
    
    // Extract unique conversation partners
    const conversationPartners = new Map();
    
    for (const message of messages) {
      const partnerId = message.sender.toString() === userId 
        ? message.recipient.toString() 
        : message.sender.toString();
      
      if (!conversationPartners.has(partnerId)) {
        conversationPartners.set(partnerId, message);
      }
    }
    
    // Get detailed user info for each conversation partner
    const conversations = await Promise.all(
      Array.from(conversationPartners.entries()).map(async ([partnerId, message]) => {
        const partner = await userModel.findById(partnerId).select('username name profilePicture');
        return {
          user: partner,
          lastMessage: message,
          unread: message.recipient.toString() === userId && !message.read
        };
      })
    );
    
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching conversation list', error: error.message });
  }
};