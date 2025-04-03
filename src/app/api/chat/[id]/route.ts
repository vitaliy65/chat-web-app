import Chat from '@/models/Chat';
import { connectToMongoDB } from '@/db/mongodb';
import {
  handleError,
  createResponse,
  STATUS_CODES,
  verifyUser,
} from '@/middleware/api/middleware';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await verifyUser(request);
    await connectToMongoDB();
    const { id } = await params;

    const participants = [id, user.id];

    const chatToDelete = await Chat.findOne({ participants: participants });

    await Chat.findByIdAndDelete(chatToDelete._id);
    return createResponse('Chat deleted', STATUS_CODES.OK);
  } catch (error) {
    return handleError(error);
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authUser = await verifyUser(request);
    const id = (await params).id;
    await connectToMongoDB();

    // Find chats where authUser.id is in participants and _id matches params.id
    const chat = await Chat.findOne({
      participants: authUser.id,
      _id: id,
    });

    if (!chat) {
      throw new Error('Chat not found');
    }

    // Return only necessary fields
    const response = {
      id: chat._id,
      participants: chat.participants,
      messages: chat.messages,
    };

    return createResponse(response, STATUS_CODES.OK);
  } catch (error) {
    return handleError(error);
  }
}
