import { NextResponse } from 'next/server';
import Channel from '@/models/Channel';
import { connectToMongoDB } from '@/db/mongodb';
import { verifyAdminRole } from '@/middleware/auth/middleware';

export async function GET(request: Request) {
  try {
    const user = await verifyAdminRole(request);
    if (!user) return;

    await connectToMongoDB();
    const channels = await Channel.find();
    return NextResponse.json(channels);
  } catch (error) {
    console.error('Error fetching channels:', error);
    return NextResponse.json(
      { error: 'Failed to fetch channels' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await verifyAdminRole(request);
    if (!user) return;

    await connectToMongoDB();
    const body = await request.json();
    const newChannel = await Channel.create(body);
    return NextResponse.json(newChannel);
  } catch (error) {
    console.error('Error creating channel:', error);
    return NextResponse.json(
      { error: 'Failed to create channel' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await verifyAdminRole(request);
    if (!user) return;

    await connectToMongoDB();
    const { id, ...updates } = await request.json();
    const updatedChannel = await Channel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    return NextResponse.json(updatedChannel);
  } catch (error) {
    console.error('Error updating channel:', error);
    return NextResponse.json(
      { error: 'Failed to update channel' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await verifyAdminRole(request);
    if (!user) return;

    await connectToMongoDB();
    const { id } = await request.json();
    await Channel.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Channel deleted' });
  } catch (error) {
    console.error('Error deleting channel:', error);
    return NextResponse.json(
      { error: 'Failed to delete channel' },
      { status: 500 }
    );
  }
}
