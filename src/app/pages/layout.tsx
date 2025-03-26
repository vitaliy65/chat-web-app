import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chat-web-app pages',
  description: 'created by create-next-app',
};

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased font-sans`}>
        <div className="flex flex-row w-full h-screen">{children}</div>
      </body>
    </html>
  );
}
