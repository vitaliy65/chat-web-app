import FriendRequest from '@/models/FriendRequest';
import User from '@/models/User';
import { connectToMongoDB } from '@/db/mongodb';
import {
  STATUS_CODES,
  ERROR_MESSAGES,
  createResponse,
  handleError,
  verifyUser,
} from '@/middleware/api/middleware';

export async function POST(request: Request) {
  try {
    await verifyUser(request);

    await connectToMongoDB();

    const { id, friendRequestId } = await request.json();

    // Find the authenticated user
    const authUser = await User.findById(id);
    if (!authUser) {
      return createResponse(
        { error: ERROR_MESSAGES.USER_NOT_FOUND },
        STATUS_CODES.NOT_FOUND
      );
    }

    // Find the friend request
    const friendRequest = await FriendRequest.findById(friendRequestId);
    if (!friendRequest) {
      return createResponse(
        { error: ERROR_MESSAGES.FRIEND_REQUEST_NOT_FOUND },
        STATUS_CODES.NOT_FOUND
      );
    }

    // Ensure the friend request is for the authenticated user
    if (friendRequest.receiverId !== authUser._id.toString()) {
      return createResponse(
        { error: "You can't accept someone's friend request" },
        STATUS_CODES.FORBIDDEN
      );
    }

    // Update the friend request status to "accepted"
    friendRequest.status = 'accepted';
    await friendRequest.save();

    // Add the sender as a friend to the authenticated user
    const sender = await User.findById(friendRequest.senderId);
    if (!sender) {
      return createResponse(
        { error: ERROR_MESSAGES.USER_NOT_FOUND },
        STATUS_CODES.NOT_FOUND
      );
    }

    // Check if they are already friends
    if (authUser.friends.includes(sender._id)) {
      return createResponse(
        { error: 'This user is already your friend' },
        STATUS_CODES.CONFLICT
      );
    }

    authUser.friends.push(sender._id);
    sender.friends.push(authUser._id);

    await authUser.save();
    await sender.save();

    return createResponse(
      { message: 'Friend request accepted successfully' },
      STATUS_CODES.OK
    );
  } catch (error) {
    return handleError(error);
  }
}
