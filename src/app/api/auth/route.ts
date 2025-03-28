import User from '@/models/User';
import { connectToMongoDB } from '@/db/mongodb';
import { generateToken } from '@/middleware/auth/middleware';
import {
  STATUS_CODES,
  ERROR_MESSAGES,
  createResponse,
  handleError,
} from '@/middleware/api/middleware';

export async function POST(req: Request) {
  await connectToMongoDB();
  const data = await req.json();

  const user = await User.findOne({ email: data.email });
  if (!user || !(await user.matchPassword(data.password))) {
    return createResponse(
      'Invalid email or password',
      STATUS_CODES.UNAUTHOURIZED
    );
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    handleError(ERROR_MESSAGES.JWT_NOT_DEFINED);
  }

  const token = await generateToken({
    id: user._id,
    email: user.email,
    username: user.username,
    avatar: user.avatar,
    friends: user.friends,
    onlineStatus: user.onlineStatus,
    channels: user.channels,
  });

  return createResponse(
    {
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        friends: user.friends,
        onlineStatus: user.onlineStatus,
        channels: user.channels,
      },
    },
    STATUS_CODES.CREATED
  );
}
