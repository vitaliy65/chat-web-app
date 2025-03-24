import mongoose from 'mongoose';

const ChannelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }, // Владелец канала
    img: { type: String, require: false },
    description: { type: String, require: false },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Участники
    textChats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TextChat' }], // Текстовые чаты
    voiceChats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VoiceChat' }], // Голосовые чаты
    roles: [{ type: String, require: false }],
  },
  { timestamps: true }
);

export default mongoose.models.Channel ||
  mongoose.model('Channel', ChannelSchema);
