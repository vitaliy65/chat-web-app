import { NextResponse } from 'next/server';
import User from '@/models/User';
import { connectToMongoDB } from '@/db/mongodb';
import { generateToken } from '@/middleware/auth/middleware';

export async function POST(req: Request) {
  await connectToMongoDB();
  const data = await req.json();

  const user = await User.findOne({ email: data.email });
  if (!user || !(await user.matchPassword(data.password))) {
    return NextResponse.json(
      {
        message: 'Invalid email or password',
      },
      { status: 401 }
    );
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
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

  return NextResponse.json(
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
    { status: 201 }
  );
}
