import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chat-web-app | Друзья',
  description: 'created by create-next-app',
};

export default function ChannelsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
