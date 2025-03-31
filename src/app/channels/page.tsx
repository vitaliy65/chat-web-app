'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '../loading';

export default function Channels() {
  const router = useRouter();
  useEffect(() => {
    router.push('/channels/me');
  }, []);

  return <Loading />;
}
