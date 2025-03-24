import { NextResponse } from 'next/server';
import User from '@/models/User';
import { connectToMongoDB } from '@/db/mongodb';
import { verifyAdminRole } from '@/middleware/auth/middleware';

export async function GET(request: Request) {
  try {
    const user = await verifyAdminRole(request);
    if (!user) return;

    await connectToMongoDB();
    const friends = await User.find({}).populate('friends');
    return NextResponse.json(friends);
  } catch (error) {
    console.error('Error fetching friends:', error);
    return NextResponse.json(
      { error: 'Failed to fetch friends' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const decoded = await verifyAdminRole(request);
    if (!decoded) return;

    await connectToMongoDB();
    const { userId, friendId } = await request.json();
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    if (user && friend) {
      user.friends.push(friendId);
      friend.friends.push(userId);
      await user.save();
      await friend.save();
      return NextResponse.json({ message: 'Friend added' });
    }
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  } catch (error) {
    console.error('Error adding friend:', error);
    return NextResponse.json(
      { error: 'Failed to add friend' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const decoded = await verifyAdminRole(request);
    if (!decoded) return;

    await connectToMongoDB();
    const { userId, friendId } = await request.json();
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    if (user && friend) {
      user.friends = user.friends.filter(
        (id: string) => id.toString() !== friendId
      );
      await user.save();
      return NextResponse.json({ message: 'Friend removed' });
    }
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  } catch (error) {
    console.error('Error removing friend:', error);
    return NextResponse.json(
      { error: 'Failed to remove friend' },
      { status: 500 }
    );
  }
}
