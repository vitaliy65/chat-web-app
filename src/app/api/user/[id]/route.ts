import User from '@/models/User';
import { connectToMongoDB } from '@/db/mongodb';
import {
  STATUS_CODES,
  ERROR_MESSAGES,
  createResponse,
  handleError,
  verifyUser,
  checkCurrentUser,
} from '@/middleware/api/middleware';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await verifyUser(request);

    const { id } = await params;

    await checkCurrentUser(currentUser.id, id);

    await connectToMongoDB();

    const user = await User.findById(id);

    if (!user) {
      return createResponse(
        { error: ERROR_MESSAGES.USER_NOT_FOUND },
        STATUS_CODES.NOT_FOUND
      );
    }

    const responsParams = { ...user._doc, password: '' };
    return createResponse(responsParams, STATUS_CODES.OK);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await verifyUser(request);

    await connectToMongoDB();
    const { id } = await params;

    if (currentUser.id !== id) {
      return createResponse(
        'You cannot delete account of other person',
        STATUS_CODES.FORBIDDEN
      );
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return createResponse(
        { error: ERROR_MESSAGES.USER_NOT_FOUND },
        STATUS_CODES.NOT_FOUND
      );
    }

    return createResponse('User deleted successfully', STATUS_CODES.OK);
  } catch (error) {
    return handleError(error);
  }
}
