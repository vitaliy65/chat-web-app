import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { APP_URL } from '@/utils/constants';

type AuthState = {
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAuthenticationStatus.fulfilled,
      (state, action: PayloadAction<boolean>) => {
        state.isAuthenticated = action.payload;
      }
    );
    builder.addCase(fetchAuthenticationStatus.rejected, (state) => {
      state.isAuthenticated = false;
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
        return response.data.valid;
      }
      return false;
    } catch {
      return rejectWithValue(false);
    }
  }
);

export default authSlice.reducer;
