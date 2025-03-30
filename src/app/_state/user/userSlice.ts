import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { APP_URL } from '@/utils/constants';
import { generateToken } from '@/middleware/auth/middleware';
import User from '@/models/User';

// Define the state type
interface UserState {
  user: {
    id: string;
    email: string;
    username: string;
    avatar: string;
    friends: string[];
    onlineStatus: string;
    channels: string[];
  };
  token: string;
}

// Initial state
const initialState: UserState = {
  user: {
    id: '',
    email: '',
    username: '',
    avatar: '',
    friends: [],
    onlineStatus: '',
    channels: [],
  },
  token: '',
};

// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    });
    builder.addCase(updateUserInfo.rejected, (state) => {
      // Handle rejection if needed
      console.error('Failed to update user info');
    });
  },
});

// Create async thunk for updating user info
export const updateUserInfo = createAsyncThunk(
  'user/updateUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

      const res = await axios.get(`${APP_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
        },
      });

      const localProps = {
        user: {
          id: res.data.id,
          email: res.data.email,
          username: res.data.username,
          avatar: res.data.avatar,
          friends: res.data.friends,
          onlineStatus: res.data.onlineStatus,
          channels: res.data.channels,
        },
        token: storedUser.token,
      };

      // Сохраняем данные в localStorage
      await localStorage.setItem('user', JSON.stringify(localProps));
      return localProps;
    } catch (error) {
      console.error('Error updating user:', error);
      return rejectWithValue('Failed to update user info');
    }
  }
);

export default userSlice.reducer;
