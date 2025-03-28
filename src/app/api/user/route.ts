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
    const user = await User.findOne({ email: data.email });
    if (user) {
      return createResponse(
        { error: ERROR_MESSAGES.USER_EXISTS },
        STATUS_CODES.CONFLICT
      );
    }

    // Перевірка на існуючого користувача за username
    const username = await User.findOne({ username: data.username });
    if (username) {
      return createResponse(
        { error: ERROR_MESSAGES.USERNAME_EXISTS },
        STATUS_CODES.CONFLICT
      );
    }

    const newUser = new User(data);

    const token = generateToken({
      id: user._id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      friends: user.friends,
      onlineStatus: user.onlineStatus,
      channels: user.channels,
    });

    await newUser.save();
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
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    // Проверяем пользователя и получаем его данные
    const currentUser = await verifyUser(request);

    const { id } = await request.json();

    if (currentUser.id !== id) {
      return createResponse(
        'You cannot delete information of other person',
        STATUS_CODES.FORBIDDEN
      );
    }

    await connectToMongoDB();

    // Удаляем пользователя
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
    const currentUser = await verifyUser(request);

    const data = await request.json();
    const { id, ...updateData } = data;

    if (currentUser.id !== id) {
      return createResponse(
        'You cannot patch information of other person',
        STATUS_CODES.FORBIDDEN
      );
    }

    await connectToMongoDB();

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
