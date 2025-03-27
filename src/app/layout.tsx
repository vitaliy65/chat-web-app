import type { Metadata } from 'next';
import './globals.css';
import '@/style/section/login.css';
import '@/style/section/friend.css';
import '@/style/section/activeFriends.css';
import '@/style/section/channels.css';
import '@/style/section/register.css';
import '@/style/bg.css';
import '@/style/loading.css';
import { Providers } from '@/components/provider/provider';
import FetchUserInfo from '@/components/auth/fetchUserInfo';

export const metadata: Metadata = {
  title: 'Chat-web-app',
  description: 'created by create-next-app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased font-sans`}>
        <div className="flex flex-row w-full h-screen">
          <Providers>
            <FetchUserInfo>{children}</FetchUserInfo>
          </Providers>
        </div>
      </body>
    </html>
  );
}
