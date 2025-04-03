export const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

export type AuthUser = {
  id: string;
  email: string;
  username: string;
  avatar: string;
  friends: string[];
  onlineStatus: string;
  channels: string[];
  role: string;
};
