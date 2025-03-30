import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { APP_URL } from '@/utils/constants';

export interface FriendType {
  id: string;
  username: string;
  avatar: string;
  onlineStatus: string;
  channels: string[];
}

type FriendState = {
  friends: FriendType[];
};

const initialState: FriendState = {
  friends: [],
};

const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchFriends.fulfilled,
      (state, action: PayloadAction<FriendType[]>) => {
        state.friends = action.payload;
      }
    );
    builder.addCase(fetchFriends.rejected, (state) => {
      state.friends = [];
    });
    builder.addCase(
      deleteFriend.fulfilled,
      (state, action: PayloadAction<FriendType[]>) => {
        state.friends = action.payload;
      }
    );
    builder.addCase(deleteFriend.rejected, (state) => {
      state.friends = [];
    });
  },
});

export const fetchFriends = createAsyncThunk(
  'friend/fetchFriends',
  async (_, { rejectWithValue }) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user') || '');
      if (!storedUser) return rejectWithValue([]); // Validate structure of storedUser

      const friendIds = storedUser.user.friends;
      if (friendIds.length === 0) rejectWithValue([]);

      // Fetch data for each friend
      const friendData: FriendType[] = await axios
        .get(`${APP_URL}/api/friend`, {
          headers: {
            Authorization: `Bearer ${storedUser.token}`,
          },
        })
        .then((res) => res.data)
        .catch((err) => {
          console.error(err);
          return [];
        });

      return friendData;
    } catch (error) {
      console.error(error); // Log the error for debugging
      return rejectWithValue([]); // Return empty array on error
    }
  }
);

export const deleteFriend = createAsyncThunk(
  'friend/deleteFriend',
  async (friendId: string, { rejectWithValue }) => {
    try {
      const storedUser = await JSON.parse(localStorage.getItem('user') || '');
      if (!storedUser) return rejectWithValue([]); // Validate structure of storedUser

      await axios.delete(`${APP_URL}/api/friend/${friendId}`, {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
        },
      });

      const friendData: FriendType[] = await axios
        .get(`${APP_URL}/api/friend`, {
          headers: {
            Authorization: `Bearer ${storedUser.token}`,
          },
        })
        .then((res) => res.data)
        .catch((err) => {
          console.error(err);
          return [];
        });

      return friendData;
    } catch (error: Error | unknown) {
      console.error(error instanceof Error ? error.message : String(error));
      return rejectWithValue('Error deleting friend');
    }
  }
);

export default friendSlice.reducer;
