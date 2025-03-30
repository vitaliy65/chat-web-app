import { NextResponse } from 'next/server';
import Chat from '@/models/Chat';
import { connectToMongoDB } from '@/db/mongodb';
import { verifyAdmin } from '@/middleware/api/middleware';

export async function GET(request: Request) {
  try {
    const user = await verifyAdmin(request);
    if (!user) return;

    await connectToMongoDB();
    const chats = await Chat.find();
    return NextResponse.json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chats' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await verifyAdmin(request);
    if (!user) return;

    await connectToMongoDB();
    const body = await request.json();
    const newChat = await Chat.create(body);
    return NextResponse.json(newChat);
  } catch (error) {
    console.error('Error creating chat:', error);
    return NextResponse.json(
      { error: 'Failed to create chat' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await verifyAdmin(request);
    if (!user) return;

    await connectToMongoDB();
    const { id, ...updates } = await request.json();
    const updatedChat = await Chat.findByIdAndUpdate(id, updates, {
      new: true,
    });
    return NextResponse.json(updatedChat);
  } catch (error) {
    console.error('Error updating chat:', error);
    return NextResponse.json(
      { error: 'Failed to update chat' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await verifyAdmin(request);
    if (!user) return;

    await connectToMongoDB();
    const { id } = await request.json();
    await Chat.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Chat deleted' });
  } catch (error) {
    console.error('Error deleting chat:', error);
    return NextResponse.json(
      { error: 'Failed to delete chat' },
      { status: 500 }
    );
  }
}
