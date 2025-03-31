import Chat from '@/models/Chat';
import { connectToMongoDB } from '@/db/mongodb';
import {
  handleError,
  createResponse,
  STATUS_CODES,
  verifyUser,
} from '@/middleware/api/middleware';

export async function GET(request: Request) {
  try {
    const authUser = await verifyUser(request);

    await connectToMongoDB();

    // Найти чаты, где authUser.id есть в participants
    const chats = await Chat.find({ participants: authUser.id });

    // Вернуть только нужные поля
    const response = chats.map((chat) => ({
      id: chat._id,
      participants: chat.participants,
      messages: chat.messages,
    }));

    return createResponse(response, STATUS_CODES.OK);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await verifyUser(request);

    await connectToMongoDB();
    const { friendId } = await request.json();

    if (!user.friends.includes(friendId)) {
      return createResponse(
        'You cannot message this user',
        STATUS_CODES.FORBIDDEN
      );
    }

    const participants = [friendId, user.id];

    if ((await Chat.find({ participants: participants })).length != 0) {
      return createResponse(
        'You already have chat with this user',
        STATUS_CODES.FORBIDDEN
      );
    }

    const newChat = await Chat.create({
      participants: participants,
      message: [],
    });

    return createResponse(newChat, STATUS_CODES.CREATED);
  } catch (error) {
    return handleError(error);
  }
}
