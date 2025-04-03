import { connectToMongoDB } from '@/db/mongodb';
import User from '@/models/User';
import {
  ERROR_MESSAGES,
  STATUS_CODES,
  createResponse,
  handleError,
  verifyUser,
} from '@/middleware/api/middleware';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await verifyUser(request);
    const { id } = await params;

    await connectToMongoDB();

    if (user.id === id || !user.friends.includes(id)) {
      return createResponse(
        ERROR_MESSAGES.FRIEND_NOT_FOUND,
        STATUS_CODES.NOT_FOUND
      );
    }

    user.friends = user.friends.filter((f_id: string) => f_id !== id);
    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      { $set: user },
      { new: true }
    );

    return createResponse('Friend removed successfully', STATUS_CODES.OK);
  } catch (error) {
    return handleError(error);
  }
}
