import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { APP_URL } from '@/utils/constants';

type FriendState = {
  request: {
    senderName: string;
    requestId: string;
    status: 'pending' | 'accepted' | 'declined';
  }[];
};

const initialState: FriendState = {
  request: [],
};

const friendRequestSlice = createSlice({
  name: 'friendRequest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchFriendRequests.fulfilled,
      (
        state,
        action: PayloadAction<
          {
            senderName: string;
            requestId: string;
            status: 'pending' | 'accepted' | 'declined';
          }[]
        >
      ) => {
        state.request = action.payload; // Ensure payload matches the expected structure
      }
    );
    builder.addCase(fetchFriendRequests.rejected, (state) => {
      state.request = [];
    });
  },
});

export const fetchFriendRequests = createAsyncThunk(
  'friend/fetchFriendRequests',
  async (_, { rejectWithValue }) => {
    try {
      const data = JSON.parse(localStorage.getItem('user') || '{}');
      const response = await axios.post(
        `${APP_URL}/api/friendRequest`,
        {
          id: data.user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error); // Log the error for debugging
      return rejectWithValue([]); // Return empty array on error
    }
  }
);

export default friendRequestSlice.reducer;
