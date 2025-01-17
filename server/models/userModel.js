import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: ' ' },
    location:{type:String},
    createdAt: { type: Date, default: Date.now },
});

const userModel = mongoose.models.user || mongoose.model('User', userSchema);
export default userModel;
