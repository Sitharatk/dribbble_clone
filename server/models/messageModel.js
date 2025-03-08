import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  archived: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create indexes for faster querying
messageSchema.index({ sender: 1, recipient: 1 });
messageSchema.index({ recipient: 1, read: 1 });
messageSchema.index({ createdAt: -1 });

// Handle the case where the model might be redefined in development
const messageModel = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default messageModel;