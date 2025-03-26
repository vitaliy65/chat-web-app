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
  },
});

export const fetchFriends = createAsyncThunk(
  'friend/fetchFriends',
  async (_, { rejectWithValue }) => {
    try {
      const storedUserString = localStorage.getItem('user');
      if (!storedUserString) {
        return rejectWithValue([]); // Return empty array if no user is stored
      }

      const storedUser = JSON.parse(storedUserString);
      if (
        !storedUser ||
        !storedUser.user ||
        !Array.isArray(storedUser.user.friends)
      ) {
        return rejectWithValue([]); // Validate structure of storedUser
      }

      const friendIds = storedUser.user.friends;

      if (friendIds.length === 0) {
        return []; // Return empty array if no friends are present
      }

      const link = `${APP_URL}/api/friend/${friendIds.join('/')}`;

      // Fetch data for each friend
      const friendData: FriendType[] = await axios
        .get(link, {
          headers: {
            Authorization: `Bearer ${storedUser.token}`,
          },
        })
        .then((res) => res.data)
        .catch((err) => {
          console.error(err);
          return [];
        });

      // Filter out null values
      return friendData.filter((friend: FriendType) => friend !== null);
    } catch (error) {
      console.error(error); // Log the error for debugging
      return rejectWithValue([]); // Return empty array on error
    }
  }
);

export default friendSlice.reducer;
