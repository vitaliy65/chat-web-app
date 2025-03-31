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
  { params }: { params: { id: string } }
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
