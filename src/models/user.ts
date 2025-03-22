import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: '' },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    onlineStatus: { type: Boolean, default: false },
    channels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
