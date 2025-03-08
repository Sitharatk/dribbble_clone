import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: '' },
    bio: { type: String },
    location: { type: String },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    likedShots: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shot',
        default: []
    }],
    unreadMessages: {
        type: Number,
        default: 0
      },
      lastMessageAt: {
        type: Date,
        default: null
      },
    createdAt: { type: Date, default: Date.now },
}, {
   
    timestamps: true
});

const userModel = mongoose.models.user || mongoose.model('User', userSchema);
export default userModel;