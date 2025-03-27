import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import friendSlice from './friend/friendSlice';
import fillterFriendSlice from './filterFriend/filterFriendSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    friend: friendSlice,
    filterFriend: fillterFriendSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
