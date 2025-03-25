import type { Metadata } from 'next';
import '@/style/bg.css';

export const metadata: Metadata = {
  title: 'Auth',
  description: 'created by create-next-app',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full  overflow-hidden">
      <span className="form-main-title">CHAT WEB APP</span>
      <div className="auth-form-bg">{children}</div>
    </div>
  );
}
