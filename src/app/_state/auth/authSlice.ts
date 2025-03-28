import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { APP_URL } from '@/utils/constants';

type AuthState = {
  valid: boolean;
  user: {
    id: string;
    email: string;
    username: string;
    avatar: string;
    friends: string[];
    onlineStatus: string;
    channels: string[];
  };
};

const initialState: AuthState = {
  valid: false,
  user: {
    id: '',
    email: '',
    username: '',
    avatar: '',
    friends: [],
    onlineStatus: '',
    channels: [],
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuthenticationStatus.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
    });
    builder.addCase(fetchAuthenticationStatus.rejected, (state) => {
      state.valid = false;
    });
  },
});

export const fetchAuthenticationStatus = createAsyncThunk(
  'auth/fetchAuthenticationStatus',
  async (_, { rejectWithValue }) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user') || '');
      if (storedUser) {
        const response = await axios.post(`${APP_URL}/api/auth/me`, {
          token: storedUser.token,
        });

        return response.data;
      }
    } catch {
      return rejectWithValue(false);
    }
  }
);

export default authSlice.reducer;
