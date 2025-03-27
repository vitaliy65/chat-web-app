import { createSlice } from '@reduxjs/toolkit';

type filterFriendState = {
  action: {
    showAll: boolean;
    showOnline: boolean;
    showPending: boolean;
    openAddFriendForm: boolean;
  };
};

const initialState: filterFriendState = {
  action: {
    showAll: true,
    showOnline: false,
    showPending: false,
    openAddFriendForm: false,
  },
};

const filterFriendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    setShowAll: (state) => {
      state.action.showAll = true;
      state.action.showOnline = false;
      state.action.showPending = false;
    },
    setShowOnline: (state) => {
      state.action.showAll = false;
      state.action.showOnline = true;
      state.action.showPending = false;
    },
    setShowPending: (state) => {
      state.action.showAll = false;
      state.action.showOnline = false;
      state.action.showPending = true;
    },
    setOpenAddFriendForm: (state) => {
      state.action.openAddFriendForm = !state.action.openAddFriendForm;
    },
  },
});

export const {
  setShowAll,
  setShowOnline,
  setShowPending,
  setOpenAddFriendForm,
} = filterFriendSlice.actions;
export default filterFriendSlice.reducer;
