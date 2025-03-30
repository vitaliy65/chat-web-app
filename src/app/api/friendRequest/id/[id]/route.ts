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

type deleteParams = {
  params: { id: string };
};

export async function DELETE(request: Request, { params }: deleteParams) {
  try {
    const currentUser = await verifyUser(request);
    const { id } = await params;

    await connectToMongoDB();

    const existingRequest = await FriendRequest.findOne({
      _id: id,
      receiverId: currentUser.id,
    });

    if (!existingRequest) {
      return createResponse(
        { error: ERROR_MESSAGES.FRIEND_REQUEST_NOT_FOUND },
        STATUS_CODES.NOT_FOUND
      );
    }

    // Delete the existing friend request
    await FriendRequest.deleteOne({ _id: existingRequest._id });

    return createResponse(id, STATUS_CODES.OK);
  } catch (error) {
    return handleError(error);
  }
}
