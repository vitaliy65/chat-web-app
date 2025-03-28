import FriendRequest from '@/models/FriendRequest';
import { connectToMongoDB } from '@/db/mongodb';
import {
  STATUS_CODES,
  ERROR_MESSAGES,
  createResponse,
  handleError,
  verifyUser,
  checkCurrentUser,
} from '@/middleware/api/middleware';

type deleteParams = {
  params: { id: string };
  request: Request;
};

export async function DELETE({ request, params }: deleteParams) {
  try {
    const currentUser = await verifyUser(request);
    const { id } = await params;

    await checkCurrentUser(currentUser.id, id);

    await connectToMongoDB();

    const deletedRequest = await FriendRequest.findByIdAndDelete(id);
    if (!deletedRequest) {
      return createResponse(
        { error: ERROR_MESSAGES.FRIEND_REQUEST_NOT_FOUND },
        STATUS_CODES.FORBIDDEN
      );
    }
    return createResponse('Friend request deleted', STATUS_CODES.OK);
  } catch (error) {
    return handleError(error);
  }
}
