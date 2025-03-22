import mongoose from 'mongoose';

const ChannelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }, // Владелец канала
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Участники
    textChats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TextChat' }], // Текстовые чаты
    voiceChats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VoiceChat' }], // Голосовые чаты
  },
  { timestamps: true }
);

export default mongoose.models.Channel ||
  mongoose.model('Channel', ChannelSchema);
