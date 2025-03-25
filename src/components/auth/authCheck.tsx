import { useEffect } from 'react';
import { useAppDispatch } from '@/app/_hooks/hooks';
import { fetchAuthenticationStatus } from '@/app/_state/authSlice/authSlice';

const AuthCheck = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAuthenticationStatus());
  }, []);

  return null; // або поверніть щось, якщо потрібно
};

export default AuthCheck;
