import mongoose from 'mongoose';

const shotSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
    tags: [{ type: String }], 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: {type: Number,default: 0, },
    views: { type: Number, default: 0 },
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: { type: String },
        createdAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now },
});

const shotModel = mongoose.models.shot || mongoose.model('Shot', shotSchema);
export default shotModel;