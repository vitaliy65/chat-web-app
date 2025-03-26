'use client';

import React, { useState } from 'react';
import '@/style/section/login.css';
import * as motion from 'motion/react-client';
import InputField from '@/components/custom.field/inputField';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/app/_hooks/hooks';
import { fetchAuthenticationStatus } from '@/app/_state/auth/authSlice';

export default function LoginForm() {
  const [userData, setUserData] = React.useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const user = await axios.post('/api/auth', userData);

      const localProps = {
        user: {
          id: user.data.user.id,
          email: user.data.user.email,
          username: user.data.user.username,
          avatar: user.data.user.avatar,
          friends: user.data.user.friends,
          onlineStatus: user.data.user.onlineStatus,
          channels: user.data.user.channels,
        },
        token: user.data.token,
      };

      // Сохраняем данные в localStorage
      localStorage.setItem('user', JSON.stringify(localProps));
      await dispatch(fetchAuthenticationStatus());

      router.push('/');
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.5, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="login-container"
    >
      <form className="login-form bg-main-background" onSubmit={handleSubmit}>
        <h2 className="login-title">Войти</h2>
        <InputField
          label="Email"
          type="email"
          id="email"
          name="email"
          placeholder="Введите ваш email"
          handleChange={handleChange}
          required
        />
        <InputField
          label="Password"
          type="password"
          id="password"
          name="password"
          placeholder="Введите ваш пароль"
          handleChange={handleChange}
          required
        />
        {isLoading ? (
          <div className="flex w-full justify-center items-center">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <button type="submit" className="submit-button">
            Войти
          </button>
        )}
        <div className="flex flex-col mt-4 text-center">
          <a href="#" className="forget-password-link">
            Забыли свой пароль?
          </a>
          <hr className="my-2" />
          <a href="/auth/register" className="forget-password-link">
            Еще нет аккаунта?
          </a>
        </div>
      </form>
    </motion.div>
  );
}
