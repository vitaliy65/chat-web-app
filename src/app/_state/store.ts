import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import friendSlice from './friend/friendSlice';
import filterFriendSlice from './filterFriend/filterFriendSlice';
import friendRequestSlice from './friendRequest/friendRequestSlice';
import userSlice from './user/userSlice';
import chatSlice from './chat/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    chat: chatSlice,
    friend: friendSlice,
    filterFriend: filterFriendSlice,
    friendRequest: friendRequestSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
