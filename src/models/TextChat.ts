import mongoose from 'mongoose';

const TextChatSchema = new mongoose.Schema(
  {
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
      required: true,
    },
    name: { type: String, required: true },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  },
  { timestamps: true }
);

export default mongoose.models.TextChat ||
  mongoose.model('TextChat', TextChatSchema);
