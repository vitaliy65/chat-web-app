'use client';

import React, { useState } from 'react';
import '@/style/section/register.css';
import * as motion from 'motion/react-client';
import InputField from '@/components/custom.field/inputField';
import axios from 'axios';
import { useAppDispatch } from '@/app/_hooks/hooks';
import { fetchAuthenticationStatus } from '@/app/_state/auth/authSlice';

export default function RegisterForm() {
  const [userData, setUserData] = React.useState({
    username: '',
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post('/api/user', userData);

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

      window.location.href = '/';
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
      className="register-container"
    >
      <form
        className="register-form bg-main-background"
        onSubmit={handleSubmit}
      >
        <h2 className="register-title">Регистрация</h2>
        <InputField
          label="Username"
          type="text"
          id="username"
          name="username"
          placeholder="Введите ваш username"
          handleChange={handleChange}
          required
        />
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
            создать
          </button>
        )}
        <div className="mt-4 text-center">
          <a href="/auth/login" className="forget-password-link">
            Уже есть аккаунт?
          </a>
        </div>
      </form>
    </motion.div>
  );
}
