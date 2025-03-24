import mongoose from 'mongoose';

const FriendChatSchema = new mongoose.Schema(
  {
    img: { type: String, require: false },
    participants: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      ],
      validate: {
        validator: function (value: mongoose.Types.ObjectId[]) {
          return value.length === 2; // Гарантируем, что ровно 2 участника
        },
        message: 'Чат должен содержать ровно двух участников.',
      },
    }, // Участники чата (строго два пользователя)
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
      },
    ], // Сообщения в чате
  },
  { timestamps: true }
);

export default mongoose.models.FriendChat ||
  mongoose.model('FriendChat', FriendChatSchema);
