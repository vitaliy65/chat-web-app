import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToMongoDB } from '@/db/mongodb';

export async function POST(req: NextRequest) {
  await connectToMongoDB();
  const data = await req.json();
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: 'JWT_SECRET is not set' },
      { status: 500 }
    );
  }

  if (!data.token) {
    return NextResponse.json({ error: 'Token is required' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(data.token, secret);
    return NextResponse.json({ valid: true, user: decoded }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
