import mongoose from 'mongoose';

const followSchema = new mongoose.Schema({
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
    following: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const followModel = mongoose.models.follow || mongoose.model('Follow', followSchema);
export default followModel;