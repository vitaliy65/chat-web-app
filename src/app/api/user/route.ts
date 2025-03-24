import User from '@/models/User';
import { connectToMongoDB } from '@/db/mongodb';
import {
  STATUS_CODES,
  ERROR_MESSAGES,
  createResponse,
  handleError,
  verifyAdmin,
  verifyUser,
} from '@/middleware/api/middleware';
import { generateToken } from '@/middleware/auth/middleware';

export async function GET(request: Request) {
  try {
    await verifyAdmin(request);

    await connectToMongoDB();

    const users = await User.find();
    return createResponse(users, STATUS_CODES.OK);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    await connectToMongoDB();

    const data = await request.json();

    // Проверка на существование email
    if (!data.email) {
      return createResponse(
        { error: 'Email is required' },
        STATUS_CODES.BAD_REQUEST
      );
    }

    // Перевірка на існуючого користувача за email
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return createResponse(
        { error: ERROR_MESSAGES.USER_EXISTS },
        STATUS_CODES.CONFLICT
      );
    }

    // Перевірка на існуючого користувача за username
    const existingUsername = await User.findOne({ username: data.username });
    if (existingUsername) {
      return createResponse(
        { error: ERROR_MESSAGES.USERNAME_EXISTS },
        STATUS_CODES.CONFLICT
      );
    }

    const newUser = new User(data);
    const token = generateToken({ id: newUser._id, role: newUser.role });
    await newUser.save();
    return createResponse(
      { user: newUser.id, token: token },
      STATUS_CODES.CREATED
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    await verifyUser(request);

    await connectToMongoDB();

    const { id } = await request.json();

    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return createResponse(
        { error: 'User not found' },
        STATUS_CODES.NOT_FOUND
      );
    }

    return createResponse(
      { message: 'User deleted successfully' },
      STATUS_CODES.OK
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    await verifyUser(request);

    await connectToMongoDB();

    const data = await request.json();
    const { id, ...updateData } = data;

    // Перевірка на існуючого користувача за username
    const existingUsername = await User.findOne({
      username: updateData.username,
    });

    if (existingUsername) {
      return createResponse(
        { error: ERROR_MESSAGES.USERNAME_EXISTS },
        STATUS_CODES.CONFLICT
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return createResponse(
        { error: ERROR_MESSAGES.USER_NOT_FOUND },
        STATUS_CODES.NOT_FOUND
      );
    }

    return createResponse(
      'the user has been successfully updated',
      STATUS_CODES.OK
    );
  } catch (error) {
    return handleError(error);
  }
}
