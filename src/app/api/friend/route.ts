import User from '@/models/User';
import { connectToMongoDB } from '@/db/mongodb';
import {
  STATUS_CODES,
  createResponse,
  handleError,
  verifyUser,
} from '@/middleware/api/middleware';

export async function GET(request: Request) {
  try {
    const authUser = await verifyUser(request);
    if (!authUser) return;

    await connectToMongoDB();
    const user = await User.findById(authUser.id);
    const friendsId: string[] = user.friends;

    const friends = await User.find({ _id: { $in: friendsId } });

    const returnProps = friends.map((friend) => ({
      id: friend.id,
      username: friend.username,
      avatar: friend.avatar,
      onlineStatus: friend.onlineStatus,
      channels: friend.channels,
    }));

    return createResponse(returnProps, STATUS_CODES.OK);
  } catch (error) {
    return handleError(error);
  }
}
