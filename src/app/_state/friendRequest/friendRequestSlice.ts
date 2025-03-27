import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { APP_URL } from '@/utils/constants';

type FriendState = {
  senderNames: string[];
};

const initialState: FriendState = {
  senderNames: [],
};

const friendRequestSlice = createSlice({
  name: 'friendRequest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchFriendRequests.fulfilled,
      (state, action: PayloadAction<string[]>) => {
        state.senderNames = action.payload;
      }
    );
    builder.addCase(fetchFriendRequests.rejected, (state) => {
      state.senderNames = [];
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
      await console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error); // Log the error for debugging
      return rejectWithValue([]); // Return empty array on error
    }
  }
);

export default friendRequestSlice.reducer;
