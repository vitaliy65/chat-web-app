import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/provider/provider';

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
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
