import Message from '@/models/Message';
import Chat from '@/models/Chat';
import { connectToMongoDB } from '@/db/mongodb';
import {
  handleError,
  createResponse,
  STATUS_CODES,
  verifyUser,
} from '@/middleware/api/middleware';

export async function POST(request: Request) {
  try {
    const user = await verifyUser(request);
    await connectToMongoDB();

    const { chatId, content } = await request.json();

    // Проверяем, существует ли чат
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return createResponse(
        { error: 'Chat not found' },
        STATUS_CODES.NOT_FOUND
      );
    }

    // Проверяем, является ли пользователь участником чата
    if (!chat.participants.includes(user.id)) {
      return createResponse(
        { error: 'You are not authorized to send messages in this chat' },
        STATUS_CODES.FORBIDDEN
      );
    }

    const newMessage = await Message.create({
      chat: chatId,
      sender: user.id,
      content,
    });

    return createResponse(newMessage, STATUS_CODES.CREATED);
  } catch (error) {
    return handleError(error);
  }
}
