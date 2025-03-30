import FriendRequest from '@/models/FriendRequest';
import User from '@/models/User';
import { connectToMongoDB } from '@/db/mongodb';
import {
  STATUS_CODES,
  ERROR_MESSAGES,
  createResponse,
  handleError,
  verifyUser,
  checkCurrentUser,
} from '@/middleware/api/middleware';

export async function POST(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const currentUser = await verifyUser(request);
    const { username } = await params;
    const senderId = currentUser.id;

    await connectToMongoDB();

    // Найти пользователя по username
    const receiver = await User.findOne({ username: username });
    if (!receiver) {
      return createResponse(
        { error: ERROR_MESSAGES.USER_NOT_FOUND },
        STATUS_CODES.NOT_FOUND
      );
    }

    // Проверить, что пользователь не отправляет запрос самому себе
    if (senderId === receiver._id.toString()) {
      return createResponse(
        { error: 'You cannot send a friend request to yourself' },
        STATUS_CODES.BAD_REQUEST
      );
    }

    // Проверить, существует ли уже запрос на дружбу
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { senderId, receiverId: receiver._id },
        { senderId: receiver._id, receiverId: senderId },
      ],
    });

    if (existingRequest) {
      return createResponse(
        { error: ERROR_MESSAGES.FRIEND_REQUEST_EXISTS },
        STATUS_CODES.CONFLICT
      );
    }

    // Создать запрос на дружбу
    await FriendRequest.create({
      senderId,
      receiverId: receiver._id,
    });

    return createResponse('Friend request created', STATUS_CODES.CREATED);
  } catch (error) {
    return handleError(error);
  }
}
