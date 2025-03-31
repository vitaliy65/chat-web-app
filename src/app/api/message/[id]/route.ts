import Message from '@/models/Message';
import Chat from '@/models/Chat';
import { connectToMongoDB } from '@/db/mongodb';
import {
  handleError,
  createResponse,
  STATUS_CODES,
  verifyUser,
} from '@/middleware/api/middleware';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyUser(request);
    await connectToMongoDB();

    const { id } = await params;

    if (!id) {
      return createResponse(
        { error: 'chatId is required' },
        STATUS_CODES.BAD_REQUEST
      );
    }

    // Проверяем, является ли пользователь участником чата
    const chat = await Chat.findById(id);
    if (!chat || !chat.participants.includes(user.id)) {
      return createResponse(
        { error: 'You are not authorized to view messages in this chat' },
        STATUS_CODES.FORBIDDEN
      );
    }

    const messages = await Message.find({ chat: id });

    return createResponse(messages, STATUS_CODES.OK);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyUser(request);
    await connectToMongoDB();

    const { id } = await params;

    const message = await Message.findById(id);

    if (!message) {
      return createResponse(
        { error: 'Message not found' },
        STATUS_CODES.NOT_FOUND
      );
    }

    // Проверяем, является ли пользователь участником чата
    const chat = await Chat.findById(message.chat);
    if (!chat || !chat.participants.includes(user.id)) {
      return createResponse(
        { error: 'You are not authorized to delete messages in this chat' },
        STATUS_CODES.FORBIDDEN
      );
    }

    if (message.sender.toString() !== user.id) {
      return createResponse(
        { error: 'You are not authorized to delete this message' },
        STATUS_CODES.FORBIDDEN
      );
    }

    await Message.findByIdAndDelete(id);

    return createResponse('Message deleted successfully', STATUS_CODES.OK);
  } catch (error) {
    return handleError(error);
  }
}
