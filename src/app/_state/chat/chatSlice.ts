import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { APP_URL } from '@/utils/constants';

export type Message = {
  _id: string;
  sender: string;
  content: string;
  timestamp: string;
};

export type ChatType = {
  id: string;
  participants: string[];
  messages: Message[];
};

export interface ICurrentChat {
  id: string;
  friendId: string;
  participants: string[];
  messages: Message[];
}

type FriendState = {
  chats: ChatType[];
  currentChat: ICurrentChat;
};

const initialState: FriendState = {
  chats: [],
  currentChat: { id: '', friendId: '', participants: [], messages: [] },
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentChatByFriendId: (state, action: PayloadAction<string>) => {
      const friendId = action.payload;
      const existingChat = state.chats.find((chat) =>
        chat.participants.includes(friendId)
      );

      if (existingChat) {
        state.currentChat = { friendId: friendId, ...existingChat };
      } else {
        state.currentChat = {
          id: '',
          friendId: '',
          participants: [],
          messages: [],
        };
      }
    },
    addMessageToCurrentChat: (state, action: PayloadAction<Message>) => {
      const newMessage = action.payload;

      // Validate currentChat exists
      if (!state.currentChat) return;

      // Create new array with spread operator for immutability
      state.currentChat.messages = [
        ...(state.currentChat.messages || []),
        newMessage,
      ];
    },
  },
  extraReducers: (builder) => {
    // fetch chats
    builder.addCase(
      fetchChats.fulfilled,
      (state, action: PayloadAction<ChatType[]>) => {
        state.chats = action.payload;
      }
    );

    builder.addCase(
      fetchChatById.fulfilled,
      (state, action: PayloadAction<ChatType>) => {
        const chat: ChatType = action.payload;
        if (!state.chats.includes(chat)) state.chats.push(chat);
      }
    );

    // fetch messages for chats
    builder.addCase(fetchMessagesByChatId.fulfilled, (state, action) => {
      const { chatId, messages } = action.payload;
      const chat = state.chats.find((chat) => chat.id === chatId);
      if (chat) {
        chat.messages = messages;
      }

      if (state.currentChat.id === chatId) {
        state.currentChat.messages = messages;
      }
    });

    // add message for chat
    builder.addCase(sendMessageToChat.fulfilled, (state, action) => {
      const { chatId, message } = action.payload;
      const chat = state.chats.find((chat) => chat.id === chatId);
      if (chat) {
        chat.messages.push(message);
      }

      if (state.currentChat.id === chatId) {
        state.currentChat.messages.push(message);
      }
    });

    // delete chat
    builder.addCase(
      deleteChat.fulfilled,
      (state, action: PayloadAction<ChatType[]>) => {
        state.chats = action.payload;
      }
    );

    // create chat
    builder.addCase(
      createChat.fulfilled,
      (state, action: PayloadAction<ChatType>) => {
        state.chats.push(action.payload);
      }
    );
  },
});

export const fetchChats = createAsyncThunk(
  'chat/fetchChats',
  async (_, { rejectWithValue }) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user') || '');
      if (!storedUser) return rejectWithValue([]); // Validate structure of storedUser

      // Fetch data for each chat
      const chatData: ChatType[] = await axios
        .get(`${APP_URL}/api/chat`, {
          headers: {
            Authorization: `Bearer ${storedUser.token}`,
          },
        })
        .then((res) => res.data)
        .catch((err) => {
          console.error(err);
          return [];
        });

      return chatData;
    } catch (error) {
      console.error(error); // Log the error for debugging
      return rejectWithValue([]); // Return empty array on error
    }
  }
);

export const fetchChatById = createAsyncThunk(
  'chat/fetchChatById',
  async (chatId: string, { rejectWithValue }) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user') || '');
      if (!storedUser) return rejectWithValue([]); // Validate structure of storedUser

      // Fetch data for each chat
      const chatData: ChatType = await axios
        .get(`${APP_URL}/api/chat/${chatId}`, {
          headers: {
            Authorization: `Bearer ${storedUser.token}`,
          },
        })
        .then((res) => res.data)
        .catch((err) => {
          console.error(err);
          return [];
        });

      return chatData;
    } catch (error) {
      console.error(error); // Log the error for debugging
      return rejectWithValue([]); // Return empty array on error
    }
  }
);

export const fetchMessagesByChatId = createAsyncThunk(
  'chat/fetchMessagesByChatId',
  async (chatId: string, { rejectWithValue }) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user') || '');
      if (!storedUser) return rejectWithValue('User not authenticated');

      const messages: Message[] = await axios
        .get(`${APP_URL}/api/message/${chatId}`, {
          headers: {
            Authorization: `Bearer ${storedUser.token}`,
          },
        })
        .then((res) => res.data)
        .catch((err) => {
          console.error(err);
          return rejectWithValue('Failed to fetch messages');
        });

      return { chatId, messages };
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error fetching messages');
    }
  }
);

export const sendMessageToChat = createAsyncThunk(
  'chat/sendMessageToChat',
  async (
    { chatId, content }: { chatId: string; content: string },
    { rejectWithValue }
  ) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user') || '');
      if (!storedUser) return rejectWithValue('User not authenticated');

      const message: Message = await axios
        .post(
          `${APP_URL}/api/message/`,
          { chatId, content },
          {
            headers: {
              Authorization: `Bearer ${storedUser.token}`,
            },
          }
        )
        .then((res) => res.data)
        .catch((err) => {
          console.error(err);
          return rejectWithValue('Failed to send message');
        });

      return { chatId, message };
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error sending message');
    }
  }
);

export const deleteChat = createAsyncThunk(
  'chat/deleteChat',
  async (friendId: string, { rejectWithValue }) => {
    try {
      const storedUser = await JSON.parse(localStorage.getItem('user') || '');
      if (!storedUser) return rejectWithValue([]); // Validate structure of storedUser

      await axios.delete(`${APP_URL}/api/chat/${friendId}`, {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
        },
      });

      const chatData: ChatType[] = await axios
        .get(`${APP_URL}/api/chat`, {
          headers: {
            Authorization: `Bearer ${storedUser.token}`,
          },
        })
        .then((res) => res.data)
        .catch((err) => {
          console.error(err);
          return [];
        });

      return chatData;
    } catch (error: Error | unknown) {
      console.error(error instanceof Error ? error.message : String(error));
      return rejectWithValue('Error deleting friend');
    }
  }
);

export const createChat = createAsyncThunk(
  'chat/createChat',
  async (friendId: string, { rejectWithValue }) => {
    try {
      const storedUser = await JSON.parse(localStorage.getItem('user') || '');
      if (!storedUser) return rejectWithValue([]); // Validate structure of storedUser

      const chatData: ChatType = await axios
        .post(
          `${APP_URL}/api/chat/`,
          { friendId: friendId },
          {
            headers: {
              Authorization: `Bearer ${storedUser.token}`,
            },
          }
        )
        .then((res) => res.data)
        .catch((err) => {
          console.error(err.message);
          return [];
        });

      return chatData;
    } catch (error: Error | unknown) {
      console.error(error instanceof Error ? error.message : String(error));
      return rejectWithValue('Error deleting friend');
    }
  }
);

export const { setCurrentChatByFriendId, addMessageToCurrentChat } =
  chatSlice.actions;
export default chatSlice.reducer;
