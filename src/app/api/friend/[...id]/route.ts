import { connectToMongoDB } from '@/db/mongodb';
import User from '@/models/User';
import {
  STATUS_CODES,
  createResponse,
  handleError,
  verifyUser,
} from '@/middleware/api/middleware';

interface paramsProps {
  params: { id: string[] };
}

export async function GET(request: Request, { params }: paramsProps) {
  try {
    await verifyUser(request);

    await connectToMongoDB();

    const { id }: { id: string[] } = await params;

    const users = await User.find({ _id: { $in: id } });

    if (!users || users.length === 0) {
      return createResponse(
        { message: 'Users not found' },
        STATUS_CODES.NOT_FOUND
      );
    }

    const returnProps = users.map((user) => ({
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      onlineStatus: user.onlineStatus,
      channels: user.channels,
    }));

    return createResponse(returnProps, STATUS_CODES.OK);
  } catch (error) {
    return handleError(error);
  }
}
