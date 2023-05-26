import { createSlice } from "@reduxjs/toolkit";

const getActiveUser = () => {
  const activeUser = localStorage.getItem("activeUser");
  if (activeUser) {
    return JSON.parse(activeUser);
  } else {
    return null;
  }
};

const activeUser = getActiveUser();

const activeUserSlice = createSlice({
  name: "activeUser",
  initialState: {
    activeUser,
  },
  reducers: {
    addActiveUser(state, action) {
      state.activeUser = { ...action.payload };
      localStorage.setItem("activeUser", JSON.stringify(action.payload));
    },
    removeActiveUser(state, action) {
      state.activeUser = null;
      localStorage.removeItem("activeUser");
    },
  },
});

export const { addActiveUser, removeActiveUser } = activeUserSlice.actions;
export const ActiveUserReducer = activeUserSlice.reducer;
