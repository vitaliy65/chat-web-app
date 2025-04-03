import type { Metadata } from 'next';
import './globals.css';
import '@/style/index.css';

import { Providers } from '@/components/provider/provider';
import FetchUserInfo from '@/components/auth/fetchUserInfo';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Chat-web-app',
  description: 'created by create-next-app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased font-sans`}>
        <div className="flex flex-row w-full h-screen">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
