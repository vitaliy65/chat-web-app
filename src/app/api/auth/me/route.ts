import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToMongoDB } from '@/db/mongodb';
import {
  STATUS_CODES,
  ERROR_MESSAGES,
  createResponse,
  handleError,
} from '@/middleware/api/middleware';

export async function POST(req: NextRequest) {
  await connectToMongoDB();
  const data = await req.json();
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return handleError(ERROR_MESSAGES.JWT_NOT_DEFINED);
  }

  if (!data.token) {
    return handleError(ERROR_MESSAGES.JWT_TOKEN_REQUIRE);
  }

  try {
    const decoded = jwt.verify(data.token, secret);
    let user;

    if (typeof decoded === 'string') {
      user = JSON.parse(decoded).user;
    } else {
      user = decoded.user;
    }

    return createResponse({ valid: true, user }, STATUS_CODES.OK);
  } catch {
    return handleError(ERROR_MESSAGES.JWT_INVALID);
  }
}
