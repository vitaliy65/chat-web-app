import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthUser } from '@/utils/constants';

export async function verifyToken(
  request: Request
): Promise<JwtPayload | null> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    throw new Error('Authorization header missing');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new Error('Token missing');
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    return typeof decoded === 'object' ? decoded : null;
  } catch {
    throw new Error('Invalid token');
  }
}

export async function verifyAdminRole(request: Request) {
  const decoded = await verifyToken(request);
  await console.log(decoded);
  if (!decoded || decoded.user.role !== 'admin') {
    return null;
  }

  return decoded;
}

export function generateToken(user: AuthUser): string {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }

  const token = jwt.sign(
    { user: user },
    jwtSecret,
    { expiresIn: '24h' } // valid for 24 hours
  );

  return token;
}
