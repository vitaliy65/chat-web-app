import mongoose from "mongoose";

const VoiceChatSchema = new mongoose.Schema({
    channel: { type: mongoose.Schema.Types.ObjectId, ref: "Channel", required: true },
    name: { type: String, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // Кто в голосовом чате
}, { timestamps: true });

export default mongoose.models.VoiceChat || mongoose.model("VoiceChat", VoiceChatSchema);
  