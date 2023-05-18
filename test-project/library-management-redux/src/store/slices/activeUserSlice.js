import { createSlice } from "@reduxjs/toolkit";

const activeUserSlice = createSlice({
  name: "activeUser",
  initialState: {
    activeUser: null,
  },
  reducers: {
    addActiveUser(state, action) {
      state.activeUser = { ...action.payload };
    },
    removeActiveUser(state, action) {
      state.activeUser = null;
    },
  },
});

export const { addActiveUser, removeActiveUser } = activeUserSlice.actions;
export const ActiveUserReducer = activeUserSlice.reducer;
