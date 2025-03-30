export const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

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
