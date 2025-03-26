import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import friendSlice from './friend/friendSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    friend: friendSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
