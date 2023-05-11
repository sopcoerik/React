import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { fetchUsers } from "./thunks/fetchData";
import { getUser } from "./thunks/getUser";
import { deleteUser } from "./thunks/deleteUser";

import { albumsApi } from "./apis/albumsApi";
import { photosApi } from "./apis/photosApi";

import { setupListeners } from "@reduxjs/toolkit/dist/query";

const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware);
  },
});

setupListeners(store.dispatch);

export * from "./apis/albumsApi";
export * from "./apis/photosApi";
export { store, fetchUsers, getUser, deleteUser };
