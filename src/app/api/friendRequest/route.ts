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

export async function POST(request: Request) {
  try {
    const currentUser = await verifyUser(request);
    const data = await request.json();

    await checkCurrentUser(currentUser.id, data.id);

    await connectToMongoDB();

    const authUser = await User.findById(data.id);
    if (!authUser) {
      return createResponse(
        { error: ERROR_MESSAGES.USER_NOT_FOUND },
        STATUS_CODES.FORBIDDEN
      );
    }

    const userFriendRequests = await FriendRequest.find({
      receiverId: authUser._id,
    });

    const friendRequestsWithSenderNames = await Promise.all(
      userFriendRequests.map(async (request) => {
        const sender = await User.findById(request.senderId);
        return {
          senderName: sender?.username || 'Unknown',
          requestId: request._id,
          status: request.status,
        };
      })
    );

    return createResponse(friendRequestsWithSenderNames, STATUS_CODES.OK);
  } catch (error) {
    return handleError(error);
  }
}
