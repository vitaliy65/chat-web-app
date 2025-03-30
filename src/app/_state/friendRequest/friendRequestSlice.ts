import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { APP_URL } from '@/utils/constants';

type FriendRequest = {
  senderName: string;
  requestId: string;
  status: 'pending' | 'accepted' | 'declined';
};

type FriendState = {
  request: FriendRequest[];
};

const initialState: FriendState = {
  request: [],
};

const friendRequestSlice = createSlice({
  name: 'friendRequest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFriendRequests.fulfilled, (state, action) => {
      state.request = action.payload; // Ensure payload matches the expected structure
    });
    builder.addCase(fetchFriendRequests.rejected, (state) => {
      state.request = [];
    });
    builder.addCase(
      denyFriendRequest.fulfilled,
      (state, action: PayloadAction<string>) => {
        // Remove the deleted friendRequestId from the state
        state.request = state.request.filter(
          (request) => request.requestId !== action.payload
        );
      }
    );
    builder.addCase(
      acceptFriendRequest.fulfilled,
      (state, action: PayloadAction<FriendRequest>) => {
        // Remove the deleted friendRequestId from the state
        state.request.push(action.payload);
      }
    );
  },
});

export const fetchFriendRequests = createAsyncThunk(
  'friend/fetchFriendRequests',
  async (_, { rejectWithValue }) => {
    try {
      const data = JSON.parse(localStorage.getItem('user') || '{}');
      const response = await axios.get(`${APP_URL}/api/friendRequest`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error); // Log the error for debugging
      return rejectWithValue([]); // Return empty array on error
    }
  }
);

export const denyFriendRequest = createAsyncThunk(
  'friend/denyFriendRequest',
  async (friendRequestId: string, { rejectWithValue }) => {
    try {
      const data = JSON.parse(localStorage.getItem('user') || '{}');

      await axios.delete(`${APP_URL}/api/friendRequest/id/${friendRequestId}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      return friendRequestId;
    } catch (error: Error | unknown) {
      console.error(error instanceof Error ? error.message : String(error)); // Log the error for debugging
      return rejectWithValue(''); // Return empty array on error
    }
  }
);

export const acceptFriendRequest = createAsyncThunk(
  'friend/acceptFriendRequest',
  async (friendRequestId: string, { rejectWithValue }) => {
    try {
      const data = JSON.parse(localStorage.getItem('user') || '{}');
      const res = await axios.post(
        `${APP_URL}/api/acceptFriendRequest`,
        {
          id: data.user.id,
          friendRequestId: friendRequestId,
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      await localStorage.setItem('user', JSON.stringify(res.data));

      const response = await axios.get(`${APP_URL}/api/friendRequest`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      await axios.delete(`${APP_URL}/api/friendRequest/id/${friendRequestId}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error); // Log the error for debugging
      return rejectWithValue(''); // Return empty array on error
    }
  }
);

export default friendRequestSlice.reducer;
