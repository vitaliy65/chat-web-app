import React from 'react';
import '@/style/section/login.css';

export default function LoginForm() {
  return (
    <div className="login-container">
      <form className="login-form bg-main-background">
        <h2 className="login-title">Войти</h2>
        <div className="mb-4">
          <label htmlFor="email" className="input-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input-field"
            placeholder="Введите ваш email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="input-label">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="input-field"
            placeholder="Введите ваш пароль"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Войти
        </button>
        <div className="mt-4 text-center">
          <a href="#" className="forget-password-link">
            Забыли свой пароль?
          </a>
        </div>
      </form>
    </div>
  );
}
