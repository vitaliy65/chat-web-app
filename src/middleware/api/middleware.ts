import { NextResponse } from 'next/server';
import { verifyToken, verifyAdminRole } from '@/middleware/auth/middleware';

// Constants for status codes and error messages
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  CONFLICT: 409,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

export const ERROR_MESSAGES = {
  //user
  USER_EXISTS: 'A user with this email already exists',
  USERNAME_EXISTS: 'A user with this username already exists',
  USER_NOT_FOUND: 'User not found',
  USER_FETCHING: 'Error fetching user',
  UNAUTHORIZED_USER: 'Unauthorized user',
  //friend request
  FRIEND_REQUEST_EXISTS: 'Friend request already exists',
  FRIEND_REQUEST_NOT_FOUND: 'Friend request not found',
  FRIEND_REQUEST_FETCHING: 'Error fetching friend request',

  SERVER_ERROR: 'Internal server error',
};

// Utility function for generating JSON responses
export function createResponse(data: Error | unknown, status: number) {
  return NextResponse.json(data, { status });
}

// Utility function for error handling
export function handleError(error: Error | unknown) {
  return createResponse(
    {
      error: {
        message: ERROR_MESSAGES.SERVER_ERROR,
        details: error instanceof Error ? error.message : String(error),
      },
    },
    STATUS_CODES.SERVER_ERROR
  );
}

export async function verifyUser(request: Request) {
  const verifedUser = await verifyToken(request);
  if (!verifedUser)
    return createResponse(
      { error: ERROR_MESSAGES.UNAUTHORIZED_USER },
      STATUS_CODES.FORBIDDEN
    );
}

export async function verifyAdmin(request: Request) {
  const user = await verifyAdminRole(request);
  if (!user)
    return createResponse('Admin role required', STATUS_CODES.FORBIDDEN);
}
