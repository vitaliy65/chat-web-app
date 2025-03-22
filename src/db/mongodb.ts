import mongoose from 'mongoose';

let isConnected = false;

export const connectToMongoDB = async () => {
  console.log('Connecting to mongoDB...');

  if (isConnected) {
    console.log('Already connected to mongoDB');
    return;
  }

  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error(
      'MONGODB_URI is not defined in .env.local file or environment variables'
    );
  }

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('Connected to mongoDB');
  } catch (error) {
    console.error('Failed to connect to mongoDB', error);
    throw error;
  }
};
